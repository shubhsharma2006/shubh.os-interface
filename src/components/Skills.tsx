import { motion } from 'framer-motion';
import { SKILL_GROUPS, DOMAINS, TOOLS } from '@/lib/skills';

export default function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div className="container-x">
        <div className="mb-16">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            03 — skills & domains
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            What I <span className="text-gradient">build with</span>.
          </h2>
        </div>

        {/* Domain cards */}
        <div className="mb-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {DOMAINS.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl border border-border bg-surface/40 p-5 transition-colors hover:border-primary/50"
            >
              <div className="mb-3 inline-flex rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary">
                {d.tag}
              </div>
              <div className="font-display text-lg font-semibold text-foreground">{d.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Skill bars */}
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((g, gi) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: gi * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-primary">
                {g.group}
              </div>
              <div className="space-y-3">
                {g.items.map((s, i) => (
                  <div key={s.name}>
                    <div className="mb-1 flex items-center justify-between font-mono text-[11px] text-foreground/80">
                      <span>{s.name}</span>
                      <span className="text-muted-foreground">{s.level}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools */}
        <div className="mt-16">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            tools
          </div>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-surface/40 px-3 py-1 font-mono text-[11px] text-foreground/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
