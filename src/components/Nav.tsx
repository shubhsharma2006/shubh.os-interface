import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const link = (id: string, label: string) => (
    <a
      href={`#${id}`}
      className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
    >
      {label}
    </a>
  );

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className={`container-x flex items-center justify-between rounded-full px-5 py-3 transition-all ${scrolled ? 'glass-strong' : ''}`}>
        <a href="#hero" className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em]">
          <span className="status-dot" />
          <span className="text-foreground">shubh<span className="text-primary">.</span></span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {link('about', 'about')}
          {link('work', 'work')}
          {link('process', 'process')}
          {link('experience', 'experience')}
          {link('playground', 'playground')}
          {link('contact', 'contact')}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-full border border-border px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            hire ↗
          </a>
        </div>
      </div>
    </header>
  );
}
