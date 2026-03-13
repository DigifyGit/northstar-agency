# NorthStar Agency Web App + Mark AI (Production Blueprint)

## 1) Product Scope
- Goal: turn NorthStar into one online AI job sourcing platform with a single assistant (`MARK`) across all phases.
- Audience: job seekers, new agency workers, and business buyers.
- Core promise: no assumption-driven decisions; verification gates are mandatory.

## 2) App Modules
- Intake Console: collects candidate profile, constraints, role target.
- Sourcing Engine: builds and ranks job pipeline.
- Company Verification Gate: evidence table + primary sources + verdict labels.
- Fit Validation: role-match scoring and gap closure plan.
- Application Studio: tailored CV bullets + recruiter message.
- Follow-Up Tracker: cadence + status updates.
- Interview Lab: prep scripts and drills.
- Offer Decision: compare options and risks.
- Mark AI Copilot: one chat interface across all modules.

## 3) Mark AI Backend
- API route: `POST /api/mark/chat`
- Request:
```json
{
  "mode": "Verification",
  "message": "Validate this company and job offer.",
  "case_id": "optional",
  "phase": "Phase 2.5"
}
```
- Response:
```json
{
  "reply": "...",
  "sources": ["https://..."],
  "confidence": "high|medium|low",
  "verdict": "VERIFIED_LEGIT|VERIFIED_RISK|UNKNOWN_INSUFFICIENT_EVIDENCE"
}
```
- Model wiring:
  - Provider: OpenAI Responses API
  - System rule: never issue scam/risk verdict without evidence table + primary source checks.

## 4) Hard Gate Logic (Non-Negotiable)
- No evidence table -> no verdict.
- No primary source check -> no analysis.
- No hard artifact -> no scam label.

## 5) Suggested Stack
- Frontend: Next.js + TypeScript + Tailwind (or plain CSS module style)
- Backend: Next.js API routes or FastAPI
- DB: Postgres (cases, evidence rows, source artifacts, phase history)
- Auth: Clerk/Auth0
- Storage: S3-compatible bucket for artifacts/screenshots/PDFs
- Observability: structured logs + per-case audit trail

## 6) Stitch UI Prompt Set (Use Outside This Environment)

### Prompt A: Executive Homepage
"Design a premium web app homepage for NorthStar Agency, an AI job sourcing platform. Include top nav, hero, module cards, phase timeline, hard gate panel, and a visible Mark AI chat entry. Style: dark navy liquid glass, cyan + coral accents, enterprise clarity, high readability, no jargon-heavy copy."

### Prompt B: Phase Explorer
"Create a Phase Explorer screen with 8 phases from Intake to Offer Decision. Each phase card must show purpose, input, output, owner, and gate status. Add glossary drawer explaining terms in simple language for new workers and buyers. Futuristic glass UI, hover states, responsive layout."

### Prompt C: Mark Copilot Workspace
"Create a split workspace: left side case context (candidate profile, pipeline, verification status), right side Mark AI chat with modes (Job Search, Verification, CV Tailoring, Interview, Offer Strategy). Include evidence panel with source links and confidence labels. Emphasize trust and anti-assumption workflow."

## 7) Build Order
1. Deploy UI shell + auth.
2. Implement case model and phase state machine.
3. Add Mark chat endpoint and memory per case.
4. Implement verification evidence schema and gate enforcement.
5. Add audit logs and supervisor dashboard.
6. Launch beta with strict gate-only verdicts.
