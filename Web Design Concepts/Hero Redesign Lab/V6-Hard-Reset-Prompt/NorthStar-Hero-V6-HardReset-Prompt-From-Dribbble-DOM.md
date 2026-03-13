# NorthStar V6 Hard Reset Prompt (From Fresh Dribbble DOM Analysis)

Use this exact prompt with your code-generation model.

---

## Prompt
You are a world-class frontend and interaction designer.
Build **one single HERO section only** as a self-contained HTML file (HTML + CSS + JS in one file).

### Hard reset objective
Create a **completely different concept** from prior outputs.
Do NOT create another left-card/right-graph or dual-box dashboard layout.
The hero must feel cinematic, modern, and conversion-focused for a job sourcing agency.

### Core business message (must be crystal clear)
NorthStar works for clients by:
- saving hiring time
- saving hiring budget
- filtering bad/irrelevant results early
- preparing clients for applications
- delivering tailored, focused offers using analytics relevance

### DOM-informed direction to follow
From Dribbble search DOM patterns (`interactive hero website`, `3d hero section`, `editorial hero section`):
- strong signal for **editorial typography + minimal text blocks + one dominant visual stage**
- strong signal for **3D/kinetic hero motion**, but not dense data tables
- strong signal for **clean visual hierarchy** with fewer components and higher impact

### Visual concept to implement (new)
Use this concept name: **"Relevance Stream Theater"**.

#### Layout (must be asymmetric and wide)
- Use near full-bleed width (`max-width` around `1880px`), not tight centered cards.
- Left side: text-led editorial stack with large headline and short value lines.
- Right side: a **freeform kinetic canvas**, not a boxed dashboard panel.
- Avoid obvious rectangular card clusters in both columns.

#### Interaction idea (must be simple but strong)
Create one interaction control with 3 states:
- `Save Time`
- `Save Money`
- `Increase Relevance`

When state changes:
- the kinetic canvas transforms (paths/particles/light trails)
- one big hero metric changes
- one short sentence changes

No long detail blocks, no mini tables, no process checklist paragraphs.

### Content density rules
- Headline: max 2 lines.
- Subheadline: max 2 lines.
- Exactly 3 short benefit bullets (one line each).
- One large metric + one supporting line.
- Two CTA buttons only.

### Explicit anti-patterns (forbidden)
- No twin glass cards that mirror each other.
- No dashboard widget grid.
- No line-chart-in-a-card pattern.
- No 4-box benefit matrix.
- No dense paragraphs or stacked chips overload.
- No “admin panel” look.

### Style system
- Dark cinematic background with depth.
- Accent colors: cyan + mint + one warm accent.
- Typography: expressive (Space Grotesk or Sora for heading, readable body font).
- Motion should be meaningful and smooth.
- Keep high contrast and readable text.

### Accessibility and responsive constraints
- Works on desktop + mobile.
- Maintain AA-level readable contrast.
- Respect `prefers-reduced-motion`.
- Keyboard focus-visible styles required.

### Output format
Return a complete runnable HTML document only.
No explanations.

---

## Optional stricter variant (if model repeats old layout)
Append this line at the end of the prompt:

`If your output contains any boxed dashboard panel, chart card, or 4-card matrix, discard it and regenerate with a freeform cinematic canvas.`

---

## Fresh Dribbble DOM references used for this reset
- https://dribbble.com/search/shots/popular/web-design?q=interactive+hero+website
- https://dribbble.com/search/shots/popular/web-design?q=3d+hero+section
- https://dribbble.com/search/shots/popular/web-design?q=editorial+hero+section
- https://dribbble.com/shots/27063802-Editorial-Hero-Section-Jacob-Broody-Portfolio
- https://dribbble.com/shots/26385758-Website-3D-Hero-Section-Animation-for-E-Learning-Experiences
- https://dribbble.com/shots/26979655-Cargo-Airline-Website-Interactive-Hero-Section
