# Reusable Assets Index

> **Purpose:** Catalog all legacy ChatGPT project assets that can be ported into NorthStar Agency
> **Compiled by:** Opus (Project Manager)
> **Date:** 18 February 2026

---

## Priority Legend

| Priority | Meaning |
|:---|:---|
| 🔴 Critical | Must port — NorthStar has no equivalent |
| 🟡 High | Should port — enriches existing NorthStar data |
| 🟢 Reference | Keep for reference — NorthStar already has equivalent or better |
| ⚪ Archive | Low value — placeholder or empty file |

---

## 1 · Client Evidence Assets (🔴 Critical)

These contain **hard evidence** about José that NorthStar currently lacks or has in weaker form.

| # | Asset | File | Purpose | Port Action |
|:---:|:---|:---|:---|:---|
| 1 | CV (DOCX) | `Joseph_Ginsberg_CV_Updated_21-11-2025.docx` | Full career timeline with quantified claims | Extract into `Client_Profile_SingleSourceOfTruth.md` ✅ Done |
| 2 | CV (PDF) | `Joseph_Ginsberg_2025_CV.pdf` | PDF version for ATS reference | Store in `docs/client_assets/` |
| 3 | LinkedIn Raw Snapshot | `LinkedIn_Profile_Database_RawSnapshot_03-02-2026.docx` | Pre-optimization profile state + analytics baseline + appreciation letter | Extract baseline metrics + Hebrew language + letter text |
| 4 | Test Results | `test-results-2026-01-30-windows-ad-v1.md` | Only actual hands-on skill evidence available | Use to upgrade `SKILLS_EVIDENCE_LEDGER.json` |
| 5 | Skills Gap Matrix | `skills-gap-analysis.csv` | 17-row structured gap analysis with drills and due dates | Use to populate NorthStar assessment queue |

---

## 2 · LinkedIn Optimization Assets (🟡 High)

These are **ready-to-execute** LinkedIn optimization packs from the legacy project.

| # | Asset | File | Purpose | Port Action |
|:---:|:---|:---|:---|:---|
| 6 | LinkedIn Paste Pack | `LinkedIn_Optimization_PastePack_Evidence_05-02-2026.docx` | Copy-paste-ready headline, about, skills for LinkedIn | Review and adapt to current NorthStar client positioning |
| 7 | LinkedIn PHD Masterclass Guide | `LinkedIn_PHD_Evidence_Masterclass_Guide_05-02-2026.docx` | Evidence-based verification steps, A/B edit protocol (24-72h checks) | Port the verification methodology into NorthStar workflow |
| 8 | Job Alert Keyword Architecture | `LinkedIn L1 IT Support Job Alert Architecture (Evidence-Based) (1).docx` | Keyword precision logic: keep/drop list for alerts | NorthStar already has equivalent in `CLIENT_BRIEF.md` §5 — cross-check for gaps |
| 9 | Keyword Optimization Guide | `LinkedIn Job Alert Keyword Optimization (1).docx` | Detailed keyword analysis for LinkedIn alerts | Reference only — NorthStar keyword model is more advanced (`knowledge_base.json`) |

---

## 3 · Strategy & Planning Assets (🟢 Reference)

Strong on design, weak on execution. Keep as context but do not treat as operational.

| # | Asset | File | Purpose | Port Action |
|:---:|:---|:---|:---|:---|
| 10 | Job Recovery Plan | `job-recovery-plan.txt` | Comprehensive 10-section plan (222KB) | Reference only — NorthStar has its own lifecycle. Extract any unique insights |
| 11 | Job Analysis Instructions | `Job_Analysis_and_Search_Instructions_IT_Helpdesk_Comeback_Correction_v1-1_22-11-2025.docx` | Hard filter definitions, QUALIFIED/HOLD/DROP/STRETCH logic | NorthStar has equivalent in `knowledge_base.json` scoring model |
| 12 | L1 Readiness Plan | `L1 IT Helpdesk Readiness and Job Recovery Plan.docx` | Structured readiness plan with outputs and indicators | Reference only — overlaps with NorthStar lifecycle |
| 13 | Skills Knowledge Database | `1. L1 IT Helpdesk Skills and Knowledge Database (Entry-Level Support).docx` | Research report on L1 skill requirements | Reference — `skills-db.txt` is the extracted text version |
| 14 | Skills DB (text) | `skills-db.txt` | Full extracted text of skills research with citations | Good reference for interview prep content |
| 15 | Doc Review Notes | `doc-review-notes.md` | "Tony's" review of legacy docs (what's strong/weak) | Already actioned — confirms legacy project had strategy but weak execution |

---

## 4 · Governance & Protocol Assets (🟡 High)

| # | Asset | File | Purpose | Port Action |
|:---:|:---|:---|:---|:---|
| 16 | Verification-First Protocol | `Project_Instructions_Verification_First_Protocol_v1_09-01-2026 (1).docx` | DOC-LOCK + Verification Gate anti-hallucination rules | Port core rules into NorthStar agent guardrails |

---

## 5 · Assessment Templates (🟡 High)

| # | Asset | File | Purpose | Port Action |
|:---:|:---|:---|:---|:---|
| 17 | Baseline Test v1 | `baseline-test-v1.md` | Employer-format test template (6 tickets + 12 rapid fire) | Use as basis for NorthStar `L1_TECHNICAL_ASSESSMENT.md` |
| 18 | Skills Database Master | `skills-database-master.md` | Readable strong/medium/weak skills overview | Reference for assessment design |

---

## 6 · Empty / Placeholder Files (⚪ Archive)

These have no extractable content. Listed for completeness.

| # | Asset | File | Status |
|:---:|:---|:---|:---|
| 19 | Gap Log | `Gap-Log.md` | Empty placeholder |
| 20 | IT Tech Guide | `IT-Tech-Guide.md` | Empty placeholder |
| 21 | LinkedIn Claims | `LinkedIn-Claims.md` | Empty placeholder |
| 22 | Job Tracker | `job-tracker.csv` | Headers only, no data |

---

## 7 · Porting Priority Queue

### Immediate (before next application cycle)

1. ✅ Merge test results into `SKILLS_EVIDENCE_LEDGER.json`
2. ✅ Add full name (Joseph Ginsberg) + Hebrew to `CLIENT_IDENTITY.json` / `CLIENT_BRIEF.md`
3. ✅ Store CV files in `docs/client_assets/`
4. ✅ Run gap-closure drills for the 5 high-impact gaps

### Near-term (within 1 week)

5. Review LinkedIn Paste Pack against current NorthStar positioning
6. Port Verification-First Protocol core rules to agent guardrails
7. Store LinkedIn baseline metrics in case log

### Optional (when time permits)

8. Extract unique insights from `job-recovery-plan.txt`
9. Review skills-db.txt for interview prep Q&A content

---

<sub>NorthStar Agency · Reusable Assets Index · 2026-02-18</sub>
