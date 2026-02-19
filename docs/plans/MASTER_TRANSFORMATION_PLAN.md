# 🏗️ MASTER TRANSFORMATION PLAN — NorthStar Agency Build

> **Document type:** Codex Execution Plan (COMPREHENSIVE)
> **Prepared by:** OPUS (Claude Opus 4.6) — Brain & Project Manager
> **Date:** 18 February 2026
> **Target executor:** Codex 5.3 (GPT) via Antigravity
> **Project root:** `/Users/Maestro/Developer/NorthStar Agency`
> **Reference project (READ-ONLY):** `/Users/Maestro/Developer/LinkedIn IT Job Finder`

---

## 0 · EXECUTIVE SUMMARY

This plan transforms the duplicated "LinkedIn IT Job Finder" project into a **full-service AI job sourcing agency** called **NorthStar Agency**. The original project remains untouched as backup.

### What exists now (WORKING — keep)
- LinkedIn scraper (`src/scraper.js`) — functional
- Scoring engine (`src/scoring.js`) — functional, needs Portuguese pattern fix
- Winner report generator (`src/winner_report.js`) — functional, needs description field
- Brain governance files (AGENCY.md, CLIENT_BRIEF.md, CASE_LOG.md, etc.)
- 62 scraped jobs → 29 unique → 2 A-tier → 11 B-tier

### What is MISSING (the entire point of this transformation)
1. **No fit-proof dossier** — Client gets links without knowing WHY they're good
2. **No readiness testing** — Nobody verified the client can actually do these jobs
3. **No application support** — No CV tailoring, no message templates, no follow-up
4. **No interview prep** — Zero support after "apply now"
5. **No offer/negotiation support** — No decision rubrics
6. **No conversion tracking** — Applications counter = 0, no lifecycle states
7. **No skills evidence store** — Client claims are unauditable
8. **No agency benchmark database** — No reference to real-world practices
9. **No compliance layer** — LinkedIn TOS risks, Portuguese labor law (DL 260/2009)

### Target state
NorthStar Agency = end-to-end job sourcing agency with 9 lifecycle phases:
`Intake → Profiling → Sourcing → Fit Validation → Readiness Testing → Application Support → Interview Prep → Offer Navigation → Outcome Learning`

---

## 1 · FOLDER ARCHITECTURE

### 1.1 · Target directory structure

Codex must create this exact structure inside `/Users/Maestro/Developer/NorthStar Agency`:

