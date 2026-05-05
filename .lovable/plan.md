
# SHUBH.OS — Cinematic Portfolio Shell (v1)

A futuristic AI/compiler-themed portfolio. First pass focuses on the **showpiece moments** so the experience already feels premium end-to-end. Other sections (Skills graph, AI/Compiler viz, Experience, Stats, About) come in follow-up rounds.

Reference vibe: Razorpay Sprint — dark, chaptered, scroll-driven, bold typographic reveals, sticky moments — fused with an AI operating-system identity.

> Note on stack: Lovable runs on **Vite + React 18 + TypeScript + Tailwind** (not Next.js). Same capabilities; React Three Fiber v8 for 3D.

---

## What you'll get in this pass

### 1. Boot Intro (first visit only)
- Black screen, neural particles initialize.
- Terminal-style typed sequence:
  ```text
  > INITIALIZING SHUBH.OS
  > LOADING NEURAL SYSTEMS........ OK
  > COMPILER CORE ACTIVE
  > AI MODULES READY
  > WELCOME, OPERATOR
  ```
- Skip button (top-right). Stored in `localStorage` so returning visitors get a 400ms fade instead.
- Reduced-motion users get the instant fade automatically.

### 2. Hero — "Compiler Core"
Two-column cinematic layout.

```text
┌───────────────────────────────┬──────────────────────────────┐
│  SHUBH                        │                              │
│  ARCHITECT OF                 │      [ 3D NEURAL CRYSTAL ]   │
│  INTELLIGENT SYSTEMS          │       faceted icosahedron    │
│                               │       glowing inner core     │
│  > building compilers, ai     │       energy rings           │
│    interfaces, dev tools.     │       mouse-reactive tilt    │
│                               │                              │
│  [ ENGAGE ]   [ VIEW MODULES ]│      status HUD overlay      │
└───────────────────────────────┴──────────────────────────────┘
```
- Left: name, rotating role line (typewriter), short identity statement, two magnetic CTA buttons.
- Right: **procedural neural crystal** — faceted icosahedron with a glowing inner core, two slow-rotating energy rings, subtle mouse parallax. No external assets, runs at 60fps.
- Floating glass HUD chips around the canvas: `CORE_TEMP 36°C`, `UPTIME 99.99%`, `NEURAL_LOAD 42%` (animated).
- Ambient grid + soft cyan vignette in the background.

### 3. Sticky Section Divider — "Booting modules…"
Razorpay-Sprint-style transition between hero and projects: full-viewport sticky panel where a progress bar fills and module names flash in as you scroll. Sets the rhythm for future chapters.

### 4. Projects — "Executable Modules"
Asymmetrical bento grid. Each card is a software module, not a portfolio tile.

```text
┌─────────────────────────┐ ┌──────────────┐
│ MODULE: FinTrack.ai     │ │ MODULE:      │
│ STATUS: ● ACTIVE        │ │ Lexica.lang  │
│ TYPE:   FINANCE / AI    │ │ ● ACTIVE     │
│ ─────────────────────── │ │ COMPILER     │
│ preview / hover state   │ └──────────────┘
│ stack chips · GH · Live │ ┌──────────────┐
└─────────────────────────┘ │ MODULE:      │
                            │ NeuroDash    │ ...
```
- Glass panels, holographic border, hover tilt + subtle glow.
- Status dot pulses. Tech stack chips. GitHub + Live links.
- 4–6 placeholder modules with realistic AI/compiler/devtool names and short architecture blurbs.

### 5. Contact — "Terminal Uplink"
- Full-width terminal panel: `connect --hire`
- Inputs styled as command-line fields (name, email, message), with caret animation and validation that reads like compiler output (`✓ email.valid`, `✗ message.required`).
- Side rail: availability status (●  AVAILABLE Q3 2026), GitHub, LinkedIn, email.
- Submit triggers a fake "transmitting…" sequence, then a success ack. (No backend in this pass — hooks into Lovable Cloud later if you want real delivery.)

### 6. Footer
Minimal: `SHUBH.OS · v1.0.0 · uptime 99.99%` · social row · scroll-to-top.

---

## Design system

- **Palette**: deep black `#05060A`, panel `#0B0F1A`, neural cyan `#7DF9FF`, electric blue `#3B82F6`, holographic violet `#A78BFA`, soft white `#E6EDF7`. All HSL tokens in `index.css`.
- **Type**: Space Grotesk for display, JetBrains Mono for terminal/labels, Inter for body.
- **Surfaces**: glassmorphism (low-opacity panel + backdrop blur + 1px gradient border), restrained glow — used as accents, not everywhere.
- **Motion**: Framer Motion springs; scroll reveals via `useInView`; no bouncy/cartoony curves. Apple-quiet, not flashy.
- **Custom cursor**: small ring + dot, magnetic snap on interactive elements. Disabled on touch.

---

## Performance & accessibility

- Single R3F `<Canvas>` only in hero, lazy-loaded with `Suspense`.
- DPR clamped `[1, 1.5]`, no postprocessing in v1 (kept lean; can add bloom later).
- Mobile: 3D crystal swaps to a static SVG/CSS variant under 768px.
- All animations honor `prefers-reduced-motion`.
- Semantic HTML, focus rings, aria labels on icon buttons, keyboard-navigable terminal form.

---

## Technical notes

- **Routes**: single `/` page, sectioned. No router changes needed.
- **Files added** (high-level): `BootIntro`, `Hero`, `CompilerCore` (R3F scene), `MagneticButton`, `CustomCursor`, `ModuleCard`, `ProjectsGrid`, `SectionDivider`, `TerminalContact`, `Footer`, plus `lib/constants/projects.ts` for placeholder data and `hooks/useMagnetic.ts`, `hooks/useTypewriter.ts`.
- **Deps to add**: `three`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0`, `framer-motion`.
- Tailwind config extended with the palette tokens, `fade-in` / `scale-in` / `slide-up` / `pulse-glow` keyframes, and font families.

---

## Out of scope for this pass (next rounds)
- About section with story copy
- Skills as neural node graph
- AI/Compiler visualization (AST / token flow) — the signature feature
- Execution-history timeline
- Animated stats counters
- Real contact-form delivery via Lovable Cloud

Approve to build, or tell me to adjust scope, palette, or which section to swap in/out.
