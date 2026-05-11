# Portfolio v3 — Full Build Plan

A staged rebuild of the portfolio against the v3 spec. The current site already has Hero, Work, Skills, Experience, Testimonials, Contact (with Lovable Cloud + `contact_submissions`), Smooth Scroll, and a Project Case Study route. We will refactor toward the v3 design system and add the missing high-value sections (Playground, AI Chat, Tech Ecosystem graph, GitHub Activity, Command Palette).

I'll ship this in **5 phases**, each independently reviewable. You approve → I build that phase → we move on. optimize all the phases according to to make them more better

---

## Phase 1 — Design System + Navigation Refresh

Foundation everything else depends on.

- Rewrite `index.css` + `tailwind.config.ts` to v3 tokens (bg-base `#060608`, accent-1 `#4F6EF7`, accent-2 `#8B5CF6`, accent-3 `#06B6D4`, glass tokens, glow tokens) — all as HSL semantic vars.
- Typography: Inter for headings/body, JetBrains Mono for code/metrics. Drop Space Grotesk.
- Refactor `Nav.tsx`: scroll-hide on down / reveal on up, scroll-spy active link, SS logo circle, mobile hamburger drawer.
- Add `ScrollProgress` polish (already exists), `CursorGlow` (CSS radial follow), and a `CommandPalette` (Cmd+K) shell.
- Hero polish: keep current LiveMetricsPanel, add status pill + role rotator (Systems / AI Infra / Compiler / Workflow / Backend) + animated terminal panel.

## Phase 2 — Projects 2.0 (Showcase + Modal + Diagrams)

The flagship section.

- Restructure `src/lib/projects.ts` to the 4 v3 projects: Python Compiler, HR Workflow Designer, Multi-Model RAG API, AcuStock AI — each with `category`, `status`, `stack`, `metrics[]`, `architecture_layers[]`, `diagram_type`.
- New `ProjectCard` with 3D CSS tilt, mini-diagram, glow-on-hover.
- Filter pills with Framer Motion layout transitions.
- `ProjectModal` (full-screen, backdrop blur, ESC/click-out close) replacing/augmenting the existing `/work/:slug` route.
- 4 SVG diagram components (`CompilerDiagram` linear pipeline, `WorkflowDiagram` DAG, `RAGDiagram` branching pipeline, `AnalyticsDiagram` dashboard mock) — animated with Framer Motion.

## Phase 3 — Interactive Playground

Three tabs in one section.

- `PythonREPL` powered by Pyodide (lazy-loaded), CodeMirror 6 editor, output console, run/clear/reset, example chips.
- `CompilerVisualizer` — 6-step animated walk-through of lexer → parser → semantic → AST opt → codegen → runtime, with prev/next/auto-play.
- `RAGDemo` — simulated 5-stage pipeline animation (embed → search → context → route → stream) using mock responses.
- All three tabs lazy-loaded behind Suspense.

## Phase 4 — AI Chat + Tech Ecosystem + GitHub

The "wow" section trio.

- **AI Chat** (`ChatWidget`): floating button bottom-right, slide-up panel, streaming responses. Backend: Supabase Edge Function `chat-proxy` calling Lovable AI Gateway (default `google/gemini-3-flash-preview` — equivalent quality, no extra API key). System prompt tuned to represent Shubh. New table `portfolio_chats` (session_id, messages jsonb) + 20-msg/session rate limit.
- **Tech Ecosystem**: force-directed graph (D3-force in React) with center "Shubh" node + 4 orbital rings (languages / frameworks / infra / domains). Hover dims others, click → tooltip with "used in" projects.
- **GitHub Activity**: live fetch from `api.github.com/users/{username}` + jogruber contributions API. Stats row, contribution heatmap, top 3 repos. Skeleton loading + mock fallback.

## Phase 5 — About + Experience + Polish + QA

Final pass.

- **About**: 2-column rebuild — story left, "Operating Principles" macOS-style toggle panel right, reading list horizontal scroll below.
- **Experience**: vertical timeline with milestone dots, scroll-reveal cards.
- **Contact**: extend existing form with Role select + live visitor counter via Supabase Realtime (new `portfolio_visits` table). Keep current Lovable Cloud email pipeline.
- **Polish**: Konami easter egg, button hover glows, section entrance animations, `prefers-reduced-motion` audit, mobile QA at 428px (current viewport), Lighthouse pass.

---

## Technical Notes (skip if not interested)

- **AI**: Lovable AI Gateway via Edge Function — no Claude key needed. If you specifically want Claude, I'll wire `add_secret` for `ANTHROPIC_API_KEY` instead.
- **DB additions**: `portfolio_chats`, `portfolio_visits` (RLS: anon insert only). Keep existing `contact_submissions`.
- **Lazy boundaries**: Pyodide, Three.js, D3-force, AI Chat all behind `React.lazy` + `Suspense`.
- **Performance budget**: ≤60 canvas particles, R3F `pixelRatio ≤ 1.5`, code-split per section.
- **Accessibility**: keyboard nav, ESC closes modals/chat, contrast ≥4.5:1, reduced-motion path.

---

## Open Questions Before I Start

1. **AI provider for chat** — Lovable AI Gateway (free, no key, Gemini/GPT-5) or Claude specifically (you'd add `ANTHROPIC_API_KEY`)?
2. **GitHub username** — spec says `shubhsharma2006`. Confirm? (Also need this for the GitHub section to fetch real data.)
3. **Phase order** — start at Phase 1 (design system reset) or jump straight to Phase 2 (Projects 2.0) since most visual impact lives there?
4. **Scope confirm** — all 5 phases, or trim (e.g. skip Playground or GitHub section)?

Approve this plan and answer the 4 questions above and I'll start executing phase by phase.