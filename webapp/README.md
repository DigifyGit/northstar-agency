# NorthStar Agency Web App

Promo + login gateway + protected NorthStar AI job sourcing dashboard with server-side Gemini integration for Mark.

## 1) Local run

```bash
cd webapp
cp .env.example .env
npm install
npm start
```

Open: `http://localhost:4311`

## 2) Required environment variables

Set these in `webapp/.env` (local) or your hosting provider's Secrets panel (production):

- `SESSION_SECRET`: long random secret string
- `MARK_AUTH_USERNAME`: login username (default local demo: `Jusé`)
- `MARK_AUTH_PASSWORD`: login password (default local demo: `findmeajob`)
- `GEMINI_API_KEY`: Gemini API key (server-only)
- `GEMINI_MODEL`: model id (example: `gemini-3-flash-preview` or the flash model available in your account)
- `NODE_ENV`: `development` or `production`

## 3) Security model

- Browser never receives Gemini API key.
- Frontend only calls `POST /api/mark/chat`.
- Server calls Gemini directly using `GEMINI_API_KEY` from env vars.
- Session cookies are `httpOnly` and `sameSite=lax`.
- API has rate limiting and security headers enabled.

## 4) Routes

- `/` promo landing page
- `/login` login page
- `/app` protected web app
- `/api/login` login API
- `/api/logout` logout API
- `/api/session` session status
- `/api/mark/chat` protected Mark -> Gemini endpoint

## 5) Deploy live safely

1. Deploy this `webapp` folder to your host (Render, Railway, Fly.io, Cloud Run, etc).
2. Set all env vars in hosting secrets.
3. Do not commit `.env`.
4. Rotate any previously exposed API key.
