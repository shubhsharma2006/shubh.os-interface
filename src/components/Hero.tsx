import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import SplitText from './SplitText';
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

      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <motion.div
          className="relative"
          variants={stagger(0.12)}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-surface/60 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground backdrop-blur"
          >
            <span className="status-dot" />
            <span>Available for freelance · May 2026</span>
          </motion.div>

          <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-foreground md:text-7xl lg:text-[5.75rem]">
            <SplitText text="Designing" className="block" />
            <SplitText text="immersive" className="block text-gradient text-glow" delay={0.05} />
            <SplitText text="digital products." className="block" delay={0.06} />
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            I'm <span className="text-foreground">Shubh</span> — a creative engineer crafting cinematic
            interfaces, 3D experiences and developer tools that feel as good as they perform.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton onClick={scrollTo('work')}>View work</MagneticButton>
            <MagneticButton variant="ghost" onClick={scrollTo('contact')}>Get in touch →</MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-14 flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <div><span className="text-foreground">5+</span> yrs experience</div>
            <div className="h-3 w-px bg-border" />
            <div><span className="text-foreground">40+</span> projects shipped</div>
            <div className="h-3 w-px bg-border" />
            <div><span className="text-foreground">12</span> countries</div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative aspect-square w-full max-w-[600px] justify-self-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 rounded-[2rem] glass holo-border overflow-hidden">
            <Suspense fallback={<div className="flex h-full items-center justify-center font-mono text-xs text-muted-foreground">loading…</div>}>
              <CompilerCore />
            </Suspense>
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
              <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" style={{ animation: 'scan 6s linear infinite' }} />
            </div>
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
          ↓ scroll to explore
        </motion.span>
        <span className="hidden md:inline">Portfolio · 2026</span>
      </motion.div>
    </section>
  );
}
