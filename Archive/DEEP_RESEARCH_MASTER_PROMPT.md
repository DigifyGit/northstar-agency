# 🧠 Deep Research Master Prompt Pack (Agency Transformation)

> **Use case:** Convert this project from "LinkedIn scraper + ranking" into a full operational AI job sourcing agency.
> **Audience:** GPT / Gemini / Codex agents performing deep research and architecture design.

---

## 1 · How To Use This Pack

1. Read `brain/DEEP_RESEARCH_CONTEXT_BASELINE_2026-02-17.md`.
2. Attach the key project files listed in Section 3 of this document.
3. Run Prompt A (Master Transformation Research).
4. Run Prompt B (A-tier Validation & Readiness Framework).
5. Run Prompt C (Client Success Lifecycle & SOP).
6. Merge outputs into one implementation roadmap with milestones.

---

## 2 · Hard Constraints For Research Agents

- Do not give generic career advice.
- Use the provided project evidence as the primary ground truth.
- Treat this as a real agency operation with accountability for hiring outcomes.
- Flag uncertainties explicitly (do not invent client skills that are not verified).
- Every recommendation must map to an implementable artifact (file, template, checklist, script, schema, or workflow).

---

## 3 · Mandatory Input Files

- `brain/DEEP_RESEARCH_CONTEXT_BASELINE_2026-02-17.md`
- `brain/CLIENT_BRIEF.md`
- `brain/CASE_LOG.md`
- `brain/knowledge_base.json`
- `brain/SCRAPER_SPEC.md`
- `reports/WINNER_REPORT_TODAY.json`
- `reports/codex_map7_latest_cycle_unique_best.json`
- `reports/CLIENT_STATUS_APPOINTMENT_BRIEF_2026-02-16.md`
- `reports/Implementation_Results_Report_16-02-2026.md`

Optional supporting context:
- `data/job_results_2026-02-16.csv`
- `brain/AGENTS.md`
- `brain/STYLE_GUIDE.md`

---

## 4 · Prompt A: Master Transformation Research

```text
You are a principal operator designing a full AI-powered job sourcing agency for one client (Maestro), starting from an existing scraping/scoring system.

Objective:
Design a complete operating model from sourcing to hiring outcome, with governance, QA, and client support.

Context:
- The current system can scrape, score, and rank jobs.
- It currently has 2 A-tier roles and 11 B-tier backups.
- Current gap: no mandatory fit-proof dossier and no full post-sourcing lifecycle support.
- Files attached include real project artifacts and data.

Your tasks:
1) Produce a full agency service blueprint with phases:
   intake -> profiling -> sourcing -> fit validation -> readiness testing -> application support -> interview support -> offer decision -> post-offer onboarding support.
2) Define mandatory deliverables per phase (templates, reports, checklists, scripts, data tables).
3) Define a strict quality-gate protocol before any "apply now" recommendation.
4) Define KPIs for each phase (activity KPIs + conversion KPIs + quality KPIs).
5) Define AI-agent orchestration rules (roles, handoff triggers, escalation rules).
6) Define data architecture changes required in this repository to support the model.
7) Provide a 30/60/90-day implementation roadmap with priorities and dependencies.

Output format:
- Section 1: Executive summary (max 10 bullets)
- Section 2: Agency lifecycle framework (table)
- Section 3: Mandatory artifacts and file map
- Section 4: Quality gates and acceptance criteria
- Section 5: KPI model
- Section 6: Technical architecture delta (what to add/change in code and data)
- Section 7: Implementation roadmap (30/60/90)
- Section 8: Top 10 risks + mitigations

Important:
- Be concrete and implementation-ready.
- Use this exact project context, not abstract examples.
```

---

## 5 · Prompt B: A-Tier Validation & Readiness Framework

```text
You are a hiring-fit auditor. Build a protocol that proves whether an A-tier job is truly tailored for the client before recommending application.

Context:
- Current winner reports show score and links but not full requirement-to-client validation.
- Two current A-tier roles are in `reports/codex_map7_latest_cycle_unique_best.json`.
- Client profile is in `brain/CLIENT_BRIEF.md` and `brain/knowledge_base.json`.

Required output:
1) A structured "A-tier Fit Validation Dossier" schema.
2) Requirement-to-client evidence matrix design (fields, status logic, confidence scoring).
3) Readiness gate logic (GO / CONDITIONAL GO / HOLD) with strict thresholds.
4) Skill-proof methods:
   - CV evidence extraction
   - Portfolio/project mapping
   - questionnaire/test evidence mapping
   - micro-assessments to close gaps fast
5) Explain how to handle uncertainty without hallucination.
6) Provide a short example using the two current A-tier jobs.

Output must include:
- A scoring formula for fit confidence.
- A risk formula (seniority mismatch, language mismatch, tool mismatch, logistics mismatch).
- A mandatory "client confirmation checklist" before submission.
```

---

## 6 · Prompt C: Client Success SOP (From Apply to Hire)

```text
Design a full SOP for an AI job sourcing agency to support a client from first application to job offer acceptance.

Context:
- Current system is sourcing-strong but post-sourcing weak.
- We need practical, repeatable workflows and templates.

Deliverables required:
1) Application stage SOP (what to send, how to tailor CV, what message to write).
2) Follow-up SOP (timing, channels, templates, escalation).
3) Interview stage SOP (prep packs, mock Q&A scripts, debrief loop).
4) Offer stage SOP (offer comparison, negotiation support, decision rubric).
5) Rejection recovery SOP (learning loop + pipeline adjustment).
6) Client dashboard design (status states and next action at all times).
7) SLA model for agency-client responsiveness.

Output format:
- Workflow diagrams in text
- Step-by-step playbooks
- Template inventory
- KPI and reporting cadence
```

---

## 7 · Required Final Synthesis (After Running A/B/C)

Combine outputs into one implementation brief with:

| Section | Requirement |
|:---|:---|
| **Current State** | What exists now in this repo |
| **Target State** | What "full agency" looks like operationally |
| **Gap Map** | Exact gaps across process/data/automation/client support |
| **Priority Build List** | Ranked backlog with owner and effort estimate |
| **First 2 Weeks Plan** | Concrete actions to start immediately |

---

## 8 · Success Criteria For Research Quality

- Recommendations are directly executable in this repository.
- No recommendation depends on hidden assumptions about client skills.
- A-tier fit validation is evidence-first and auditable.
- The plan includes post-application support (interview and offer stages).
- The output can be used by agents without additional interpretation.

---

<sub>Northstar Job Sourcing Desk · Deep Research Prompt Pack · 2026-02-17</sub>