```
NorthStar Agency/
├── brain/                          # Agency governance (UPDATED files)
│   ├── AGENCY.md                   # ✏️ UPDATE — expand to full-service charter
│   ├── AGENTS.md                   # ✏️ UPDATE — new project root path + new roles
│   ├── CLIENT_BRIEF.md             # ✏️ UPDATE — add skills evidence references
│   ├── CASE_LOG.md                 # ✏️ UPDATE — add lifecycle states
│   ├── ENFORCEMENT.md              # ✏️ UPDATE — new project root path
│   ├── STYLE_GUIDE.md              # ✏️ UPDATE — add new template specs
│   ├── SCRAPER_SPEC.md             # ✏️ UPDATE — add PT experience regex
│   ├── knowledge_base.json         # ✏️ UPDATE — add PT experience patterns
│   ├── A_TIER_FIT_DOSSIER_TEMPLATE.md  # ✅ EXISTS — keep as-is
│   ├── CLIENT_SUCCESS_SOP.md           # 🆕 CREATE — full lifecycle SOP
│   ├── SKILLS_EVIDENCE_LEDGER.json     # 🆕 CREATE — auditable skills store
│   ├── APPLICATION_PACKET_TEMPLATE.md  # 🆕 CREATE — CV + message templates
│   ├── INTERVIEW_PREP_TEMPLATE.md      # 🆕 CREATE — interview playbook
│   ├── OFFER_DECISION_TEMPLATE.md      # 🆕 CREATE — offer comparison rubric
│   ├── COMPLIANCE.md                   # 🆕 CREATE — platform + legal rules
│   ├── KPI_DASHBOARD.md                # 🆕 CREATE — conversion metrics
│   ├── HANDOVER_BACKUP_2026-02-16.json # ✅ Keep
│   └── HANDOVER_BACKUP_2026-02-16.md   # ✅ Keep
│
├── research/                       # 🆕 Agency intelligence layer
│   └── agency_benchmarks/
│       ├── agency_benchmark_db.json    # 🆕 CREATE — provider evidence cards
│       └── sources/                    # 🆕 CREATE — raw excerpts directory
│           └── README.md               # 🆕 Source provenance index
│
├── templates/                      # 🆕 Template library
│   ├── external/                   # Structures from real agencies
│   │   ├── cv_template_structure.md        # 🆕 Based on Robert Half/Hays
│   │   ├── follow_up_email_template.md     # 🆕 Based on Hays NZ
│   │   ├── interview_scorecard_structure.md # 🆕 Based on Greenhouse/Workable
│   │   └── candidate_profile_structure.md  # 🆕 Based on staffing firms
│   └── internal/                   # NorthStar adapted versions
│       ├── cv_tailoring_template.md        # 🆕 Role-specific CV builder
│       ├── application_message_template.md # 🆕 Per-job apply message
│       ├── follow_up_sequence.md           # 🆕 Timed follow-up playbook
│       ├── interview_prep_pack.md          # 🆕 5-question role-specific prep
│       └── offer_comparison_rubric.md      # 🆕 Side-by-side offer eval
│
├── assessments/                    # 🆕 Readiness testing layer
│   ├── L1_TECHNICAL_ASSESSMENT.md      # 🆕 AD, networking, M365, hardware
│   ├── L1_BEHAVIORAL_ASSESSMENT.md     # 🆕 Empathy, problem-solving, comms
│   ├── LANGUAGE_READINESS_CHECK.md     # 🆕 EN/PT interview readiness
│   └── completed/                      # 🆕 Store completed test results
│       └── .gitkeep
│
├── src/                            # Source code (UPDATED)
│   ├── scraper.js                  # ✅ Keep as-is
│   ├── scoring.js                  # ✏️ UPDATE — add PT experience regex
│   ├── winner_report.js            # ✏️ UPDATE — preserve description field
│   ├── analysis.js                 # ✅ Keep as-is
│   ├── index.js                    # ✅ Keep as-is
│   ├── fit_dossier.js              # 🆕 CREATE — auto-generate fit dossiers
│   ├── application_tracker.js      # 🆕 CREATE — lifecycle state machine
│   └── utils/                      # ✅ Keep as-is
│
├── config/                         # ✅ Keep as-is
├── data/                           # ✅ Keep as-is
├── reports/                        # ✅ Keep as-is
├── Archive/                        # 🆕 For files we don't need
│
├── research/strategic_foundation/Evidence-Based Benchmark Research for Building a Full AI Job Sourcing Agency.md  # Reference
├── research/strategic_foundation/Technical Re-Engineering of the Northstar Agency - Industrializing AI-Driven End-to-End Job Sourcing.md  # Reference
└── package.json                    # ✏️ UPDATE — add new script entries
```

### 1.2 · Files to ARCHIVE (move to Archive/)

Move these files to `Archive/` — they are superseded:

```
brain/DEEP_RESEARCH_MASTER_PROMPT.md        → Archive/
brain/DEEP_RESEARCH_CONTEXT_BASELINE_2026-02-17.md → Archive/
brain/FULL_AGENCY_TRANSFORMATION_PLAN.md    → Archive/
ChatGpt Docs/                               → Archive/ChatGpt Docs/
debug_failure.html                          → Archive/
debug_text.txt                              → Archive/
```

---

## 2 · PHASE-BY-PHASE BUILD INSTRUCTIONS

Each phase below is a **self-contained work unit**. Codex should execute them IN ORDER.

---

### PHASE 1: Foundation — New Canonical Files (Day 1)

