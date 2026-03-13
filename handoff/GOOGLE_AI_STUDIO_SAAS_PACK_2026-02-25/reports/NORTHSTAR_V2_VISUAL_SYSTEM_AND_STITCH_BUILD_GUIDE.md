# NorthStar V2 Visual System + Stitch Build Guide
Date: 2026-02-25
Purpose: One implementation-grade design instruction set for Stitch + frontend developers.

## 1) Reference Analysis (What the draft UI is doing well)
The draft direction is strong in these areas:
- Premium cosmic-tech atmosphere with strong brand memorability.
- High-contrast hero composition with emblem-centered trust signal.
- Glassmorphism card language that fits enterprise-futuristic positioning.
- Clear modular sections (capabilities, metrics, roadmap, proof blocks).

Current issues to fix:
- Inconsistent readability in some cards due to glow/noise over text.
- Component styles vary too much between screens (buttons/cards/nav).
- Logo mark is strong but currently reads more like “N monogram” than “North Star” symbol.
- Illustration quality is visually rich but not yet systematized for reusable product branding.

---

## 2) Canonical Brand Visual Direction
Design personality:
- Futuristic executive command center
- Premium, restrained, technical, trustworthy
- “Signal intelligence” + “navigation by North Star”

Forbidden direction:
- Playful startup gradients
- Neon overload with low legibility
- Bright azure/candy blue dominance

---

## 3) Color System (Exact Tokens)
Use these as design tokens and CSS variables.

### Core Surfaces
- `--bg-0: #050918` (deep space base)
- `--bg-1: #0A1224` (primary surface)
- `--bg-2: #111E35` (elevated surface)
- `--surface-glass: rgba(17, 30, 53, 0.58)`
- `--surface-glass-strong: rgba(17, 30, 53, 0.74)`

### Text
- `--text-strong: #E8F0FF`
- `--text-body: #A6B8D6`
- `--text-dim: #7E93B7`

### Brand Accents
- `--accent-indigo: #5F6AD9`
- `--accent-cyan: #63D9FF`
- `--accent-teal: #3FC8B4`
- `--accent-violet-soft: #8B7DFF`

### Semantic Status
- `--ok: #34D399`
- `--warn: #F59E0B`
- `--risk: #FB7185`
- `--info: #60A5FA`

### Glow + Stroke
- `--line-soft: rgba(173, 206, 255, 0.16)`
- `--line-strong: rgba(173, 206, 255, 0.30)`
- `--glow-cyan: rgba(99, 217, 255, 0.35)`
- `--glow-indigo: rgba(95, 106, 217, 0.35)`

---

## 4) Typography System
Primary display/headline: `Space Grotesk`
Body/UI text: `Inter`
Numeric/KPI mono fallback: `JetBrains Mono`

Type scale:
- Hero H1: 64/72, weight 700, tracking -0.02em
- Section H2: 36/42, weight 700
- Card H3: 22/28, weight 600
- Body L: 18/28, weight 400
- Body M: 16/24, weight 400
- Caption: 12/16, weight 500, tracking 0.06em

Rules:
- Never place long body copy over high-noise/glow zones.
- Keep body contrast >= WCAG AA against glass surfaces.

---

## 5) Glassmorphism + Depth Spec
Card style:
- Background: `rgba(17,30,53,0.58)`
- Border: `1px solid rgba(173,206,255,0.16)`
- Backdrop blur: `14px`
- Saturation boost: `115%`
- Radius: `16px` (small), `20px` (primary cards)
- Shadow: `0 14px 40px rgba(4,10,28,0.55)`

High-priority cards:
- Background: `rgba(17,30,53,0.74)`
- Border: `1px solid rgba(173,206,255,0.30)`
- Inner highlight: top gradient overlay at 8%-12% opacity

---

## 6) Component Specs

### 6.1 Navbar
- Height: 72px desktop, 64px mobile
- Background: `rgba(5,9,24,0.84)` + blur 12px
- Border bottom: `1px solid var(--line-soft)`
- Right utility: notifications, settings, profile avatar
- Primary CTA: `Client Login`

### 6.2 Hero
- Left aligned text + optional right visual module
- H1 + subline + dual CTA
- Primary CTA label style: uppercase micro-bold

CTA styles:
- Primary button:
  - Fill gradient: `linear-gradient(135deg,#3A7BD5 0%,#3FC8B4 100%)`
  - Text: `#F6FCFF`
  - Radius: 10px
  - Height: 44px
- Secondary button:
  - Transparent glass + border `var(--line-soft)`

### 6.3 Cards
- Card spacing: 20px internal, 24px between major blocks
- Icon container: 36x36 with soft glow
- CTA inside card: text link with arrow, no heavy button unless primary action

