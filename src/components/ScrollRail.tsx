import { useEffect, useState } from 'react';

const CHAPTERS = [
  { id: 'hero', label: '00 · boot' },
  { id: 'about', label: '01 · narrative' },
  { id: 'skills', label: '02 · neural' },
  { id: 'projects', label: '03 · modules' },
  { id: 'experience', label: '04 · history' },
  { id: 'stats', label: '05 · metrics' },
  { id: 'ast', label: '06 · ast' },
  { id: 'contact', label: '07 · uplink' },
];

export default function ScrollRail() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? h.scrollTop / total : 0);

      // active chapter detection
      let current = CHAPTERS[0].id;
      for (const c of CHAPTERS) {
        const el = document.getElementById(c.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= window.innerHeight * 0.4) current = c.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-border/60">
        <div
          className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Side rail (desktop only) */}
      <nav className="pointer-events-auto fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
        <ul className="flex flex-col gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
          {CHAPTERS.map((c) => {
            const isActive = active === c.id;
            return (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className={`group flex items-center gap-3 transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span
                    className={`block h-px transition-all duration-300 ${
                      isActive ? 'w-10 bg-primary' : 'w-4 bg-border group-hover:w-6'
                    }`}
                  />
                  <span className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {c.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
