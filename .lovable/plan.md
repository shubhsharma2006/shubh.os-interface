
# FAANG-Level Portfolio — Feature Plan

Goal: turn the current portfolio into a recruiter-grade, feature-rich showcase. Four explicit asks plus a small set of high-leverage additions that make the whole experience feel cohesive.

---

## Wave 1 — Core asks (highest priority)

### 1. Project case studies with metrics
Extend `src/lib/projects.ts` with rich case-study data per project:
- `timeline` (e.g. "Mar – Aug 2025, 6 mo")
- `role` ("Lead engineer · solo")
- `stack` (already exists, expand into grouped: language / infra / frontend)
- `impact[]` array of metric cards: `{ label, value, delta }` (e.g. "Latency", "38ms", "-62%")
- `problem`, `approach`, `outcome` long-form blocks
- `gallery[]` (image/video/3D placeholder)
- `links` (live, repo, writeup)

New component `ProjectCaseStudy.tsx` rendering an animated layout:
- Sticky left rail with project meta + jump links
- Right column: hero cover → problem → approach (with code/diagram blocks) → impact metrics grid (count-up numbers via framer `useInView` + `animate`) → gallery → next-project CTA
- Section reveals via existing `fadeUp` / `stagger` from `src/lib/motion.ts`

### 2. Lenis smooth scroll + scroll-linked tuning
- Add `lenis` (`@studio-freight/lenis`) provider in `src/components/SmoothScroll.tsx`, mount once in `Index.tsx`
- Sync with framer-motion via `ScrollTrigger`-style `requestAnimationFrame` loop; expose `useLenis` hook
- Pause Lenis when modal open, when `prefers-reduced-motion`, and on touch devices (let native scroll win on mobile to avoid jank)
- Audit `useScroll` consumers (`Process.tsx`, future case study) to use `layoutEffect: false` and throttle `useTransform` outputs
- Add a thin top progress bar (`ScrollProgress.tsx`) driven by Lenis

### 3. Work grid → case study layout transitions
- Wrap each `WorkCard` cover, title, and meta in `motion.* layoutId={`project-${id}-cover`}` etc.
- Clicking a card opens a full-screen overlay route `/work/:slug` (add to `App.tsx` routes) using `AnimatePresence mode="wait"` + shared layout
- Overlay = `ProjectCaseStudy` mounted inside a `motion.div` with matching `layoutId`s so cover image, title, and tags morph from grid position into the case study hero
- Back button reverses the transition; ESC + scroll-lock handled in overlay
- Preserve scroll position on the Work page when returning

### 4. Testimonials marquee
- New `Testimonials.tsx` between `Experience` and `Playground`
- Two rows scrolling opposite directions using framer `animate` with infinite linear `x` transform (or CSS `@keyframes marquee` already in tailwind config)
- Each card: glass styling (`GlassCard`), avatar circle (initials fallback), quote, name, role, company logo mark
- Pause-on-hover, reduce-motion fallback (static grid)
- Seed with 6–8 quotes in `src/lib/testimonials.ts`

---

## Wave 2 — Recommended FAANG-polish additions

5. **Command palette** (`⌘K`) — `cmdk` powered, jump to sections/projects, toggle theme, copy email, open resume.
6. **Resume / CV section** — printable `/resume` route with semantic HTML, "Download PDF" via `react-to-print`, JSON-LD `Person` schema.
7. **Now / Currently** widget in About — what I'm building, reading, listening to (static array, easy to update).
8. **Writing / Notes** section — MDX-ready list (placeholder posts ok), reading-time, tag chips.
9. **Awards & recognition strip** — logo wall (Stripe-style) with subtle marquee.
10. **Contact upgrade** — form posts to Lovable Cloud edge function → email; show success animation; add Calendly/cal.com inline embed and copy-email button.
11. **OG image generator** — per-project dynamic OG via static export at build; per-page `<title>` + meta + canonical via `react-helmet-async`.
12. **Performance pass** — lazy-load 3D sections via `React.lazy`+`Suspense`, cap `dpr={[1,1.5]}`, `frameloop="demand"` gated by `IntersectionObserver`; Lighthouse target ≥95 perf / 100 a11y.
13. **A11y + i18n basics** — focus-visible rings, skip-to-content, prefers-reduced-motion everywhere, alt text audit.
14. **Analytics** — privacy-friendly Plausible/Umami snippet, custom events on project open + contact submit.

---

## Suggested build order

```text
Wave 1 (this round)
  1. Lenis + ScrollProgress           (foundation; everything else benefits)
  2. Case study data model + page     (no transitions yet, route works standalone)
  3. Layout transitions Work → case study
  4. Testimonials marquee

Wave 2 (next round)
  5. Command palette
  6. Resume + Now widget
  7. Writing + Awards strip
  8. Contact upgrade (Cloud function)
  9. SEO/OG + perf + a11y + analytics
```

---

## Technical notes

- **Routing**: switch Work card click from anchor to `<Link to={`/work/${slug}`}>`; keep `/` scroll position with a `useScrollRestoration` hook.
- **Shared layout pitfall**: `layoutId` must be unique and present in only one mounted tree at a time — gate the grid card's `layoutId` to off while overlay is open to avoid flicker.
- **Lenis + framer**: drive framer's `useScroll` from a custom `scrollY` motionValue updated in Lenis's `scroll` callback; do not let both libs control `body` scroll.
- **Reduced motion**: every new animation reads `useReducedMotion()` and degrades to fade/none.
- **Data**: keep all content in `src/lib/*.ts` so a future CMS swap is trivial.
- **No new heavy deps** beyond `lenis`, `cmdk`, `react-helmet-async`, `react-to-print` (all small).

Ready to start with Wave 1 step 1 (Lenis + ScrollProgress) on approval, or reorder if you want testimonials first since it's the quickest visible win.
