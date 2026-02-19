# 📚 Deep Research Context Baseline (Project Reality Check)

> **Date:** 17 February 2026  
> **Purpose:** Canonical context snapshot for deep research agents (GPT/Gemini/Codex)

---

## 1 · Verified Achievements (Completed)

| Area | Verified Result | Evidence |
|:---|:---|:---|
| Sourcing execution | 7-keyword Portugal matrix completed (MAP-001..MAP-007) | `reports/Portugal_Market_Density_Report_16-02-2026_codex.md` |
| Volume capture | 62 rows in latest MAP cycle | `reports/WINNER_REPORT_TODAY.json` |
| Deduped inventory | 29 unique jobs | `reports/WINNER_REPORT_TODAY.json` |
| Prioritized queue | 2 A-tier + 11 B-tier surfaced | `reports/WINNER_REPORT_TODAY.json` |
| Runtime sync | Brain reader/writer/scoring wiring aligned to canonical files | `brain/HANDOVER_BACKUP_2026-02-16.md` |

---

## 2 · Current Data Assets (Available)

| Asset | Path | Main Use |
|:---|:---|:---|
| Brain policy files | `brain/AGENCY.md`, `brain/CLIENT_BRIEF.md`, `brain/CASE_LOG.md`, `brain/STYLE_GUIDE.md`, `brain/AGENTS.md`, `brain/ENFORCEMENT.md` | Agency operating rules |
| Machine scoring rules | `brain/knowledge_base.json` | Runtime scoring + disqualifiers |
| Raw daily CSVs | `data/job_results_2026-02-14.csv`, `data/job_results_2026-02-15.csv`, `data/job_results_2026-02-16.csv` | Source run data |
| Clean MAP raw JSON | `reports/codex_map7_latest_cycle_raw.json` | Full row-level MAP evidence, incl. descriptions |
| Clean deduped JSON | `reports/codex_map7_latest_cycle_unique_best.json` | One-best row per job ID, includes descriptions |
| Winner outputs | `reports/WINNER_REPORT_TODAY.md`, `reports/WINNER_REPORT_TODAY.json` | Client-facing priority queue |
| Historical strategy docs | `reports/Implementation_Results_Report_16-02-2026.md`, `reports/CLIENT_STATUS_APPOINTMENT_BRIEF_2026-02-16.md` | Historical decisions |
| Manual research docs | `ChatGpt Docs/LinkedIn_L1_IT_Organic_Research_Plan_16-02-2026.docx`, `ChatGpt Docs/LinkedIn_L1_IT_Support_Rescue_Run_Report_16-02-2026.docx` | Early-phase assumptions and rescue findings |
| Legacy knowledge snapshot | `ChatGpt Docs/knowledge_base_v1_16-02-2026.json` | Baseline profile snapshot |

---

## 3 · Confirmed Weak Spots (Must Be Solved)

| Gap | Why It Matters | Evidence |
|:---|:---|:---|
| No mandatory A-tier fit dossier | Client receives links without proof-level requirement matching | Existing winner report format |
| Insufficient readiness verification | No formal skill-test-to-job mapping gate before apply guidance | `brain/CASE_LOG.md` (no readiness gate flow) |
| Experience parsing blind spot | Runtime regex catches English `years`, not common PT patterns (`3+ de experiência`, `até 5 anos`) | `src/scoring.js` |
| Description loss in `WINNER_REPORT_TODAY.json` | Dossier-quality evidence not carried forward to winner artifact | `src/winner_report.js` output fields |
| Lifecycle incomplete | Current workflow is strong in sourcing, weak in post-sourcing execution coaching | Current docs and outputs |

---

## 4 · A-Tier Roles Under Review (Current Cycle)

| Job ID | Company | Role | Tier | Score | Source |
|:---:|:---|:---|:---:|---:|:---|
| 4372570740 | CodeWin | Service Desk Specialist | A | 18 | `reports/codex_map7_latest_cycle_unique_best.json` |
| 4373810342 | Real Hotels Group | Service Desk | A | 18 | `reports/codex_map7_latest_cycle_unique_best.json` |

---

## 5 · Non-Negotiable Direction

- Northstar must operate as an **end-to-end job sourcing agency**, not a link scraper.
- Every A-tier role must pass a **Fit Validation Protocol** before "apply now" recommendations.
- Client support must include:
  - Requirement match explanation
  - Skills-readiness proof and gap plan
  - Application message + CV tailoring guidance
  - Follow-up and interview support workflow

---

<sub>Northstar Job Sourcing Desk · Deep Research Baseline · 2026-02-17</sub>
