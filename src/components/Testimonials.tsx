import { motion } from 'framer-motion';
import { TESTIMONIALS, type Testimonial } from '@/lib/testimonials';
import { fadeUp, stagger } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ROW_A = TESTIMONIALS.slice(0, 4);
const ROW_B = TESTIMONIALS.slice(4);

export default function Testimonials() {
  const reduced = useReducedMotion();

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      <div className="container-x">
        <motion.div
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger(0.1)}
        >
          <div>
            <motion.div
              variants={fadeUp}
              className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground"
            >
              05 — kind words
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl"
            >
              People I've <span className="text-gradient">shipped with</span>.
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="max-w-md text-base text-muted-foreground">
            Founders, CTOs and design leads on what it's like to collaborate with me.
          </motion.p>
        </motion.div>
      </div>

      <div className="relative space-y-6">
        <Marquee items={ROW_A} duration={reduced ? 0 : 50} />
        <Marquee items={ROW_B} duration={reduced ? 0 : 60} reverse />
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}

function Marquee({
  items,
  duration,
  reverse,
}: {
  items: Testimonial[];
  duration: number;
  reverse?: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div className="group relative flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-5 pr-5"
        animate={duration ? { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] } : undefined}
        transition={{
          duration: duration || 0,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {loop.map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

function Card({ t }: { t: Testimonial }) {
  const initials = t.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

  return (
    <figure className="glass holo-border w-[360px] shrink-0 rounded-2xl p-6 md:w-[440px]">
      <blockquote className="text-sm leading-relaxed text-foreground/90 md:text-base">
        "{t.quote}"
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface font-mono text-xs uppercase text-primary">
          {initials}
        </div>
        <div className="font-mono text-[11px] uppercase tracking-widest">
          <div className="text-foreground">{t.name}</div>
          <div className="text-muted-foreground">
            {t.role} · {t.company}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
