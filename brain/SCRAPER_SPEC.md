# LinkedIn IT Job Finder — Technical Spec (L1 IT Support) ✅
Subtitle: Developer-ready spec + knowledge package + scoring logic

---

This package converts the current manual workflow into a repeatable, auditable LinkedIn job-intelligence sourcing engine.

It is optimized for **entry-level / L1 IT Support**, and designed to **iterate keywords until it finds APPLY-grade jobs**, even when initial runs produce zero signal.

Version: **v1.0**
Date: **16-02-2026**
Owner: **Maestro (Joseph Ginsberg)**

---

## 1) System Overview

### 1.1 Goal
Daily, automated loop:

1. Search LinkedIn jobs by **keyword + location + filters**
2. Scrape job cards + open each job detail page (as needed)
3. Score each job against the **USER Knowledge Profile**
4. Produce:
   • Tier report (S/A/B/C/D)  
   • Overlap metrics across keywords  
   • Keyword fitness decision (KEEP / TUNE / RETIRE)  
   • **Next scraping task plan** (what to try next, automatically)

### 1.2 Core Inputs (from memory files)
• `CLIENT_BRIEF.md` — client profile + weighted skills + exclusions  
• `AGENCY.md` + `STYLE_GUIDE.md` — agency behavior, tone, and report standards  
• `AGENTS.md` — multi-agent state + handoff protocol  
• `CASE_LOG.md` — long-term case stats + blacklist/whitelist + run learnings  

### 1.3 Core Output Artifacts
• `LI_Keyword_Report__<keyword>__<location>__<dd-mm-yyyy>.md`  
• `runs/<run_id>.json` (raw scrape)  
• `brain/CASE_LOG.md` (updated counters + learned lists)  
• `knowledge_base.json` (machine-consumable profile + rules)

---

## 2) Data Model

### 2.1 JobCard (minimum)
```json
{
  "run_id": "2026-02-16__pt__junior-helpdesk__past_week",
  "keyword": "Junior Helpdesk",
  "search_url": "https://www.linkedin.com/jobs/search/…",
  "scraped_at": "2026-02-16T19:00:00+00:00",
  "job_id": "1234567890",
  "job_url": "https://www.linkedin.com/jobs/view/1234567890/",
  "title": "Service Desk Analyst",
  "company": "Fujitsu",
  "location_raw": "Lisboa, Portugal",
  "workplace_type": "On-site|Hybrid|Remote|Unknown",
  "posted_time_raw": "3 days ago",
  "easy_apply": false,
  "description_raw": "…optional if opened…",
  "language_signals": ["German"],
  "seniority_signals": ["Junior"],
  "metadata": {
    "employment_type": "Full-time|Contract|Unknown",
    "experience_level": "Entry|Associate|Mid|Unknown"
  }
}
```

### 2.2 NormalizedJob (post-parse)
```json
{
  "job_id": "1234567890",
  "canonical_key": "1234567890",
  "title_norm": "service desk analyst",
  "company_norm": "fujitsu",
  "location_norm": "portugal",
  "language_required": ["de"],
  "years_required_min": 0,
  "is_l1_family": true,
  "scores": {
    "relevance": 41,
    "language": -10,
    "seniority": 0,
    "total": 31
  },
  "tier": "C",
  "reasons": [
    "Matched L1 family: service desk",
    "Matched core skill: Microsoft 365",
    "Penalty: language_required=DE"
  ]
}
```

### 2.3 Memory State
Fields to persist per keyword:
```json
{
  "keyword": "Junior Helpdesk",
  "location": "Portugal",
  "filters_hash": "entry|associate|past_week|on-site|hybrid",
  "runs": [
    {
      "run_id": "…",
      "date": "16-02-2026",
      "jobs_scraped": 22,
      "unique_jobs": 22,
      "overlap_rate": 0.45,
      "signal_rate": 0.09,
      "decision": "TUNE",
      "notes": "Dominated by language-restricted vendor roles"
    }
  ],
  "evergreen_status": "KEEP|TUNE|RETIRE"
}
```

---

## 3) Scrape Workflow (Deterministic)

