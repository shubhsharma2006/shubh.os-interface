import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import SplitText from './SplitText';
import LiveMetricsPanel from './LiveMetricsPanel';
import { fadeUp, stagger } from '@/lib/motion';

const CompilerCore = lazy(() => import('./CompilerCore'));

export default function Hero() {
  const scrollTo = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative isolate min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[60vh]" style={{ background: 'var(--gradient-glow)' }} />

      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
        <motion.div
          className="relative"
          variants={stagger(0.1)}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-surface/60 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground backdrop-blur"
          >
            <span className="status-dot" />
            <span>Available · summer 2026 internships</span>
          </motion.div>

          <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem]">
            <SplitText text="Shubh Sharma." className="block" />
            <SplitText text="Building" className="block" delay={0.04} />
            <SplitText text="production systems." className="block text-gradient text-glow" delay={0.06} />
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Pre-final year CS (Data Science) at SRM IST. Full-stack engineer at{' '}
            <span className="text-foreground">Copious Infotech</span> shipping real
            production infra — 30+ APIs, 4-tier RBAC, Docker + Nginx + PM2 — and
            building AI systems on the side.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton onClick={scrollTo('work')}>View work</MagneticButton>
            <MagneticButton variant="ghost" onClick={scrollTo('contact')}>Get in touch →</MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <div><span className="text-foreground">3+ mo</span> production</div>
            <div className="h-3 w-px bg-border" />
            <div><span className="text-foreground">30+</span> apis shipped</div>
            <div className="h-3 w-px bg-border" />
            <div><span className="text-foreground">5</span> projects</div>
            <div className="h-3 w-px bg-border" />
            <div><span className="text-foreground">4×</span> ibm certified</div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative w-full max-w-[520px] justify-self-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl glass holo-border">
            <Suspense fallback={<div className="flex h-full items-center justify-center font-mono text-xs text-muted-foreground">loading…</div>}>
              <CompilerCore />
            </Suspense>
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
              <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" style={{ animation: 'scan 6s linear infinite' }} />
            </div>
          </div>
          <div className="mt-4">
            <LiveMetricsPanel />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="container-x mt-24 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓ scroll · system log streaming
        </motion.span>
        <span className="hidden md:inline">v2.0 · 2026</span>
      </motion.div>
    </section>
  );
}
