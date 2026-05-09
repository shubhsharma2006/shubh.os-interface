import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';
import { PROFILE } from '@/lib/profile';

const VALUES = [
  { k: 'Ship to production', v: 'Real users beat polished demos.' },
  { k: 'Measure everything', v: '-87%, +25%, p95 — numbers or it didn\'t happen.' },
  { k: 'Secure by default', v: 'JWT in cookies, validated input, hardened headers.' },
  { k: 'Learn in public', v: 'OSS on GitHub, IBM-certified, always shipping.' },
];

export default function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.1)}
        >
          <motion.div
            variants={fadeUp}
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground"
          >
            01 — about
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl"
          >
            CS student.<br />
            <span className="text-gradient">Production engineer</span>.<br />
            Builder of real things.
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-8 space-y-2 font-mono text-xs text-muted-foreground">
            <div><span className="text-primary">→</span> {PROFILE.location}</div>
            <div><span className="text-primary">→</span> {PROFILE.email}</div>
            <div><span className="text-primary">→</span> {PROFILE.phone}</div>
            <div className="flex gap-3 pt-2">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-primary">github ↗</a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary">linkedin ↗</a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.08)}
        >
          <motion.p variants={fadeUp} className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            I&apos;m a pre-final year CS (Data Science) student at SRM IST Ghaziabad, currently a{' '}
            <span className="text-foreground">full-time AI &amp; full-stack engineering intern</span> at
            Copious Infotech. In 3+ months I&apos;ve shipped 30+ REST endpoints, architected a
            4-tier RBAC system, and deployed cloud-compatible distributed infrastructure with
            Docker, Nginx and PM2 cluster mode.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            Outside work I build <span className="text-foreground">real systems</span> — a Python
            compiler with SSA optimizations, a multi-model RAG API fusing 3 local LLMs, a
            self-pruning neural network on CIFAR-10. IBM-certified in ML, RAG and Agentic AI.
          </motion.p>

          {/* Values grid */}
          <motion.div variants={fadeUp} className="mt-10 grid gap-3 sm:grid-cols-2">
            {VALUES.map((val) => (
              <div
                key={val.k}
                className="rounded-xl border border-border bg-surface/40 p-4 transition-colors hover:border-primary/50"
              >
                <div className="font-mono text-[11px] uppercase tracking-widest text-primary">{val.k}</div>
                <div className="mt-1 text-sm text-foreground/80">{val.v}</div>
              </div>
            ))}
          </motion.div>

          {/* Education */}
          <motion.div variants={fadeUp} className="mt-12">
            <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-primary">education</div>
            <div className="space-y-3">
              {PROFILE.education.map((e) => (
                <div key={e.school + e.year} className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3">
                  <div>
                    <div className="text-sm text-foreground">{e.school}</div>
                    <div className="text-xs text-muted-foreground">{e.degree} · {e.detail}</div>
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{e.year}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div variants={fadeUp} className="mt-10">
            <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-primary">certifications</div>
            <div className="grid gap-2 sm:grid-cols-2">
              {PROFILE.certifications.map((c) => (
                <div key={c.name} className="flex items-center justify-between rounded-lg border border-border bg-surface/40 px-3 py-2">
                  <span className="text-sm text-foreground/85">{c.name}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.year}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
