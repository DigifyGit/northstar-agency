# Client Success SOP - From Intake to Hire

> Authority: MANDATORY - defines the full agency service lifecycle
> Last updated: 18 February 2026

---

## 1 · Lifecycle Overview

| Phase | Name | Trigger | Mandatory Output | Owner |
|:---:|:---|:---|:---|:---:|
| 0 | Intake | Client opens case | Intake profile + exclusions + target map | OPUS |
| 1 | Profiling & Capability Proof | After intake | Skills Evidence Ledger + confidence score | ALL |
| 2 | Sourcing | Daily | Ranked queue (S/A/B/C/D) | CODEX |
| 3 | Fit Validation | A-tier surfaced | A-Tier Fit Validation Dossier | OPUS |
| 4 | Application Enablement | Dossier = GO | Role-tailored CV bullets + application message | OPUS |
| 5 | Application Execution | Client approves | Application submitted + logged in CASE_LOG | CLIENT |
| 6 | Follow-up Management | 48h after apply | Follow-up message sent | CLIENT + OPUS |
| 7 | Interview Readiness | Interview scheduled | Interview prep pack + mock Q&A | OPUS |
| 8 | Offer Navigation | Offer received | Offer comparison rubric + negotiation strategy | OPUS |
| 9 | Outcome Learning | Case closed or rejected | Conversion review + model parameter updates | ALL |

---

## 2 · Phase Details

### Phase 0 - Intake
- Trigger condition: new client opens or reopens the case.
- Required inputs: target roles, location constraints, language constraints, urgency level.
- Step-by-step playbook:
1. Confirm role family and exclusions with client.
2. Create or refresh `brain/CLIENT_BRIEF.md`.
3. Define first sourcing keyword map and geography scope.
- Mandatory outputs / deliverables: intake profile, exclusions list, target keyword map.
- Quality gate: no unresolved hard constraints remain.
- Agent owner: OPUS.
- Templates to use: `brain/CLIENT_BRIEF.md`.

### Phase 1 - Profiling & Capability Proof
- Trigger condition: intake profile approved.
- Required inputs: CV, questionnaire responses, self-assessment, project history.
- Step-by-step playbook:
1. Populate `brain/SKILLS_EVIDENCE_LEDGER.json`.
2. Assign confidence labels (`confirmed`, `probable`, `unknown`, `gap`).
3. Schedule assessments for unresolved high-value skills.
- Mandatory outputs / deliverables: evidence ledger and baseline readiness view.
- Quality gate: every high-value skill has confidence status + evidence source.
- Agent owner: ALL.
- Templates to use: `brain/SKILLS_EVIDENCE_LEDGER.json`, `assessments/L1_TECHNICAL_ASSESSMENT.md`, `assessments/L1_BEHAVIORAL_ASSESSMENT.md`, `assessments/LANGUAGE_READINESS_CHECK.md`.

### Phase 2 - Sourcing
- Trigger condition: daily execution window.
- Required inputs: scraper spec, knowledge base, client constraints.
- Step-by-step playbook:
1. Run scrape and scoring cycle.
2. Generate winner and backup queue.
3. Publish daily report artifacts.
- Mandatory outputs / deliverables: ranked queue with S/A/B/C/D tiers.
- Quality gate: data freshness <= 24h and links validated.
- Agent owner: CODEX.
- Templates to use: `brain/SCRAPER_SPEC.md`, `brain/knowledge_base.json`, `brain/STYLE_GUIDE.md`.

### Phase 3 - Fit Validation
- Trigger condition: at least one A-tier role surfaced.
- Required inputs: winner report, full job description, skills ledger.
- Step-by-step playbook:
1. Extract explicit requirements from job text.
2. Map each requirement to client evidence and confidence.
3. Compute fit score and risk penalties.
4. Issue gate decision (`GO`, `CONDITIONAL GO`, `HOLD`).
- Mandatory outputs / deliverables: one fit dossier per A-tier role.
- Quality gate: complete requirement-to-evidence matrix with provenance.
- Agent owner: OPUS.
- Templates to use: `brain/A_TIER_FIT_DOSSIER_TEMPLATE.md`, `src/fit_dossier.js`.

### Phase 4 - Application Enablement
- Trigger condition: dossier decision is `GO` or approved `CONDITIONAL GO`.
- Required inputs: dossier findings, listing requirements, latest CV baseline.
- Step-by-step playbook:
1. Extract top 3 listing requirements.
2. Map requirements to evidence.
3. Draft 3 tailored CV bullets.
4. Draft application message.
- Mandatory outputs / deliverables: role-specific application packet.
- Quality gate: ATS-safe packet with evidence-backed claims only.
- Agent owner: OPUS.
- Templates to use: `brain/APPLICATION_PACKET_TEMPLATE.md`, `templates/internal/cv_tailoring_template.md`, `templates/internal/application_message_template.md`.

### Phase 5 - Application Execution
- Trigger condition: client approves application packet.
- Required inputs: final CV, final message, target job link.
- Step-by-step playbook:
1. Client submits application.
2. Update lifecycle state to `applied`.
3. Record submission timestamp and notes.
- Mandatory outputs / deliverables: logged submission and next follow-up date.
- Quality gate: job id, status, and timestamps stored.
- Agent owner: CLIENT.
- Templates to use: `src/application_tracker.js`, `brain/CASE_LOG.md`.