**Goal:** Create all new brain files, templates, and assessment structures.

#### Task 1.1 — Create `brain/CLIENT_SUCCESS_SOP.md`

This is the MOST IMPORTANT new file. It defines the full agency lifecycle.

**Content requirements:**

```markdown
# 🔄 Client Success SOP — From Intake to Hire

> **Authority:** MANDATORY — defines the full agency service lifecycle
> **Last updated:** 18 February 2026

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

## 2 · Phase Details

[For each phase, include:]
- Trigger condition
- Required inputs
- Step-by-step playbook (numbered actions)
- Mandatory outputs / deliverables
- Quality gate (what must pass before next phase)
- Agent owner
- Templates to use (reference file paths)

## 3 · Application Stage SOP
- What to send: tailored CV + application message
- How to tailor: extract top 3 requirements from listing → map to client evidence → write 3 achievement bullets
- Message template: reference templates/internal/application_message_template.md
- ATS optimization rules: chronological format, exact keywords from listing, no tables/graphics

## 4 · Follow-up SOP
- Day 0: Submit application
- Day 1: Thank-you note (if direct contact available)
- Day 7-10: Polite follow-up requesting status
- Day 21: Second follow-up or close
- Reference: templates/internal/follow_up_sequence.md

## 5 · Interview Stage SOP
- Pre-interview: deliver 5-question prep pack customized to employer tech stack
- Mock Q&A: provide sample answers for behavioral questions
- Post-interview: debrief loop — what went well, what to improve
- Reference: templates/internal/interview_prep_pack.md

## 6 · Offer Stage SOP
- Offer comparison: salary, benefits, growth, commute, culture
- Negotiation support: market data, counter-offer template
- Decision rubric: weighted scoring of offer factors
- Reference: templates/internal/offer_comparison_rubric.md

## 7 · Rejection Recovery SOP
- Capture rejection reason (if available)
- Update CASE_LOG with learning
- Adjust scoring parameters if false positive
- Re-prioritize pipeline
- Morale support message to client

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
| `rejected` | Rejection — learning loop active |
| `on_hold` | Client paused case |

## 9 · Reporting Cadence
- Daily: execution metrics (applications submitted, follow-ups due)
- Weekly: conversion metrics (reply rate, interviews)
- Monthly: quality metrics (A-tier false positives, readiness gate pass rate)

## 10 · SLA Model
| Metric | Target |
|:---|:---|
| Time from A-tier surfaced to dossier delivered | ≤ 4 hours |
| Time from GO decision to application packet ready | ≤ 2 hours |
| Follow-up sent after application | Within 48 hours |
| Interview prep pack delivered | ≤ 24 hours before interview |
```

#### Task 1.2 — Create `brain/SKILLS_EVIDENCE_LEDGER.json`

