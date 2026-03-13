# Google AI Studio SaaS Build File Pack
Date: 2026-02-25
Purpose: Exact file bundle recommendation to build NorthStar full SaaS app without context chaos.

## 0) How to use this
Upload files in this order. Stop after Tier 1 unless AI Studio asks for more detail.

---

## Tier 1 (Required Core - Upload First)
These define the product, dashboard functionality, and visual system.

1. `reports/NORTHSTAR_V2_DASHBOARD_MASTER_SPEC.md`
2. `reports/NORTHSTAR_V2_VISUAL_SYSTEM_AND_STITCH_BUILD_GUIDE.md`
3. `reports/NORTHSTAR_PROJECT_CONTEXT_MAPPING.md`
4. `reports/NORTHSTAR_WEB_APP_PRODUCT_BLUEPRINT.md`

Why: This set gives complete functional + design + product scope with minimal noise.

---

## Tier 2 (Implementation + Existing App Baseline)
Upload this if you want AI Studio to generate real build-ready frontend/backend tasks.

5. `webapp/README.md`
6. `webapp/server.js`
7. `webapp/public/index.html`
8. `webapp/public/login.html`
9. `webapp/public/app.html`
10. `webapp/public/dashboard.html`
11. `webapp/public/js/dashboard.js`
12. `webapp/public/site.css`
13. `webapp/package.json`

Why: Gives exact current app architecture, routes, auth/session model, and UI baseline.

---

## Tier 3 (Client Data / Case Intelligence)
Upload this when AI Studio needs realistic account-side data modeling.

14. `brain/CANDIDATE_PROFILE.md`
15. `brain/CLIENT_BRIEF.md`
16. `brain/CASE_LOG.md`
17. `brain/SKILLS_EVIDENCE_LEDGER.json`
18. `brain/knowledge_base.json`
19. `brain/CLIENT_IDENTITY.json`
20. `reports/CLIENT_SIDE_DATA_INVENTORY_2026-02-25.md`

Why: Enables realistic profile widgets, blockers, skill matrix, and case timeline.

---

## Tier 4 (Stitch Concept References)
Upload only if generating/refining visual directions from your concept pool.

21. `reports/STITCH_DASHBOARD_FUNCTIONALITY_AUDIT_2026-02-25.md`
22. Selected concept files only (avoid uploading all 39+ folders at once):
   - `webapp/Stitch Designs/northstar_v2_stitch_dashboard_concepts/northstar_mission_control_dashboard_2/code.html`
   - `webapp/Stitch Designs/northstar_v2_stitch_dashboard_concepts/northstar_skill_recovery_lab_2/code.html`
   - `webapp/Stitch Designs/northstar_v2_stitch_dashboard_concepts/northstar_case_command_operations_2/code.html`
   - `webapp/Stitch Designs/northstar_v2_stitch_dashboard_concepts/northstar_strategic_journey_roadmap_2/code.html`
   - `webapp/Stitch Designs/northstar_v2_stitch_dashboard_concepts/northstar_executive_client_dual_view_1/code.html`

Why: These are the best functional concept anchors; avoid context bloat.

---

## Images (Upload Guidance)
- Keep one best UI collage image reference (not duplicate copies).
- Keep one logo draft image.
- Do not upload repeated image duplicates with same timestamp names.

---

## Security / Privacy Exclusions (Do NOT Upload)
- `webapp/.env`
- Any API keys, tokens, secret values
- Raw private credentials or session cookies
- Unnecessary personal identifiers beyond what is needed for product modeling

If you must share candidate data externally, keep only role-relevant fields.

---

## Recommended Minimal Upload Set (Fast Start)
If you want the fastest high-quality output, upload exactly these 8 files:
1. `reports/NORTHSTAR_V2_DASHBOARD_MASTER_SPEC.md`
2. `reports/NORTHSTAR_V2_VISUAL_SYSTEM_AND_STITCH_BUILD_GUIDE.md`
3. `reports/NORTHSTAR_PROJECT_CONTEXT_MAPPING.md`
4. `reports/NORTHSTAR_WEB_APP_PRODUCT_BLUEPRINT.md`
5. `webapp/README.md`
6. `webapp/server.js`
7. `webapp/public/app.html`
8. `webapp/public/dashboard.html`

---

## Prompt to use with this pack in AI Studio
"Use the uploaded NorthStar files as source of truth. Build a complete SaaS app plan and implementation tasks for frontend, backend, authentication, user accounts, dashboard modules, and data contracts. Follow the dashboard master spec and visual system exactly. Do not invent new branding or random modules outside these files."

