# Client Profile — Single Source of Truth

> **Status:** Canonical reference document
> **Origin:** Extracted from legacy ChatGPT project (22 files) + current NorthStar brain
> **Compiled by:** Opus (Project Manager)
> **Date:** 18 February 2026
> **Confidence methodology:** Each fact is tagged with its source and confidence level

---

## 1 · Identity

| Field | Value | Source | Confidence |
|:---|:---|:---|:---|
| Full name | Joseph Ginsberg | CV + LinkedIn snapshot | ✅ Confirmed |
| Working name (project) | José | NorthStar convention | ✅ Confirmed |
| Location | Lisbon, Portugal | CV + LinkedIn snapshot | ✅ Confirmed |
| Citizenship | Portuguese citizen | CV + LinkedIn snapshot | ✅ Confirmed |
| Work authorization | EU-wide (Portuguese passport) | CV inference | 🟡 Probable |
| Availability | Immediate | Project context | 🟡 Probable |
| Work model | Remote preferred · Hybrid accepted · On-site accepted for strong fit | CLIENT_BRIEF.md | ✅ Confirmed |

---

## 2 · Target Positioning

| Field | Value | Source |
|:---|:---|:---|
| Primary target | Junior / L1 IT Support, Helpdesk, Service Desk, Desktop Support | CV + CLIENT_BRIEF.md |
| Open-to titles (LinkedIn) | Help Desk Technician · Technical Support Specialist · IT Help Desk Technician · IT Support Specialist · Desktop Support Technician | LinkedIn snapshot |
| Priority region | Portugal | CLIENT_BRIEF.md |
| Headline (LinkedIn, snapshot) | "Remote IT Support Specialist \| Windows 10/11 • M365 • AD • VPN \| 10+ yrs helpdesk…" | LinkedIn snapshot (03-02-2026) |

---

## 3 · Languages

| Language | Level | Source | Confidence |
|:---|:---|:---|:---|
| English | Fluent (working language) | Project interactions + CV | ✅ Confirmed |
| Portuguese | Native / fluent | CV (Lisbon-based, Portuguese citizen) | 🟡 Probable — needs LANGUAGE_READINESS_CHECK |
| Hebrew | Functional (lived/worked in Israel 2010–2020) | LinkedIn snapshot | 🟡 Probable — not verified in NorthStar |

> **⚠️ NorthStar gap:** Current `CLIENT_BRIEF.md` lists only English + Portuguese. Hebrew should be added as a known language.

---

## 4 · Work History Timeline

| Period | Role | Employer | Location | Type | Source | Confidence |
|:---|:---|:---|:---|:---|:---|:---|
| 2010–2014 | IT Technician | Techninet IT Services | Israel | On-site | CV | ✅ Confirmed |
| 2014–2020 | IT Help Desk Technician | Dr. Shlomo Cohen & Co (via Hi-NetWorks) | Israel | On-site | CV | ✅ Confirmed |
| 2020–present | Freelance Remote IT Support | Independent (SMBs in legal/consulting/e-commerce) | Portugal (remote) | Remote | CV + LinkedIn snapshot | ✅ Confirmed |

### Key scope details from CV:

- **Techninet (2010–2014):** Tier 1 support across SMB clients. Installations, configs, printers, VPNs, antivirus. Assisted migrations and early M365 adoption.
- **Dr. Shlomo Cohen (2014–2020):** Tier 1–2 support for **100+ legal staff**. Outlook/Exchange, VPN, printers, file shares, AD permissions, basic GPO-driven settings.
- **Freelance (2020–present):** Remote L1/L2 support for SMBs across EU and Israel. Legal, consulting, e-commerce sectors.

### Education:

- **Ness College — Ness Technologies (Israel):** Computer Technician Diploma. PC hardware, Windows OS, basic networking, end-user support.

---

## 5 · Quantified Claims (From CV / LinkedIn)

These are self-reported metrics. Use with caution in applications — treat as **claimed-unverified** unless double-sourced.

| Claim | Source | Confidence | NorthStar action |
|:---|:---|:---|:---|
| 20–30+ tickets/week (freelance) | CV + LinkedIn snapshot | 🟡 Claimed — not independently verified | Can use in CV copy; flag as "self-reported" in evidence ledger |
| ~25% repeat-ticket reduction via SOPs | CV + LinkedIn snapshot | 🟡 Claimed — not independently verified | Same |
| 90%+ SLA / FCR (freelance period) | CV + LinkedIn snapshot | 🟡 Claimed — not independently verified | Same |
| 95%+ SLA (2014–2020 role) | CV + LinkedIn snapshot | 🟡 Claimed — not independently verified | Same |
| 100+ staff supported (legal firm) | CV | 🟡 Probable — common in legal firm context | Same |