```json
{
  "version": "1.0",
  "last_updated": "2026-02-18",
  "client": "Maestro",
  "evidence_sources": {
    "self_assessment": "Client self-reported skills and experience levels",
    "questionnaire": "Structured questionnaire responses",
    "hands_on_test": "Practical assessment results",
    "cv_evidence": "Verified from CV/resume",
    "project_evidence": "Demonstrated in project work",
    "certification": "Formal certification or training"
  },
  "skills": [
    {
      "skill": "Windows 10/11 Support",
      "category": "high_value",
      "confidence": "probable",
      "evidence_type": "self_assessment",
      "evidence_detail": "Client reports experience with Windows troubleshooting",
      "verified_date": null,
      "assessment_score": null,
      "notes": "Needs hands-on verification via L1 Technical Assessment"
    },
    {
      "skill": "Active Directory Basics",
      "category": "high_value",
      "confidence": "probable",
      "evidence_type": "self_assessment",
      "evidence_detail": "Client reports familiarity with AD user management",
      "verified_date": null,
      "assessment_score": null,
      "notes": "Needs password reset simulation test"
    },
    {
      "skill": "Microsoft 365 Admin",
      "category": "high_value",
      "confidence": "probable",
      "evidence_type": "self_assessment",
      "evidence_detail": "Client reports M365 user creation and license management",
      "verified_date": null,
      "assessment_score": null,
      "notes": "Needs verification"
    },
    {
      "skill": "Troubleshooting Methodology",
      "category": "high_value",
      "confidence": "probable",
      "evidence_type": "questionnaire",
      "evidence_detail": "From imported questionnaire responses",
      "verified_date": null,
      "assessment_score": null,
      "notes": "Previously assessed in different project context"
    },
    {
      "skill": "VPN Troubleshooting",
      "category": "high_value",
      "confidence": "unknown",
      "evidence_type": null,
      "evidence_detail": null,
      "verified_date": null,
      "assessment_score": null,
      "notes": "No evidence collected yet"
    },
    {
      "skill": "Password Resets / MFA",
      "category": "high_value",
      "confidence": "unknown",
      "evidence_type": null,
      "evidence_detail": null,
      "verified_date": null,
      "assessment_score": null,
      "notes": "No evidence collected yet"
    },
    {
      "skill": "Remote Desktop Support",
      "category": "medium_value",
      "confidence": "unknown",
      "evidence_type": null,
      "evidence_detail": null,
      "verified_date": null,
      "assessment_score": null,
      "notes": "No evidence collected yet"
    },
    {
      "skill": "Basic Networking (Wi-Fi, DNS, IP)",
      "category": "medium_value",
      "confidence": "unknown",
      "evidence_type": null,
      "evidence_detail": null,
      "verified_date": null,
      "assessment_score": null,
      "notes": "No evidence collected yet"
    },
    {
      "skill": "Printer Triage",
      "category": "medium_value",
      "confidence": "unknown",
      "evidence_type": null,
      "evidence_detail": null,
      "verified_date": null,
      "assessment_score": null,
      "notes": "No evidence collected yet"
    },
    {
      "skill": "English Communication",
      "category": "language",
      "confidence": "confirmed",
      "evidence_type": "project_evidence",
      "evidence_detail": "Client communicates fluently in English throughout project",
      "verified_date": "2026-02-15",
      "assessment_score": null,
      "notes": "Confirmed through all project interactions"
    },
    {
      "skill": "Portuguese Communication",
      "category": "language",
      "confidence": "unknown",
      "evidence_type": null,
      "evidence_detail": null,
      "verified_date": null,
      "assessment_score": null,
      "notes": "Needs language readiness check for interview scenarios"
    },
    {
      "skill": "Customer Empathy & Patience",
      "category": "behavioral",
      "confidence": "unknown",
      "evidence_type": null,
      "evidence_detail": null,
      "verified_date": null,
      "assessment_score": null,
      "notes": "Needs behavioral assessment"
    }
  ],
  "confidence_levels": {
    "confirmed": "Verified by hands-on test, certification, or direct evidence",
    "probable": "Likely based on self-report or indirect evidence — needs verification",
    "unknown": "No evidence collected yet",
    "gap": "Tested and found insufficient — improvement plan needed"
  },
  "overall_readiness_score": null,
  "last_assessment_date": null,
  "next_assessment_due": "2026-02-20"
}
```

#### Task 1.3 — Create `brain/COMPLIANCE.md`

