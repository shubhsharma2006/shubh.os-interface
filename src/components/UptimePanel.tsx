import { motion } from 'framer-motion';
import { PROFILE } from '@/lib/profile';

const services = [
  { name: 'Internship availability', status: 'OPERATIONAL', detail: 'Open · summer 2026' },
  { name: 'Email response', status: 'OPERATIONAL', detail: PROFILE.responseTime },
  { name: 'Code review / pair', status: 'OPERATIONAL', detail: 'IST evenings' },
  { name: 'Timezone', status: 'OPERATIONAL', detail: 'IST (UTC+5:30)' },
];

export default function UptimePanel() {
  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur">
      <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="status-dot" />
          <span>shubh.status · last 90 days</span>
        </div>
        <span className="text-primary">100% uptime</span>
      </div>
      <div className="space-y-3">
        {services.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="flex items-center justify-between rounded-lg border-l-2 border-primary/70 bg-background/40 px-4 py-3 transition-colors hover:border-primary"
          >
            <div>
              <div className="text-sm text-foreground">{s.name}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {s.detail}
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary">
              <span className="status-dot" />
              {s.status}
            </div>
          </motion.div>
        ))}
      </div>
      {/* mini uptime bars */}
      <div className="mt-5 flex gap-[2px]">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="h-6 flex-1 rounded-sm"
            style={{
              background:
                i === 23
                  ? 'hsl(var(--accent) / 0.5)'
                  : 'hsl(var(--primary) / 0.55)',
            }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>90 days ago</span>
        <span>today</span>
      </div>
    </div>
  );
}
