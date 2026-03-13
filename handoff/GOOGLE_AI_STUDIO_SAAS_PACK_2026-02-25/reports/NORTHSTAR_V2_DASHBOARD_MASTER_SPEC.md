# NorthStar V2 Dashboard Master Spec (Canonical)
Date: 2026-02-25
Status: Single source of truth for dashboard functionality
Audience: Product, Design, Frontend, Backend

## 0) Canonical Rule
Use this file as the only functional reference for dashboard implementation.
All other dashboard planning/spec files are secondary and should point here.

---

## 1) Product Intent
Build a premium authenticated client dashboard for NorthStar Agency that is:
- Brutally honest about user readiness and blockers
- Transparent about agency execution
- Action-oriented with clear next steps
- Designed as a premium enterprise command center

Primary client profile for V2 baseline: Jose/José (returning to IT after multi-year gap).

---

## 2) Scope (Post-Login)
Applies to authenticated workspace routes:
- `/app` (current)
- `/dashboard` (target alias)

Out of scope for this document:
- Public marketing pages
- Non-dashboard CMS content

---

## 3) Information Architecture
Top navigation (required):
- Dashboard
- Case Log
- Skill Matrix
- Applications
- Interview Prep
- Mark AI

Dashboard sections (required order):
1. Profile + KPI hero
2. Mission Control
3. Skill Recovery Lab
4. Case Command (pipeline)
5. Strategic Journey Roadmap
6. Agency Activity + Recommendations
7. Sticky Next 7 Days Plan (persistent)

---

## 4) Functional Modules

## 4.1 Mission Control
Purpose: immediate state awareness.

Must include:
- Readiness Score (0-100)
- Job Return Probability (%)
- Risk Level
- Estimated Time to Offer (days)
- Blockers heatmap (ranked by impact)
- Momentum trend (7d/30d/90d)

Interactions:
- KPI click -> “Why this score” decomposition
- Blocker hover/click -> root cause + fix action

## 4.2 Skill Recovery Lab
Purpose: close recency/competency gaps.

Must include:
- Skill matrix: current, target, last-used, confidence
- Decay vs recovery chart
- 30/60/90 day roadmap
- Evidence tracker (labs/certs/mock interviews/projects)

Interactions:
- Skill row click -> required evidence drawer
- Milestone completion -> projected readiness delta

## 4.3 Case Command (Applications)
Purpose: operational execution.

Must include:
- Kanban stages: Sourced -> Verified -> Applied -> Interview -> Offer
- Verification status on each opportunity
- Joint Action Board (Agency tasks vs Client tasks)
- Conversion metrics (app->reply->interview->offer)

Interactions:
- Drag/drop cards (with stage rules)
- Card click -> evidence table + verification notes
- Stage progression block if verification gate not passed

Verification enum (locked):
- `VERIFIED_LEGIT`
- `VERIFIED_RISK`
- `UNKNOWN_INSUFFICIENT_EVIDENCE`

## 4.4 Strategic Journey Roadmap
Purpose: phase clarity and motivation.

Must include:
- Phase path: Intake -> Sourcing -> Verification -> Application -> Interview -> Offer
- Current phase + exit criteria
- Phase velocity indicators

Interactions:
- Phase click -> criteria, blockers, evidence, next actions
- Scenario switch: optimistic / realistic / delayed

## 4.5 Dual Lens Mode
Purpose: different accountability framing for same case.

Modes:
- Client View: tactical next actions + coaching
- Executive View: conversion economics + cycle performance

Interactions:
- Global mode toggle with smooth stateful morph
- No data inconsistency between modes (same dataset, different framing)

---

## 5) Jose Baseline Case Logic (Brutal Honesty)
Default profile assumptions for V2:
- Target role family: IT Support / Helpdesk / Service Desk
- Real-world constraint: years away from direct IT execution
- Baseline readiness target model: 46 -> 58 (30d) -> 68 (60d) -> 75 (90d)

Mandatory honesty cards:
- What helps now
- What hurts now
- If no action in 30 days
- Fastest path to first interview

Truth constraints:
- Honor `brain/CANDIDATE_PROFILE.md` labels: VERIFIED / CV-CLAIMED / FABRICATED / UNKNOWN
- Never treat fabricated timeline items as real evidence

