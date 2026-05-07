import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/motion';

const SKILLS = [
  { group: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind'] },
  { group: '3D & Motion', items: ['Three.js', 'R3F', 'GLSL', 'Framer Motion', 'GSAP'] },
  { group: 'Backend', items: ['Node', 'Postgres', 'tRPC', 'Edge Functions', 'Redis'] },
  { group: 'Design', items: ['Figma', 'Design Systems', 'Motion Design', 'Branding'] },
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
            A designer who codes,<br />
            an engineer who <span className="text-gradient">cares about craft</span>.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="relative mt-10 aspect-[4/5] max-w-sm overflow-hidden rounded-2xl glass holo-border"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.4), transparent 60%), radial-gradient(circle at 70% 80%, hsl(var(--accent) / 0.4), transparent 60%)',
              }}
            />
            <div className="absolute inset-0 flex items-end p-6 font-mono text-xs text-foreground/80">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">portrait</div>
                <div className="mt-1 text-base">Shubh, Bengaluru · IST</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.08)}
        >
          <motion.p variants={fadeUp} className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            For the last five years I've been designing and building{' '}
            <span className="text-foreground">interfaces, products and experiments</span> at the
            intersection of design, engineering and motion. I've shipped tools used by hundreds of
            thousands of developers, crafted brand sites that pushed agency rosters, and lost weekends
            to shaders and physics demos.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            I care about <span className="text-foreground">tight typography</span>,{' '}
            <span className="text-foreground">considered motion</span>, and the small details most
            users never notice — until you take them away.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 grid grid-cols-2 gap-x-10 gap-y-8">
            {SKILLS.map((s) => (
              <div key={s.group}>
                <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-primary">
                  {s.group}
                </div>
                <ul className="space-y-1.5 text-sm text-foreground/85">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
