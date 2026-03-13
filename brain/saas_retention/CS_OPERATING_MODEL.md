# 🏢 CS Operating Model & Incentive Alignment
**Phase:** Q4 Scale and Systematize  
**Goal:** Define the exact org structure and compensation controls required to run the Retention OS without driving perverse behaviors.

---

## 1 · 🦅 The "Fake Expansion" Threat

If Account Executives (AEs) or Customer Success Managers (CSMs) are paid a high commission on Expansion NRR, but suffer no penalty for Gross Churn (GRR), they will deploy destructive tactics. They will hard-sell a 100-seat upgrade to a customer who uses 5 seats, hitting their quota, but guaranteeing the customer churns furiously at the next renewal.

**The Golden Rule of Scale:** NRR growth MUST be tethered to a GRR floor.

---

## 2 · ⚙️ The CS Operations Structure

Based on mid-market SaaS benchmarks, we will deploy a **Hybrid Segmented Model** to scale efficiently while providing high touch where ACV dictates.

| Segment | ACV Range | Coverage Model | Core Mandate |
|:---|:---|:---|:---|
| **Volume Tier** | `< $5k / yr` | **Tech-Touch (1:Many).** Digital onboarding, in-app guides (Q2), and automated health routing. | Maximize TTFV (Time-to-First-Value). Prevent `VOL-01` early churn. |
| **Mid-Market** | `$5k - $25k / yr` | **Pooled CS + PQA Routing.** Accounts get pooled lifecycle emails. If they hit a PQA expansion trigger (Q3) or turn RED in Health (Q2), a human is routed. | Discover and route expansion opportunities smoothly. |
| **Enterprise** | `> $25k / yr` | **Dedicated CSM (High-Touch).** Named account owner. QBRs (Quarterly Business Reviews), custom success plans. | Execute multi-stakeholder renewals. Maximize Net Retention. |

---

## 3 · 💰 Incentive Alignment & Compensation Guardrails

To prevent the "Fake Expansion" threat, the commission/bonus structure for Sales and CS must abide by these strict mathematical limits:

**1. The "Clawback" Expansion Rule**
If a rep sells an expansion (e.g., adds 50 seats) and that account churns or downgrades within 6 months of the expansion, 100% of the expansion commission is clawed back. **PQA (Product-Qualified Account) expansion credit is only permanently awarded to retained customers.**

**2. The Shared North Star (CS & Product)**
Product and CS must share the activation metric. Product engineering bonuses should be partially tied to `activation_milestone_reached` velocity, ensuring PMs build software that onboarding teams can actually deploy.

**3. Cancellation-Save Compensation**
If a CSM receives a RED account from the Early Warning System and successfully intervenes (preventing churn for at least 1 renewal cycle), they receive a flat "Save Bonus." However, offering discounts to save accounts must have a strict floor (e.g., maximum 15% discount) to protect unit economics.

---
<sub>Document generated for the SaaS Retention OS Implementation.</sub>
