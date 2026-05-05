import { Project } from '@/lib/projects';
import { useRef } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

export default function ModuleCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${y * -4}deg) rotateY(${x * 6}deg)`;
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
    el.style.setProperty('--my', `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };

  const sizeClass =
    project.size === 'lg' ? 'md:col-span-2 md:row-span-2' :
    project.size === 'md' ? 'md:col-span-2' : '';

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ animationDelay: `${index * 70}ms` }}
      className={`group relative overflow-hidden rounded-2xl glass holo-border p-6 transition-[transform,box-shadow] duration-300 ease-out will-change-transform animate-slide-up hover:shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.3)] ${sizeClass}`}
    >
      {/* Cursor-following glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(400px circle at var(--mx,50%) var(--my,50%), hsl(var(--primary)/0.15), transparent 50%)' }}
      />

      {/* Header */}
      <div className="relative flex items-start justify-between font-mono text-[11px] uppercase tracking-widest">
        <div>
          <div className="text-muted-foreground">MODULE_{String(index + 1).padStart(2, '0')}</div>
          <div className="mt-1 text-primary">{project.type}</div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className={`status-dot ${project.status === 'ARCHIVED' ? '!bg-muted-foreground' : ''}`} />
          <span>{project.status}</span>
        </div>
      </div>

      {/* Name */}
      <h3 className="relative mt-8 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {project.name}
      </h3>

      {/* Blurb */}
      <p className="relative mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        {project.blurb}
      </p>

      {/* Metric (large cards) */}
      {project.metric && project.size !== 'sm' && (
        <div className="relative mt-6 inline-flex items-baseline gap-2 rounded-md border border-border bg-background/40 px-3 py-2 font-mono">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{project.metric.label}</span>
          <span className="text-base text-primary">{project.metric.value}</span>
        </div>
      )}

      {/* Footer */}
      <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border border-border bg-background/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary">
              <Github size={14} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" aria-label="Live" className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary">
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
