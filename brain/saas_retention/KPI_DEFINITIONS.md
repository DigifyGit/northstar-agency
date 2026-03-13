# 📐 Strict KPI Definitions & Metric Mapping
**Phase:** 7-Day Hardening (Audit V-1)  
**Goal:** Eliminate numerator/denominator ambiguity. Every dashboard metric must mathematically tie back to the exact event stream payload defined in `TRACKING_PLAN.md`.

---

## 1 · 🦅 The Precision Mandate
"Churn" is not an event. It is a contractual state change. A failed invoice is an event. To prevent reporting drift between Ops, Finance, and Product, all KPIs must adhere to these rigid formulas.

---

## 2 · ⚙️ Retention KPIs (The Revenue Metrics)

### Gross Revenue Retention (GRR)
- **Numerator:** `Beginning ARR` - `Contraction ARR` - `Churn ARR`
- **Denominator:** `Beginning ARR`
- **Data Source:** CRM/Billing system. Churn ARR is only recognized when the contract state officially terminates, not when the first `cancellation_requested` event fires.
- **Rule:** GRR can never exceed 100%. Expansion ARR is strictly excluded.

### Net Revenue Retention (NRR)
- **Numerator:** `Beginning ARR` + `Expansion ARR` - `Contraction ARR` - `Churn ARR`
- **Denominator:** `Beginning ARR`
- **Rule:** Must always be calculated alongside GRR on the same cohort view to prevent "Fake Expansion" camouflaging.

---

## 3 · 🛑 Operational KPIs (The Warning Metrics)

### Involuntary Churn Rate
- **Numerator:** Count of `account_id`s that enter a terminated state strictly because the 14-day Dunning Grace Period expired without a `payment_recovered` event.
- **Denominator:** Total Count of `account_id`s scheduled for renewal in that calendar month.
- **Strict Definition:** An `invoice_failed` event is NOT churn. It is a billing failure. Involuntary churn only occurs when the system automatically revokes access post-dunning.

### Dunning Recovery Rate
- **Numerator:** Count of `payment_recovered` events.
- **Denominator:** Count of distinct `account_id`s that fired an `invoice_failed` event inside the 14-day billing window.
- **Goal:** To measure the effectiveness of the smart retry and magic-link automation. 

### Time-to-First-Value (TTFV)
- **Calculation:** `Median(activation_milestone_reached.occurred_at - account_created.occurred_at)`
- **Rule:** Measured in hours for PLG motions, or days for Sales-led motions. Must be segmented by Acv Band (`acv_band`).

---
<sub>Document generated to satisfy GPT-5.3 Codex Audit requirements.</sub>
