import { useMemo, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, PROJECT_CATEGORIES, Project, ProjectCategory } from '@/lib/projects';
import { fadeUp, stagger } from '@/lib/motion';
import ProjectDiagram from './ProjectDiagram';
import ProjectModal from './ProjectModal';

export default function Work() {
  const [category, setCategory] = useState<ProjectCategory>('All');
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (category === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === category)),
    [category]
  );

  return (
    <section id="work" className="relative py-32">
      <div className="container-x">
        <motion.div
          className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
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
              Things I've <span className="text-gradient">shipped</span>.
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="max-w-md text-base text-muted-foreground">
            Compilers, AI infra, devtools, production systems. Click any card for the full breakdown.
          </motion.p>
        </motion.div>

        {/* Filter pills */}
        <LayoutGroup>
          <div className="mb-8 flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((cat) => {
              const active = cat === category;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="relative rounded-full px-4 py-1.5 text-sm font-mono uppercase tracking-widest transition-colors"
                >
                  {active && (
                    <motion.span
                      layoutId="cat-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 text-[11px] ${
                      active ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-6 md:auto-rows-[280px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onOpen={() => setActive(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const span =
    project.size === 'lg'
      ? 'md:col-span-4 md:row-span-2'
      : project.size === 'md'
      ? 'md:col-span-3'
      : 'md:col-span-2';

  return (
    <motion.button
      layout
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl border border-foreground/10 bg-card text-left ${span}`}
    >
      <div
        className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50"
        style={{ background: project.cover }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-card/30" />

      {/* Glow ring on hover */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at 50% 0%, hsl(var(--primary) / 0.18), transparent 60%)`,
        }}
      />

      <div className="relative flex h-full flex-col justify-between p-6">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
          <span className="text-muted-foreground">{project.type}</span>
          <span className="rounded-full border border-foreground/20 px-2 py-0.5 text-foreground/80">
            {project.status}
          </span>
        </div>

        {/* Mini diagram */}
        {project.size !== 'sm' && (
          <div className="my-3 h-14 opacity-60 transition-opacity group-hover:opacity-100">
            <ProjectDiagram type={project.diagram} animated={false} />
          </div>
        )}

        <div>
          <h3 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
            {project.name}
          </h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground line-clamp-2">{project.blurb}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {project.stack.slice(0, 3).map((s) => (
                <span key={s} className="rounded-full border border-foreground/15 px-2 py-0.5">
                  {s}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1 font-mono text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
              open <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
