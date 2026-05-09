import { motion } from 'framer-motion';

const ROLES = [
  {
    period: 'Dec 2025 — Present',
    company: 'Copious Infotech · Sector-63, Noida',
    role: 'AI & Full-Stack Engineering Intern (Full-Time)',
    bullets: [
      'Shipped 30+ REST API endpoints on a live inventory platform; cut p95 latency 18% via Mongoose indexing & query refactoring.',
      'Architected a 4-tier JWT-based RBAC system (SUPER_ADMIN → USER) with HTTP-only cookies — eliminated XSS-based token theft.',
      'Overhauled MongoDB schema validation; invalid records dropped from ~15% to <2% (-87%) with +25% retrieval speed.',
      'Containerised on Linux with Docker + Nginx HTTPS reverse proxy + PM2 cluster mode for zero-downtime restarts.',
    ],
    stack: ['Node.js', 'MongoDB', 'Docker', 'Nginx', 'PM2', 'JWT'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-32">
      <div className="container-x">
        <div className="mb-16">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            04 — experience
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            In <span className="text-gradient">production</span>.
          </h2>
        </div>

        <div className="space-y-6">
          {ROLES.map((r, i) => (
            <motion.div
              key={r.period}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl border border-border bg-surface/40 p-6 pl-8 transition-all hover:border-primary/50 hover:bg-surface/70 md:p-8 md:pl-10"
            >
              <div className="absolute inset-y-4 left-0 w-1 rounded-r bg-primary/40 transition-all group-hover:bg-primary group-hover:shadow-[0_0_12px_hsl(var(--primary)/0.6)]" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="font-display text-xl font-semibold text-foreground md:text-2xl">{r.role}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{r.company}</div>
                </div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-primary">{r.period}</div>
              </div>
              <ul className="mt-5 space-y-2">
                {r.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/70" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {r.stack.map((s) => (
                  <span key={s} className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
