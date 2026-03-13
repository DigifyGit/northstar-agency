If I can’t verify something from your context or cited sources, I will say **“I don’t know.”**

You want **implementation grade instructions** for replicating the homepage into HTML and CSS with the same premium liquid glass direction. Below is a **full spec** you can hand to a frontend engineer.

Everything here is grounded in your NorthStar visual system and build guides.

---

# 0\) Global Design System Lock

## 0.1 Color tokens (CSS variables)

Use these exact tokens.

CSS:root{  
\--bg-0:\#050918;  
\--bg-1:\#0A1224;  
\--bg-2:\#111E35;

\--surface-glass:rgba(17,30,53,0.58);  
\--surface-glass-strong:rgba(17,30,53,0.74);

\--text-strong:\#E8F0FF;  
\--text-body:\#A6B8D6;  
\--text-dim:\#7E93B7;

\--accent-indigo:\#5F6AD9;  
\--accent-cyan:\#63D9FF;  
\--accent-teal:\#3FC8B4;  
\--accent-violet-soft:\#8B7DFF;

\--ok:\#34D399;  
\--warn:\#F59E0B;  
\--risk:\#FB7185;  
\--info:\#60A5FA;

\--line-soft:rgba(173,206,255,0.16);  
\--line-strong:rgba(173,206,255,0.30);  
\--glow-cyan:rgba(99,217,255,0.35);  
\--glow-indigo:rgba(95,106,217,0.35);  
}

## 0.2 Typography (fonts, sizes, colors)

Fonts and scale are specified.

• Display and headlines: **Space Grotesk**  
• Body and UI: **Inter**  
• Numeric mono fallback: **JetBrains Mono**

Type scale (use these as tokens):  
• Hero H1: 64px size, 72px line height, 700 weight, tracking \-0.02em  
• Section H2: 36px size, 42px line height, 700 weight  
• Card H3: 22px size, 28px line height, 600 weight  
• Body L: 18px size, 28px line height, 400 weight  
• Body M: 16px size, 24px line height, 400 weight  
• Caption: 12px size, 16px line height, 500 weight, tracking 0.06em

Color rules:  
• Headings: var(--text-strong)  
• Body: var(--text-body)  
• Muted labels: var(--text-dim)

## 0.3 Glass panel recipe (cards, sections, nav)

Use the locked glass spec.

CSS.ns-glass{  
  background:var(--surface-glass);  
  border:1pxsolidvar(--line-soft);  
  backdrop-filter:blur(14px) saturate(115%);  
  \-webkit-backdrop-filter:blur(14px) saturate(115%);  
  border-radius:20px;  
  box-shadow:014px40pxrgba(4,10,28,0.55);  
}  
.ns-glass-strong{  
  background:var(--surface-glass-strong);  
  border:1pxsolidvar(--line-strong);  
}

Border glow sweep on hover, restrained.

CSS.ns-hover{  
  transition:transform220mscubic-bezier(.2,.8,.2,1),  
box-shadow220mscubic-bezier(.2,.8,.2,1),  
border-color220mscubic-bezier(.2,.8,.2,1);  
}  
.ns-hover:hover{  
  transform:translateY(-3px);  
  border-color:rgba(173,206,255,0.30);  
  box-shadow:018px52pxrgba(4,10,28,0.62);  
}

## 0.4 Grid and spacing

Use the grid rules from the guide.  
• Desktop grid: 12 columns  
• Max width: 1280 to 1360  
• Section vertical rhythm: 72px desktop, 48px mobile

Suggested CSS tokens (implementation choice, consistent with the guide):

CSS:root{  
\--container-max:1320px;  
\--gutter:24px;  
\--section-y:72px;  
\--radius-sm:16px;  
\--radius-md:20px;  
}  
.container{  
  max-width:var(--container-max);  
  margin:0auto;  
  padding:0var(--gutter);  
}  
.section{  
  padding:var(--section-y) 0;  
}

## 0.5 Motion rules

Guardrails are specified.  
• Micro interactions: 160ms to 320ms  
• Easing: cubic-bezier(.2,.8,.2,1)  
• Scroll reveal: one time, stagger 40ms  
• Respect prefers-reduced-motion

---

# 1\) Background system (how to generate the hero background image)

Your conversion protocol is clear: layered background stack, add subtle noise to prevent banding, deliver modern formats.

## 1.1 Background generation prompt (4K)

