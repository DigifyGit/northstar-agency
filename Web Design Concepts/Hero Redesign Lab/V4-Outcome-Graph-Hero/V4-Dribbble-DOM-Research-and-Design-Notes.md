# V4 Dribbble DOM Research and Design Notes

## Queries analyzed
- https://dribbble.com/search/shots/popular/web-design?q=analytics+hero+section
- https://dribbble.com/search/shots/popular/web-design?q=dashboard+saas+hero+graph
- https://dribbble.com/search/shots/popular/web-design?q=data+visualization+saas+hero

## DOM trend findings
- Analytics query: strong `analytics`, `dashboard`, `hero section`, `saas` signal.
- Dashboard+graph query: strong `dashboard` and `graph` signal, indicating graph-first hero direction is common.
- Data-visualization query: strong `analytics`, `data`, and `saas` signal with hero-focused visual treatments.

## Key references sampled
- https://dribbble.com/shots/26957611-AI-Analytics-Dashboard-Hero-section
- https://dribbble.com/shots/26775879-Analytics-SaaS-Landing-Page-Hero-Section
- https://dribbble.com/shots/26212724-Hero-Section-Design-for-Productivity-Analytics-SaaS-Dark-UI
- https://dribbble.com/shots/26825205-AI-Analytics-Platform-Hero-Section
- https://dribbble.com/shots/26187473-Saas-Hero-Animation
- https://dribbble.com/shots/25353392-Responsive-Saas-Hero-Section-CRM-Dashboard-Cusana

## Design decisions in V4
- Left side redesigned into a client-value narrative with a 2x2 benefit matrix:
  - save money
  - save time
  - filter bad results
  - tailored relevant offers
- Right side redesigned into a graph-first interactive outcome scene with low text density.
- Removed process-heavy detail stacks in favor of:
  - one large metric orb
  - one summary line
  - two short benefit tags
- Mode toggles switch between `Money Saved`, `Time Saved`, and `Offer Relevance`.
