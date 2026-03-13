# NorthStar Agency Web App

Premium agency website + login + protected Mark AI portal.

## Local run

```bash
cd webapp
cp .env.example .env
npm install
npm start
```

Open: `http://localhost:4311`

## Required env vars

- `MARK_AUTH_USERNAME`
- `MARK_AUTH_PASSWORD`
- `SESSION_SECRET`
- `GEMINI_API_KEY` (server only)
- `GEMINI_MODEL`

## Security model

- No API keys in frontend.
- Frontend calls only backend endpoints.
- Mark calls Gemini server-side.
- Session cookie is `httpOnly`.

## Abuse protection

- IP limiter on Mark endpoint.
- Per-user burst limiter.
- Per-user daily quota limiter.
- Login lockout after repeated failed attempts.

## Project context + memory

- Mark loads context from project files in `brain/` and `reports/`.
- Endpoint: `GET /api/mark/context` returns loaded source count and history count.
- Session conversation history is reused in subsequent messages.

## Routes

- `/` premium website
- `/login` login page
- `/app` protected portal
- `/api/login`
- `/api/logout`
- `/api/session`
- `/api/mark/context`
- `/api/mark/chat`