```markdown
# ⚖️ Compliance & Ethics — NorthStar Agency

> **Authority:** MANDATORY — all agents must comply
> **Last updated:** 18 February 2026

---

## 1 · Platform Compliance

### LinkedIn Terms of Service
- LinkedIn explicitly warns that using prohibited tools violates its User Agreement
- Risk: account restriction or shutdown
- Rule: Prioritize manual application when possible; use scraping responsibly
- Never impersonate the client in automated outreach
- Strip tracking parameters from URLs before storing

### Mitigation Strategy
- Use `client-in-the-loop` execution — AI prepares, client submits
- Diversify sourcing: LinkedIn + direct company career pages + job boards
- Rate-limit scraping to avoid detection
- Use dedicated browser profile (user_data_codex)

---

## 2 · Portuguese Labor Law (Decreto-Lei 260/2009)

### Key Principle
- Private placement agencies must observe "principle of gratuity" for job seekers
- Agencies generally should NOT charge candidates for placement services
- The employer is typically the paying client

### Our Model
- NorthStar operates as a personal AI-powered job search assistant
- Services classified as career coaching/training, not placement
- ⚠️ UNCERTAIN: Confirm with IEFP before any monetization in Portugal

### Action Required
- Before charging any fees: consult IEFP or Portuguese labor-law professional
- Document the service as "career coaching" not "job placement"

---

## 3 · AI Ethics (WEC Standards)

### Principles
- Fit scoring must be explainable and evidence-based
- Readiness gates must be auditable (data provenance in every dossier)
- No deceptive automation — client always knows what AI does vs. what they do
- No impersonation — applications submitted by client, not by AI
- Transparent about AI involvement in all communications

### Implementation
- Every A-tier dossier includes Data Provenance table (Section 7)
- Every score includes reason_short breakdown
- SKILLS_EVIDENCE_LEDGER tracks evidence_type for every claim
- Client approves all outgoing communications before sending

---

## 4 · Reverse Recruiting Ethics

### Rules (learned from industry research)
- ✅ DO: Prepare templates, scripts, and prep packs for client
- ✅ DO: Research company and role for client
- ✅ DO: Provide structured feedback and improvement plans
- ❌ DON'T: Submit applications on behalf of client without consent
- ❌ DON'T: Send outreach messages "posing as the candidate"
- ❌ DON'T: Use high-volume automated application flooding
```

#### Task 1.4 — Create `brain/KPI_DASHBOARD.md`

```markdown
# 📊 KPI Dashboard — NorthStar Agency

> **Reporting cadence:** Daily / Weekly / Monthly
> **Last updated:** 18 February 2026

---

## 1 · Pipeline KPIs (Daily)

| KPI | Current | Target | Status |
|:---|---:|:---|:---:|
| A-tier count | 2 | ≥ 2 per week | ✅ |
| B-tier backup pipeline | 11 | ≥ 5 per week | ✅ |
| Unique jobs per cycle | 29 | ≥ 15 per cycle | ✅ |
| Scraping freshness | 2026-02-16 | ≤ 24h old | ⚠️ |

---

## 2 · Fit Quality KPIs (Weekly)

| KPI | Current | Target | Status |
|:---|---:|:---|:---:|
| Dossier confidence score (avg) | N/A | ≥ 70% | ❌ Not measured |
| False positive rate | N/A | ≤ 20% | ❌ Not measured |
| Readiness gate pass rate | N/A | ≥ 60% | ❌ Not measured |

---

## 3 · Execution KPIs (Daily)

| KPI | Current | Target | Status |
|:---|---:|:---|:---:|
| Applications submitted | 0 | ≥ 3 per day | ❌ |
| Follow-ups sent | 0 | 100% of apps within 48h | ❌ |
| Application packets prepared | 0 | Match A-tier count | ❌ |

---

## 4 · Conversion KPIs (Weekly)

| KPI | Current | Target | Status |
|:---|---:|:---|:---:|
| Reply rate | N/A | ≥ 15% | ❌ Not measured |
| Interview rate | N/A | ≥ 10% of apps | ❌ Not measured |
| Offer rate | N/A | ≥ 5% of apps | ❌ Not measured |

---

## 5 · Client Experience KPIs

| KPI | Current | Target | Status |
|:---|---:|:---|:---:|
| Time-to-next-action clarity | Low | Always clear | ⚠️ |
| Dossier turnaround (A-tier → dossier) | N/A | ≤ 4 hours | ❌ |
| Application packet turnaround | N/A | ≤ 2 hours | ❌ |
```

#### Task 1.5 — Create Assessment Files

Create these three assessment files in `assessments/`:

