# 📊 Executive & Operational Dashboard Specs
**Phase:** Q1 Foundation  
**Goal:** Define the exact metric trees and visualizations required to operate the retention strategy without masking decay.

---

## 1 · 🦅 The Dashboard Philosophy

As outlined in the NorthStar benchmarks: **Never let strong NRR hide weak GRR.** A surge in upsells can temporarily mask the fact that core customers are bleeding out. 

To prevent this, our dashboards are split into three strict operational views: The Executive View, the Leading Indicator View, and the Tactical Ops View.

---

## 2 · 📈 1. Executive Retention View (The North Star)
**Audience:** C-Suite, VP level
**Cadence:** Weekly Review

| Metric/Visualization | Calculation / Definition | Warning Threshold |
|:---|:---|:---|
| **NRR vs GRR Stack Chart** | A dual-line chart plotting trailing 12-month NRR against GRR by month. | If GRR drops below 90% while NRR stays >100%, trigger an immediate health audit. |
| **ARR Waterfall** | Starting ARR + Expansion - Contraction - Churn = Ending ARR. | N/A (Standard reporting) |
| **Net Retention by ACV Tier** | Bar chart showing NRR for: `<$5k`, `$5k-$25k`, and `>$25k` cohorts. | Lower tiers usually exhibit lower retention. Identify where the biggest ARR loss lives. |

---

## 3 · ⚡ 2. Leading Indicator View (The Early Warning System)
**Audience:** Product Managers, Growth teams
**Cadence:** Daily/Weekly Review

| Metric/Visualization | Calculation / Definition | Action Trigger |
|:---|:---|:---|
| **Time-to-First-Value (TTFV)** | Histogram showing days from `account_created` to `activation_milestone_reached`. | If median TTFV extends beyond 14 days, Product must audit the onboarding flow. |
| **Activation Rate Drop-off** | Funnel from Signup -> Step 1 -> Step 2 -> Activated. | Locate the single step with the highest abandonment and redesign it. |
| **Expansion Readiness Pipeline** | List of accounts where `usage_percentage` > 85%. | Route to Sales/CS for immediate proactive upgrade conversation. |

---

## 4 · ⚙️ 3. Tactical Ops View (The Leak Fixers)
**Audience:** Customer Success, Billing Operations
**Cadence:** Daily Review

| Metric/Visualization | Calculation / Definition | Action Trigger |
|:---|:---|:---|
| **Involuntary Churn Rate** | Percentage of monthly renewals lost strictly due to unrecovered failed payments resulting in systematic contract termination. | Must remain below 1.5% median. If higher, adjust Stripe smart retry timing. |
| **Dunning Recovery Success** | % of failed invoices successfully recovered within 14 days via dunning emails. | Goal is >45%. A drop indicates dunning emails are going to spam or UX is broken. |
| **Voluntary Churn Pie Chart** | Breakdown of churn grouped by `VOL-` reason codes. | If `VOL-01 (Onboarding Failure)` spikes, shift CS resources to early lifecycle support. |

---
<sub>Document generated for the SaaS Retention OS Implementation.</sub>
