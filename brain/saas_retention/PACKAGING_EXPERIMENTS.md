# 📦 Packaging & Upgrade Path Experiments
**Phase:** Q3 Drive Expansion  
**Goal:** Restructure pricing and feature access to monetize value naturally, while enforcing strict Gross Revenue Retention (GRR) guardrails.

---

## 1 · 🦅 The Expansion Paradox

The research baseline highlights a critical danger: **Strong NRR (Expansion) can easily mask weak GRR (Core Retention).** 

If you force an aggressive price increase across the board, your NRR might jump to 115% because the top tier paid the premium, but your GRR might tank to 80% because the bottom tier canceled in protest. This is a fatal structural flaw. 

**All expansion experiments must have GRR set as the primary, non-negotiable guardrail.**

---

## 2 · ⚙️ Experiment 1: Smoothing the "Entitlement Cliff"

Many SaaS pricing models force a user to jump from $50/mo to $500/mo just to get one specific enterprise feature (The Cliff). This causes resentment and churn.

| Parameter | Definition |
|:---|:---|
| **The Problem** | Mid-market users churn because they need SSO (Enterprise tier) but cannot justify a 10x price jump. |
| **The Intervention** | Unbundle the high-value feature. Introduce an "Add-On" module (e.g., $99/mo for Security Add-On) for the mid-tier without forcing an entire tier upgrade. |
| **Primary Metric** | `Expansion ARR` (Do mid-tier users attach the module?) |
| **Guardrail Metric** | `Contraction/Churn Rate` (Does the new modular pricing cannibalize existing Enterprise tier users who downgrade to save money?) |

---

## 3 · 🎯 Experiment 2: The Soft Usage Gate (In-App Prompts)

Instead of hard-locking a user out of the software when they hit a limit (which infuriates them and causes churn), we will test a "soft gate" expansion prompt.

| Parameter | Definition |
|:---|:---|
| **Target Segment** | Accounts approaching `usage_limit`. |
| **The Intervention** | When they hit 100%, allow them to exceed the limit without breaking their workflow, but display a persistent, non-blocking banner: *"You are operating in Overage Mode. Upgrade your tier to avoid overage billing on your next invoice."* |
| **Primary Metric** | `NRR / Upgrade Rate` (How many self-serve their upgrade?) |
| **Guardrail Metric** | `GRR / Ticket Volume` (Are we causing user panic or anger leading to cancellation?) |

---

## 4 · 📈 Execution Rules for Pricing Changes

1. **Cohort Rollouts:** Never push a pricing change to the entire user base at once. Roll it out to a 10% cohort, measure the GRR delta for 30 days, and only expand if the churn is stable.
2. **Grandfathering Strategy:** If introducing a massive tier restructuring, grandfather existing customers on the old pricing for 12 months. Do not shock the system.

---
<sub>Document generated for the SaaS Retention OS Implementation.</sub>
