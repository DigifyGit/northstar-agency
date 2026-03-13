# 💳 Payment Recovery Protocol (Involuntary Churn)
**Phase:** Q1 Foundation  
**Goal:** Automatically capture the ~1% median ARR loss caused by mechanical payment failures, requiring zero human CS intervention.

---

## 1 · 🦅 The Mechanical Leak

Involuntary churn is a mechanical failure, not an emotional one. A customer's card expires, the bank flags a corporate card for fraud, or limit thresholds are hit. If you require a human Customer Success Manager to email the client to fix this, you will lose the revenue. 

This protocol leverages system automation (e.g., Stripe Billing / Recurly) to recover funds silently.

---

## 2 · ⚙️ Smart Retry Logic (The Background Engine)

Do not retry failed cards randomly or every 24 hours. Banks use machine learning models; aggressive retries will result in hard blocks.

**The Configured Retry Sequence:**
1. **Initial Failure (Day 0):** Soft decline logged. NO email sent to customer.
2. **Retry 1 (Day 2):** Retry at an optimal hour (e.g., 2 AM local time). 
3. **Retry 2 (Day 5):** Retry using network tokens if available to bypass updated expiration dates.
4. **Retry 3 (Day 9):** Final automated backend retry before hard dunning sequence escalating to account suspension.

*Benchmark Note: Smart retries alone often recover 20%+ of failed payments before the customer even knows there was a failure.*

---

## 3 · ✉️ Dunning Email Sequence (The UX Layer)

If backend retries fail, we must trigger the Dunning Sequence. 

**Rule #1 of Dunning:** Do not require the user to log in to the main SaaS dashboard to update their card. They will forget their password, get frustrated, and churn. Use a magic link that goes directly to a secure Stripe checkout/update page.

> **🛡️ Security Hardening Mandate (Audit V-1):**
> Unauthenticated update links pose a critical account-takeover risk. All dunning payment links MUST implement:
> 1. **One-time signed URLs** (cryptographically verified).
> 2. **Short TTL** (Time-To-Live <= 15 minutes).
> 3. **Anomaly Checks** (IP/device mismatch triggers step-up auth).
> 4. **Replay Protection** (The link burns immediately on first click or successful update).
> 5. **Audit Logs** (IP, Timestamp, User-Agent logged on update attempt).

| Send Timing | Subject Line Strategy | Body Copy Psychology |
|:---|:---|:---|
| **Day 3** (Post Retry 1) | `Action Required: Update your billing info for [Company]` | Friendly tone. "Just a heads up, your last payment didn't go through. It might be an expired card. Click here to update so your service isn't interrupted." |
| **Day 7** | `[Company] Payment Failed - Account at risk` | Urgent tone. "We have tried your card twice and are unable to process the subscription. Please update your payment method immediately." |
| **Day 12** | `Final Notice: [Company] Account Suspension` | Loss Aversion. "Your account will automatically be suspended in 48 hours and your data access will be locked. Update your card now." |
| **Day 14** | `Account Suspended` | Finality. Log the event as `involuntary_churn`. Fire suspension webhook. |

---

## 4 · ⏳ Grace Period & Suspension Enforcement

During the 14-day dunning window, **do not cut off access to the software**.

Revoking access on Day 1 creates a hostile relationship with an executive whose corporate card just happened to expire. 

Let the software function normally during the 14-day Grace Period. On Day 14, execute a hard lock: the user can log in, but they cannot see any dashboards or tools. The only screen visible is the "Update Payment Method" overlay.

---

> **Benchmark Provenance (Audit V-1):** 
> *The ~1.0% median involuntary churn baseline and the 20%+ smart retry recovery estimates cited in Sections 1 & 2 are derived directly from aggregated 2023-2025 subscription performance data provided by Recurly and Stripe benchmark reports.*

---
<sub>Document generated for the SaaS Retention OS Implementation.</sub>
