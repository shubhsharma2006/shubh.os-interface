import { useEffect, useState } from 'react';
import { LOG_LINES } from '@/lib/profile';

const lvlColor = (lvl: string) =>
  lvl === 'OK' ? 'text-primary' : lvl === 'WARN' ? 'text-yellow-400' : 'text-muted-foreground';

function ts(offset: number) {
  const d = new Date(Date.now() - offset * 1000);
  return d.toISOString().slice(11, 19);
}

export default function LogStream() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(id);
  }, []);

  // rotate the visible window through the log lines
  const window = 6;
  const lines = Array.from({ length: window }, (_, i) => {
    const idx = (tick + i) % LOG_LINES.length;
    return { ...LOG_LINES[idx], age: window - i - 1 };
  });

  return (
    <section className="border-y border-border bg-surface/40 py-6">
      <div className="container-x">
        <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="status-dot" />
            <span>system_log · streaming</span>
          </div>
          <span>tail -f /var/log/shubh.log</span>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-background/60 p-4 font-mono text-[11px] leading-relaxed md:text-xs">
          {lines.map((l, i) => (
            <div
              key={`${tick}-${i}`}
              className="flex items-center gap-3 opacity-0 animate-[fadeIn_0.4s_ease-out_forwards]"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <span className="text-muted-foreground/60">[{ts(l.age * 2)}]</span>
              <span className={`w-12 ${lvlColor(l.lvl)}`}>{l.lvl}</span>
              <span className="text-foreground/80 truncate">{l.msg}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
