# Stitch Dashboard Functionality Audit
Date: 2026-02-25
Scope: `webapp/Stitch Designs/client dashboard for NorthStar Agency Stich Files`

## Verdict
The folder is useful and directionally aligned with V2, but it is **not fully complete** as a production functional spec by itself.

- Visual concept coverage: **High**
- Functional interaction completeness: **Medium-Low**
- Ready for direct app integration without additional spec/engineering: **No**

## Inventory Summary
- Total concept folders: 39+
- `code.html` files with editable UI structures: 12
- Primary module coverage found:
  - Mission Control variants: present
  - Skill Recovery variants: present
  - Case Command variants: present
  - Strategic Journey Roadmap variants: present
  - Dual View variants: present

## What Is Strong (Confirmed)
1. Core module themes are represented across exports.
2. Navigation language exists in many variants (`Case Log`, `Skill Matrix`, `Mark AI`, etc.).
3. “Next 7 Days” appears in multiple layouts.
4. KPI framing (readiness/probability/risk/time-to-offer) appears in mission-control concepts.
5. Case-command variants show Kanban-style columns and verification visuals.

## Functional Gaps vs V2 Requirements
1. Most exports are static templates with placeholder links (`href="#"`).
2. Drag-and-drop Kanban interaction is not implemented (visual only).
3. KPI explainability (“Why this score” drawer) is only explicit in selected variants (not standardized across all).
4. Verification status schema is inconsistent with required production labels (`VERIFIED_LEGIT`, `VERIFIED_RISK`, `UNKNOWN_INSUFFICIENT_EVIDENCE`).
5. Dual-view mode is mostly visual toggles, not stateful mode behavior.
6. No unified data contract wiring (`profile`, `kpis`, `skill_matrix`, `pipeline_cards`, etc.).
7. No end-to-end route integration with login/session context in these exports.

## Best Candidate Files by Module
- Mission Control: `northstar_mission_control_dashboard_2/code.html` (includes score drawer pattern)
- Skill Recovery: `northstar_skill_recovery_lab_2/code.html`
- Case Command: `northstar_case_command_operations_2/code.html`
- Strategic Journey: `northstar_strategic_journey_roadmap_2/code.html`
- Dual Lens: `northstar_executive_client_dual_view_1/code.html`

## Recommended Consolidation Plan
1. Use one “best” file per module as baseline component source.
2. Normalize statuses and labels to V2 schema.
3. Replace dead links with real routes/actions.
4. Implement shared interaction engine:
   - score-explainability drawer
   - mode toggle state
   - sticky 7-day panel state
   - pipeline move logic + verification gate
5. Bind all modules to single payload contract.

## Naming Fixes (Reference Clarity)
Current folder name has typo + ambiguous meaning:
- `client dashboard for NorthStar Agency Stich Files`

Recommended:
- `northstar_v2_stitch_dashboard_concepts`

Why:
- Includes version (`v2`)
- States source (`stitch`)
- States artifact type (`dashboard_concepts`)
- Fixes typo (`Stich` -> `Stitch`)

## Final Confirmation
- Are these files valuable? **Yes**.
- Do they cover V2 ideas? **Mostly yes**.
- Are they complete for production functionality? **Not yet**.
- Should we proceed using them as component references with V2 functional spec controls? **Yes**.