Use this prompt to generate space-bg-master-4k:

**Prompt**

Deep space nebula website background, ultra dark overall, base color \#050918, subtle blue and cyan nebula clouds, faint teal highlights, scattered small white stars, very subtle purple magenta glow in corners, cinematic, realistic, no text, no UI elements, low noise, high detail, 3840x2160, designed for dark glass UI overlay, center area slightly calmer for legibility.

Optional variants you should also generate for responsive delivery: 2560x1440 and 1920x1080.

## 1.2 CSS background layering (exact method)

The engineering method recommended is multi layer backgrounds plus noise overlay.

CSS.page-bg{  
  background-color:var(--bg-0);  
  background-image:  
radial-gradient(900px500pxat10%10%, rgba(139,125,255,0.10), transparent60%),  
radial-gradient(900px500pxat90%10%, rgba(99,217,255,0.10), transparent60%),  
radial-gradient(900px600pxat50%90%, rgba(95,106,217,0.10), transparent65%),  
image-set(  
url("/img/space-bg-4k.avif") type("image/avif"),  
url("/img/space-bg-4k.webp") type("image/webp"),  
url("/img/space-bg-4k.jpg") type("image/jpeg")  
    );  
  background-size:cover;  
  background-position:center;  
  background-attachment:fixed;  
}  
.page-bg::before{  
  content:"";  
  position:fixed;  
  inset:0;  
  pointer-events:none;  
  background-image:url("/img/noise-tile.png");  
  opacity:0.07;  
  mix-blend-mode:overlay;  
}

If you want the background to scroll smoothly on mobile, disable background-attachment: fixed at smaller breakpoints.

---

# 2\) Homepage sections (every section with exact build instructions)

Your canonical homepage section list is defined in your full project plan and master build spec.  
Below is the complete build spec for each section, including interactions.

---

## Section 1: Navbar (crystal glass, sticky)

Navbar requirements are explicitly defined.

### Layout

• Height: 72px desktop, 64px mobile  
• Container: max width 1320, left aligned logo, center nav, right CTA cluster  
• Padding: 16px top and bottom, 24px left and right (implementation choice)

### Background and border

From the guide:  
• Background: rgba(5,9,24,0.84) with blur 12px  
• Bottom border: 1px solid var(--line-soft)

CSS.navbar{  
  position:sticky;  
  top:0;  
  z-index:50;  
  height:72px;  
  background:rgba(5,9,24,0.84);  
  border-bottom:1pxsolidvar(--line-soft);  
  backdrop-filter:blur(12px);  
  \-webkit-backdrop-filter:blur(12px);  
}  
.navbar .inner{  
  height:100%;  
  display:flex;  
  align-items:center;  
  justify-content:space-between;  
  gap:24px;  
}

### Menu labels

You asked for exact menu names. Use the public sitemap and the positioning pages you already committed.

Recommended top nav labels:  
• About  
• Services  
• Process  
• Industries  
• Insights  
• Fraud Protection  
• Pricing  
• Contact

Right side:  
• Client Login  
• Request Access

### Menu typography

• Font: Inter  
• Size: 14px to 15px  
• Weight: 500  
• Color: var(--text-body)  
• Hover: var(--text-strong) plus underline glow sweep

CSS.nav-link{  
  font-family:Inter,system-ui;  
  font-size:14px;  
  font-weight:500;  
  color:var(--text-body);  
  padding:10px10px;  
  border-radius:10px;  
  position:relative;  
  transition:color180mscubic-bezier(.2,.8,.2,1),  
background180mscubic-bezier(.2,.8,.2,1);  
}  
.nav-link:hover{  
  color:var(--text-strong);  
  background:rgba(17,30,53,0.35);  
}  
.nav-link::after{  
  content:"";  
  position:absolute;  
  left:10px;  
  right:10px;  
  bottom:6px;  
  height:1px;  
  background:linear-gradient(90deg, transparent, rgba(99,217,255,0.55), transparent);  
  opacity:0;  
  transition:opacity180mscubic-bezier(.2,.8,.2,1);  
}  
.nav-link:hover::after{ opacity:1; }

### Sticky shrink on scroll (interaction)

On scroll past 24px:  
• Height becomes 60px  
• Background opacity increases slightly  
• Logo scales down to 0.92

Implementation method: add data-scrolled="true" to navbar via JS.

---

## Section 2: Hero (headline, gradient word, dual CTA, interactive atmosphere)

