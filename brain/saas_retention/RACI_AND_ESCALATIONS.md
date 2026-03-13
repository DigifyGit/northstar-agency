# 🤝 RACI Model & Escalation SLAs
**Phase:** 7-Day Hardening (Audit V-1)  
**Goal:** Define absolute operational accountability. No more "who owns this?" during a churn crisis or expansion opportunity.

---

## 1 · 🦅 The RACI Matrix

**(R)esponsible:** Does the work.  
**(A)ccountable:** Owns the metric (The buck stops here).  
**(C)onsulted:** Provides input before action.  
**(I)nformed:** Notified after action.

| Process / Scenario | R (Executor) | A (Owner) | C (Advisory) | I (Notified) |
|:---|:---:|:---:|:---:|:---:|
| **Tracking Plan & Schema Integrity** | Data Eng | Head of Product | RevOps | Exec Team |
| **Activation Experiments (Q2)** | Growth PM | Head of Product | PMM | CS Team |
| **PQA Detection & Routing (Q3)** | RevOps | VP Sales | Data Eng | AEs |
| **Cancel-Save Flow Experiments (Q4)**| Product Ops | VP CS | Product | Exec Team |
| **Involuntary Churn Recovery (Billing)**| RevOps | CFO | VP CS | CS Team |

---

## 2 · 🚨 Handoff SLAs (Service Level Agreements)

To maintain momentum, handoffs between teams must have tied SLA timers.

1. **PQA Routed to Sales (Opportunity):** 
   - AE must engage the account (via email or call based on tier) within **48 Business Hours** of the PQA alert firing.
   - If SLA is breached, the PQA is re-routed to the Sales Manager for reassignment.
2. **Account Health Turns RED (Churn Risk):**
   - CSM must initiate the "Executive Save Playbook" within **24 Business Hours**. 
   - *Escalation:* If no CS action is logged in Salesforce within 48 hours, alert escalates directly to VP of CS.
3. **Support Ticket tagged "Cancellation Intent":**
   - Support tier 1 must route to CS Retention Desk within **2 Business Hours** to initiate the Win-Back protocol.

---
<sub>Document generated to satisfy GPT-5.3 Codex Audit requirements.</sub>
