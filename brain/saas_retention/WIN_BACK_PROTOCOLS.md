# 🛟 Win-Back & Cancel-Save Protocols
**Phase:** Q4 Scale and Systematize  
**Goal:** Deploy structural safety nets to capture churning accounts at the exact moment of cancellation, and systematically re-engage lost accounts.

---

## 1 · 🦅 The "Easy Exit" Paradox

B2B SaaS buyers demand an easy cancellation process. Forcing a user to email support or get on a 30-minute retention call just to cancel their subscription generates massive ill-will and burns the bridge for future Win-Backs.

We will provide a self-serve cancellation flow, but we will engineer it as a **Cancel-Save** intervention point.

---

## 2 · ⚙️ The Cancel-Save Flow (In-App)

When an Admin clicks "Cancel Subscription", they enter the Cancel-Save Flow. *DO NOT* just offer a blanket 20% discount. Discounts without addressing the root cause just delay churn by 30 days.

**The Dynamic Flow Protocol:**
1. **The Reason Prompt:** "We're sorry to see you go. What is the primary reason for cancellation?" (Radio buttons mapping to `CHURN_TAXONOMY.md` VOL-codes).
2. **The Dynamic Offer (A/B Tested):**

| Reason Selected | Dynamic Save Offer | Efficacy Hypothesis |
|:---|:---|:---|
| `VOL-05: Too Expensive` | Offer to Downgrade. *"Would you like to move to the Basic tier at $49/mo instead? You keep your data and core tools."* | High. Retains the logo. Limits contraction ARR loss. |
| `VOL-04: Internal Pivot (Temporarily not using)` | Offer to Pause. *"Would you like to Pause billing for 3 months? We keep your data warm for $5/mo."* | High. Broad subscription benchmarks show "Pause" features significantly reduce outright cancellations. |
| `VOL-01: Onboarding Failure / Missing Feature` | Offer free Enablement. *"Book a free 30-min setup call with an expert right now, and we'll credit your next month."* | Medium. Only offer if account ACV justifies the human time. |

---

## 3 · 📬 The Win-Back Sequence (Email)

If the Cancel-Save fails, the account is recorded as Churned. They enter the Win-Back lifecycle.

**Win-Back Logic & Timing:**
DO NOT email them on Day 30 asking them to come back—nothing in their business has changed in 30 days.

*   **Day 0 (The Goodbye):** Send a gracious, bridge-building exit email. Provide an absolute export of their data.
*   **Day 90 (The 'New Feature' Hook):** Analyze their original `cancellation_reason`. If they left because of `Missing Key Feature` and product has since shipped it, send a highly specific 1-to-1 email: *"You told us X was missing when you left. We built it. Here is a 3-month trial to test it."*
*   **Day 180 (The Market Check):** Focus on competitor dissatisfaction. *"Six months ago, you moved away from [Product]. If your new solution isn't hitting the ROI targets you expected, we have restructured our [Feature]..."*

> *Guardrail: Ensure all Win-Back email sequences respect GDPR / CAN-SPAM opt-outs logged during the initial cancellation.*

---

## 4 · 🔬 Experiment Rigor Requirements (Audit Enforced)

All dynamic offers and "Cancel-Save" flows must adhere to the following statistical rigor to prevent irreversible UX revenue damage.

| Protocol Parameter | Requirement |
|:---|:---|
| **Randomization Method** | Deterministic hash of `account_id`. Do NOT randomize by `user_id` to prevent within-account exposure contamination. |
| **Sample Size / Power Floor** | Do not read results until $N$ reaches the calculated 80% statistical power threshold for the expected Minimum Detectable Effect (MDE). |
| **Primary Success Criteria** | Incremental Net Revenue Retained at +90 days post-intervention. (Do not optimize for "click-through rate" on the save offer). |
| **Stop-Loss / Rollback Threshold** | If Gross Revenue Retention (GRR) among the Variant cohort drops > 5% below Control over a 14-day trailing window, auto-disable the experiment. |

---
<sub>Document generated for the SaaS Retention OS Implementation.</sub>
