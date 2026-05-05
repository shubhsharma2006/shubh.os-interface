import { lazy, Suspense } from 'react';
import MagneticButton from './MagneticButton';
import { useTypewriter } from '@/hooks/useTypewriter';

const CompilerCore = lazy(() => import('./CompilerCore'));

const ROLES = [
  'compilers',
  'ai interfaces',
  'developer tools',
  'systems software',
];

export default function Hero() {
  const role = useTypewriter(ROLES, 80, 1500);

  const scrollTo = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative isolate min-h-screen overflow-hidden pt-28">
      {/* Background grid + ambient */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[60vh]" style={{ background: 'var(--gradient-glow)' }} />

      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        {/* Left: copy */}
        <div className="relative animate-fade-in">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-surface/60 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
            <span className="status-dot" />
            <span>System online · Q3 2026</span>
          </div>

          <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem]">
            ARCHITECT OF<br />
            <span className="text-gradient text-glow">INTELLIGENT</span><br />
            SYSTEMS
          </h1>

          <p className="mt-7 max-w-md font-mono text-sm leading-relaxed text-muted-foreground md:text-base">
            <span className="text-primary">{'>'}</span> shubh — building{' '}
            <span className="text-foreground">{role}</span>
            <span className="ml-0.5 inline-block w-2 animate-blink text-primary">▍</span>
            <br />
            <span className="text-primary">{'>'}</span> compiling thought into runtime since 2021.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton onClick={scrollTo('projects')}>Engage</MagneticButton>
            <MagneticButton variant="ghost" onClick={scrollTo('contact')}>View modules →</MagneticButton>
          </div>

          {/* Stat strip */}
          <div className="mt-14 grid max-w-md grid-cols-3 gap-4 font-mono">
            {[
              { k: 'MODULES', v: '12+' },
              { k: 'UPTIME', v: '99.99%' },
              { k: 'TOKENS/D', v: '1.4M' },
            ].map((s) => (
              <div key={s.k} className="border-l border-border/80 pl-4">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.k}</div>
                <div className="mt-1 text-lg text-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D crystal + HUD */}
        <div className="relative aspect-square w-full max-w-[640px] justify-self-center">
          <div className="absolute inset-0 rounded-[2rem] glass holo-border overflow-hidden">
            <Suspense fallback={<div className="flex h-full items-center justify-center font-mono text-xs text-muted-foreground">booting core…</div>}>
              <CompilerCore />
            </Suspense>

            {/* Scanline */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
              <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" style={{ animation: 'scan 6s linear infinite' }} />
            </div>

            {/* HUD chips */}
            <Hud label="CORE_TEMP" value="36.2°C" position="top-4 left-4" />
            <Hud label="NEURAL_LOAD" value="42%" position="top-4 right-4" />
            <Hud label="UPTIME" value="99.99%" position="bottom-4 left-4" />
            <Hud label="MODULE" value="compiler.core" position="bottom-4 right-4" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="container-x mt-24 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        <span>scroll · explore modules</span>
        <span className="hidden md:inline">[ section 01 / 04 ]</span>
      </div>
    </section>
  );
}

function Hud({ label, value, position }: { label: string; value: string; position: string }) {
  return (
    <div className={`absolute ${position} glass-strong rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-widest`}>
      <div className="text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-primary">{value}</div>
    </div>
  );
}
