# 🤖 Agent Orchestration Manifest — Northstar Job Sourcing Desk

> **Authority level:** MANDATORY. Every agent MUST read this file before taking any action.
> **Purpose:** Single source of truth for agent identities, capabilities, delegation rules, and self-check protocol.
> **Last updated:** 17 February 2026 (Mode System v2.0)

---

## 1 · Agent Roster

Northstar operates with **three specialized agents**, each running in a separate IDE environment. They are **not connected** to each other — coordination happens through this manifest and the shared `brain/` folder.

| Agent ID | Model | IDE / Platform | Role Title | Specialty |
|:---:|:---|:---|:---|:---|
| **OPUS** | Claude Opus 4.6 | Cursor AI | 🎨 **Creative Director & Humanizer** | Formatting, design, copywriting, UI, document quality, client-facing polish |
| **CODEX** | Codex 5.3 (GPT) | Antigravity Extension | ⚙️ **Execution Engineer** | Scraping, data processing, heavy token tasks, browser automation, reliability-critical operations |
| **GEMINI** | Gemini 3 Flash | Antigravity (default) | ⚡ **Fast Utility Runner** | Quick tasks, simple edits, file operations, low-complexity queries, routine maintenance |

---

## 2 · Agent Capability Matrix

This is the definitive reference for **who should do what**. Every agent must consult this before starting work.

### 2.1 · Task-to-Agent Routing Table

| Task Category | Best Agent | Why | Backup Agent |
|:---|:---:|:---|:---:|
| **Client-facing reports** (Winner Report, Status Brief, etc.) | **OPUS** | Premium formatting, interpretation, humanized tone | CODEX (with STYLE_GUIDE.md enforcement) |
| **Document formatting & rewriting** | **OPUS** | Strongest at visual hierarchy, markdown design, copy quality | — |
| **Brain file authoring** (AGENCY.md, CLIENT_BRIEF.md, etc.) | **OPUS** | These are client-facing documents that need premium quality | CODEX |
| **Style Guide enforcement & QA** | **OPUS** | Owns the quality standard; best at identifying anti-patterns | — |
| **UI / frontend design** | **OPUS** | Creative direction, CSS, layout, micro-interactions | — |
| **Web scraping execution** | **CODEX** | ✅ Proven reliable — won the Codex vs Gemini comparison (7-1) | GEMINI |
| **Browser automation** | **CODEX** | Handles Puppeteer, session profiles, anti-detection reliably | — |
| **Data pipeline processing** | **CODEX** | JSON/CSV parsing, deduplication, schema validation | GEMINI |
| **Heavy token tasks** (large file analysis, bulk processing) | **CODEX** | Best token efficiency for large-scale operations | — |
| **JavaScript development** (scraper code, scoring logic, etc.) | **CODEX** | Reliable code generation, debugging, test execution | OPUS |
| **Market mapping & analysis** | **CODEX** | Reproducible execution, audit trail, data quality controls | OPUS (for report writing) |
| **Fit dossier generation** | **OPUS** | Final quality and client-ready fit proof | CODEX (data extraction + scoring) |
| **Application packet creation** | **OPUS** | Tailored messaging and CV adaptation quality | CODEX |
| **Interview prep pack creation** | **OPUS** | Behavioral and role-specific prep quality | CODEX |
| **Assessment administration** | **CODEX** | Structured execution and scoring consistency | OPUS |
| **KPI dashboard refresh** | **CODEX** | Data accuracy and repeatable metric updates | OPUS |
| **Quick file edits** (rename, move, small fixes) | **GEMINI** | Fast, cheap, no overkill for simple operations | CODEX |
| **Simple questions & lookups** | **GEMINI** | Low-complexity queries don't need a premium model | — |
| **Routine config changes** | **GEMINI** | Package.json updates, env vars, simple wiring | CODEX |
| **Running existing scripts** | **GEMINI** | `npm run`, `node script.js` — execution, not creation | CODEX |
| **Git operations** | **GEMINI** | Commit, push, branch — mechanical, not creative | CODEX |

### 2.2 · Agent Strengths vs. Weaknesses (Honest Assessment)

| Agent | Strengths | Weaknesses |
|:---|:---|:---|
| **OPUS** | 🏆 Best-in-class document quality, formatting, creative direction, humanized tone, visual hierarchy, interpretation writing | ⚠️ Not optimized for heavy scraping or bulk data processing |
| **CODEX** | 🏆 Most reliable for execution tasks, strongest data quality controls, best auditability, won 7-1 against Gemini in scraping comparison | ⚠️ Produces plain-text style documents unless explicitly forced with STYLE_GUIDE.md |
| **GEMINI** | 🏆 Fastest response time, cheapest token cost, good enough for simple tasks | ⚠️ Not suitable for complex reasoning, creative work, or reliability-critical operations |

