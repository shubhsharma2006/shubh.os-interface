import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { HERO_METRICS } from '@/lib/profile';

function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${prefix}${v.toFixed(to % 1 === 0 ? 0 : 2)}${suffix}`);
  useEffect(() => {
    if (inView) animate(mv, to, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
  }, [inView, to, mv]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function Sparkline({ color = 'hsl(var(--primary))' }: { color?: string }) {
  // deterministic pseudo-random points
  const pts = Array.from({ length: 24 }, (_, i) =>
    50 + Math.sin(i * 0.7) * 18 + Math.cos(i * 1.3) * 10
  );
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const norm = pts.map((p) => ((p - min) / (max - min)) * 24 + 4);
  const d = norm.map((y, i) => `${i === 0 ? 'M' : 'L'} ${(i / (norm.length - 1)) * 100} ${32 - y}`).join(' ');
  return (
    <svg viewBox="0 0 100 32" className="h-8 w-full" preserveAspectRatio="none">
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

export default function LiveMetricsPanel() {
  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur-xl glass holo-border">
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="status-dot" />
          <span>shubh.system · live</span>
        </div>
        <span>{new Date().toISOString().slice(0, 10)}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {HERO_METRICS.map((m) => {
          const numeric = parseFloat(m.value.replace(/[^\d.-]/g, ''));
          const suffix = m.value.replace(/[\d.-]/g, '');
          return (
            <div key={m.label} className="rounded-xl border border-border bg-background/40 p-3">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>{m.label}</span>
                <span className="text-primary">●</span>
              </div>
              <div className="mt-1 font-display text-2xl font-semibold text-foreground">
                <Counter to={numeric} suffix={suffix} prefix={m.value.startsWith('-') ? '-' : ''} />
              </div>
              <Sparkline />
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>region: ap-south-1</span>
        <span className="text-primary">all systems operational</span>
      </div>
    </div>
  );
}
