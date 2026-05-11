import { useEffect, useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, ArrowRight, Github, Mail, FileText, Briefcase, User, Code2, Sparkles } from 'lucide-react';
import { PROJECTS } from '@/lib/projects';

type Item = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('open-command-palette', onOpen);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('open-command-palette', onOpen);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setQ('');
      setCursor(0);
    }
  }, [open]);

  const scrollTo = (id: string) => () => {
    setOpen(false);
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }));
  };

  const items = useMemo<Item[]>(
    () => [
      { id: 'about', label: 'About', hint: 'Section', icon: User, action: scrollTo('about') },
      { id: 'work', label: 'Projects', hint: 'Section', icon: Briefcase, action: scrollTo('work') },
      { id: 'skills', label: 'Skills', hint: 'Section', icon: Code2, action: scrollTo('skills') },
      { id: 'experience', label: 'Experience', hint: 'Section', icon: Sparkles, action: scrollTo('experience') },
      { id: 'contact', label: 'Contact', hint: 'Section', icon: Mail, action: scrollTo('contact') },
      { id: 'gh', label: 'GitHub Profile', hint: 'External', icon: Github, action: () => window.open('https://github.com/shubhsharma2006', '_blank') },
      { id: 'resume', label: 'Download Resume', hint: 'External', icon: FileText, action: () => window.open('/resume.pdf', '_blank') },
      ...PROJECTS.map((p) => ({
        id: `proj-${p.id}`,
        label: p.name,
        hint: 'Project',
        icon: Briefcase,
        action: scrollTo('work'),
      })),
    ],
    []
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((it) => it.label.toLowerCase().includes(s) || it.hint?.toLowerCase().includes(s));
  }, [q, items]);

  useEffect(() => {
    setCursor(0);
  }, [q]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      filtered[cursor]?.action();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-start bg-background/70 px-4 pt-[15vh] backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3.5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKey}
                placeholder="Search sections, projects, links…"
                className="flex-1 bg-transparent font-mono text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ESC
              </kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="px-3 py-8 text-center font-mono text-xs text-muted-foreground">
                  no matches
                </div>
              ) : (
                filtered.map((it, idx) => {
                  const Icon = it.icon;
                  const active = idx === cursor;
                  return (
                    <button
                      key={it.id}
                      onMouseEnter={() => setCursor(idx)}
                      onClick={() => it.action()}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        active ? 'bg-primary/10 text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${active ? 'text-primary' : ''}`} />
                      <span className="flex-1 text-[13px]">{it.label}</span>
                      {it.hint && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {it.hint}
                        </span>
                      )}
                      <ArrowRight className={`h-3.5 w-3.5 ${active ? 'opacity-100' : 'opacity-0'}`} />
                    </button>
                  );
                })
              )}
            </div>
            <div className="flex items-center justify-between border-t border-white/[0.06] bg-background/30 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>↑↓ navigate · ↵ select</span>
              <span className="text-primary">⌘K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
