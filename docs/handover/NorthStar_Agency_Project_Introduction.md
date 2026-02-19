---
title: "NorthStar Agency - Project Introduction and Migration Guide"
subtitle: "Comprehensive context bridge across ChatGPT Web, local IDEs, and multi-agent execution"
date: "2026-02-18"
---

# 1. Purpose

This document is the emergency handoff and migration blueprint for NorthStar Agency.

It is written so the project can be moved between local IDE execution (Codex CLI / Cursor), ChatGPT Web, or other software environments without losing architecture, intent, compliance boundaries, or prior research work.

Primary objectives:

- Describe what NorthStar Agency is and why it exists.
- Document architecture, runtime flow, governance files, and decision gates.
- Bridge historical artifacts created in ChatGPT Web.
- Prevent duplicate work by mapping where imported artifacts should land.
- Provide a migration pack and recovery checklist.

Project root (current): `/Users/Maestro/Developer/NorthStar Agency`  
Backup project (do not modify): `/Users/Maestro/Developer/LinkedIn IT Job Finder`

# 2. Program Identity and Scope

NorthStar Agency is an evidence-first reverse recruiting operations system for one candidate profile (L1 IT / Helpdesk trajectory), not just a scraper.

Lifecycle model:

`Intake -> Profiling -> Sourcing -> Fit Validation -> Application Enablement -> Application Execution -> Follow-up -> Interview Readiness -> Offer Navigation -> Outcome Learning`

Key design principles:

- Client-in-the-loop: AI prepares, client approves and executes.
- Evidence-first: claims require confidence + source.
- Explainable fit decisions: every GO/HOLD decision is traceable.
- Compliance-first: platform, legal, and ethical boundaries are mandatory.

# 3. Strategic Foundation Documents (Critical)

These are the intellectual blueprint artifacts that informed the transformation plan and SOP.

- `research/strategic_foundation/Evidence-Based Benchmark Research for Building a Full AI Job Sourcing Agency.md`
- `research/strategic_foundation/Technical Re-Engineering of the Northstar Agency - Industrializing AI-Driven End-to-End Job Sourcing.md`
- `research/strategic_foundation/docx/Evidence-Based Benchmark Research for Building a Full AI Job Sourcing Agency.docx`
- `research/strategic_foundation/docx/Technical Re-Engineering of the Northstar Agency - Industrializing AI-Driven End-to-End Job Sourcing.docx`

What they contribute:

- Benchmark research: operational patterns from real agencies, KPI architecture, compliance and template standards.
- Technical re-engineering: systems-level decomposition, auditable pipeline design, evidence ledger mechanics, and fit gating rationale.

Downstream artifacts derived from this foundation:

- `docs/plans/MASTER_TRANSFORMATION_PLAN.md`
- `brain/CLIENT_SUCCESS_SOP.md`
- `brain/SKILLS_EVIDENCE_LEDGER.json`
- `src/fit_dossier.js`

# 4. High-Level Folder Architecture

Top-level layout:

- `brain/`: governance and operating memory.
- `src/`: runtime code modules.
- `config/`: search maps and run configurations.
- `data/`: raw CSV outputs and tracker state store.
- `reports/`: generated winner reports and dossiers.
- `templates/`: external and internal reusable structures.
- `assessments/`: readiness and confidence-upgrade instruments.
- `research/`: benchmark data and strategic research corpus.
- `docs/`: handover and planning documentation.
- `Archive/`: deprecated/baseline artifacts.

# 5. Canonical Governance Files (`brain/`)

Core governance:

- `brain/ENFORCEMENT.md`: mode system, pre-message blocks, operational enforcement.
- `brain/AGENTS.md`: role routing and delegation model.
- `brain/AGENCY.md`: agency charter and identity.
- `brain/CLIENT_BRIEF.md`: client targeting constraints and preferences.
- `brain/STYLE_GUIDE.md`: formatting and report quality standards.
- `brain/CASE_LOG.md`: case-level memory and tracker sync section.