Hero requirements and CTA style are specified.

### Structure

• Left column: headline, subline, CTA row  
• Right column: “Command Center preview panel” glass module  
• Always keep a calm center area in background for legibility

### Headline typography

• Font: Space Grotesk  
• H1 uses 64 and 72 scale, weight 700  
• One keyword line uses gradient fill

CSS.heroh1{  
  font-family:"Space Grotesk",system-ui;  
  font-size:64px;  
  line-height:72px;  
  font-weight:700;  
  letter-spacing:-0.02em;  
  color:var(--text-strong);  
}  
.hero .grad{  
  background:linear-gradient(90deg, var(--accent-cyan) 0%, var(--accent-indigo) 55%, var(--accent-teal) 100%);  
  \-webkit-background-clip:text;  
  background-clip:text;  
  color:transparent;  
}

### Subheadline

• 18px, 28px line height  
• Color: var(--text-body)  
• Max width: 560px

### Buttons

CTA rules are defined.

Primary CTA:  
• Height: 44px  
• Radius: 10px  
• Text: \#F6FCFF  
• Gradient fill: linear-gradient(135deg,\#3A7BD5 0%,\#3FC8B4 100%)

Secondary CTA:  
• Transparent glass \+ border var(--line-soft)

CSS.btn-primary{  
  height:44px;  
  padding:018px;  
  border-radius:10px;  
  color:\#F6FCFF;  
  background:linear-gradient(135deg,\#3A7BD5 0%,\#3FC8B4 100%);  
  border:1pxsolidrgba(173,206,255,0.18);  
  box-shadow:0028pxrgba(99,217,255,0.18);  
  transition:filter200mscubic-bezier(.2,.8,.2,1),  
transform200mscubic-bezier(.2,.8,.2,1);  
}  
.btn-primary:hover{  
  filter:brightness(1.08);  
  transform:translateY(-1px);  
}  
.btn-secondary{  
  height:44px;  
  padding:018px;  
  border-radius:10px;  
  background:rgba(17,30,53,0.35);  
  border:1pxsolidvar(--line-soft);  
  color:var(--text-strong);  
  backdrop-filter:blur(12px);  
  \-webkit-backdrop-filter:blur(12px);  
}  
.btn-secondary:hover{ border-color:var(--line-strong); }

### Hero interactive effects

• Subtle particle drift (canvas or CSS)  
• Section reveal animation once  
• Optional parallax on right preview panel

Your conversion doc recommends intersection observer for reveals and reduced motion gating.

---

## Section 3: Trust strip (logos \+ proof chips)

This is a standard conversion block listed in your homepage plan.

### Layout

• Full width strip, inside container  
• Left: “Trusted by teams at”  
• Right: logo row, monochrome, 70% opacity

### Proof chips

• 3 to 5 chips  
• Glass capsule background  
• Icons in indigo or cyan

Chip style:  
• Background: rgba(17,30,53,0.40)  
• Border: var(--line-soft)  
• Text: var(--text-body)

Hover:  
• Border brightens  
• Glow intensifies slightly

---

## Section 4: Core value pillars (not boring cards)

This is required as “Core value pillars” in your homepage plan.

### Format

Do not do a plain 3 card row.

Use a 2 column interactive layout:  
• Left: stacked “pillars” list  
• Right: a glass panel that changes content based on active pillar

Pillars:  
• Elite Talent Sourcing  
• Hard Gate Verification  
• Secure Infrastructure  
• Talent Intelligence Analytics

Interaction:  
• Hover or click a pillar  
• Right panel transitions with cross fade, 180ms

---

## Section 5: Process preview (3 to 5 steps)

Your plan requires a process preview.

### Format

A horizontal stepper with “phase cards” that expand.

Steps:  
• Intake  
• Sourcing  
• Verification  
• Interview  
• Offer

Hover:  
• Step expands  
• Shows inputs and outputs as two compact rows  
• Shows a confidence micro bar

---

## Section 6: Timeline of success (interactive)

This is your requested idea, implemented premium.

### Layout

• Vertical timeline on desktop as a glass rail  
• Collapses to stacked cards on mobile

Node design:  
• 12px glowing dot with cyan outer ring  
• Connector line: gradient indigo to cyan  
• Node card: ns-glass

Hover:  
• Node dot pulses once  
• Card expands to reveal outcomes and metrics  
• Micro chart appears

---

## Section 7: Testimonials (executive proof wall)

This is a required trust block and should not be basic.

### Layout

Two column:  
• Left: rotating quote panel  
• Right: proof metadata panel

Quote typography:  
• 22px to 28px, Space Grotesk 600  
• Body: Inter 16px

Proof metadata:  
• Name, Title, Company, Segment  
• Outcome chips  
• “Verified Outcome” badge

Interaction:  
• Tabs: Enterprise, Startups, Talent Ops  
• Auto cycle every 7 seconds, pauses on hover  
• Keyboard accessible arrows

Note: I don’t know your real testimonial names and companies because they are not in the provided sources. If you want realism, you must supply them. Fastest manual verification step: paste 3 to 6 testimonials text and attribution.

---

## Section 8: KPI and metrics band

Your homepage plan requires a KPI proof strip.

### Layout

• 4 metrics max  
• Each metric is a glass tile with a tiny delta chip

Interaction:  
• Count up on scroll into view  
• Delta chip glows

---

## Section 9: Dashboard preview teaser (interactive mode toggle)

This aligns with your product split into public site and app, and your dashboard master direction.

### Layout

• Big glass frame  
• Inside: mock UI components

Toggle:  
• Client View  
• Executive View

Interaction:  
• Toggle changes label set and KPI emphasis  
• Keep dataset consistent, only framing changes

---

## Section 10: Case proof block (case study dossier cards)

Required in your homepage plan.

### Format

Horizontal carousel of “dossier cards”  
• Card front: industry, role, result  
• Card hover: opens dossier drawer with timeline and deliverables

---

## Section 11: Fraud protection preview

You have a dedicated fraud protection route and this section is consistent with your positioning.

### Format

A security console panel with three layers:  
• Risk statement  
• Verification protocol  
• Evidence standard line: “No evidence table, no verdict.”

Interaction:  
• Click “simulate risk” shows red flags  
• Then resolves to a verification outcome label  
Use only locked enums everywhere.

---

## Section 12: Service teaser cards

Required in your homepage plan.

Services from your master build spec:  
• Executive AI Search  
• Team Augmentation  
• Talent Intelligence Analytics  
• Identity and Fraud Verification

Format:  
Not plain cards. Use “flip reveal” with a subtle 3D tilt:  
• Front: service name and one sentence  
• Hover: inputs, outputs, typical timeline, CTA

---

## Section 13: FAQ teaser

Required in your homepage plan.

Glass accordion:  
• Question line: Inter 16px 600  
• Answer: Inter 14px to 16px 400  
Hover:  
• Border brightens  
Open:  
• Background shifts to ns-glass-strong

---

## Section 14: Final CTA banner

Required in your homepage plan.

Format:  
Full width glass block with strong gradient border.

Primary CTA routes:  
• Primary CTA goes to /signup  
• Secondary CTA goes to /process

---

## Section 15: Footer sitemap

Footer must include full link groups. Your public sitemap is defined.

Footer columns:  
• Company: About, Services, Process, Contact  
• Platform: Login, Signup, Dashboard  
• Resources: Insights, FAQ  
• Legal: Terms, Privacy

Footer style:  
• Background: rgba(5,9,24,0.72)  
• Border top: 1px solid var(--line-soft)  
• Links: var(--text-dim) to var(--text-strong) on hover

---

# 3\) Global interactions you must implement

These are not optional if you want the homepage to feel premium.

## 3.1 Scroll reveal

Use IntersectionObserver, once per section, stagger 40ms.

## 3.2 Reduced motion

If user has reduced motion preference:  
• disable parallax  
• disable particle drift  
• keep hover transitions but reduce movement amplitude

## 3.3 Navbar shrink

On scroll:  
• height 72 to 60  
• background opacity increases  
• apply subtle inner shadow

---

# 4\) What I cannot honestly claim as “exact” from sources

I don’t know the true original Figma values for:  
• exact pixel spacing between every hero element  
• exact font weights used in the raster images  
• the real client logo set and testimonial identities

Your conversion protocol explicitly warns that screenshots do not provide enough info for some exact values without source assets, and the correct method is screenshot diff tuning.

Fastest verification step:  
• Export the homepage frame as a single image from the design source, then we run a screenshot diff loop and tune spacing tokens until it matches.

---

If you want, paste your preferred navbar menu labels and CTA text, and I will output a complete **HTML structure plus the full CSS file** matching this spec.

Sources