import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS } from '@/lib/projects';
import { fadeUp, stagger } from '@/lib/motion';

export default function Work() {
  return (
    <section id="work" className="relative py-32">
      <div className="container-x">
        <motion.div
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
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
              02 — selected work
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl"
            >
              Things I've <span className="text-gradient">made</span>.
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="max-w-md text-base text-muted-foreground">
            Six projects spanning compilers, AI infra, devtools and design systems.
            Click any card to dive into the case study.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 md:auto-rows-[260px]">
          {PROJECTS.map((p, i) => (
            <WorkCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const span =
    project.size === 'lg'
      ? 'md:col-span-4 md:row-span-2'
      : project.size === 'md'
      ? 'md:col-span-3'
      : 'md:col-span-2';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl holo-border ${span}`}
    >
      <Link
        to={`/work/${project.id}`}
        className="block h-full"
        aria-label={`${project.name} — case study`}
      >
        <motion.div
          layoutId={`project-${project.id}-cover`}
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ background: project.cover }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        <div className="relative flex h-full flex-col justify-between p-6">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-foreground/80">
            <motion.span layoutId={`project-${project.id}-type`}>{project.type}</motion.span>
            <span className="rounded-full border border-foreground/20 px-2 py-0.5">
              {project.status}
            </span>
          </div>

          <div>
            <motion.h3
              layoutId={`project-${project.id}-title`}
              className="font-display text-2xl font-semibold text-foreground md:text-3xl"
            >
              {project.name}
            </motion.h3>
            <p className="mt-2 max-w-md text-sm text-foreground/80 line-clamp-2">
              {project.blurb}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground/70">
                {project.stack.slice(0, 3).map((s) => (
                  <span key={s} className="rounded-full border border-foreground/20 px-2 py-0.5">
                    {s}
                  </span>
                ))}
              </div>
              <span className="font-mono text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                view →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
