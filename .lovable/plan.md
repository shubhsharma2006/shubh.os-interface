# Shubh Sharma — "Live System" Portfolio Rebuild

A full content + UX overhaul grounded in your actual resume (Copious Infotech, AcuStock, Python Compiler, HR Workflow Designer, Self-Pruning NN, Multi-Model RAG API) with a "live production system" visual language: dashboards, log streams, uptime panels, animated metrics. Plus a working contact form that emails you and auto-replies to the visitor.

---

## 1. Content rewrite (real data from your resume)

**Identity**

- Shubh Sharma — Full-Stack & AI Engineer
- B.Tech CS (Data Science), SRM IST Ghaziabad · CGPA 7.8 · Class of 2027
- Delhi NCR · [ss1188@srmist.edu.in](mailto:ss1188@srmist.edu.in) · +91-9897204232
- LinkedIn: shubh-sharma · GitHub: shubhsharma2006

**Headline metrics (used everywhere — hero, stats grid, project cards): internshio sextioj**

- 87% data-error reduction (15% → <2%)
- 25% faster retrieval (Mongoose indexing)
- 18% lower API latency
- 30+ REST endpoints shipped
- 4-tier RBAC architected
- 0.91 test accuracy / sparsity (Self-Pruning NN)
- 3× throughput (RAG fusion across 3 LLMs)
- Sub-100ms query response (Finance Tracker)

---

## 2. Page sections (single-page + project detail routes) 

```
┌─ Nav (sticky, glass) ───────────────────────────────┐
│  shubh.dev    Home  About  Work  Skills  Contact   │
├─ HERO ──────────────────────────────────────────────┤
│  Name + tagline + SplitText                         │
│  ┌──── LIVE METRICS PANEL ────┐                     │
│  │ ● uptime  ● errors -87%    │                     │
│  │ ● latency -18%  ● 30+ APIs │  ← animated counters│
│  └────────────────────────────┘                     │
│  Quick nav chips → about/work/contact               │
├─ SCROLLING LOG STREAM ──────────────────────────────┤
│  [12:04:21] INFO  shipped endpoint /api/stock/in    │
│  [12:04:22] OK    rbac check passed (MANAGER)       │
│  [12:04:23] INFO  invalid records 14.8% → 1.7%      │
│  ...real accomplishments as fake syslog             │
├─ STATS GRID (huge, front-loaded) ───────────────────┤
│   87%        25%        3×        0.91              │
│   errors↓    faster     throughput accuracy         │
├─ ABOUT ─────────────────────────────────────────────┤
│  Bio · Values · Education timeline · Internship     │
├─ SKILLS (animated fill bars) ───────────────────────┤
│  Languages · Backend · DevOps · AI/ML · Security    │
│  Domain cards · Tools                                │
├─ WORK (5 real projects, bento grid) ────────────────┤
│  AcuStock · Python Compiler · HR Workflow ·         │
│  Self-Pruning NN · Multi-Model RAG API              │
│  Each card: per-metric mini-dashboard + tech badges │
│  Click → /work/:slug case study                     │
├─ EXPERIENCE (cards w/ green left-border hover) ─────┤
│  Copious Infotech · Dec 2025 → Present              │
├─ TESTIMONIALS (existing marquee, kept)              │
├─ CONTACT — "UPTIME" PANEL ──────────────────────────┤
│  ● Available for internships    status: OPERATIONAL │
│  ● Response time            avg: < 24h              │
│  ● Timezone                 IST (UTC+5:30)          │
│  [ Contact form ] → emails you + auto-reply visitor │
├─ FOOTER ────────────────────────────────────────────┤
│  © 2026 · live UTC clock 18:42:07 UTC · socials     │
└─────────────────────────────────────────────────────┘
```

---

## 3. New / rewritten components


| Component                                                                                  | Purpose                                                    |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `LiveMetricsPanel.tsx`                                                                     | Hero dashboard: animated counters, sparklines, status dots |
| `LogStream.tsx`                                                                            | Auto-scrolling syslog (uses your real wins as messages)    |
| `StatsGrid.tsx`                                                                            | 4 giant impact numbers with count-up                       |
| `SkillBars.tsx`                                                                            | Animated horizontal fill bars per skill, grouped           |
| `DomainCards.tsx`                                                                          | "Backend / DevOps / AI / Security" capability cards        |
| `EducationTimeline.tsx`                                                                    | SRM IST · DMPS XII · DMPS X                                |
| `UptimePanel.tsx`                                                                          | Contact section styled as service-health page              |
| `LiveClock.tsx`                                                                            | Footer ticking UTC clock                                   |
| `ProjectMiniDashboard.tsx`                                                                 | Per-project KPI strip on Work cards                        |
| Rewrite `Hero.tsx`, `About.tsx`, `Work.tsx`, `Experience.tsx`, `Contact.tsx`, `Footer.tsx` | Plug in real content                                       |
| `lib/projects.ts`                                                                          | Replace fake data with 5 real projects + GitHub links      |
| `lib/skills.ts` (new)                                                                      | Skill groups with proficiency 0–100                        |


Existing `SmoothScroll`, `ScrollProgress`, `Testimonials`, `Process`, `Playground`, `ProjectCaseStudy`, `Nav`, `MagneticButton`, `SplitText` are kept and re-skinned where needed.

---

## 4. Contact form + email backend (Lovable Cloud)

Flow:

1. Visitor fills `name / email / message` on the site.
2. Client calls `send-transactional-email` edge function **twice** with one trigger:
  - Email **to you** (`ss1188@srmist.edu.in`) — template: `contact-notification` — contains visitor name, email, message.
  - Email **to visitor** — template: `contact-confirmation` — "Hey {name}, thanks — I'll get back to you. Here's what you sent: …"
3. Submission also stored in `contact_submissions` table (with RLS) for backup.

Steps the build will perform:

- Enable **Lovable Cloud** (one click via tool).
- Run email-domain setup dialog so emails come from your branded sender.
- Scaffold transactional email infra + two React-Email templates (`contact-notification`, `contact-confirmation`).
- Create `contact_submissions` table + RLS (anon insert allowed, select restricted).
- Wire form with Zod validation, rate-limit on client, success/error toasts.

You'll be prompted once to set up the email sender domain — everything else is automatic.

---

## 5. Getting the code into VS Code

This is a one-time export, not something I build:

1. Top-right of editor → **GitHub → Connect to GitHub** → push repo.
2. In VS Code: `git clone <your-repo>` → `bun install` → `bun dev`.

I'll add a short README section with these exact steps.

---

## Build order

1. Content layer: `lib/projects.ts` (5 real projects), `lib/skills.ts`, copy rewrite.
2. New components: LiveMetricsPanel, LogStream, StatsGrid, SkillBars, DomainCards, UptimePanel, LiveClock, EducationTimeline, ProjectMiniDashboard.
3. Rewire `Hero / About / Work / Experience / Contact / Footer / Index`.
4. Enable Cloud → email domain dialog → scaffold templates → wire form.
5. README export instructions.

Approve and I'll start with step 1 and stop at step 4 to walk you through the email-domain setup.