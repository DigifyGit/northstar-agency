# NorthStar Agency Compliance and Ethics Policy

Authority: Mandatory for all agents and operators  
Effective date: 2026-02-18  
Scope: `brain/`, `src/`, `templates/`, `reports/`, and all client-facing actions

## 1. Platform Compliance (LinkedIn and Similar Platforms)

### 1.1 Compliance Principle
NorthStar Agency operates as a client enablement system. It may gather market intelligence and prepare application materials, but it does not impersonate candidates or execute uncontrolled mass automation.

### 1.2 Prohibited Behaviors
- No credential sharing between operators.
- No impersonation of the client in outbound communication.
- No auto-apply flooding or scripted mass submissions without explicit client approval.
- No use of deceptive behavior intended to bypass platform controls.

### 1.3 Allowed Behaviors
- Controlled scraping for research and prioritization.
- Manual-login browser sessions with isolated profiles.
- Drafting and preparing application packets for client review.
- Tracking post-application lifecycle states.

### 1.4 Technical Controls
- Use profile isolation (`USER_DATA_DIR`) per agent run.
- Use bounded scrape runs and avoid excessive request velocity.
- Preserve data provenance for each job recommendation.
- Keep run outputs in `data/` and `reports/` for auditability.

### 1.5 Operational Gate
Before any outbound action, confirm:
- The target job passed dossier gating (`GO` or justified `CONDITIONAL GO`).
- The client approved the final materials.
- The action is logged in `brain/CASE_LOG.md` or tracker artifacts.

## 2. Portuguese Legal Boundary (Decreto-Lei 260/2009)

### 2.1 Key Principle
The project assumes the gratuity principle for candidates in placement contexts. NorthStar is positioned as coaching/enablement support, not candidate placement brokerage.

### 2.2 Practical Interpretation for NorthStar
- Service framing should emphasize guidance, preparation, and operational support.
- Any monetization touching placement outcomes requires legal review.
- Language in templates must avoid promises that imply unlawful intermediation.

### 2.3 Required Actions
- Validate monetization models with qualified Portuguese legal counsel before rollout.
- Keep written records of legal interpretation assumptions.
- Re-check legal assumptions before changing scope or geography.

### 2.4 Red-Flag Scenarios
- Charging candidates directly for job placement access.
- Contract terms that resemble unlawful intermediation.
- Marketing copy implying guaranteed placement through paid access.

## 3. AI Ethics and Model Governance (WEC-Aligned)

### 3.1 Explainability
All fit decisions must be explainable with requirement-level evidence and visible rationale.

Implementation in NorthStar:
- Score logic is deterministic and inspectable in `src/fit_dossier.js` and `src/scoring.js`.
- Evidence confidence is explicit in `brain/SKILLS_EVIDENCE_LEDGER.json`.
- Outputs preserve source linkage (winner report + full description data).

### 3.2 Auditability
- Keep generated artifacts in `reports/`.
- Keep lifecycle history in `data/application_tracker.json` and `brain/CASE_LOG.md`.
- Preserve historical baselines in `Archive/`.

### 3.3 Human Accountability
- Final application action belongs to the client.
- AI-generated recommendations require human verification.
- High-impact decisions (apply/decline/offer response) are never fully autonomous.

### 3.4 Fairness and Risk Controls
- Do not inflate confidence levels without evidence.
- Do not suppress negative signals in fit decisions.
- Escalate to `HOLD` when evidence quality is weak.

## 4. Reverse Recruiting Ethics

### 4.1 Mandatory Do List
- Prepare accurate, tailored materials.
- Use transparent reasoning for job prioritization.
- Document known risks and missing evidence.
- Respect client autonomy and explicit consent.

### 4.2 Prohibited Do-Not List
- Do not fabricate experience, credentials, or certifications.
- Do not claim language or technical proficiency not evidenced.
- Do not submit applications without explicit client confirmation.
- Do not run high-volume spam outreach.

### 4.3 Client-in-the-Loop Protocol
1. Source and rank opportunities.
2. Build packet and dossier.
3. Present recommendation + risks.
4. Wait for client approval.
5. Execute approved actions.
6. Log outcomes and update evidence state.

## 5. Compliance Quality Gates

Gate A: Pre-Application Readiness
- Skills evidence reviewed.
- Dossier gate result validated.
- Candidate packet reviewed.

Gate B: Execution Readiness
- Client explicitly approved the target action.
- Message/application artifacts are compliant.
- Tracker entry exists for the job.

Gate C: Post-Execution Accountability
- Follow-up schedule defined.
- State transition logged.
- Lessons captured for continuous improvement.

## 6. Breach Handling and Escalation

### 6.1 Breach Types
- Platform-policy breach risk.
- Legal framing risk.
- Ethical misrepresentation risk.

### 6.2 Response Workflow
1. Pause affected automation or workflow.
2. Mark item as `on_hold` in tracker where relevant.
3. Document breach context in `brain/CASE_LOG.md`.
4. Apply corrective action before resuming.

### 6.3 Preventive Maintenance
- Review this policy after major workflow changes.
- Re-audit templates and scripts monthly.
- Keep compliance assumptions synchronized with SOP and tracker states.

## 7. Compliance Ownership Map

- Policy source of truth: `brain/COMPLIANCE.md`
- Operational process owner: `brain/CLIENT_SUCCESS_SOP.md`
- Technical enforcement owners: `src/fit_dossier.js`, `src/application_tracker.js`, `src/scoring.js`
- Governance routing and role boundaries: `brain/AGENTS.md`, `brain/ENFORCEMENT.md`

NorthStar Agency does not optimize for maximum volume. It optimizes for compliant, evidence-backed outcomes.
