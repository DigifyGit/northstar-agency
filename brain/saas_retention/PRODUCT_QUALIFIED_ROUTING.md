# 🚀 Product-Qualified Routing (PQL/PQA)
**Phase:** Q3 Drive Expansion  
**Goal:** Mathematically identify accounts ready for upsell based on product usage, and route them to Sales without breaking the user experience.

---

## 1 · 🦅 The Expansion Philosophy

Sales should not be guessing who to call for an upgrade. Unqualified outreach damages the core relationship and introduces churn risk. 

We are shifting from Marketing-Qualified Leads (MQLs) based on PDF downloads, to **Product-Qualified Accounts (PQAs)** based entirely on the `adoption` and `expansion` events defined in `TRACKING_PLAN.md`.

---

## 2 · ⚙️ Defining the PQA Triggers

A Product-Qualified Account (PQA) is one that has achieved core value AND is hitting a constraint that naturally necessitates an upgrade.

**Core Triggers (Choose 1 or 2 to implement first based on your product):**

| Trigger Name | The Math / Event | The Sales Narrative |
|:---|:---|:---|
| **The Usage Threshold (The Limit)** | `usage_limit_approaching` fires when Account hits 85% of their seat cap or volume limit within the billing cycle. | "You're getting so much value you are about to hit your limit. Let's optimize your tier before you are gated." |
| **The Feature Gate (The Tease)** | User attempts to access a premium feature 3+ times in a 7-day window. | "I see your team is trying to utilize the Advanced Reporting suite. We are offering a trial unlock for your account." |
| **The Velocity Spike (The Whale)** | `core_feature_used` increases by >300% week-over-week. (Signals sudden organizational deployment). | "Usage has exploded this week. Who else on the team needs training to ensure this rollout succeeds?" |

---

## 3 · 🚦 The Routing & Handoff Playbook

When an account hits PQA status, an alert must fire into the CRM (Salesforce/HubSpot) or Slack. 

**The Golden Rule of PQA Routing:** 
If the Account Health Score (from `ACCOUNT_HEALTH_MODEL.md`) is YELLOW or RED, **do not attempt the upsell.** Fix the health first. You cannot expand a churning account.

**The Workflow:**
1. **Trigger:** Account hits an 85% usage threshold. Health is GREEN.
2. **Action 1 (In-App):** Fire a soft, dismissible in-app modal to the Admin: *"Your team is growing! You are at 85% capacity. Want to review upgrade options to prevent an interruption?"*
3. **Action 2 (Sales Assist):** If the Admin dismisses or ignores the modal for 48 hours, route the PQA alert to the Account Executive.
4. **Action 3 (The Human Touch):** AE sends a highly specific email referencing the exact limit hit. *Not* a generic "checking in" email.

---
<sub>Document generated for the SaaS Retention OS Implementation.</sub>
