# 📖 Glossary: SaaS Retention OS Taxonomy
**Phase:** 7-Day Hardening (Audit V-1)  
**Goal:** Unify operational terminology to prevent compensation and reporting drift across Sales, CS, and Product teams.

---

## Core Definitions

### PQA (Product-Qualified Account)
*Replaces legacy term: PQL (Product-Qualified Lead).*
**Definition:** A current, billed account whose empirical product usage (e.g., hitting seat limits, 300% week-over-week velocity spikes) mathematically indicates they are ready for an expansion conversation. 
**Usage:** Sales are routed PQAs, not PQLs. Account-level metrics always supersede individual user actions.

### TTFV (Time-To-First-Value)
**Definition:** The median time elapsed (measured in hours or days) from `account_created` until the account fires its very first `activation_milestone_reached` event. 

### GRR (Gross Revenue Retention)
**Definition:** The percentage of recurring revenue retained from a cohort over a period, *excluding* any expansion revenue.
**Formula:** `(Beginning ARR - Contraction ARR - Churn ARR) / Beginning ARR`
**Role:** The floor. It measures how effectively the product keeps the customers it already has. The mandatory guardrail for all expansion experiments.

### NRR (Net Revenue Retention)
**Definition:** The total percentage of recurring revenue retained from a cohort, *including* expansion revenue.
**Formula:** `(Beginning ARR + Expansion ARR - Contraction ARR - Churn ARR) / Beginning ARR`
**Role:** The ceiling. It measures the aggregate compounding growth of a cohort.

### Churn (Systematic Definition)
**Definition:** Churn occurs when a contract undergoes a final state change resulting in lost ARR. 
*Note:* A failed payment (`invoice_failed`) is an *event*, not churn. The account only becomes "churned" when the dunning grace period expires without recovery and the system revokes access.

---
<sub>Document generated to satisfy GPT-5.3 Codex Audit requirements.</sub>
