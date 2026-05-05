import { useEffect, useRef, useState } from 'react';

const MODULES = [
  'parser.init',
  'lexer.tokenize',
  'ast.build',
  'optimizer.pass',
  'codegen.emit',
  'runtime.boot',
];

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeIndex = Math.min(MODULES.length - 1, Math.floor(progress * MODULES.length));

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(50% 50% at 50% 50%, hsl(var(--accent) / 0.1), transparent 70%)' }} />

        <div className="relative z-10 w-full max-w-3xl px-6 text-center">
          <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            // chapter 02
          </div>
          <h2 className="font-display text-4xl font-semibold leading-tight text-foreground md:text-7xl">
            Booting <span className="text-gradient">modules</span>…
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-mono text-sm text-muted-foreground">
            executable units of work · each shipped, each measured · scroll to load.
          </p>

          {/* Module list */}
          <div className="mt-12 space-y-2 font-mono text-sm">
            {MODULES.map((m, i) => {
              const done = i < activeIndex;
              const active = i === activeIndex;
              return (
                <div key={m} className={`flex items-center justify-center gap-3 transition-opacity duration-300 ${i <= activeIndex ? 'opacity-100' : 'opacity-30'}`}>
                  <span className={`w-3 ${done ? 'text-primary' : active ? 'text-accent' : 'text-muted-foreground'}`}>
                    {done ? '✓' : active ? '▸' : '·'}
                  </span>
                  <span className={`${active ? 'text-foreground' : done ? 'text-primary' : 'text-muted-foreground'}`}>
                    {'> ' + m}
                  </span>
                  <span className={`text-muted-foreground ${done ? 'text-primary' : ''}`}>
                    {done ? 'OK' : active ? '...' : ''}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mx-auto mt-10 h-px w-full max-w-md overflow-hidden bg-border">
            <div className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {Math.round(progress * 100)}% · loading executable modules
          </div>
        </div>
      </div>
    </section>
  );
}
