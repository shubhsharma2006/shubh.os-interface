import { useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, useInView, animate } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { getProject, PROJECTS, type ImpactMetric } from '@/lib/projects';
import { fadeUp, stagger } from '@/lib/motion';

export default function ProjectCaseStudy() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const project = getProject(slug);

  useEffect(() => {
    if (!project) return;
    document.title = `${project.name} — case study · Shubh`;
    window.scrollTo({ top: 0, behavior: 'auto' });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate('/#work');
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [project, navigate]);

  if (!project) {
    return (
      <main className="container-x min-h-screen pt-32">
        <p className="font-mono text-sm text-muted-foreground">Project not found.</p>
        <Link to="/#work" className="text-primary underline">Back to work</Link>
      </main>
    );
  }

  const idx = PROJECTS.findIndex((p) => p.id === project.id);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <main className="relative pb-32">
      {/* Hero with shared layout */}
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
        <motion.div
          layoutId={`project-${project.id}-cover`}
          className="absolute inset-0"
          style={{ background: project.cover }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <Link
          to="/#work"
          className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/40 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-foreground backdrop-blur transition-colors hover:border-primary/60 hover:text-primary md:left-10 md:top-10"
        >
          <ArrowLeft size={14} /> back to work
        </Link>

        <div className="container-x relative flex h-full flex-col justify-end pb-16">
          <motion.div
            layoutId={`project-${project.id}-type`}
            className="font-mono text-[11px] uppercase tracking-[0.4em] text-foreground/80"
          >
            {project.type}
          </motion.div>
          <motion.h1
            layoutId={`project-${project.id}-title`}
            className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-foreground md:text-7xl"
          >
            {project.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-5 max-w-2xl text-base text-foreground/85 md:text-lg"
          >
            {project.blurb}
          </motion.p>
        </div>
      </section>

      {/* Body */}
      <div className="container-x mt-16 grid gap-12 lg:grid-cols-[260px_1fr]">
        {/* Sticky meta rail */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="space-y-6 font-mono text-[11px] uppercase tracking-widest">
            <Meta label="Timeline" value={project.timeline} />
            <Meta label="Role" value={project.role} />
            <Meta label="Status" value={project.status} />
            <div>
              <div className="text-muted-foreground">Stack</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-surface/40 px-2.5 py-0.5 text-[10px] tracking-wider text-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-foreground hover:border-primary/60 hover:text-primary"
                >
                  <Github size={12} /> repo
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-foreground hover:border-primary/60 hover:text-primary"
                >
                  <ArrowUpRight size={12} /> live
                </a>
              )}
            </div>
          </div>
        </aside>

        {/* Right column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger(0.08)}
          className="space-y-20"
        >
          <Block title="Problem" eyebrow="01">
            <p className="text-lg leading-relaxed text-foreground/90">{project.problem}</p>
          </Block>

          <Block title="Approach" eyebrow="02">
            <ol className="space-y-4">
              {project.approach.map((step, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  className="flex gap-4 rounded-2xl glass holo-border p-5"
                >
                  <span className="font-mono text-xs text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-foreground/90">{step}</span>
                </motion.li>
              ))}
            </ol>
          </Block>

          <Block title="Impact" eyebrow="03">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {project.impact.map((m) => (
                <ImpactCard key={m.label} m={m} />
              ))}
            </div>
          </Block>

          <Block title="Outcome" eyebrow="04">
            <p className="text-lg leading-relaxed text-foreground/90">{project.outcome}</p>
          </Block>

          {/* Next project */}
          <Link
            to={`/work/${next.id}`}
            className="group relative block overflow-hidden rounded-3xl glass holo-border p-10"
          >
            <div
              className="absolute inset-0 opacity-30 transition-opacity group-hover:opacity-60"
              style={{ background: next.cover }}
            />
            <div className="relative flex items-end justify-between gap-6">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
                  Next case study
                </div>
                <div className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
                  {next.name}
                </div>
              </div>
              <ArrowUpRight className="text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-muted-foreground">{label}</div>
      <div className="mt-1 text-foreground">{value}</div>
    </div>
  );
}

function Block({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section variants={fadeUp}>
      <div className="mb-6 flex items-baseline gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
          {eyebrow}
        </span>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

function ImpactCard({ m }: { m: ImpactMetric }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const numRef = useRef<HTMLSpanElement>(null);

  // Try to count up if value is a plain number-ish string
  useEffect(() => {
    if (!inView || !numRef.current) return;
    const match = m.value.match(/^([\d.]+)([a-zA-Z%µ]*)$/);
    if (!match) return;
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = (match[1].split('.')[1] || '').length;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (numRef.current) numRef.current.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, m.value]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="rounded-2xl glass holo-border p-6"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {m.label}
      </div>
      <div className="mt-3 flex items-baseline gap-3">
        <span ref={numRef} className="font-display text-3xl font-semibold text-foreground md:text-4xl">
          {m.value}
        </span>
        {m.delta && (
          <span
            className={`font-mono text-xs ${
              m.delta.startsWith('-') ? 'text-primary' : 'text-secondary'
            }`}
          >
            {m.delta}
          </span>
        )}
      </div>
    </motion.div>
  );
}
