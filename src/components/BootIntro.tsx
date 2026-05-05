import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const LINES = [
  '> INITIALIZING SHUBH.OS',
  '> LOADING NEURAL SYSTEMS........ OK',
  '> COMPILER CORE ............... ONLINE',
  '> AI MODULES .................. READY',
  '> WELCOME, OPERATOR_',
];

export default function BootIntro({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState<string[]>([]);
  const [exiting, setExiting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) { onDone(); return; }
    let i = 0;
    const id = setInterval(() => {
      setShown((s) => [...s, LINES[i]]);
      i++;
      if (i >= LINES.length) {
        clearInterval(id);
        setTimeout(() => setExiting(true), 700);
        setTimeout(onDone, 1300);
      }
    }, 380);
    return () => clearInterval(id);
  }, [onDone, reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${exiting ? 'opacity-0' : 'opacity-100'}`}
      role="status"
      aria-live="polite"
    >
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0" style={{ background: 'var(--gradient-glow)' }} />

      <button
        onClick={onDone}
        className="absolute right-6 top-6 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
      >
        skip [esc]
      </button>

      <div className="relative w-full max-w-xl px-8 font-mono text-sm md:text-base">
        <div className="mb-8 flex items-center gap-3">
          <div className="status-dot" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">SHUBH.OS · v1.0.0</span>
        </div>
        <div className="space-y-2 text-foreground/90">
          {shown.map((l, idx) => (
            <div key={idx} className="animate-fade-in">
              <span className="text-primary">{l.slice(0, 1)}</span>
              {l.slice(1)}
              {idx === shown.length - 1 && <span className="ml-1 inline-block animate-blink text-primary">▍</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
