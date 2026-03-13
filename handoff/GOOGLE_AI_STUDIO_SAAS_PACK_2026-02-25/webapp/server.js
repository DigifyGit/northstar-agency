const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = Number(process.env.PORT || 4311);

const AUTH_USERNAME = process.env.MARK_AUTH_USERNAME || '';
const AUTH_PASSWORD = process.env.MARK_AUTH_PASSWORD || '';
const SESSION_SECRET = process.env.SESSION_SECRET || 'northstar-dev-session-secret';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
const MARK_ALLOW_LOCAL_FALLBACK = String(process.env.MARK_ALLOW_LOCAL_FALLBACK || 'true') === 'true';

const MARK_SYSTEM_PROMPT =
  process.env.MARK_SYSTEM_PROMPT ||
  'You are Mark, the NorthStar Agency copilot. Use project context and case history. Be concise, evidence-first, and actionable.';

const MARK_IP_WINDOW_MS = Number(process.env.MARK_IP_WINDOW_MS || 5 * 60 * 1000);
const MARK_IP_LIMIT = Number(process.env.MARK_IP_LIMIT || 60);
const MARK_USER_WINDOW_MS = Number(process.env.MARK_USER_WINDOW_MS || 5 * 60 * 1000);
const MARK_USER_WINDOW_LIMIT = Number(process.env.MARK_USER_WINDOW_LIMIT || 20);
const MARK_USER_DAILY_LIMIT = Number(process.env.MARK_USER_DAILY_LIMIT || 300);

const LOGIN_MAX_ATTEMPTS = Number(process.env.LOGIN_MAX_ATTEMPTS || 7);
const LOGIN_LOCK_MINUTES = Number(process.env.LOGIN_LOCK_MINUTES || 15);

const MAX_HISTORY_TURNS = Number(process.env.MARK_MAX_HISTORY_TURNS || 12);
const MAX_CONTEXT_CHARS = Number(process.env.MARK_MAX_CONTEXT_CHARS || 24000);
const CONTEXT_CACHE_MS = Number(process.env.MARK_CONTEXT_CACHE_MS || 5 * 60 * 1000);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DEFAULT_CONTEXT_FILES = (
  process.env.MARK_CONTEXT_FILES ||
  [
    'brain/CLIENT_BRIEF.md',
    'brain/CASE_LOG.md',
    'brain/CLIENT_SUCCESS_SOP.md',
    'brain/ENFORCEMENT.md',
    'reports/B_TIER_AUDIT_REPORT_2026-02-23.md',
    'reports/B_TIER_COMPARISON_REPORT_2026-02-22.md',
    'reports/A_TIER_FIT_DOSSIER_ManpowerGroup_2026-02-22.md',
    'reports/SYSTEM_MODULES_MAP.md',
  ].join(',')
)
  .split(',')
  .map((x) => x.trim())
  .filter(Boolean);

const loginAttempts = new Map();
const userWindowCounters = new Map();
const userDailyCounters = new Map();
let contextCache = { expiresAt: 0, snapshot: null };

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 250,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => res.status(429).json({ ok: false, error: 'Too many requests. Try again later.' }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
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

const markIpLimiter = rateLimit({
  windowMs: MARK_IP_WINDOW_MS,
  limit: MARK_IP_LIMIT,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => res.status(429).json({ ok: false, error: 'Rate limited by IP. Try again shortly.' }),
});

function nowIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeUserId(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) return next();
  if (req.path.startsWith('/api/')) return res.status(401).json({ ok: false, error: 'Authentication required.' });
  return res.redirect('/login');
}

function guardLoginAttempts(req, res, next) {
  const username = String(req.body?.username || '').trim();
  const ip = req.ip || 'unknown-ip';
  const key = `${ip}::${username || 'unknown-user'}`;
  const record = loginAttempts.get(key);

  if (record && record.lockedUntil && record.lockedUntil > Date.now()) {
    const seconds = Math.ceil((record.lockedUntil - Date.now()) / 1000);
    return res.status(429).json({
      ok: false,
      error: `Too many failed logins. Try again in ${seconds}s.`,
    });
  }

  req.loginAttemptKey = key;
  return next();
}

function markFailedLogin(key) {
  const current = loginAttempts.get(key) || { fails: 0, lockedUntil: 0 };
  current.fails += 1;
  if (current.fails >= LOGIN_MAX_ATTEMPTS) {
    current.lockedUntil = Date.now() + LOGIN_LOCK_MINUTES * 60 * 1000;
    current.fails = 0;
  }
  loginAttempts.set(key, current);
}

function clearLoginAttemptsForIp(ip) {
  for (const key of loginAttempts.keys()) {
    if (key.startsWith(`${ip}::`)) loginAttempts.delete(key);
  }
}