### Phase 6 - Follow-up Management
- Trigger condition: 48h after application with no response.
- Required inputs: applied records and due follow-up list.
- Step-by-step playbook:
1. Send day-1 thank-you when direct contact exists.
2. Send day 7-10 status follow-up.
3. Send day-21 final follow-up or close loop.
- Mandatory outputs / deliverables: follow-up events logged.
- Quality gate: all eligible applications receive follow-up.
- Agent owner: CLIENT + OPUS.
- Templates to use: `templates/internal/follow_up_sequence.md`.

### Phase 7 - Interview Readiness
- Trigger condition: interview invitation received.
- Required inputs: interview date, format, role stack, prior dossier.
- Step-by-step playbook:
1. Build 5-question technical prep pack.
2. Build behavioral STAR answer frames.
3. Deliver 24h readiness checklist.
- Mandatory outputs / deliverables: interview prep packet.
- Quality gate: prep delivered <= 24h before interview.
- Agent owner: OPUS.
- Templates to use: `brain/INTERVIEW_PREP_TEMPLATE.md`, `templates/internal/interview_prep_pack.md`.

### Phase 8 - Offer Navigation
- Trigger condition: offer received.
- Required inputs: offer terms, alternatives, constraints.
- Step-by-step playbook:
1. Compare salary/benefits/growth/logistics.
2. Apply weighted decision rubric.
3. Produce negotiation or acceptance strategy.
- Mandatory outputs / deliverables: offer decision brief.
- Quality gate: weighted rationale documented with recommendation.
- Agent owner: OPUS.
- Templates to use: `brain/OFFER_DECISION_TEMPLATE.md`, `templates/internal/offer_comparison_rubric.md`.

### Phase 9 - Outcome Learning
- Trigger condition: accepted, rejected, or case paused/closed.
- Required inputs: lifecycle history, KPI performance, rejection reasons.
- Step-by-step playbook:
1. Run conversion and quality review.
2. Record false positives and misses.
3. Update scoring or targeting parameters.
- Mandatory outputs / deliverables: learning log + optimization actions.
- Quality gate: at least one measurable adjustment logged.
- Agent owner: ALL.
- Templates to use: `brain/KPI_DASHBOARD.md`, `brain/CASE_LOG.md`.

---

## 3 · Application Stage SOP
- What to send: tailored CV + application message.
- How to tailor: extract top 3 requirements from listing -> map to client evidence -> write 3 achievement bullets.
- Message template: `templates/internal/application_message_template.md`.
- ATS optimization rules: chronological format, exact listing keywords, no tables/graphics.

---

## 4 · Follow-up SOP
- Day 0: submit application.
- Day 1: thank-you note (if direct contact available).
- Day 7-10: polite follow-up requesting status.
- Day 21: second follow-up or close.
- Reference: `templates/internal/follow_up_sequence.md`.

---

## 5 · Interview Stage SOP
- Pre-interview: deliver 5-question prep pack customized to employer stack.
- Mock Q&A: provide sample STAR answer frames.
- Post-interview: run debrief loop (strengths + improvements).
- Reference: `templates/internal/interview_prep_pack.md`.

---

## 6 · Offer Stage SOP
- Offer comparison: salary, benefits, growth, commute, culture.
- Negotiation support: market-aware counter framing.
- Decision rubric: weighted scoring of offer factors.
- Reference: `templates/internal/offer_comparison_rubric.md`.

---

## 7 · Rejection Recovery SOP
1. Capture rejection reason (if available).
2. Update `brain/CASE_LOG.md` learning notes.
3. Adjust scoring parameters if false positive detected.
4. Re-prioritize pipeline with next-best options.
5. Send morale-support and next-step communication.

---

## 8 · Status States (for CASE_LOG.md)

| State | Meaning |
|:---|:---|
| `sourcing` | Active job search |
| `fit_review` | A-tier dossier under preparation |
| `ready_to_apply` | Dossier = GO, application packet ready |
| `applied` | Application submitted |
| `follow_up` | Follow-up sequence active |
| `interview_scheduled` | Interview confirmed |
| `interview_complete` | Awaiting result |
| `offer_received` | Offer under evaluation |
| `accepted` | Case successful |
| `rejected` | Rejection learning loop active |
| `on_hold` | Client paused case |

---

## 9 · Reporting Cadence
- Daily: execution metrics (applications submitted, follow-ups due).
- Weekly: conversion metrics (reply rate, interviews).
- Monthly: quality metrics (A-tier false positives, readiness gate pass rate).

---

## 10 · SLA Model

| Metric | Target |
|:---|:---|
| Time from A-tier surfaced to dossier delivered | <= 4 hours |
| Time from GO decision to application packet ready | <= 2 hours |
| Follow-up sent after application | Within 48 hours |
| Interview prep pack delivered | <= 24 hours before interview |

---

<sub>NorthStar Agency · Client Success SOP · 2026-02-18</sub>
