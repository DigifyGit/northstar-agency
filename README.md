# NorthStar Agency

Evidence-first reverse recruiting system for L1 IT / Helpdesk job sourcing and execution.

## Identity

NorthStar Agency is the transformed successor of the legacy scraper project "LinkedIn IT Job Finder".

- Legacy naming is preserved only in historical artifacts inside `Archive/`.
- Active operational identity is `NorthStar Agency`.

## What It Does

- Scrapes targeted LinkedIn job searches with profile isolation.
- Scores and tiers jobs (`S/A/B/C/D`) against `brain/knowledge_base.json`.
- Generates winner reports and A-tier fit validation dossiers.
- Tracks lifecycle state transitions from sourcing to accepted/rejected.
- Enforces an evidence-first gate (GO / CONDITIONAL GO / HOLD).

## Core Commands

```bash
npm install
npm run scrape
npm run report
npm run dossier
npm run track
npm run daily
npm run ci:smoke
npm run nightly:update
```

## Canonical Governance

- `brain/ENFORCEMENT.md`
- `brain/AGENTS.md`
- `brain/CLIENT_IDENTITY.json`
- `brain/CLIENT_SUCCESS_SOP.md`
- `brain/SKILLS_EVIDENCE_LEDGER.json`
- `brain/COMPLIANCE.md`

## Multi-Client Project Isolation

Use one project folder per client and set identity in `brain/CLIENT_IDENTITY.json`.
This keeps each client profile, case log, and scoring context isolated by project.

## Key Documentation

- `docs/handover/NorthStar_Agency_Project_Introduction.md`
- `docs/handover/FRESH_SESSION_WELCOME.md`
- `docs/handover/FRESH_SESSION_KICKOFF_PROMPT.md`
- `docs/snippets/NORTHSTAR_LUXURY_AGENCY_SNIPPET.md`
- `docs/plans/MASTER_TRANSFORMATION_PLAN.md`
- `research/strategic_foundation/`

## Safety Constraint

Do not modify the backup source project:
`/Users/Maestro/Developer/LinkedIn IT Job Finder`
