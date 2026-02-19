# Tests and Scores Index

> **Compiled by:** Opus (Project Manager)
> **Date:** 18 February 2026
> **Purpose:** Catalog all test/assessment evidence found across legacy ChatGPT project + current NorthStar

---

## 1 · Completed Tests (Evidence Exists)

| # | Test Name | Date | Type | File Path | Status |
|:---:|:---|:---|:---|:---|:---|
| 1 | Windows-only + AD Employer-style Test | 2026-01-30 | Hands-on (6 tickets + 12 rapid fire) | `docs/ChatGPT Project…/test-results-2026-01-30-windows-ad-v1.md` | ✅ Complete — results readable |

### Test 1 Detailed Breakdown

**Environment:** Windows-only + on-prem Active Directory (classic corporate)
**Duration:** ~2 hours (Jose responses in chat)

#### Part A — Ticket Responses (6 tickets)

| Ticket | Scenario | Performance | Verdict |
|:---|:---|:---|:---|
| T1 | Account lockout (domain) | Good questions, identified AD lockout + reset concept | 🟢 Medium-Strong |
| T2 | Password expired / change required | Correct approach, checked lockout + password policy | 🟢 Medium-Strong |
| T3 | Can't access file share | Decent but no share-vs-NTFS distinction | 🟡 Medium |
| T4 | Mapped drive missing | Correct concept but forgot exact steps | 🟡 Medium |
| T5 | Printer offline | Good basic steps (power/cable/ping/driver) | 🟢 Medium |
| T6 | VPN connected but no internal access | Partial steps only; no routes/DNS/split tunnel | 🔴 Weak |

#### Part B — Rapid Fire (12 questions)

| # | Topic | Result | Verdict |
|:---:|:---|:---|:---|
| R1 | DNS | Good approximation | 🟢 Medium |
| R2 | DHCP | Good description | 🟢 Medium |
| R3 | Default gateway | Correct concept ("way to internet") | 🟢 Medium |
| R4 | 169.254.x.x (APIPA) | Correctly identified | 🟢 Medium-Strong |
| R5 | TCP vs UDP | **"I don't know"** | 🔴 Gap |
| R6 | ipconfig command | Correct but limited | 🟡 Medium |
| R7 | DNS resolution command | Uncertain ("maybe ping or nslookup") | 🟡 Medium-Weak |
| R8 | Ping | Correct (tests connectivity/quality) | 🟢 Medium |
| R9 | Share vs NTFS permissions | **"No idea"** | 🔴 Gap |
| R10 | Account lockout causes | Correct | 🟢 Strong |
| R11 | AD security group | Doesn't remember; mixes with GPO | 🔴 Weak |
| R12 | VPN connected but nothing works | Doesn't remember; guesses | 🔴 Weak |

#### Summary Scores

| Domain | Level | Interview Risk |
|:---|:---|:---|
| Troubleshooting instincts | Strong | Low |
| AD lockout/reset concept | Medium | Medium |
| DHCP/APIPA/gateway | Medium | Low |
| Printer basics | Medium | Low |
| macOS Wi-Fi logic | Medium | Low |
| TCP vs UDP | **Gap** | **High** |
| Share vs NTFS permissions | **Gap** | **High** |
| VPN deep flow | **Weak** | **High** |
| Outlook/M365 modern-auth | **Weak** | **High** |
| ITSM ticket-quality format | **Weak** | **High** |

---

## 2 · Structured Gap Matrix (Evidence Exists)

| # | Assessment Name | Date | Type | File Path | Status |
|:---:|:---|:---|:---|:---|:---|
| 2 | Skills Gap Analysis CSV | 2026-01-30 (est.) | Structured matrix with drills | `docs/ChatGPT Project…/skills-gap-analysis.csv` | ✅ Complete — 17 skill rows with levels, impact, drills, due dates |