Operational governance additions:

- `brain/CLIENT_SUCCESS_SOP.md`: lifecycle SOP with trigger/inputs/playbook/outputs/gate/owner/templates.
- `brain/SKILLS_EVIDENCE_LEDGER.json`: auditable skill confidence store.
- `brain/COMPLIANCE.md`: policy baseline for platform/legal/ethics controls.
- `brain/KPI_DASHBOARD.md`: pipeline and conversion measurement model.
- `brain/A_TIER_FIT_DOSSIER_TEMPLATE.md`: canonical dossier structure.
- `brain/APPLICATION_PACKET_TEMPLATE.md`: application packet blueprint.
- `brain/INTERVIEW_PREP_TEMPLATE.md`: interview prep blueprint.
- `brain/OFFER_DECISION_TEMPLATE.md`: offer decision rubric.

Technical specification layer:

- `brain/SCRAPER_SPEC.md`: 331-line technical specification for data model, scrape workflow, dedup logic, scoring/tiering rules, and keyword optimization loop.
- `brain/knowledge_base.json`: machine-readable scoring weights and disqualifiers.

Historical handover checkpoints:

- `brain/HANDOVER_BACKUP_2026-02-16.md`
- `brain/HANDOVER_BACKUP_2026-02-16.json`

# 6. Multi-Agent Operating Model

Roles are defined in `brain/AGENTS.md`:

- OPUS: quality, narrative, and client-facing standard owner.
- CODEX: engineering execution, runtime changes, and pipeline maintenance.
- GEMINI: utility support for low-stakes tasks.

Model version note:

- Runtime model versions can change over time (for example GPT 5.2 vs prior tags).
- Treat `brain/AGENTS.md` as role authority and treat model version labels as versioned metadata that may require periodic refresh.

# 7. Compliance and Ethics Model

Policy source: `brain/COMPLIANCE.md`

Coverage:

- Platform compliance constraints (no impersonation, no uncontrolled automation).
- Portuguese legal boundary framing (DL 260/2009 gratuity principle).
- AI ethics controls (explainability, auditability, human accountability).
- Reverse recruiting ethics (`Do` / `Do not` behavior lists).
- Operational quality gates and breach response workflow.

Important status note:

- `brain/COMPLIANCE.md` was expanded in this correction pass from a short summary into a detailed policy document aligned to the transformation specification.

# 8. Runtime Pipeline (End-to-End)

## 8.1 Inputs

- Search maps: `config/*.json`
- Candidate constraints: `brain/CLIENT_BRIEF.md`
- Score rules: `brain/knowledge_base.json`
- Technical behavior spec: `brain/SCRAPER_SPEC.md`

## 8.2 Script Entrypoints

Scripts in `package.json`:

- `npm run scrape` -> `src/index.js`
- `npm run report` -> `src/winner_report.js`
- `npm run dossier` -> `src/fit_dossier.js`
- `npm run track` -> `src/application_tracker.js`
- `npm run daily` -> `daily_routine.js` (root-level script, not inside `src/`)

## 8.3 Core Code Modules

- `src/index.js`: scraping run bootstrap and profile/session handling.
- `src/scraper.js`: page-level scrape implementation and CSV persistence.
- `src/scoring.js`: job scoring and tier assignment.
- `src/winner_report.js`: winner extraction and report generation.
- `src/fit_dossier.js`: A-tier fit dossier generation and gate decision.
- `src/application_tracker.js`: lifecycle state machine + CASE_LOG synchronization.
- `src/analysis.js`: analytics/report generation used by `daily_routine.js`.

Utility bridge modules:

- `src/utils/brainReader.js`: parses `brain/CLIENT_BRIEF.md` into machine-usable context.
- `src/utils/brainWriter.js`: writes metric/log updates into `brain/CASE_LOG.md`.

## 8.4 Data and Output Flow

