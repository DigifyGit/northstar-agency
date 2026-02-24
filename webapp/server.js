const express = require('express');
const session = require('express-session');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 4311;

const AUTH_USERNAME = process.env.MARK_AUTH_USERNAME || '';
const AUTH_PASSWORD = process.env.MARK_AUTH_PASSWORD || '';
const SESSION_SECRET = process.env.SESSION_SECRET || 'northstar-dev-session-secret';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
const MARK_SYSTEM_PROMPT =
  process.env.MARK_SYSTEM_PROMPT ||
  'You are Mark, the NorthStar Agency copilot. Prioritize actionable, evidence-first job search support. Be concise and professional.';

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 8,
    },
  })
);

app.use('/assets', express.static(path.join(__dirname, 'public')));

function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) {
    return next();
  }
  if (req.path.startsWith('/api/')) {
    return res.status(401).json({ ok: false, error: 'Authentication required.' });
  }
  return res.redirect('/login');
}

function extractModelText(payload) {
  const parts = payload?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return '';
  return parts
    .map((p) => (typeof p?.text === 'string' ? p.text : ''))
    .filter(Boolean)
    .join('\n')
    .trim();
}

async function callGeminiMark(mode, message) {
  if (!GEMINI_API_KEY) {
    throw new Error('Missing GEMINI_API_KEY. Configure it in webapp/.env or deployment secrets.');
  }

  const prompt = `Mode: ${mode}\n\nUser request:\n${message}`;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    GEMINI_MODEL
  )}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;

  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      },
      systemInstruction: { parts: [{ text: MARK_SYSTEM_PROMPT }] },
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Gemini API request failed (${resp.status}): ${errText.slice(0, 400)}`);
  }

  const json = await resp.json();
  const text = extractModelText(json);
  if (!text) {
    throw new Error('Gemini response did not contain text.');
  }
  return text;
}

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  if (req.session && req.session.authenticated) {
    return res.redirect('/app');
  }
  return res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!AUTH_USERNAME || !AUTH_PASSWORD) {
    return res.status(500).json({
      ok: false,
      error: 'Server login credentials are not configured. Set MARK_AUTH_USERNAME and MARK_AUTH_PASSWORD.',
    });
  }

  if (username === AUTH_USERNAME && password === AUTH_PASSWORD) {
    req.session.authenticated = true;
    req.session.username = username;
    return res.json({ ok: true });
  }

  return res.status(401).json({ ok: false, error: 'Invalid username or password.' });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  });
});

app.get('/api/session', (req, res) => {
  return res.json({ authenticated: Boolean(req.session && req.session.authenticated) });
});

app.get('/app', requireAuth, (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

app.post('/api/mark/chat', requireAuth, (req, res) => {
  const mode = String(req.body?.mode || 'Job Search');
  const message = String(req.body?.message || '').trim();

  if (!message) {
    return res.status(400).json({ ok: false, error: 'Message is required.' });
  }
  if (message.length > 4000) {
    return res.status(400).json({ ok: false, error: 'Message too long (max 4000 chars).' });
  }

  return callGeminiMark(mode, message)
    .then((reply) => res.json({ ok: true, reply }))
    .catch((err) => {
      return res.status(500).json({
        ok: false,
        error: err.message || 'Failed to generate Mark response.',
      });
    });
});

app.listen(PORT, () => {
  console.log(`NorthStar web app running at http://localhost:${PORT}`);
});
