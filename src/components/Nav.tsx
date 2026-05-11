import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion';
import { Menu, X, Command } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const SECTIONS = [
  { id: 'about', label: 'about' },
  { id: 'work', label: 'projects' },
  { id: 'skills', label: 'skills' },
  { id: 'experience', label: 'experience' },
  { id: 'contact', label: 'contact' },
];

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 30);
    if (y > 120 && y > prev) setHidden(true);
    else setHidden(false);
  });

  // Scroll-spy
  useEffect(() => {
    const ids = ['hero', ...SECTIONS.map((s) => s.id)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const openCmd = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`mx-auto flex w-full max-w-7xl items-center justify-between px-6 transition-all md:px-10 ${
            scrolled ? 'py-3' : 'py-5'
          }`}
        >
          <div
            className={`flex w-full items-center justify-between rounded-full px-4 py-2.5 transition-all ${
              scrolled
                ? 'border border-white/[0.06] bg-background/70 backdrop-blur-xl'
                : ''
            }`}
          >
            <a href="#hero" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-[13px] font-bold tracking-tight text-primary-foreground shadow-[0_0_24px_hsl(var(--primary)/0.5)]">
                SS
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground sm:inline">
                shubh<span className="text-primary">.</span>os
              </span>
            </a>

            <nav className="hidden items-center gap-7 md:flex">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`relative font-mono text-[11px] uppercase tracking-widest transition-colors ${
                    active === s.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {s.label}
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={openCmd}
                className="hidden items-center gap-2 rounded-full border border-border/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground md:inline-flex"
                aria-label="Open command palette"
              >
                <Command className="h-3 w-3" />
                <span>K</span>
              </button>
              <ThemeToggle />
              <a
                href="#contact"
                className="hidden rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_hsl(var(--primary)/0.4)] md:inline-block"
              >
                hire ↗
              </a>
              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-full border border-border p-2 text-foreground md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex h-full flex-col px-6 pt-6">
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-[13px] font-bold text-primary-foreground">
                  SS
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-border p-2"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="mt-16 flex flex-col gap-7">
                {SECTIONS.map((s, i) => (
                  <motion.a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="font-display text-3xl font-semibold tracking-tight text-foreground"
                  >
                    {s.label}
                    <span className="text-primary">.</span>
                  </motion.a>
                ))}
              </nav>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-auto mb-10 rounded-2xl bg-primary px-6 py-4 text-center font-mono text-[12px] uppercase tracking-widest text-primary-foreground"
              >
                hire shubh ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