**`assessments/L1_TECHNICAL_ASSESSMENT.md`** — Based on TestGorilla/Mettl/Randstad patterns:
- 10 scenario-based questions covering: Active Directory, Networking, M365, Hardware, Ticketing
- Each question has: Scenario description, Expected answer framework, Scoring rubric (0-3)
- Pass threshold: 60%

**`assessments/L1_BEHAVIORAL_ASSESSMENT.md`** — Based on Adecco/LHH patterns:
- 8 behavioral questions covering: Patience/Empathy, Problem-solving, Communication clarity, Adaptability
- STAR format expected answers
- Scoring rubric (0-3)

**`assessments/LANGUAGE_READINESS_CHECK.md`** — Covers:
- English interview simulation (3 scenarios)
- Portuguese basic conversation check (if applicable)
- Technical vocabulary in both languages

#### Task 1.6 — Create Template Files

Create all files in `templates/external/` and `templates/internal/` as specified in the folder structure.

**External templates** should document the STRUCTURE (sections, fields, purpose) of real agency templates — NOT copy content. Source from:
- Robert Half: CV/resume structure
- Hays: Follow-up email structure, IT resume tips
- Greenhouse/Workable: Interview scorecard structure
- Adecco: Interview preparation checklist structure

**Internal templates** are NorthStar's adapted versions ready for use.

#### Task 1.7 — Create `research/agency_benchmarks/agency_benchmark_db.json`

Create the agency intelligence database with this schema per record:

```json
{
  "providers": [
    {
      "name": "Randstad",
      "category": "global_staffing",
      "geographies": ["Global", "Portugal"],
      "service_model": "Multi-layered screening, verification, assessment centers",
      "published_templates": ["Interview prep guides", "CV templates"],
      "kpi_claims": "Time-to-fill, cost-per-hire tracking",
      "ethics_standards": "WEC member, Code of Conduct adherence",
      "relevance_to_northstar": "Documentation rigor, assessment center approach, PT market presence",
      "source_url": "https://www.randstad.com",
      "source_date": "2026-02-17"
    }
  ]
}
```

Include entries for: Randstad, Adecco, ManpowerGroup, Hays, Robert Half, Cielo, Korn Ferry, PeopleScout, Randstad RiseSmart, LHH, Right Management, Greenhouse, Workable.

---

### PHASE 2: Code Updates (Day 2)

#### Task 2.1 — Fix Portuguese experience regex in `src/scoring.js`

**Current code (line 146):**
```javascript
const expMatch = description.match(/(\d+)\s*(\+|-\s*\d+)?\s*years?/i);
```

**Replace with:**
```javascript
const expMatch = description.match(
  /(\d+)\s*(?:\+|-\s*\d+)?\s*(?:years?|anos?|de experiência|d['']expérience)/i
);
```

This adds Portuguese patterns: `3+ de experiência`, `até 5 anos`, `2 anos`.

#### Task 2.2 — Preserve description in `src/winner_report.js`

In the `WINNER_REPORT_TODAY.json` output, add the `description` field from raw job data so fit dossiers can reference it.

**In the JSON output block (around line 212-220), ensure `winners` and `backup` arrays include:**
```javascript
description: row.description || row.reason || ''
```

#### Task 2.3 — Create `src/fit_dossier.js`

New script that reads:
- `reports/WINNER_REPORT_TODAY.json` (winners array)
- `reports/codex_map7_latest_cycle_unique_best.json` (full descriptions)
- `brain/CLIENT_BRIEF.md` (client profile)
- `brain/SKILLS_EVIDENCE_LEDGER.json` (evidence)
- `brain/A_TIER_FIT_DOSSIER_TEMPLATE.md` (template)

And generates a filled dossier for each A-tier job at:
`reports/A_TIER_FIT_DOSSIER_[company]_[date].md`