function enforceUserWindowLimit(req, res, next) {
  const user = req.session?.username || 'anonymous';
  const bucket = userWindowCounters.get(user) || { count: 0, resetAt: Date.now() + MARK_USER_WINDOW_MS };

  if (Date.now() > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = Date.now() + MARK_USER_WINDOW_MS;
  }

  if (bucket.count >= MARK_USER_WINDOW_LIMIT) {
    const wait = Math.ceil((bucket.resetAt - Date.now()) / 1000);
    return res.status(429).json({ ok: false, error: `Per-user burst limit reached. Retry in ${wait}s.` });
  }

  bucket.count += 1;
  userWindowCounters.set(user, bucket);
  return next();
}

function enforceDailyQuota(req, res, next) {
  const user = req.session?.username || 'anonymous';
  const day = nowIsoDate();
  const row = userDailyCounters.get(user) || { day, count: 0 };

  if (row.day !== day) {
    row.day = day;
    row.count = 0;
  }

  if (row.count >= MARK_USER_DAILY_LIMIT) {
    return res.status(429).json({ ok: false, error: 'Daily chat quota reached for this user.' });
  }

  row.count += 1;
  userDailyCounters.set(user, row);
  req.dailyRemaining = MARK_USER_DAILY_LIMIT - row.count;
  return next();
}

function safeReadProjectFile(relativePath) {
  try {
    const absolutePath = path.resolve(PROJECT_ROOT, relativePath);
    if (!absolutePath.startsWith(PROJECT_ROOT)) return null;
    if (!fs.existsSync(absolutePath)) return null;
    const stat = fs.statSync(absolutePath);
    if (!stat.isFile()) return null;
    const raw = fs.readFileSync(absolutePath, 'utf8');
    return { relativePath, absolutePath, mtimeMs: stat.mtimeMs, content: raw };
  } catch {
    return null;
  }
}

function latestReportFiles(limit = 6) {
  const dir = path.resolve(PROJECT_ROOT, 'reports');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const full = path.join(dir, name);
      const stat = fs.statSync(full);
      return { name, relativePath: `reports/${name}`, mtimeMs: stat.mtimeMs };
    })
    .sort((a, b) => b.mtimeMs - a.mtimeMs)
    .slice(0, limit);
}

function buildProjectContextSnapshot() {
  const docs = [];

  for (const rel of DEFAULT_CONTEXT_FILES) {
    const file = safeReadProjectFile(rel);
    if (file) docs.push(file);
  }

  for (const rep of latestReportFiles(6)) {
    if (!docs.some((d) => d.relativePath === rep.relativePath)) {
      const file = safeReadProjectFile(rep.relativePath);
      if (file) docs.push(file);
    }
  }

  let totalChars = 0;
  const used = [];
  const chunks = [];

  for (const doc of docs) {
    if (totalChars >= MAX_CONTEXT_CHARS) break;
    const remaining = MAX_CONTEXT_CHARS - totalChars;
    const snippet = doc.content.slice(0, Math.min(remaining, 3500));
    if (!snippet) continue;

    used.push({ path: doc.relativePath, chars: snippet.length, updatedAt: new Date(doc.mtimeMs).toISOString() });
    chunks.push(`### Source: ${doc.relativePath}\n${snippet}`);
    totalChars += snippet.length;
  }

  return {
    builtAt: new Date().toISOString(),
    totalChars,
    sources: used,
    contextText: chunks.join('\n\n'),
  };
}

function getProjectContextSnapshot() {
  if (contextCache.snapshot && Date.now() < contextCache.expiresAt) return contextCache.snapshot;
  const snapshot = buildProjectContextSnapshot();
  contextCache = { snapshot, expiresAt: Date.now() + CONTEXT_CACHE_MS };
  return snapshot;
}

function extractModelText(payload) {
  const parts = payload?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return '';
  return parts.map((p) => (typeof p?.text === 'string' ? p.text : '')).filter(Boolean).join('\n').trim();
}

function getSessionHistory(session) {
  if (!Array.isArray(session.markHistory)) session.markHistory = [];
  return session.markHistory.slice(-MAX_HISTORY_TURNS);
}

function pushSessionHistory(session, role, text) {
  if (!Array.isArray(session.markHistory)) session.markHistory = [];
  session.markHistory.push({ role, text, ts: new Date().toISOString() });
  if (session.markHistory.length > MAX_HISTORY_TURNS) {
    session.markHistory = session.markHistory.slice(-MAX_HISTORY_TURNS);
  }
}

function buildHistoryText(history) {
  if (!history.length) return 'No previous conversation history.';
  return history.map((h, i) => `${i + 1}. [${h.role}] ${h.text}`).join('\n');
}