- Scrape CSV output: `data/job_results_YYYY-MM-DD.csv`
- Winner report outputs:
  - `reports/WINNER_REPORT_TODAY.json`
  - `reports/WINNER_REPORT_TODAY.md`
- Dossier outputs:
  - `reports/A_TIER_FIT_DOSSIER_<Company>_<Date>.md`
- Tracker store:
  - `data/application_tracker.json`
- CASE_LOG sync markers:
  - `<!-- NS_TRACKER_START -->`
  - `<!-- NS_TRACKER_END -->`

## 8.5 Fit Scoring Gate

Formula implemented by dossier logic:

`fit_score = (confirmed * 3 + probable * 1) / (total_requirements * 3) * 100`

Thresholds:

- `GO`: >= 80%
- `CONDITIONAL GO`: 50% to 79%
- `HOLD`: < 50%

Operational note:

- HOLD is expected when evidence confidence is immature.
- Upgrading confidence via assessments is the intended mechanism to flip HOLD to GO.

# 9. Assessments and Evidence Upgrade

Assessment set:

- `assessments/L1_TECHNICAL_ASSESSMENT.md`
- `assessments/L1_BEHAVIORAL_ASSESSMENT.md`
- `assessments/LANGUAGE_READINESS_CHECK.md`
- completed evidence folder: `assessments/completed/`

Update loop:

1. Run assessment.
2. Save result into `assessments/completed/`.
3. Update `brain/SKILLS_EVIDENCE_LEDGER.json` confidence + date + score.
4. Re-run dossier generation.

# 10. Templates Layer Status

External reference templates:

- `templates/external/candidate_profile_structure.md`
- `templates/external/cv_template_structure.md`
- `templates/external/follow_up_email_template.md`
- `templates/external/interview_scorecard_structure.md`

Internal operational templates:

- `templates/internal/cv_tailoring_template.md`
- `templates/internal/application_message_template.md`
- `templates/internal/follow_up_sequence.md`
- `templates/internal/interview_prep_pack.md`
- `templates/internal/offer_comparison_rubric.md`

Status note:

- Internal templates are concise operational starters.
- Before high-volume client usage, expand each template with richer examples and edge-case variants.

# 11. Research and Benchmark Layer

Benchmark database:

- `research/agency_benchmarks/agency_benchmark_db.json`
- provenance folder: `research/agency_benchmarks/sources/`

Purpose:

- Track real provider patterns and evidence source links.
- Ground template and SOP design in external benchmarks.

# 12. ChatGPT Web Bridge and Import Map

You started this project in ChatGPT Web. Existing imported web-origin artifacts:

- `Archive/ChatGpt Docs/LinkedIn_L1_IT_Organic_Research_Plan_16-02-2026.docx`
- `Archive/ChatGpt Docs/LinkedIn_L1_IT_Support_Rescue_Run_Report_16-02-2026.docx`
- `Archive/ChatGpt Docs/SCRAPER_SPEC_LinkedIn_L1_Keyword_Intel_v1_16-02-2026.md`
- `Archive/ChatGpt Docs/knowledge_base_v1_16-02-2026.json`

Likely missing imports from web work:

- Completed skill test outputs not yet saved into `assessments/completed/`.
- Prior CV/interview notes still only in web threads.

Import map to avoid redoing work:

- Skill tests -> `assessments/completed/` + ledger update in `brain/SKILLS_EVIDENCE_LEDGER.json`
- CV drafts -> `docs/client_assets/` (or `Archive/` if historical)
- Interview notes -> `assessments/completed/` or `docs/client_assets/`
- Web research exports -> `docs/imports/gpt_web/` plus index file

# 13. Archive Inventory (Historical Context)

Archive root:

- `Archive/FULL_AGENCY_TRANSFORMATION_PLAN.md`
- `Archive/DEEP_RESEARCH_MASTER_PROMPT.md`
- `Archive/DEEP_RESEARCH_CONTEXT_BASELINE_2026-02-17.md`
- `Archive/debug_failure.html`
- `Archive/debug_text.txt`