---

## 6 · Tool Stack & Platforms

Repeated across CV + LinkedIn snapshot — high confidence.

| Category | Tools | Source |
|:---|:---|:---|
| Operating Systems | Windows 10/11, macOS | CV + LinkedIn |
| Microsoft Stack | M365 admin (Exchange Online, OneDrive, SharePoint, Teams) | CV + LinkedIn |
| Identity / Access | Active Directory basics (users/groups, password resets, account unlocks) | CV + LinkedIn + test results |
| Remote Support | AnyDesk, TeamViewer, RDP | CV + LinkedIn |
| Connectivity | VPN troubleshooting, Wi-Fi, basic networking (DNS/IP) | CV + LinkedIn |
| Ticketing / ITSM | Jira, Zendesk (and "internal boards") | CV + LinkedIn |

### Common ticket types handled:

- Account setup / unlock
- MFA / password resets
- Outlook / Exchange issues
- Wi-Fi / VPN connectivity
- File share permissions
- Printers
- User onboarding

---

## 7 · Personality & Soft-Skill Evidence

| Trait | Evidence | Source | Confidence |
|:---|:---|:---|:---|
| Calm / no-drama | External appreciation letter text | LinkedIn snapshot (embedded letter) | 🟡 Probable (unverified author) |
| Responsive | Same letter | Same | 🟡 Probable |
| Clear explanations | Same letter | Same | 🟡 Probable |
| Strong follow-through | Same letter | Same | 🟡 Probable |

> **Note:** This appreciation letter was embedded in the LinkedIn raw snapshot and describes José's working style from a client perspective. Valuable for interview STAR stories.

---

## 8 · LinkedIn Baseline (Snapshot 03-02-2026)

| Metric | Value | Source |
|:---|:---|:---|
| Profile views (7-day) | 5 | LinkedIn snapshot |
| Search appearances (7-day) | 9 | LinkedIn snapshot |
| Post impressions | 0 | LinkedIn snapshot |
| Date of snapshot | 03 February 2026 | File timestamp |

> **Use case:** This is the pre-NorthStar baseline. Compare against post-optimization metrics to measure LinkedIn improvement.

---

## 9 · Cross-Reference vs Current NorthStar Files

### What NorthStar already has ✅

- Target role family and exclusions (`CLIENT_BRIEF.md`)
- Skill signal model with high/medium/negative categories (`CLIENT_BRIEF.md`)
- Keyword architecture: keep/drop lists (`CLIENT_BRIEF.md`)
- Skills evidence ledger structure with confidence levels (`SKILLS_EVIDENCE_LEDGER.json`)
- Scoring model and knowledge base (`knowledge_base.json`)
- Active scraping pipeline with winner reports (`WINNER_REPORT_TODAY.*`)

### What NorthStar is missing ❌ (from legacy data)

| Gap | Legacy source | Recommended action |
|:---|:---|:---|
| Full name (Joseph Ginsberg) | CV | Add to `CLIENT_IDENTITY.json` |
| Hebrew language | LinkedIn snapshot | Add to `CLIENT_BRIEF.md` §1 |
| Quantified career narrative (2010–present timeline with ticket volumes, SLA/FCR, 100+ staff) | CV + LinkedIn snapshot | Enrich `CLIENT_BRIEF.md` with §4-equivalent data |
| LinkedIn pre-optimization baseline metrics | LinkedIn snapshot | Store in `CASE_LOG.md` learnings |
| Test-backed skill evidence (from actual test on 2026-01-30) | `test-results-2026-01-30-windows-ad-v1.md` | Upgrade `SKILLS_EVIDENCE_LEDGER.json` confidence levels |
| Skills gap matrix with drills and due dates | `skills-gap-analysis.csv` | Use to populate assessment priority queue |
| Soft-skill evidence (appreciation letter) | LinkedIn snapshot | Add to evidence ledger as behavioral data |

---

## 10 · Edit History

| Date | Author | Change |
|:---|:---|:---|
| 2026-02-18 | Opus | Initial compilation from legacy + NorthStar cross-reference |

---

<sub>NorthStar Agency · Client Profile Single Source of Truth · 2026-02-18</sub>