function localFallbackReply({ mode, message, contextSnapshot, history }) {
  const sourceList = contextSnapshot.sources.slice(0, 4).map((s) => s.path).join(', ');
  const lastUser = [...history].reverse().find((h) => h.role === 'user')?.text || 'none';
  return [
    `Mode: ${mode}`,
    `Context loaded from ${contextSnapshot.sources.length} project files.`,
    `Primary sources: ${sourceList || 'none'}.`,
    `Latest user-history anchor: ${lastUser.slice(0, 160)}${lastUser.length > 160 ? '...' : ''}`,
    `Actionable next step for your request: ${message.slice(0, 200)}${message.length > 200 ? '...' : ''}`,
    'Gemini key is not configured, so this response is local fallback mode.',
  ].join('\n');
}

async function callGeminiMark({ mode, message, session }) {
  const contextSnapshot = getProjectContextSnapshot();
  const history = getSessionHistory(session);

  if (!GEMINI_API_KEY && MARK_ALLOW_LOCAL_FALLBACK) {
    return {
      provider: 'local_fallback',
      reply: localFallbackReply({ mode, message, contextSnapshot, history }),
      contextSnapshot,
    };
  }

  if (!GEMINI_API_KEY) {
    throw new Error('Missing GEMINI_API_KEY. Configure it in webapp/.env or deployment secrets.');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    GEMINI_MODEL
  )}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;

  const prompt = [
    `Mode: ${mode}`,
    `User request:\n${message}`,
    `\nProject context:\n${contextSnapshot.contextText}`,
    `\nConversation history:\n${buildHistoryText(history)}`,
    '\nInstructions: Use project context and history. Return concrete execution steps and evidence-driven guidance.',
  ].join('\n\n');

  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 900,
      },
      systemInstruction: { parts: [{ text: MARK_SYSTEM_PROMPT }] },
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Gemini API request failed (${resp.status}): ${errText.slice(0, 300)}`);
  }

  const json = await resp.json();
  const text = extractModelText(json);
  if (!text) throw new Error('Gemini response did not contain text.');

  return {
    provider: 'gemini',
    reply: text,
    contextSnapshot,
  };
}

app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.get('/login', (req, res) => {
  if (req.session?.authenticated) return res.redirect('/app');
  return res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/api/login', guardLoginAttempts, (req, res) => {
  const { username, password } = req.body || {};

  if (!AUTH_USERNAME || !AUTH_PASSWORD) {
    return res.status(500).json({
      ok: false,
      error: 'Server login credentials are not configured. Set MARK_AUTH_USERNAME and MARK_AUTH_PASSWORD.',
    });
  }

  const usernameMatches = normalizeUserId(username) === normalizeUserId(AUTH_USERNAME);
  if (usernameMatches && password === AUTH_PASSWORD) {
    req.session.authenticated = true;
    req.session.username = username;
    req.session.markHistory = [];
    clearLoginAttemptsForIp(req.ip || 'unknown-ip');
    return res.json({ ok: true });
  }

  markFailedLogin(req.loginAttemptKey || `${req.ip || 'unknown'}::unknown`);
  return res.status(401).json({ ok: false, error: 'Invalid username or password.' });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  });
});

app.get('/api/session', (req, res) => {
  return res.json({
    authenticated: Boolean(req.session?.authenticated),
    username: req.session?.username || null,
  });
});

app.get('/api/mark/context', requireAuth, (req, res) => {
  const snapshot = getProjectContextSnapshot();
  return res.json({
    ok: true,
    contextBuiltAt: snapshot.builtAt,
    sourceCount: snapshot.sources.length,
    sources: snapshot.sources,
    historyCount: getSessionHistory(req.session).length,
    providerReady: Boolean(GEMINI_API_KEY) ? 'gemini' : MARK_ALLOW_LOCAL_FALLBACK ? 'local_fallback' : 'not_ready',
  });
});

app.get('/app', requireAuth, (_req, res) => res.sendFile(path.join(__dirname, 'public', 'app.html')));

app.post(
  '/api/mark/chat',
  requireAuth,
  markIpLimiter,
  enforceUserWindowLimit,
  enforceDailyQuota,
  async (req, res) => {
    const mode = String(req.body?.mode || 'Job Search').slice(0, 100);
    const message = String(req.body?.message || '').trim();

    if (!message) return res.status(400).json({ ok: false, error: 'Message is required.' });
    if (message.length > 4000) {
      return res.status(400).json({ ok: false, error: 'Message too long (max 4000 chars).' });
    }

    try {
      pushSessionHistory(req.session, 'user', message);
      const result = await callGeminiMark({ mode, message, session: req.session });
      pushSessionHistory(req.session, 'assistant', result.reply);

      return res.json({
        ok: true,
        reply: result.reply,
        meta: {
          provider: result.provider,
          sourceCount: result.contextSnapshot.sources.length,
          historyCount: getSessionHistory(req.session).length,
          dailyRemaining: req.dailyRemaining,
        },
      });
    } catch (err) {
      return res.status(500).json({ ok: false, error: err.message || 'Failed to generate Mark response.' });
    }
  }
);

app.listen(PORT, () => {
  console.log(`NorthStar web app running at http://localhost:${PORT}`);
});
