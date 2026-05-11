import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINES = [
  ['$ lexer.parse("main.py")', '  → 2,847 tokens [2.1ms] ✓'],
  ['$ ast.build()', '  → depth 14 · nodes 891 · optimized'],
  ['$ embedding_model.load("text-ada-002")', '  → dim=1536 · ready'],
  ['$ vector_store.query("inventory forecast", k=5)', '  → retrieved 5 docs [43ms] ✓'],
  ['$ workflow_engine.start(job_id="hr-onboard-42")', '  → 7 nodes · executing pipeline...'],
  ['$ rag_api.route(query, models=["llama","claude"])', '  → routing → claude-3-opus [conf 0.94]'],
  ['$ system_status', '  → ALL SYSTEMS OPERATIONAL ●'],
];

export default function HeroTerminal() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 1900);
    return () => clearInterval(t);
  }, []);

  // Keep last 5 lines visible
  const start = Math.max(0, tick - 4);
  const visible = Array.from({ length: 5 }, (_, i) => LINES[(start + i) % LINES.length]);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[hsl(240_14%_4%/0.9)] backdrop-blur-xl shadow-[0_0_40px_hsl(var(--primary)/0.08)]">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          runtime@shubh ~ live
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_currentColor]" />
          ONLINE
        </span>
      </div>
      <div className="relative h-[150px] overflow-hidden px-4 py-3 font-mono text-[12px] leading-relaxed">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-[hsl(240_14%_4%)] to-transparent" />
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((pair, idx) => (
            <motion.div
              key={`${tick}-${idx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: idx === 0 ? 0.4 : 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mb-1"
            >
              <div className="text-primary">{pair[0]}</div>
              <div className="text-emerald-400/90">{pair[1]}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