### Key fields per skill row:
- `skill_area` → `subskill` → `employer_expectation`
- `proof_from_your_answers` → `current_level` → `impact_on_hiring`
- `next_action` → `drill` → `owner` → `due_date` → `status`

### High-impact weak items (from CSV):

| Skill | Current Level | Impact on Hiring | Drill Summary |
|:---|:---|:---|:---|
| TCP vs UDP | Weak | High | Memorise practical examples; 30-sec explanation |
| Share vs NTFS permissions | Weak | High | Permissions checklist + group membership + effective access |
| VPN connected but no access | Weak | High | L1 VPN flow: IP vs FQDN, routes, DNS, split tunnel |
| Outlook password prompt loop | Weak | High | Top 5 causes + fixes (WAM/token/cred mgr/modern auth) |
| ITSM ticket notes & escalation | Weak | High | Per-ticket format: 2 questions, 5 actions, escalation, ticket note |

---

## 3 · Baseline Test Template (Available for Reuse)

| # | Asset Name | Type | File Path | Status |
|:---:|:---|:---|:---|:---|
| 3 | Baseline Test v1 (Employer-style) | Test template (6 tickets + 12 rapid fire) | `docs/ChatGPT Project…/baseline-test-v1.md` | ✅ Ready — can be used for NorthStar assessments |

**Rules:** No Google, no notes. Short answers. If don't know: write "I DON'T KNOW."

> **NorthStar recommendation:** Use this template as the basis for `assessments/L1_TECHNICAL_ASSESSMENT.md`. It is already employer-format aligned.

---

## 4 · Planned / Not Yet Completed Tests

| # | Assessment | Purpose | File Path | Status |
|:---:|:---|:---|:---|:---|
| 4 | L1 Technical Assessment | Validate L1 execution capability | `assessments/L1_TECHNICAL_ASSESSMENT.md` | ⏳ Template exists — not yet administered |
| 5 | L1 Behavioral Assessment | Validate support communication/empathy | `assessments/L1_BEHAVIORAL_ASSESSMENT.md` | ⏳ Template exists — not yet administered |
| 6 | Language Readiness Check | Validate interview language readiness | `assessments/LANGUAGE_READINESS_CHECK.md` | ⏳ Template exists — not yet administered |

**Scheduled date for all three:** 2026-02-20 (per `CLIENT_BRIEF.md` §8)

---

## 5 · Skills Database Master (Overview)

| # | Asset Name | Type | File Path | Status |
|:---:|:---|:---|:---|:---|
| 7 | L1 Skills Database — MASTER | Readable skill overview with ratings | `docs/ChatGPT Project…/skills-database-master.md` | ✅ Present — compact readable summary |

### Snapshot (from legacy master):

**Strong:** Troubleshooting mindset / sequencing

**Medium (rusty):** Windows account/access basics, basic networking, macOS Wi-Fi, printers, security phishing response

**Weak (interview-risk):** TCP vs UDP, MFA, Outlook auth loop, VPN deep flow, share vs NTFS, ITSM ticket format

**Top 5 gaps to fix first:**
1. Ticket-style answering (employer format)
2. Networking core: TCP vs UDP, DNS/DHCP, gateway
3. M365 auth issues: Outlook/Teams sign-in loop
4. VPN troubleshooting flow
5. Permissions: share vs NTFS + AD groups

---

## 6 · Recommendations for NorthStar

1. **Import test results into `SKILLS_EVIDENCE_LEDGER.json`** — Upgrade 4 skills from `unknown` to `probable` or `gap` based on actual test data.
2. **Run the NorthStar assessments (scheduled 2026-02-20)** — Use legacy baseline-test-v1 as format reference.
3. **Prioritize the 5 high-impact gaps** — These are the exact areas where interview failure is most likely.
4. **Create a pre-application gap-closure drill sequence** before submitting any applications.

---

<sub>NorthStar Agency · Tests and Scores Index · 2026-02-18</sub>
