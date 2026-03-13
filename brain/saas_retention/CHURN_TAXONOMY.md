# 🚨 Churn Taxonomy & Resolution Protocols
**Phase:** Q1 Foundation  
**Goal:** Standardize how the company defines, records, and attacks ARR loss.

---

## 1 · 🦅 The Churn Dichotomy

To fix a leak, you must know what kind of hole you are patching. "Churn" is not a monolith. It must be immediately segregated into two distinct operational buckets: **Voluntary Churn** (they chose to leave) and **Involuntary Churn** (their credit card failed).

---

## 2 · 💸 Involuntary Churn (The Silent Killer)

**Definition:** The account intended to maintain service, but the subscription lapsed due to payment failure, expired cards, or banking friction.
**Industry Baseline Threat:** Median involuntary churn represents ~1.0% of ARR loss in broad SaaS datasets.

### Primary Reason Codes (System Generated)
*   `INV-01: Insufficient Funds` (Soft decline)
*   `INV-02: Card Expired` (Hard decline)
*   `INV-03: Do Not Honor / Bank Block` (Common in cross-border SaaS)
*   `INV-04: Stolen/Lost Card` (Hard decline)

**Operational Protocol:** Involuntary churn should rarely be handled by CSMs via email. It must be handled systematically through the **Payment Recovery Protocol** (smart retries + automated dunning).

---

## 3 · 🚪 Voluntary Churn (The Value Gap)

**Definition:** The account actively clicked "Cancel" or informed their Account Manager they will not renew.

### Primary Reason Codes (User Selected / CSM Logged)
*   `VOL-01: Onboarding Failure` (Never reached `activation_milestone_reached`)
*   `VOL-02: Missing Key Feature` (The product does not do X)
*   `VOL-03: Switching to Competitor` (Price or capability driven)
*   `VOL-04: Internal Company Pivot` (The account went out of business or dissolved the team)
*   `VOL-05: Too Expensive / ROI Mismatch` (They activated, but the value did not justify the cost)

**Operational Protocol:** Voluntary churn requires human context. It must trigger a cancellation-save flow (e.g., "Pause Account" or "Downgrade to Free") before the final database deletion, allowing the CS team an opportunity to intervene on codes like `VOL-05`.

---

## 4 · 📊 Database Implementation

Every churn event recorded in the data warehouse (or CRM) must enforce the following table constraints:

1. `account_id` (Mandatory string)
2. `churn_type` (Enum: `voluntary` | `involuntary`)
3. `reason_code` (Enum: must match one of the codes above)
4. `arr_lost` (Float: the exact dollar amount of the contract lost)
5. `tenure_days` (Int: how long they were a customer before churning)

If an account churns and the `reason_code` is left blank, the retention metrics become polluted. **Null reason codes are strictly prohibited.**

---
<sub>Document generated for the SaaS Retention OS Implementation.</sub>
