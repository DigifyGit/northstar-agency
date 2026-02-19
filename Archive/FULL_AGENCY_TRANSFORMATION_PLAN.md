# 🏗️ Full Agency Transformation Plan

> **Date:** 17 February 2026  
> **Program:** LinkedIn IT Job Finder -> Northstar Full-Service Job Sourcing Agency

---

## 1 · Current State (What Works)

| Capability | Status | Evidence |
|:---|:---|:---|
| Job sourcing execution | ✅ Operational | 62 captured rows in latest MAP cycle |
| Deduplication + ranking | ✅ Operational | 29 unique jobs, 2 A-tier, 11 B-tier |
| Client-facing summary reporting | ✅ Baseline active | Winner + appointment reports exist |
| Brain governance structure | ✅ Established | `brain/` canonical files + enforcement |

---

## 2 · Current State (What Is Missing)

| Gap | Impact |
|:---|:---|
| No mandatory requirement-to-client fit dossier | Client cannot verify "why this role fits me" |
| No formal readiness gate before apply guidance | Risk of low-quality applications |
| No integrated skill-test evidence store | Skills claims are not always auditable |
| No full lifecycle SOP after sourcing | Support drops after "apply now" stage |
| No conversion-centric KPI system | Hard to optimize toward interviews/offers |

---

## 3 · Target Agency Model (End-to-End)

| Phase | Objective | Mandatory Output |
|:---|:---|:---|
| 0. Intake | Capture client goals/constraints | Intake profile + exclusions + target map |
| 1. Capability Proof | Validate real skills evidence | Skills evidence ledger + confidence score |
| 2. Sourcing | Build and refresh role pipeline | Ranked queue (S/A/B/C/D) |
| 3. Fit Validation | Prove A-tier tailoring | A-tier Fit Validation Dossier |
| 4. Application Enablement | Remove apply friction | Role-tailored CV bullets + application script |
| 5. Follow-up Management | Increase response rate | Follow-up schedule + message templates |
| 6. Interview Readiness | Improve interview conversion | Interview prep pack + mock answers |
| 7. Offer Navigation | Support decision quality | Offer comparison rubric + negotiation checklist |
| 8. Outcome Learning | Improve future cycles | Conversion review + model updates |

---

## 4 · New Mandatory Artifacts

| Artifact | Path (Proposed) | Owner |
|:---|:---|:---|
| A-tier dossier template | `brain/A_TIER_FIT_DOSSIER_TEMPLATE.md` | Northstar |
| A-tier dossier outputs | `reports/A_TIER_FIT_DOSSIER_[date].md` | Northstar |
| Skills evidence ledger | `brain/SKILLS_EVIDENCE_LEDGER.json` | Client + Northstar |
| Application packet template | `brain/APPLICATION_PACKET_TEMPLATE.md` | Northstar |
| Interview prep template | `brain/INTERVIEW_PREP_TEMPLATE.md` | Northstar |
| Offer decision template | `brain/OFFER_DECISION_TEMPLATE.md` | Northstar |
| Lifecycle SOP | `brain/CLIENT_SUCCESS_SOP.md` | Northstar |

---

## 5 · Quality Gates (Before "Apply Now")

| Gate | Rule | Pass Condition |
|:---|:---|:---|
| Role Gate | Must be inside client target family | Helpdesk/Service Desk/IT Support L1 |
| Requirement Gate | Top requirements mapped to client evidence | >=80% requirements have confirmed/probable evidence |
| Risk Gate | High-risk mismatches must be explicit | No unresolved critical risk |
| Readiness Gate | Client has concrete apply assets | Tailored CV bullets + application script ready |

**Decision states:** `GO`, `CONDITIONAL GO`, `HOLD`

---

## 6 · KPI System (Beyond Scraping)

| Layer | KPI | Target Direction |
|:---|:---|:---|
| Pipeline | A-tier count, freshness, dedup quality | Up |
| Fit Quality | Dossier confidence score, false-positive rate | Confidence up, false positives down |
| Execution | Applications submitted per day | Up |
| Conversion | Reply rate, interview rate, offer rate | Up |
| Client Experience | Time-to-next-action clarity | Down (faster) |

---

## 7 · Immediate Build Plan (14 Days)

| Day Range | Deliverable | Result |
|:---|:---|:---|
| 1-2 | Publish A-tier validation protocol and template | Client can understand "why this is a fit" |
| 3-5 | Build skills evidence ledger schema + initial import | Claims become auditable |
| 6-8 | Create application packet templates per role type | Client gets guided apply support |
| 9-11 | Build interview prep packs tied to role requirements | Better interview readiness |
| 12-14 | Add follow-up and conversion tracking in CASE_LOG workflow | End-to-end visibility |

---

## 8 · Priority Technical Upgrades

- Expand experience parsing in `src/scoring.js` for Portuguese patterns (`X+ de experiência`, `até X anos`).
- Preserve description and core evidence fields in winner artifacts (`reports/WINNER_REPORT_TODAY.json` output schema).
- Add fit-validation generator script (proposed: `src/fit_dossier.js`) using deduped JSON + client evidence sources.
- Add lifecycle states to `brain/CASE_LOG.md` (submitted -> follow-up -> interview -> offer).

---

## 9 · Definition of Done (Agency Level)

Northstar is considered "full-service operational" when:

1. Every A-tier role includes an evidence-based dossier.
2. Every application action includes a tailored message and CV guidance.
3. Every submitted application has follow-up and interview workflow support.
4. The client can always see next action, current status, and conversion metrics.

---

<sub>Northstar Job Sourcing Desk · Transformation Plan v1 · 2026-02-17</sub>