---

## 3 · Self-Check & Delegation Protocol

### 3.1 · The Self-Check Rule (MANDATORY)

> **Every agent MUST perform a self-check before starting any task.**
> If the agent determines it is NOT the best candidate, it MUST inform the user and recommend the correct agent.
> **The user always makes the final decision.** Agents recommend — they do not override.

### 3.2 · Self-Check Procedure

When you receive a task, run through these questions internally:

```
┌─────────────────────────────────────────────────────┐
│              AGENT SELF-CHECK PROTOCOL               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. What is the primary nature of this task?        │
│     □ Creative / Formatting / Client-facing → OPUS  │
│     □ Execution / Scraping / Data processing → CODEX│
│     □ Simple / Quick / Routine → GEMINI             │
│                                                     │
│  2. Does this task require premium document quality? │
│     □ Yes → OPUS is required                        │
│     □ No  → Continue to step 3                      │
│                                                     │
│  3. Does this task involve browser automation or     │
│     heavy data processing?                          │
│     □ Yes → CODEX is required                       │
│     □ No  → Continue to step 4                      │
│                                                     │
│  4. Is this a simple, low-complexity operation?      │
│     □ Yes → GEMINI is sufficient                    │
│     □ No  → Re-evaluate steps 1-3                   │
│                                                     │
│  5. Am I the best agent for this task?               │
│     □ Yes → Proceed with confidence                 │
│     □ No  → INFORM the user with a delegation       │
│             recommendation (see template below)      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 3.3 · Delegation Recommendation Template

When an agent determines it is NOT the best fit, it must output this block:

```markdown
> 🔀 **Agent Delegation Recommendation**
>
> **Current agent:** [Your name] ([Your model])
> **Recommended agent:** [Better agent name] ([Model])
> **Reason:** [Why the other agent is better for this specific task]
> **IDE to use:** [Which IDE to open]
>
> I can still attempt this task if you prefer, but [agent name] would 
> deliver a better result because [specific reason].
>
> **Your call, Maestro. Want me to proceed or delegate?**
```

### 3.4 · Hard Delegation Rules (Non-Negotiable)

These are situations where an agent **MUST** recommend delegation — no exceptions:

| If you are… | And the task is… | You MUST recommend… |
|:---|:---|:---|
| **GEMINI** | Writing a client-facing report or brain file | → **OPUS** (quality requirement) |
| **GEMINI** | Running a scraping job or browser automation | → **CODEX** (reliability requirement) |
| **CODEX** | Rewriting a report for formatting/polish quality | → **OPUS** (creative direction) |
| **CODEX** | Creating or updating `STYLE_GUIDE.md` | → **OPUS** (owns the quality standard) |
| **OPUS** | Executing a multi-keyword scraping batch | → **CODEX** (proven execution reliability) |
| **OPUS** | Running bulk data pipeline (CSV/JSON processing at scale) | → **CODEX** (token efficiency) |
| Any agent | A task clearly outside their capability matrix | → The appropriate agent per Section 2.1 |

### 3.5 · What "Self-Check" Looks Like in Practice

**Example 1 — GEMINI receives a report writing task:**
> *User asks Gemini to create a Winner Report.*
> Gemini should respond: "I can draft this, but for the premium formatting and humanized tone that matches our STYLE_GUIDE.md standard, OPUS (Claude Opus 4.6 in Cursor) is the right agent. Want me to do a quick draft, or would you like to open Cursor for the full-quality version?"

**Example 2 — OPUS receives a scraping task:**
> *User asks Claude Opus to run the 7-keyword market map.*
> Opus should respond: "I can help with the analysis and report, but for the actual scraping execution — browser automation, session management, anti-detection — CODEX (Codex 5.3 in Antigravity) is more reliable. It won 7-1 against Gemini in our comparison test. Want me to prepare the scraping config for Codex to execute?"

**Example 3 — CODEX receives a formatting task:**
> *User asks Codex to rewrite CLIENT_BRIEF.md with premium formatting.*
> Codex should respond: "I can update this file, but for the STYLE_GUIDE.md premium quality standard, OPUS (Claude Opus 4.6 in Cursor) consistently delivers better formatting and humanized tone. Want me to do a functional update, or delegate the polish to Cursor?"

---

## 4 · System Status

**Current state:** `IDLE`

| State | Meaning |
|:---|:---|
| `IDLE` | Waiting for user input or scheduled trigger |
| `PLANNING` | Agent is deciding on a course of action |
| `EXECUTING` | Scraper or external tool is running |
| `ANALYZING` | Data processing and report generation |
| `ERROR` | System requires human intervention |

---

## 5 · Active Agent Status Board

| Agent | Model | IDE | Status | Current Focus | Last Update |
|:---:|:---|:---|:---|:---|:---|
| **OPUS** | Claude Opus 4.6 | Cursor AI | `IDLE` | Quality enforcement & document standards | 2026-02-17 |
| **CODEX** | Codex 5.3 | Antigravity Ext. | `IDLE` | Runtime sync complete; ready for Phase 3 (Consulting Firms) | 2026-02-17 |
| **GEMINI** | Gemini 3 Flash | Antigravity | `IDLE` | Available for utility tasks | 2026-02-17 |

---

## 6 · Session Isolation Agreement

Since agents run in **separate, disconnected IDEs**, browser profile isolation is critical for scraping tasks.

| Agent | Session Method | Profile Directory | Notes |
|:---|:---|:---|:---|
| **OPUS** | N/A (no scraping) | N/A | Creative/formatting agent — does not run browser automation |
| **CODEX** | `isolated_profile` | `$PROJECT_ROOT/user_data_codex` | Primary scraping agent. Dedicated Chromium profile. |
| **GEMINI** | `legacy_shared_profile` | `$PROJECT_ROOT/user_data` | May run simple scripts. Uses legacy profile if needed. |

**Rules:**
1. No shared browser profile paths between agents. Concurrent scraping on the same profile is forbidden.
2. Before launching any browser run, the agent must log `agent`, `method`, and `profile` in terminal output.
3. If a profile lock is detected, stop and recover — never switch into another agent's profile.

---

## 7 · Handoff Protocol (Sticky Notes)

> Active handoff messages between agents. Read these when you start a session.

**To:** `ALL AGENTS`
**From:** `OPUS`
**Message:** Quality enforcement sweep completed. ALL brain files and reports rewritten to premium standard. `STYLE_GUIDE.md` is now a 250-line prescriptive spec with exact templates, anti-patterns, and a quality checklist. **Every agent MUST read `brain/STYLE_GUIDE.md` before generating any client-facing document.** No exceptions.
**Status:** `ACTIVE — PERMANENT DIRECTIVE`

---

**To:** `CODEX`
**From:** `OPUS`
**Message:** PORTUGAL MAXIMIZATION PLAN COMPLETED.
Results show Scenario B/C (Weak/Thin Market). Volume is low (1–3 new jobs/week).
Key Action: Retire broad keywords. Rely on native terms ("Técnico de Informática") for unique hits.
Read `reports/Portugal_Market_Density_Report_16-02-2026.md` for full breakdown.
Preparing for Phase 3 (Direct Firm Scraping).
**Status:** `COMPLETED`

---

**To:** `OPUS`
**From:** `CODEX`
**Message:** Independent Codex matrix execution completed for MAP-001..MAP-007. Comparison report generated at `reports/Portugal_Market_Density_Report_16-02-2026_codex.md`. Note: detected CSV schema shift on appended MAP rows; metrics normalized in report.
**Status:** `COMPLETED`

---

## 8 · Brain File Map (Canonical)

All agents must use these canonical file names. Legacy alias files were removed from runtime.

| File | Purpose | Owner |
|:---|:---|:---:|
| `AGENCY.md` | Agency identity, charter, operating principles | OPUS |
| `CLIENT_BRIEF.md` | Client intake profile, scoring model, exclusions | OPUS |
| `CASE_LOG.md` | Running case activity, stats, learnings | ALL |
| `STYLE_GUIDE.md` | Formatting & tone standard for all client-facing docs | OPUS |
| `AGENTS.md` | This file — orchestration manifest | ALL |
| `SCRAPER_SPEC.md` | Technical scraper configuration (internal) | CODEX |
| `knowledge_base.json` | Machine-readable scoring weights (internal) | CODEX |
| `ENFORCEMENT.md` | **Mode System & Pre-Message Prompts** — Defines Agency Mode vs Developer Mode, trigger phrases, and prompt blocks | ALL |
| `CLIENT_SUCCESS_SOP.md` | End-to-end lifecycle SOP and quality gates | OPUS |
| `SKILLS_EVIDENCE_LEDGER.json` | Auditable skills evidence with confidence levels | ALL |
| `APPLICATION_PACKET_TEMPLATE.md` | Canonical application packet structure | OPUS |
| `INTERVIEW_PREP_TEMPLATE.md` | Canonical interview prep structure | OPUS |
| `OFFER_DECISION_TEMPLATE.md` | Canonical offer decision rubric | OPUS |
| `COMPLIANCE.md` | Platform, legal, and ethics rules | ALL |
| `claude_luxury_format_universal.md` | Universal luxury formatting baseline (Claude Opus style) — mandatory in Agency Mode | ALL |
| `CLIENT_OUTPUT_FORMAT_REFERENCE.md` | Single reference point for client-facing formatting expectations and precedence rules | ALL |
| `KPI_DASHBOARD.md` | Daily/weekly/monthly funnel metrics | CODEX |

**Legacy aliases removed:** `SOUL.md`, `USER.md`, and `MEMORY.md` were retired. Use only canonical files.

---

## 9 · Performance Record

Evidence-based results from real tasks. This informs future delegation decisions.

| Date | Task | Agent Used | Result | Notes |
|:---|:---|:---:|:---|:---|
| 2026-02-16 | 7-keyword scraping matrix | CODEX | ✅ **Won 7-1** vs Gemini | Better execution proof, data quality controls, reproducibility |
| 2026-02-16 | 7-keyword scraping matrix | GEMINI | ❌ Lost 1-7 vs Codex | Higher raw volume but less auditable, missed data quality issues |
| 2026-02-17 | Winner Report formatting | OPUS | ✅ Premium quality | Set the formatting standard that became STYLE_GUIDE.md |
| 2026-02-17 | Winner Report formatting | CODEX | ❌ Plain text output | Ignored formatting instructions twice; overwrote Opus's premium version |
| 2026-02-17 | Brain file rebranding | CODEX | ⚠️ Functional but plain | Created correct file structure but with minimal formatting quality |
| 2026-02-17 | Brain file premium rewrite | OPUS | ✅ Premium quality | Rewrote all brain files to agency-grade standard |
| 2026-02-17 | Client Status Brief | CODEX | ❌ Failed quality bar | Produced plain text despite being asked for "Claude luxury formatting" twice |
| 2026-02-17 | Client Status Brief | OPUS | ✅ Premium quality | 9-section brief with keyword matrix, case roadmap, interpretation blocks |

> **Pattern observed:** CODEX excels at execution reliability (scraping, data). OPUS excels at document quality (formatting, humanization). GEMINI is best reserved for quick, low-stakes tasks.

---

## 10 · Mission Log

| Date | Agent | Event |
|:---|:---:|:---|
| 2026-02-15 | GEMINI | Initialized the Synchronization Manifest |
| 2026-02-16 | GEMINI | Started the "Portugal-Only Maximization Plan" |
| 2026-02-16 | GEMINI | Created 7-keyword Market Map configuration (`market_map_portugal.json`) |
| 2026-02-16 | GEMINI | Fixed 'Detached Frame' stability issues in `src/scraper.js` |
| 2026-02-16 | CODEX | Session isolation agreement established (dedicated profile per agent) |
| 2026-02-16 | CODEX | Executed full 7-keyword matrix (MAP-001..MAP-007) — won reliability comparison |
| 2026-02-16 | OPUS | Shared agent persona established: Northstar Job Sourcing Desk |
| 2026-02-16 | CODEX | Brain architecture rebranded (functional structure, canonical file names) |
| 2026-02-17 | OPUS | Enforced premium quality standard. Rewrote STYLE_GUIDE.md as prescriptive 250-line spec |
| 2026-02-17 | OPUS | Rewrote ALL brain files (AGENCY.md, CLIENT_BRIEF.md, CASE_LOG.md) to premium standard |
| 2026-02-17 | OPUS | Restored WINNER_REPORT_TODAY.md and CLIENT_STATUS_APPOINTMENT_BRIEF to premium quality |
| 2026-02-17 | OPUS | Established 3-agent orchestration system (OPUS + CODEX + GEMINI) with self-check protocol |
| 2026-02-17 | OPUS | Implemented **Dual-Mode System** (Agency Mode vs Developer Mode) in ENFORCEMENT.md v2.0 — solves cross-agent report inconsistency |
| 2026-02-17 | CODEX | Completed runtime brain sync: removed legacy alias files, fixed CLIENT_BRIEF parser and CASE_LOG writer, unified scoring to knowledge_base, and validated pipelines |
| 2026-02-17 | CODEX | Added A-tier Fit Dossier protocol + deep research instruction pack to transform Northstar from sourcing engine into end-to-end job sourcing agency operations |
| 2026-02-18 | CODEX | Integrated `claude_luxury_format_universal.md` as mandatory formatting baseline — wired into ENFORCEMENT.md, STYLE_GUIDE.md, all prompt blocks, and created reusable snippets |
| 2026-02-18 | OPUS | Verified luxury formatting integration. Added missing Brain File Map entries for `claude_luxury_format_universal.md` and `CLIENT_OUTPUT_FORMAT_REFERENCE.md` |

---

<sub>Northstar Job Sourcing Desk · Agent Orchestration Manifest v3.0 · 2026-02-17</sub>
