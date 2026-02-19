# Fresh Session Welcome - NorthStar Agency

Use this file when starting with a brand-new model/session and no prior chat history.

## 1. Mission

NorthStar Agency is an evidence-first reverse recruiting system for L1 IT / Helpdesk outcomes.

The system must prioritize:

- compliant execution,
- explainable fit decisions,
- client-in-the-loop action control,
- auditable evidence trails.

## 2. Hard Boundaries

- Active project root: `/Users/Maestro/Developer/NorthStar Agency`
- Backup project (read-only reference): `/Users/Maestro/Developer/LinkedIn IT Job Finder`
- Never modify the backup project.

## 3. Read Order (Do This First)

1. `docs/handover/NorthStar_Agency_Project_Introduction.md`
2. `docs/handover/OPUS_RE_AUDIT_2026-02-18.md`
3. `docs/plans/MASTER_TRANSFORMATION_PLAN.md`
4. `brain/ENFORCEMENT.md`
5. `brain/AGENTS.md`
6. `brain/CLIENT_SUCCESS_SOP.md`
7. `brain/COMPLIANCE.md`

## 4. Current Status Snapshot

- OPUS re-audit reported 14/14 issues fixed.
- Documentation architecture is normalized:
  - `docs/` for handover/plans/imports
  - `research/` for strategic + benchmark material
- Runtime scripts are wired:
  - `npm run scrape`
  - `npm run report`
  - `npm run dossier`
  - `npm run track`
  - `npm run daily`

## 5. Most Important Open Work

The main operational limiter is still evidence maturity.

Priority action for a new agent:

1. Import ChatGPT Web skill-test outputs into `assessments/completed/`.
2. Update `brain/SKILLS_EVIDENCE_LEDGER.json` confidence entries from evidence.
3. Re-run dossier generation and verify gate movement (HOLD -> CONDITIONAL/GO where justified).

## 6. Fast Validation Checklist

Run these checks at session start:

```bash
pwd
ls -la
node -v
npm -v
npm run report
npm run dossier
npm run track
```

If any command fails, diagnose before new feature work.

## 7. Expected Working Style

- Treat `brain/` as governance source of truth.
- Keep changes auditable with explicit file-level evidence.
- Prefer clean structure over quick ad-hoc files in root.
- Preserve historical artifacts in `Archive/` when deprecating.

## 8. Where to Place New Inputs

- New web imports: `docs/imports/gpt_web/` + update `docs/imports/gpt_web/INDEX.md`
- Candidate artifacts (CV variants, notes): `docs/client_assets/`
- Completed assessments: `assessments/completed/`
- Long-form handoffs/audits: `docs/handover/`
