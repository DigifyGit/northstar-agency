# Handover Backup - LinkedIn IT Job Finder
**Backup Date:** 2026-02-17
**Purpose:** Fast context restore after restart, with canonical runtime wiring only.

## 1) Project Identity
- Project Name: `LinkedIn IT Job Finder`
- Mission: Find real, applyable L1 IT jobs fast (winner-first workflow)
- Canonical brain files only: `AGENCY.md`, `CLIENT_BRIEF.md`, `CASE_LOG.md`, `AGENTS.md`, `STYLE_GUIDE.md`, `ENFORCEMENT.md`, `knowledge_base.json`

## 2) Current Status Snapshot
- System State: `IDLE`
- Latest completed focus: Portugal 7-keyword maximization + comparison
- Confirmed progress: winners found and ranked

## 3) Latest Verified Outcome
- Winners (S/A): `2`
- Backup (B): `11`
- Latest MAP cycle rows: `62`
- Unique jobs in latest cycle: `29`

Primary winner report:
- `reports/WINNER_REPORT_TODAY.md`

## 4) Runtime Wiring (Synced)
- `src/utils/brainReader.js` reads `brain/CLIENT_BRIEF.md` (table + bullet parsing)
- `src/scoring.js` reads scoring rules + thresholds from `brain/knowledge_base.json`
- `src/utils/brainWriter.js` writes directly to `brain/CASE_LOG.md` table format
- Legacy alias files removed from runtime (`SOUL.md`, `USER.md`, `MEMORY.md`)

## 5) Key Files To Restore Context
- Agent state + routing: `brain/AGENTS.md`
- Agency persona + standards: `brain/AGENCY.md`, `brain/STYLE_GUIDE.md`
- Client profile + scoring semantics: `brain/CLIENT_BRIEF.md`, `brain/knowledge_base.json`
- Case history + stats: `brain/CASE_LOG.md`
- Latest queue outputs: `reports/WINNER_REPORT_TODAY.md`, `reports/WINNER_REPORT_TODAY.json`

## 6) Session Isolation Contract (Critical)
- Antigravity:
  `SESSION_METHOD=legacy_shared_profile`
  `USER_DATA_DIR=$PROJECT_ROOT/user_data`
- Codex:
  `SESSION_METHOD=isolated_profile`
  `AGENT_ID=codex`
  `USER_DATA_DIR=$PROJECT_ROOT/user_data_codex`

## 7) Recovery Procedure (Fresh Start)
1. Open project folder.
2. Read in order:
   - `brain/AGENTS.md`
   - `brain/AGENCY.md`
   - `brain/CLIENT_BRIEF.md`
   - `brain/CASE_LOG.md`
   - `reports/WINNER_REPORT_TODAY.md`
3. Regenerate rolling winner report:
   - `npm run winner:today`
4. Continue sourcing from latest queue (A-tier first, then B-tier).

## 8) Known Runtime Risks
- CSV schema shift can occur in appended MAP blocks.
- Mitigation active in `src/winner_report.js` normalization pipeline.

## 9) Immediate Next Work
1. Apply all A-tier winners now.
2. Apply top 5 B-tier jobs.
3. Start Phase 3 direct company scraping (Randstad, Adecco, Multipessoal, Talenter, Hays).