Archive web-docs subfolder:

- `Archive/ChatGpt Docs/LinkedIn_L1_IT_Organic_Research_Plan_16-02-2026.docx`
- `Archive/ChatGpt Docs/LinkedIn_L1_IT_Support_Rescue_Run_Report_16-02-2026.docx`
- `Archive/ChatGpt Docs/SCRAPER_SPEC_LinkedIn_L1_Keyword_Intel_v1_16-02-2026.md`
- `Archive/ChatGpt Docs/knowledge_base_v1_16-02-2026.json`

# 14. Identity and Naming Corrections

Legacy identity conflicts were corrected in this pass:

- `README.md` now reflects NorthStar Agency (not legacy scraper identity).
- `package.json` name/description rebranded to `northstar-agency`.
- `package-lock.json` root package name aligned.

Migration caution:

- Some historical files and archive artifacts still use legacy naming by design for provenance.

# 15. Environment and Portability

Current baseline at time of writing:

- Node: currently observed as v25.5.0 on this workstation.
- npm: currently observed as 11.8.0 on this workstation.

Portability controls:

- `.nvmrc` exists at project root for local alignment.
- `package.json` contains an `engines` declaration.
- Validate actual versions at migration time with `node -v` and `npm -v`.

Path portability warning:

- `brain/ENFORCEMENT.md` contains absolute project-root references and must be updated when relocating the project.

# 16. Migration and Disaster Recovery Checklist

Minimum context pack:

- `brain/ENFORCEMENT.md`
- `brain/AGENTS.md`
- `brain/CLIENT_BRIEF.md`
- `brain/CLIENT_SUCCESS_SOP.md`
- `brain/SCRAPER_SPEC.md`
- `brain/SKILLS_EVIDENCE_LEDGER.json`
- `brain/COMPLIANCE.md`
- `brain/CASE_LOG.md`
- `brain/knowledge_base.json`
- `src/index.js`
- `src/scraper.js`
- `src/scoring.js`
- `src/winner_report.js`
- `src/fit_dossier.js`
- `src/application_tracker.js`
- `src/analysis.js`
- `src/utils/brainReader.js`
- `src/utils/brainWriter.js`
- `docs/plans/MASTER_TRANSFORMATION_PLAN.md`
- `docs/handover/NorthStar_Agency_Project_Introduction.md`

Recommended recurring backups:

- `brain/`
- `config/`
- `templates/`
- `assessments/`
- `research/`
- `docs/`
- `data/`
- `reports/`

# 17. Current Operational Snapshot (2026-02-18)

- Winner report run path is operational.
- Dossier generation path is operational.
- Tracker path is operational and syncs CASE_LOG.
- Main limiter remains evidence confidence maturity in the skills ledger.

# 18. Appendix - Key File Index

Program plans and handoff:

- `docs/plans/MASTER_TRANSFORMATION_PLAN.md`
- `docs/handover/NorthStar_Agency_Project_Introduction.md`
- `docs/handover/NorthStar_Agency_Project_Introduction.docx`

Governance:

- `brain/ENFORCEMENT.md`
- `brain/AGENTS.md`
- `brain/CLIENT_SUCCESS_SOP.md`
- `brain/SCRAPER_SPEC.md`
- `brain/COMPLIANCE.md`
- `brain/CASE_LOG.md`
- `brain/SKILLS_EVIDENCE_LEDGER.json`

Core runtime:

- `src/index.js`
- `src/scraper.js`
- `src/scoring.js`
- `src/winner_report.js`
- `src/fit_dossier.js`
- `src/application_tracker.js`
- `src/analysis.js`
- `src/utils/brainReader.js`
- `src/utils/brainWriter.js`

Strategic research:

- `research/strategic_foundation/Evidence-Based Benchmark Research for Building a Full AI Job Sourcing Agency.md`
- `research/strategic_foundation/Technical Re-Engineering of the Northstar Agency - Industrializing AI-Driven End-to-End Job Sourcing.md`
