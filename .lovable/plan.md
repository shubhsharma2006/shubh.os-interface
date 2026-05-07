## Pivot: From "Compiler OS" to a Premium Personal Portfolio

Strip the heavy compiler metaphor. Keep the cinematic dark aesthetic, but make the story about **you** — who you are, what you've built, how to hire you. 3D and framer become storytelling tools, not the subject.

New section arc:

```text
HERO  →  ABOUT  →  WORK  →  PROCESS  →  EXPERIENCE  →  PLAYGROUND  →  CONTACT
```

---

## Sections & What to Add

### 1. Hero — "Signature Moment"
- Big kinetic name: **SHUBH** as 3D extruded text (drei `Text3D`) with subtle metallic shader, slow rotation, mouse-parallax.
- One-line role tagline with framer **split-text reveal** (each word fades+rises, staggered).
- Two CTAs: `View Work` (magnetic hover) + `Get in touch`.
- Floating availability pill: green dot + "Available for freelance — May 2026".
- Scroll cue: animated chevron + "scroll" with framer loop.

### 2. About — "The Human Layer"
- Two-column: left = portrait (rounded, subtle tilt on mouse using framer `useMotionValue`), right = warm bio paragraph.
- Inline stat chips: years of experience, projects shipped, coffee consumed.
- 3D ambient: a small floating object behind the portrait (torus knot or abstract shape) with bloom-like CSS halo.

### 3. Selected Work — Showcase Grid
- 3–6 hero projects in an asymmetric bento grid.
- Each card:
  - Cover image with **framer parallax** on scroll.
  - Hover: image scales, title slides up, a "View case study →" link reveals.
  - Tags (React, Three.js, etc.) and year.
- One **featured project** spans 2 columns with a looping muted video preview.
- Click → smooth `layoutId` transition (framer) into a detail view with role/stack/outcome.

### 4. Process — "How I Work" (3D centerpiece)
- A horizontal scroll panel with 4 stages: **Discover · Design · Build · Ship**.
- Center: a **3D abstract object** that morphs shape per stage (sphere → icosahedron → wireframe cube → glowing torus), driven by `useScroll`.
- Each stage has a one-line description and 2–3 bullets.

### 5. Experience — Timeline
- Clean vertical timeline of roles (company, period, what you did).
- Framer `whileInView` slide-in from alternating sides.
- Subtle vertical line drawn via `motion.path` with `pathLength` tied to scroll.

### 6. Playground / Lab
- 3D interactive toy: a **field of floating instanced meshes** (drei `Instances`) that react to cursor — push away or attract.
- Below: small grid of "experiments" (codepens, side projects, shaders) as thumbnail cards.
- Sets you apart as someone who plays, not just ships.

### 7. Testimonials (optional but high-trust)
- Marquee row of quotes from clients/colleagues.
- Auto-scroll, pause on hover.

### 8. Contact — "Let's Talk"
- Big statement: "Have a project in mind?" with mailto CTA.
- Simple form: name, email, message — framer focus animations on each field.
- Below: socials (GitHub, LinkedIn, X, Read.cv) as icon buttons with magnetic hover.
- Footer: location, timezone, "© 2026 Shubh".

---

## 3D Ideas (lightweight, no assets)

- **Hero**: extruded 3D name OR a single hero object (crystal / orb / torus knot) — pick one signature shape and own it.
- **About**: ambient floating geometry behind portrait.
- **Process**: morphing centerpiece tied to scroll.
- **Playground**: cursor-reactive instanced field.
- Skip post-processing (caused WebGL crashes earlier). Use additive sprite glows + CSS halos for the "bloom" feel.

## Framer Motion Patterns to Use

- **Split-text reveal** for headings (stagger children).
- **Magnetic buttons** for CTAs.
- **Scroll-linked parallax** on project covers.
- **Layout transitions** (`layoutId`) for project card → detail.
- **whileInView** with `once: true` for section entrances.
- **useScroll + useTransform** for the process morph and timeline draw.
- **Marquee** with infinite `x` animation for testimonials/tech logos.
- **Page enter overlay** — a quick wipe/curtain on first load.

## Global Polish

- Custom cursor (already exists) — keep, refine sizes per element.
- Smooth scroll via `lenis` (small dep, big quality jump).
- Sticky minimal nav with active-section underline.
- Theme toggle (already exists).
- Reduced-motion fallbacks for every animation.
- Lazy-load 3D sections with `React.lazy` + Suspense; cap DPR at 1.5; `frameloop="demand"` when off-screen.

---

## What to Remove from Current Build

To make room and stay focused:
- BootIntro terminal (or shorten to ~1s splash).
- AST Visualization playground.
- Stats Dashboard (compiler metrics).
- Skill Network (replace with simple categorized chips in About, or a small marquee).
- Execution History styled as compiler logs (rework as clean Experience timeline).

---

## Suggested First Wave

1. Add `lenis` smooth scroll + motion variants lib (`src/lib/motion.ts`).
2. Rebuild Hero with 3D signature object + split-text + CTAs.
3. Rebuild Work as bento grid with parallax + hover.
4. Add Process section with scroll-driven morphing 3D centerpiece.
5. Clean up nav, footer, contact.

Wave 2: Playground 3D field, testimonials marquee, project detail layout transitions.

Tell me to proceed and I'll start with Wave 1.