import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Project } from '@/lib/projects';
import ProjectDiagram from './ProjectDiagram';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-background/70 backdrop-blur-xl p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl rounded-2xl border border-foreground/10 bg-card shadow-2xl"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cover */}
            <div
              className="relative h-48 md:h-64 rounded-t-2xl overflow-hidden"
              style={{ background: project.cover }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 grid place-items-center w-9 h-9 rounded-full bg-background/60 backdrop-blur border border-foreground/10 hover:bg-background/90 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/70">
                    {project.type}
                  </div>
                  <h2 className="mt-1 font-display text-3xl md:text-4xl font-semibold">
                    {project.name}
                  </h2>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest rounded-full border border-foreground/30 bg-background/40 backdrop-blur px-2.5 py-1">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Meta */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <Meta label="Timeline" value={project.timeline} />
                <Meta label="Role" value={project.role} />
                <Meta label="Category" value={project.category} />
                <Meta label="Stack" value={`${project.stack.length} tech`} />
              </div>

              {/* Architecture diagram */}
              <div>
                <SectionLabel>Architecture</SectionLabel>
                <div className="rounded-xl border border-foreground/10 bg-muted/20 p-4 h-32">
                  <ProjectDiagram type={project.diagram} />
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.architecture.map((a) => (
                    <span
                      key={a}
                      className="font-mono text-[10px] uppercase tracking-widest rounded border border-foreground/10 px-2 py-1 text-muted-foreground"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Problem / Approach / Outcome */}
              <div className="space-y-6">
                <Block label="Problem">{project.problem}</Block>
                <div>
                  <SectionLabel>Approach</SectionLabel>
                  <ul className="space-y-2.5">
                    {project.approach.map((a, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                        <span className="font-mono text-xs text-primary mt-0.5">0{i + 1}</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Block label="Outcome">{project.outcome}</Block>
              </div>

              {/* Impact metrics */}
              <div>
                <SectionLabel>Impact</SectionLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {project.impact.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-foreground/10 bg-muted/20 p-4"
                    >
                      <div className="font-display text-2xl font-semibold text-gradient">
                        {m.value}
                      </div>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {m.label}
                      </div>
                      {m.delta && (
                        <div className="mt-1 font-mono text-[10px] text-emerald-400">{m.delta}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack */}
              <div>
                <SectionLabel>Stack</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-foreground/15 bg-muted/30 px-3 py-1 text-xs font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-foreground/10">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-sm hover:bg-foreground/5 transition-colors"
                  >
                    <Github className="h-4 w-4" /> Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-sm hover:bg-foreground/5 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" /> Live
                  </a>
                )}
                <Link
                  to={`/work/${project.id}`}
                  onClick={onClose}
                  className="ml-auto inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Full case study <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
    {children}
  </div>
);

const Meta = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
      {label}
    </div>
    <div className="mt-1 text-foreground">{value}</div>
  </div>
);

const Block = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <SectionLabel>{label}</SectionLabel>
    <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
  </div>
);