### 3.1 Build Search URL
Inputs:
• keyword  
• geo (Portugal / Lisbon)  
• time range (Past week)  
• workplace type (On-site, Hybrid, Remote)  
• experience level (Entry, Associate)

**Rule:** Prefer URL param enforcement. If DOM chips not detected, log drift warning but proceed.

### 3.2 Extract Job Cards
For each card:
• job_id (from link)  
• title, company, location  
• posted time  
• easy apply flag  
• workplace type if visible  
Store raw HTML snippet for debugging (optional).

### 3.3 Open Job Detail Page (conditional)
Open details when any of these is true:
• job is borderline (score near threshold)  
• title is ambiguous (“Technical Support Specialist”)  
• language is unclear  
• years required unclear  
Otherwise keep card-level only.

### 3.4 Deduplication (Critical Fix)
The test report showed `Unique Jobs: 0` with `Overlap: 100%`. That typically indicates the dedupe function is comparing against an empty/incorrect baseline or writing zeroed unique counters.

**Required fix:**
• Canonical job identity = `job_id` extracted from `/jobs/view/<id>/`  
• UniqueJobsInRun = count distinct `job_id` within the run  
• OverlapAcrossKeywords = compare job_ids against prior runs’ job_ids

---

## 4) Scoring & Tiering

### 4.1 Hard Disqualifiers (Decision Tree)
If any hard rule triggers ⇒ Tier = **D** (hard no), skip soft scoring.

Hard rules derived from USER preferences/exclusions:
• If title/description contains seniority like `senior`, `lead`, `principal`, `manager`  
• If years_required_min >= 4 or contains “5+ years”  
• If role family is clearly off-target: Sales, Call Center-only, DevOps, Java Developer  
• If language required includes DE/FR/NL/IT/ES (unless user language profile includes it)
• **PORTUGUESE-MANDATORY → TIER D HARD BLOCK:**
  José speaks A1 Portuguese only. Hard block triggers on: "fluente em Português", "português fluente", "fluência em Português", "português obrigatório", "fluent Portuguese", "Portuguese required", "Portuguese mandatory".
  Exception (soft -10 penalty only): phrase is qualified by "nice to have", "is a plus", "valorizado", "preferred".
  Detection order: check exception modifier FIRST → if none found → hard block → Tier D. No override.

### 4.1.1 Experience Pattern Parsing (PT/EN)
The scorer must parse both English and Portuguese/French-style expressions:
- `3+ years`, `2-3 years`
- `2 anos`, `3+ de experiência`
- `d'experience` variants from multilingual postings

Canonical regex used in runtime:
`/(\\d+)\\s*(?:\\+|-\\s*\\d+)?\\s*(?:years?|anos?|de experiência|d['']expérience)/i`

### 4.2 Positive Match Scoring
Use weighted keywords from `CLIENT_BRIEF.md` (High/Medium) plus role-family anchors.

**Role-family anchors (high weight):**
• help desk, service desk, desktop support, IT support, support technician

**Core skills (high weight):**
• Windows 10/11, Microsoft 365, Active Directory, ticketing (Jira/ServiceNow)

### 4.3 Penalties
• Missing target languages (DE/FR/etc): -10  
• “Application Support” or “Product Support” (not L1 end-user): -3 (soft penalty, not disqualifier)  
• BPO / outsourcing farms: -2 (soft, unless clearly call-center only)

### 4.4 Tier Mapping
• **S**: total >= 80 AND no hard flags  
• **A**: 65–79 AND no hard flags  
• **B**: 50–64  
• **C**: 35–49  
• **D**: <35 OR any hard disqualifier

---

## 5) Continuous Keyword Improvement Loop (Non-Stop Until Signal)

### 5.1 Keyword Fitness Decision
Compute:
• signal_rate = (S + A) / total  
• overlap_rate = jobs_seen_before / total  
• unique_count = distinct job_ids in run

Decision:
• KEEP — signal_rate ≥ 0.10 AND overlap_rate ≤ 0.60  
• TUNE — signal_rate < 0.10 but keyword is conceptually aligned  
• RETIRE — signal_rate = 0 AND overlap_rate ≥ 0.80 across 2 runs