Core logic:
1. Parse job description → extract requirements list
2. For each requirement → lookup in SKILLS_EVIDENCE_LEDGER → get confidence
3. Calculate fit score: (confirmed × 3 + probable × 1) / (total_requirements × 3) × 100
4. Calculate risk penalty based on seniority/language/logistics mismatches
5. Determine gate: GO (≥80%), CONDITIONAL GO (50-79%), HOLD (<50%)
6. Render markdown using template structure

#### Task 2.4 — Create `src/application_tracker.js`

State machine for application lifecycle:
```
sourcing → fit_review → ready_to_apply → applied → follow_up → interview_scheduled → interview_complete → offer_received → accepted/rejected
```

Functions:
- `updateStatus(jobId, newState, notes)` — updates CASE_LOG.md
- `getDueFollowUps()` — returns apps needing follow-up
- `getStats()` — returns conversion metrics for KPI_DASHBOARD

#### Task 2.5 — Update `package.json`

Add new scripts:
```json
{
  "scripts": {
    "scrape": "node src/index.js",
    "report": "node src/winner_report.js",
    "dossier": "node src/fit_dossier.js",
    "track": "node src/application_tracker.js",
    "daily": "node daily_routine.js"
  }
}
```

---

### PHASE 3: Brain File Updates (Day 2-3)

#### Task 3.1 — Update `brain/AGENCY.md`

Expand Section 4 (Sourcing Strategy) to include full lifecycle phases.
Add Section 7: "Full-Service Promise" listing all 9 lifecycle phases.
Add Section 8: "What We Provide Per Phase" (deliverables list).

#### Task 3.2 — Update `brain/AGENTS.md`

1. Change ALL `Project root:` references from `/Users/Maestro/Developer/LinkedIn IT Job Finder` to `/Users/Maestro/Developer/NorthStar Agency`
2. Update Section 2.1 Task-to-Agent Routing Table with new tasks:
   - Fit dossier generation → OPUS (quality) / CODEX (data extraction)
   - Application packet creation → OPUS
   - Interview prep pack → OPUS
   - Assessment administration → CODEX
   - KPI dashboard refresh → CODEX
3. Update Section 8 Brain File Map with new canonical files

#### Task 3.3 — Update `brain/ENFORCEMENT.md`

1. Change ALL `Project root:` references to NorthStar Agency path
2. Update Agency Mode brain files list: add CLIENT_SUCCESS_SOP.md, COMPLIANCE.md
3. Update Developer Mode file list: add fit_dossier.js, application_tracker.js

#### Task 3.4 — Update `brain/CASE_LOG.md`

Add new section: "## 7 · Application Lifecycle Tracker" with states from CLIENT_SUCCESS_SOP.md
Update stats to include: `Dossiers generated`, `Applications with prep pack`, `Follow-ups sent`

#### Task 3.5 — Update `brain/STYLE_GUIDE.md`

Add template specifications for:
- 5.5 · Application Packet (CV bullets + message)
- 5.6 · Interview Prep Pack
- 5.7 · Offer Decision Brief
- 5.8 · Weekly Conversion Report
- 5.9 · Readiness Assessment Report

#### Task 3.6 — Update `brain/CLIENT_BRIEF.md`

Add new section: "## 7 · Skills Evidence Status" linking to SKILLS_EVIDENCE_LEDGER.json
Add section: "## 8 · Assessment Schedule" with next assessment dates

---

### PHASE 4: Archive Cleanup (Day 3)

Move files listed in Section 1.2 to `Archive/` folder.

---

## 3 · QUALITY GATES

Codex must verify after each phase:

### Phase 1 Gate
- [ ] All 🆕 files exist and are non-empty
- [ ] CLIENT_SUCCESS_SOP has all 9 lifecycle phases with playbooks
- [ ] SKILLS_EVIDENCE_LEDGER.json is valid JSON with all 12 skill entries
- [ ] COMPLIANCE.md covers LinkedIn TOS, DL 260/2009, AI ethics
- [ ] All template files have sections, fields, and usage instructions
- [ ] Agency benchmark DB has 13 provider entries with source URLs