### 6.4 KPI Strip
- 4 to 5 metrics max per row
- Numeric emphasis using mono or display semi-bold
- Delta chip colors based on semantic status

### 6.5 Timeline / Roadmap
- Vertical for mobile, hybrid horizontal for desktop
- Each node: phase id, outcome, blockers, next action
- Add confidence micro-bar per phase

### 6.6 Kanban (Case Command)
- Columns: Sourced, Verified, Applied, Interview, Offer
- Card shows: company, role, fit, verification status, due date
- Verification badge locked enum:
  - `VERIFIED_LEGIT`
  - `VERIFIED_RISK`
  - `UNKNOWN_INSUFFICIENT_EVIDENCE`

---

## 7) Interaction + Motion Rules
Global:
- Motion duration range: 160ms-320ms
- Easing: `cubic-bezier(.2,.8,.2,1)`

Hover effects:
- Cards: `translateY(-3px)` + border brighten + subtle sheen sweep
- Buttons: small glow amplification, no bounce

Scroll effects:
- Section reveal: opacity 0->1, y 18->0, stagger 40ms
- Keep animations one-time by default (avoid infinite distractions)

Micro-interactions:
- KPI tooltips: “Why this score”
- Drawer transitions for diagnostics + evidence panels

---

## 8) Wireframe (Page Skeleton)
Order for dashboard page:
1. Top nav
2. Hero summary (Readiness, Risk, ETA)
3. Mission Control charts
4. Core capabilities/skills matrix
5. Hard-Gate verification module
6. Roadmap/timeline module
7. Social proof / case evidence
8. Final action bar
9. Footer

Grid system:
- Desktop: 12 columns, max width 1280-1360
- Tablet: 8 columns
- Mobile: 4 columns
- Section vertical rhythm: 72px desktop / 48px mobile

---

## 9) Main Illustration Direction (Not final yet)
Goal: evolve from generic cosmic visual to iconic NorthStar asset.

Illustration rules:
- Central star should represent navigation + precision, not fantasy.
- Geometry: 4-point + subtle 4 secondary rays (8-direction signal concept).
- Material style: crystalline-metallic hybrid with controlled glow edges.
- Background should support data UI, not overpower it.

Do:
- Build one master star render + 3 variants (hero, emblem, watermark).
- Keep strongest luminance at center-core and ray tips.

Do not:
- Over-fractal light explosions.
- Overexposed neon bloom that reduces text readability.

---

## 10) Logo Evolution Brief (N Mark -> North Star)
Current mark direction (N monogram) is good for modernity, but star meaning is weak.

Upgrade path:
1. Keep angular N skeleton.
2. Integrate star axis crossing through N center (north-south + east-west cue).
3. Introduce subtle star notch geometry in negative space.
4. Build 3 lockups:
   - Icon-only
   - Horizontal (icon + NORTHSTAR)
   - Stacked (icon + NORTHSTAR + TALENT INTELLIGENCE)

Logo technical requirements:
- Works in 1-color and full-color versions.
- Works on dark and light backgrounds.
- Minimum clear space = 0.5x icon width.
- Minimum size for icon-only: 20px.

---

## 11) Stitch Prompt Block (Paste-ready)
Use this exact block to reduce random outputs.

```txt
Design a premium NorthStar authenticated dashboard UI in a futuristic executive command-center style.
Use strict brand tokens: #050918, #0A1224, #111E35, #5F6AD9, #63D9FF, #3FC8B4, #E8F0FF, #A6B8D6.
No bright azure/candy blue defaults. Use restrained glassmorphism with backdrop blur 14px and subtle border glow.
Implement these modules in one coherent page: KPI Hero, Mission Control, Skill Recovery Lab, Case Command Kanban, Strategic Roadmap, Next 7 Days panel.
Include hover lift on cards, border sweep, and one-time scroll reveal.
Typography: Space Grotesk headers, Inter body.
The main visual should emphasize a North Star symbol (precision/navigation), not generic sci-fi art.
Output must be responsive, high-legibility, and production-oriented.
```

---

## 12) Developer Handoff Checklist
Before design is approved for implementation:
- [ ] Tokens exported (color, type, radius, spacing, blur, shadow)
- [ ] Component states defined (default/hover/active/disabled)
- [ ] Desktop/tablet/mobile breakpoints validated
- [ ] Contrast pass for text over glass surfaces
- [ ] Logo lockups delivered (icon/horizontal/stacked)
- [ ] Illustration variants delivered (hero/emblem/watermark)
- [ ] Stitch output aligned to this guide with no random drift

This file is intended to keep design, Stitch generation, and frontend implementation aligned.
