import { PROJECTS } from '@/lib/projects';
import ModuleCard from './ModuleCard';

export default function Projects() {
  return (
    <section id="projects" className="relative py-32">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              // chapter 03 · executable modules
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Selected <span className="text-gradient">work</span>.
            </h2>
          </div>
          <p className="max-w-md font-mono text-sm leading-relaxed text-muted-foreground">
            <span className="text-primary">{'>'}</span> ls -la /modules<br />
            <span className="text-primary">{'>'}</span> {PROJECTS.length} units · {PROJECTS.filter(p => p.status === 'ACTIVE').length} active
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-4 md:auto-rows-[minmax(220px,auto)]">
          {PROJECTS.map((p, i) => (
            <ModuleCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
