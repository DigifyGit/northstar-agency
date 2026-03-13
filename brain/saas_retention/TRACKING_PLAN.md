# 🎯 Account-Centric Tracking Plan & Event Schema
**Phase:** Q1 Foundation  
**Goal:** Establish measurable, normalized event data to track Account behavior from Trial to Churn.

---

## 1 · 🦅 Tracking Philosophy

To improve Net Revenue Retention (NRR), we cannot look at individual user clicks in a vacuum. We must look at **Account-Level** behavior. 

If three users at "Acme Corp" log in once, and one user logs in 50 times, the **Account** is active, but individual user metrics might look skewed. The fundamental rule of this tracking plan is: **Every event must carry an `account_id` property.**

---

## 2 · 📊 Core Event Schema (Minimum Viable Telemetry)

These 9 core events form the backbone of the SaaS Retention Operating System. They span the entire customer lifecycle.

| Lifecycle Stage | Event Name | Trigger Condition | Required Properties |
|:---|:---|:---|:---|
| **Identity** | `account_created` | A new workspace or subscription entity is initialized. | `account_id`, `plan_type`, `acv_band`, `industry` |
| **Identity** | `user_joined` | A user is added to an existing account/workspace. | `account_id`, `user_id`, `role` (Admin/Member) |
| **Activation** | `activation_milestone_reached` | Account completes the core setup flow (e.g., connected first integration). | `account_id`, `milestone_name`, `time_to_value_hours` |
| **Adoption** | `core_feature_used` | Account executes the primary value-driving action of the platform. | `account_id`, `feature_name`, `usage_count` |
| **Value** | `value_outcome_generated` | The software delivered a measurable result (e.g., report exported). | `account_id`, `outcome_type`, `value_metric` |
| **Expansion** | `usage_limit_approaching` | Account hits 80%+ of their tier's capacity. | `account_id`, `current_plan`, `usage_percentage` |
| **Billing** | `invoice_failed` | A payment attempt is declined by the processor (Stripe/Recurly). | `account_id`, `decline_code`, `retry_attempt_num` |
| **Billing** | `payment_recovered` | A previously failed invoice is successfully collected. | `account_id`, `days_overdue` |
| **Churn** | `cancellation_requested` | User clicks the cancel button or emails support to cancel. | `account_id`, `cancellation_reason`, `tenure_months` |

---

## 3 · 🛡️ Privacy & Compliance Guardrails

As dictated by the NorthStar research baseline, behavioral data constitutes personal data under GDPR and similar frameworks. 

**Implementation Rules:**
1. **No Raw PII in Event Streams:** Do not pass `email`, `first_name`, or `raw_ip` in these behavioral events. Use anonymized `user_id` hashes.
2. **Data Minimization:** Only collect the properties explicitly listed above. Do not dump entire user state objects into the analytics payload.
3. **Consent Mapping:** Ensure the `account_created` event is fired *after* terms of service and relevant cookie/tracking consents are approved.

---

## 4 · 📑 Data Contract Inheritance (Audit V-1)
As defined in `DATA_CONTRACT.md`, **all events listed above** must inherit the universal wrapper fields to guarantee production-grade metrics.
Required baseline fields for every event: `event_id` (UUID), `event_version`, `occurred_at`, `ingested_at`, and `source_system`. Data lacking these fields will be rejected by the ingestion pipeline.

---
<sub>Document generated for the SaaS Retention OS Implementation.</sub>