---

## 6) Data Contract (Frontend Payload)
Required payload groups:
- `profile`: id, display_name, legal_name, target_roles, location, urgency, summary
- `kpis`: readiness_score, return_probability, risk_level, eta_offer_days
- `skill_matrix[]`: skill, current_level, target_level, last_used_at, confidence, evidence_count
- `blockers[]`: id, severity, impact_score, description, fix_recommendation
- `pipeline_cards[]`: job_id, company, role, stage, verification_status, fit_score, owner
- `actions[]`: id, actor(agency|client), task, due_at, sla_state, status
- `timeline[]`: phase, entered_at, progress, blockers, exit_criteria
- `recommendations[]`: title, impact, effort, eta_days, owner

Normalization rules:
- Name normalization for `Jose` / `José` / `Joseph` display handling
- ISO timestamps
- Deterministic IDs per entity for stable UI updates

---

## 7) Source-of-Truth Data Files
Priority order:
1. `brain/CANDIDATE_PROFILE.md`
2. `brain/CLIENT_BRIEF.md`
3. `brain/SKILLS_EVIDENCE_LEDGER.json`
4. `brain/CASE_LOG.md`
5. `brain/knowledge_base.json`

Note:
- Current data is sufficient for profile/readiness/blocker/timeline/task UX.
- Historical outcome analytics (interview->offer trends) remain sparse.

---

## 8) UX, Motion, and Design Lock
Brand lock:
- Base `#070B14`
- Surface `#0F1728`
- Accents `#5F6AD9`, `#3FC8B4`
- Text `#E8EEF8`, `#9AABC3`

Hard bans:
- No bright azure/candy blue drift
- No generic SaaS template look

Interaction requirements:
- Card hover lift + border sweep + subtle shine
- Scroll reveal (staggered, restrained)
- Sticky Next 7 Days panel
- Keyboard access for primary actions
- Zero dead buttons in integrated builds

Motion guardrails:
- 160-320ms micro-interactions
- Clarity over spectacle

---

## 9) Stitch-to-Implementation Rules
Stitch exports are component references, not production-complete code.

Best baseline files by module:
- Mission Control: `webapp/Stitch Designs/northstar_v2_stitch_dashboard_concepts/northstar_mission_control_dashboard_2/code.html`
- Skill Recovery: `webapp/Stitch Designs/northstar_v2_stitch_dashboard_concepts/northstar_skill_recovery_lab_2/code.html`
- Case Command: `webapp/Stitch Designs/northstar_v2_stitch_dashboard_concepts/northstar_case_command_operations_2/code.html`
- Roadmap: `webapp/Stitch Designs/northstar_v2_stitch_dashboard_concepts/northstar_strategic_journey_roadmap_2/code.html`
- Dual Lens: `webapp/Stitch Designs/northstar_v2_stitch_dashboard_concepts/northstar_executive_client_dual_view_1/code.html`

Must be implemented during merge:
- Real routing/actions replacing placeholder links
- Stateful mode toggle
- Shared score drawer engine
- Verification gate logic
- Unified payload binding

---

## 10) Acceptance Criteria (Ship Gate)
Dashboard passes only if:
1. All 5 modules exist and are navigable.
2. KPI explainability is implemented.
3. Verification gate blocks invalid progression.
4. Agency/client task split is visible and actionable.
5. Jose case shows both strengths and blockers.
6. Sticky Next 7 Days panel works.
7. Desktop/tablet/mobile responsive behavior passes QA.
8. No placeholder-only primary CTAs in integrated build.

---

## 11) Build Phases
Phase 1: UX shell + module composition
Phase 2: Data contract wiring
Phase 3: Interaction engine (drawers, kanban, mode toggle)
Phase 4: Real client data hydration
Phase 5: QA + screenshot proof + performance/accessibility pass

---

## 12) Developer Handoff Notes
Current canonical implementation baseline files:
- `webapp/public/app.html`
- `webapp/public/dashboard.html`
- `webapp/public/js/dashboard.js`
- `webapp/server.js`

This master spec supersedes fragmented dashboard planning docs.
