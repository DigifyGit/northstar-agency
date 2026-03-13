# 🩺 Account Health Model & Risk Workflows
**Phase:** Q2 Reduce Gross Churn  
**Goal:** Detect usage decline and trigger human intervention *before* the customer decides to cancel.

---

## 1 · 🦅 The Illusion of the Survey

Net Promoter Score (NPS) and CS satisfaction surveys are lagging indicators. By the time a customer tells you they are unhappy on a survey or email, they are already evaluating competitors.

The only reliable leading indicator for B2B SaaS retention is **Account-Level Product Usage.** We are shifting from predictive sentiment to empirical behavior.

---

## 2 · ⚙️ Building the Health Score

The Account Health Model runs weekly and assigns an aggregate score based strictly on the telemetry defined in `TRACKING_PLAN.md`.

### The Core Vectors (Weighted)
1. **Breadth (30%):** How many seats/users are active vs. purchased? (A 10-seat plan with 1 active user is critically high risk).
2. **Depth (40%):** Are they hitting the `core_feature_used` event regularly?
3. **Frequency (30%):** Days since last login across the account.

### Health Tiers
*   🟢 **Green (Healthy):** Score > 75. Adoption is stable or growing.
*   🟡 **Yellow (Plateau/At Risk):** Score 40-74. Usage has flatlined or decreased by 20% over 30 days.
*   🔴 **Red (Critical Churn Risk):** Score < 40. Usage has cratered. Key stakeholders haven't logged in over 14 days.

---

## 3 · 🚦 The Intervention Workflows

Health scoring is useless without routing. A changing score must immediately trigger an operational playbook. 

> *Note: These workflows are segmented by ACV. A $5k customer gets a different playbook than a $50k customer.*

### Workflow A: The Platinum Save (High ACV | Status flips to RED)
*   **Trigger:** Status moves from Yellow to Red.
*   **Action:** Alert pushed to named CSM and Account Executive.
*   **Playbook:** Executive check-in call scheduled within 48 hours. DO NOT mention "We saw you aren't logging in." Frame as a "Strategic Business Review to ensure you are getting maximum ROI from our recent updates."

### Workflow B: The Digital Nudge (Low-Mid ACV | Status flips to YELLOW)
*   **Trigger:** Usage drops 20% in 14 days.
*   **Action:** Automated marketing sequence (Tech-Touch).
*   **Playbook:** Trigger an in-app guide or targeted email sequence highlighting a new feature or un-utilized capability to draw them back into the workflow.

### Workflow C: The Enablement Intervention (Any ACV | Onboarding Stall)
*   **Trigger:** 14 days post-signup, `activation_milestone_reached` has NOT fired.
*   **Action:** Route to scaled CS (webinar invite, enablement materials) or targeted human assist if high ACV.
*   **Playbook:** Provide exact documentation/video asset to clear the known hurdle block.

---
<sub>Document generated for the SaaS Retention OS Implementation.</sub>
