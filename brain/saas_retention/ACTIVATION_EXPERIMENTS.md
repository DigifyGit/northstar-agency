# 🧪 Activation & Onboarding Experiments (Q2)
**Phase:** Q2 Reduce Gross Churn  
**Goal:** Shrink "Time-to-First-Value" and eliminate friction to stop early lifecycle churn before it starts.

---

## 1 · 🦅 The Activation Imperative

A user who does not activate will not renew. "Activation" is the inflection point where a user experiences the core value of the product for the first time. 

Benchmarks show median free-to-paid conversion is ~8%. To improve this and retain those who do convert, we must treat onboarding as an engineering problem solved via A/B testing, not just "adding more tooltips."

---

## 2 · ⚙️ Experiment 1: The Friction Purge (Path Simplification)

We hypothesize that removing non-essential fields and steps during initial signup will increase the rate at which users reach the `activation_milestone_reached` event.

| Parameter | Definition |
|:---|:---|
| **Target Segment** | All new signups (Control = 50%, Variant = 50%) |
| **The Intervention** | Remove 3 non-critical data collection fields (e.g., Company Size, Role, Phone Number) from the signup flow. Delay this collection until *after* they achieve value. |
| **Primary Metric** | `Activation Rate` (Signups who reach activation within 7 days). |
| **Secondary Metric** | `Time-to-First-Value` (Median hours to first value). |
| **Guardrail Metric** | Support tickets generated during week 1. (Did we confuse them by skipping steps?) |

---

## 3 · 🎯 Experiment 2: Role-Based Routing

A generic onboarding flow for an enterprise admin vs. an end-user creates irrelevance. We hypothesize that segmenting the UI initialization based on user role will drive deeper adoption.

| Parameter | Definition |
|:---|:---|
| **Target Segment** | New users in mid-tier/high-tier ACV accounts. |
| **The Intervention** | Introduce a single, mandatory "I am a [Admin/User]" selector on first login. Route Admins to a "Setup Integrations" view. Route Users to an "Execute Task" view. |
| **Primary Metric** | `Adoption Depth` (Number of core features used in first 14 days). |
| **Secondary Metric** | Early GRR Proxy (Did they survive past month 1?) |
| **Uplift Measurement** | Compare the Variant group against a Holdout group receiving the generic flow. |

---

## 4 · 📈 Experiment Execution Rules

**Rule 1: Pre-Register Metrics.** Never launch a test without writing down the exact metric that defines success.
**Rule 2: Don't Conflate Correlation with Causation.** "Users who do X retain better." That doesn't mean forcing users to do X will make them stay. You must prove it via randomized intervention (Holdouts).
**Rule 3: Ship the Learning.** If the variant wins, push it to 100% of traffic immediately and update the agency baseline.

---

> **Benchmark Provenance (Audit V-1):** 
> *The ~8% median free-to-paid conversion rate cited in Section 1 is sourced from NorthStar's internal retention dataset aggregations across 200+ Private B2B SaaS product teardowns (2026).*

---
<sub>Document generated for the SaaS Retention OS Implementation.</sub>
