# Client-Side Data Inventory
Date: 2026-02-25
Scope: NorthStar Agency local research/brain files
Client: Jose / José (Joseph Ginsberg)

## Executive Result
Yes, client-side data exists and is substantial.
It is distributed across canonical + operational files and is usable for dashboard/product features.

## Primary Canonical Files (Use First)
1. `brain/CANDIDATE_PROFILE.md`
- Canonical identity, verified vs claimed vs fabricated truth labels.
- Real/false timeline handling and hard sourcing rules.
- Critical for honest profile rendering.

2. `brain/CLIENT_BRIEF.md`
- Role targets, hard exclusions, language hard blocks, skill signal model.
- Sourcing and fit constraints.

3. `brain/CASE_LOG.md`
- Case lifecycle metrics, tracker states, events/learnings.
- Good for timeline/case activity modules.

## Structured Data Files (Machine-friendly)
1. `brain/CLIENT_IDENTITY.json`
- Basic identity and agency metadata.

2. `brain/SKILLS_EVIDENCE_LEDGER.json`
- Skill-level confidence model (`confirmed/probable/unknown/gap`).
- Evidence types and skill evidence details.

3. `brain/knowledge_base.json`
- Weighted skills, role anchors, disqualifiers, runtime scoring policy.

## Additional Relevant Sources
- `reports/B_TIER_AUDIT_REPORT_2026-02-23.md`
- `reports/B_TIER_COMPARISON_REPORT_2026-02-22.md`
- `reports/A_TIER_FIT_DOSSIER_ManpowerGroup_2026-02-22.md`
- `reports/NORTHSTAR_V2_AUTH_DASHBOARD_FUNCTIONAL_SPEC.md`
- `webapp/public/app.html` (current dashboard sample view logic)

## Data Coverage Map
- Identity: Present
- Role targets & exclusions: Present
- Language constraints: Present
- Skill confidence evidence: Present
- Case event timeline: Present
- Application tracker: Present (currently mostly empty/no submissions)
- Recommendation/task history: Partial
- Interview outcomes: Mostly empty
- Offer outcomes: Empty

## Noted Inconsistencies / Risks
1. Name spelling variants across files (`Jose`, `José`, `Joseph`) require normalization.
2. Some operational/dashboard sample values appear demo-like and may not match case log reality.
3. `CLIENT_IDENTITY.json` language list is broad, but canonical language operational rules are in `CANDIDATE_PROFILE.md` and `CLIENT_BRIEF.md`.

## Recommended Source Priority (for product use)
1. `brain/CANDIDATE_PROFILE.md` (truth + validation labels)
2. `brain/CLIENT_BRIEF.md` (targeting + exclusions)
3. `brain/SKILLS_EVIDENCE_LEDGER.json` (confidence/evidence)
4. `brain/CASE_LOG.md` (activity timeline)
5. `brain/knowledge_base.json` (scoring policy)

## Ready-for-Dashboard Payload Status
You already have enough data to power:
- Profile summary
- Readiness and blockers panels
- Skill matrix with confidence labels
- Case timeline and action feed
- Next-step recommendations

But not enough reliable historical data yet for:
- robust conversion trendlines
- interview-to-offer analytics
- long-window performance benchmarking
