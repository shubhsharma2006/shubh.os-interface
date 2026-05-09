import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { STATS } from '@/lib/skills';

function Animated({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const num = parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
  const suffix = value.replace(/[\d.-]/g, '');
  const display = useTransform(mv, (v) =>
    `${num % 1 === 0 ? Math.round(v) : v.toFixed(2)}${suffix}`
  );
  useEffect(() => {
    if (inView) animate(mv, num, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
  }, [inView, num, mv]);
  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function StatsGrid() {
  return (
    <section className="relative py-24">
      <div className="container-x">
        <div className="mb-10 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
          impact · in production
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="border-l-2 border-primary/60 pl-4"
            >
              <div className="font-display text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
                <Animated value={s.value} />
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-foreground">
                {s.label}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {s.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
