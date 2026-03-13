# 📜 Data Contract & Schema Governance
**Phase:** 7-Day Hardening (Audit V-1)  
**Goal:** Enforce strict production-grade reliability on behavioral data. Moving from "event logs" to reliable KPIs requires guaranteed data integrity.

---

## 1 · 🦅 The Data Contract Mandate
Analytics tracking can no longer be fire-and-forget. The events defined in `TRACKING_PLAN.md` directly drive Customer Success compensation and expansion routing. Therefore, every event is a contractual agreement between the Engineering producing the data and the Operations teams consuming it.

---

## 2 · ⚙️ Universal Payload Requirements

Every single event emitted by the product MUST include the following wrapper fields in its JSON payload to guarantee idempotency and temporal accuracy.

| Field Name | Type | Description | Mandatory For |
|:---|:---|:---|:---|
| `event_id` | UUIDv4 | A globally unique identifier for this specific event instance to prevent duplicate counting on retry. | All Events |
| `event_version` | String | Semantic versioning (e.g., `1.0.0`) of the schema payload. If Engineering changes a property name, the major version must bump. | All Events |
| `occurred_at` | ISO 8601 | The exact UTC timestamp the event happened on the client/system. | All Events |
| `ingested_at` | ISO 8601 | The exact UTC timestamp the event hit the data warehouse. (Delta between `occurred_at` and `ingested_at` measures latency). | Data Warehouse |
| `source_system` | String | The origin (e.g., `ios_app_v2`, `stripe_webhook`, `web_frontend`). | All Events |

---

## 3 · 🛡️ Schema Evolution & Breaking Changes Policy

**Data Engineers and Product Managers must adhere to this protocol:**
1. **Never mutate an existing event.** If the meaning of `core_feature_used` changes (i.e. we added a new mandatory step), you MUST create a new event (e.g., `core_feature_used_v2`) or bump the `event_version` and notify RevOps. 
2. **Idempotency Execution.** The Data Warehouse must enforce a unique constraint on `event_id` within a 7-day trailing window. Duplicate `event_id`s caused by client retries must be silently dropped, not aggregated.
3. **Anomaly Alerts.** If the volume of any core event drops >20% day-over-week, an automated PagerDuty alert routes to Data Engineering. PQA routing rules pause automatically during data outages.

---
<sub>Document generated to satisfy GPT-5.3 Codex Audit requirements.</sub>