### 5.2 Automatic Next-Run Planner (what to try after failure)
If decision is RETIRE or TUNE, generate next scraping tasks from this hierarchy:

1) **Tighten role-family anchors**
   • Replace “Junior Helpdesk” with “Service Desk Analyst”, “Help Desk Technician”, “IT Support Technician”, “Desktop Support”

2) **Add Portuguese title variants**
   • “Suporte Técnico”, “Técnico de Informática”, “Service Desk” (PT market uses EN tokens too)

3) **Add negative filters (if supported by URL)**
   • NOT German, NOT French, NOT Dutch (or apply as scoring penalties only)

4) **Split geo scope**
   • Portugal vs Lisbon only (or Lisbon + 50 km)

5) **Company pattern learning**
   • If repeated vendor language roles dominate (e.g., Fujitsu multilingual), add pattern tag: `vendor_multilang_cluster`
   • Keep roles only if user language includes requirement

Planner output format:
```json
{
  "why_last_run_failed": [
    "signal_rate=0.00",
    "overlap_rate=1.00",
    "dominated_by_language_restricted_vendor_roles"
  ],
  "next_tasks_ranked": [
    {"keyword": "Service Desk Analyst", "reason": "Higher precision title anchor"},
    {"keyword": "Help Desk Technician", "reason": "Common recruiter token"},
    {"keyword": "Suporte Técnico", "reason": "Local PT postings"},
    {"keyword": "Desktop Support", "reason": "Adjacent L1 family"}
  ]
}
```

---

## 6) Report Template (Must Include Next Plan)

Each keyword report MUST include:

A) Metadata  
B) Signal vs Noise  
C) Pattern Findings  
D) Top Opportunities (S/A)  
E) Disqualifications  
F) Keyword Improvements  
G) Data Fixes  
H) **Next Scraping Plan** (auto-generated)

**H) Next Scraping Plan — required fields**
• `cause_of_failure` (bullet list)  
• `new_keywords_to_try` (ranked, 3–8)  
• `filters_to_change` (only if drift detected)  
• `scoring_tweaks` (only if repeated false negatives)  
• `stop_condition` (when to retire keyword)

---

## 7) Implementation Notes (Developer)

### 7.1 Modules
• `crawler/linkedin.ts` — login/session, navigation, rate limiting  
• `extract/jobCards.ts` — list extraction  
• `extract/jobDetail.ts` — detail extraction  
• `normalize/parse.ts` — years/language/role-family inference  
• `score/scoring.ts` — decision tree + weighted scoring  
• `report/renderMarkdown.ts` — report writer  
• `memory/store.ts` — read/write memory + run history  
• `planner/nextTasks.ts` — continuous improvement logic

### 7.2 Reliability
• DOM drift detection: selectors versioned, screenshot-on-error  
• Backoff & retry: exponential for failed navigations  
• Audit trail: keep raw snippets for every job_id

---

## 8) File Summaries (What to extract into the scraper)

### CLIENT_BRIEF.md
• Identity + target role + location + language + exclusions  
• Weighted skills list and disqualifiers

### AGENCY.md + STYLE_GUIDE.md
• Agent principles: precision, proactive analysis, adaptive learning

### AGENTS.md
• System states (`IDLE/PLANNING/EXECUTING/ANALYZING/ERROR`)  
• Handoff protocol between agents

### CASE_LOG.md
• Stats counters (jobs scraped/applications)  
• Blacklist/whitelist + learnings timeline

### LinkedIn_Profile_Database_RawSnapshot_03-02-2026.docx
• Real profile headline/about/experience text to generate canonical skill anchors

### LinkedIn_Optimization_PastePack_Evidence_05-02-2026.docx
• Canonical skill list and copy-paste-ready wording; avoid non-canonical skills

### LinkedIn_PHD_Evidence_Masterclass_Guide_05-02-2026.docx
• Principle: skills taxonomy + inferred skills from text; reinforce across surfaces

---

## 9) Acceptance Criteria
A run is “successful” if:
• `unique_jobs_in_run >= 10`  
• `job_id` present for 100% of cards  
• report includes **Next Scraping Plan**  
• memory updated with run stats  
• dedupe and overlap metrics are non-zero and consistent