### Phase 2 Gate
- [ ] `src/scoring.js` regex matches Portuguese patterns
- [ ] `src/winner_report.js` includes description in JSON output
- [ ] `src/fit_dossier.js` runs without errors on test data
- [ ] `src/application_tracker.js` state machine works
- [ ] `npm run dossier` executes successfully
- [ ] `npm run track` executes successfully

### Phase 3 Gate
- [ ] All brain files reference correct NorthStar Agency path
- [ ] AGENTS.md routing table includes all new task types
- [ ] ENFORCEMENT.md pre-message blocks use correct path
- [ ] STYLE_GUIDE.md has all new template specs
- [ ] CASE_LOG.md has lifecycle tracker section

### Phase 4 Gate
- [ ] Archive/ folder contains all deprecated files
- [ ] No broken references in remaining files

---

## 4 · CRITICAL RULES FOR CODEX

1. **DO NOT modify anything in `/Users/Maestro/Developer/LinkedIn IT Job Finder`** — that is the backup
2. **ALL work happens in `/Users/Maestro/Developer/NorthStar Agency`**
3. **Follow STYLE_GUIDE.md** for all markdown files — premium formatting, tables, interpretation blocks
4. **Every template must be USABLE** — not placeholder text, but actual fill-in-the-blank templates
5. **Every JSON file must be valid** — test with `JSON.parse()` before committing
6. **Every new JS file must be runnable** — test with `node src/filename.js` before committing
7. **Include the footer** on every brain file: `<sub>NorthStar Agency · [Doc Name] · [date]</sub>`
8. **Skills evidence must use confidence levels** — never claim "confirmed" without real evidence

---

## 5 · EXECUTION ORDER SUMMARY

```
PHASE 1 (Day 1):
  1.1  Create brain/CLIENT_SUCCESS_SOP.md
  1.2  Create brain/SKILLS_EVIDENCE_LEDGER.json
  1.3  Create brain/COMPLIANCE.md
  1.4  Create brain/KPI_DASHBOARD.md
  1.5  Create assessments/ (3 files + completed/.gitkeep)
  1.6  Create templates/ (4 external + 5 internal)
  1.7  Create research/agency_benchmarks/ (DB + sources/README)
  → RUN Phase 1 Gate

PHASE 2 (Day 2):
  2.1  Fix scoring.js Portuguese regex
  2.2  Fix winner_report.js description field
  2.3  Create src/fit_dossier.js
  2.4  Create src/application_tracker.js
  2.5  Update package.json scripts
  → RUN Phase 2 Gate

PHASE 3 (Day 2-3):
  3.1  Update brain/AGENCY.md
  3.2  Update brain/AGENTS.md (paths + routing)
  3.3  Update brain/ENFORCEMENT.md (paths)
  3.4  Update brain/CASE_LOG.md (lifecycle tracker)
  3.5  Update brain/STYLE_GUIDE.md (new templates)
  3.6  Update brain/CLIENT_BRIEF.md (evidence refs)
  → RUN Phase 3 Gate

PHASE 4 (Day 3):
  4.1  Move deprecated files to Archive/
  → RUN Phase 4 Gate
  → DONE: Full agency operational
```

---

## 6 · DEFINITION OF DONE

NorthStar Agency is "full-service operational" when:

1. ✅ Every A-tier role triggers automatic fit dossier generation
2. ✅ Every dossier includes requirement-to-client evidence matrix with confidence scores
3. ✅ Every GO decision produces a ready-to-use application packet (CV bullets + message)
4. ✅ Every submitted application enters the lifecycle tracker with follow-up schedule
5. ✅ Interview prep packs exist for all scheduled interviews
6. ✅ Client can always see: current status, next action, conversion metrics
7. ✅ All scoring is explainable, evidence-based, and auditable
8. ✅ Compliance layer covers LinkedIn TOS and Portuguese labor law
9. ✅ Agency benchmark database has 13+ real providers with source URLs

---

<sub>NorthStar Agency · Master Transformation Plan v1.0 · OPUS · 18 February 2026</sub>
