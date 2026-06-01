import { motion } from 'framer-motion';
import { DiagramType } from '@/lib/projects';

const STAGES: Record<DiagramType, string[]> = {
  compiler: ['Lex', 'Parse', 'AST', 'SSA', 'Opt', 'Codegen'],
  rag: ['Query', 'Embed', 'Search', 'Context', 'Fuse', 'Stream'],
  workflow: ['Start', 'Task', 'Approval', 'Auto', 'End'],
  analytics: ['Ingest', 'Validate', 'Ledger', 'API', 'UI'],
};

const COLORS: Record<DiagramType, string> = {
  compiler: 'hsl(186 100% 50%)',
  rag: 'hsl(258 90% 66%)',
  workflow: 'hsl(330 80% 60%)',
  analytics: 'hsl(225 95% 64%)',
};

export default function ProjectDiagram({ type, animated = true }: { type: DiagramType; animated?: boolean }) {
  const stages = STAGES[type];
  const color = COLORS[type];
  const W = 300;
  const H = 80;
  const step = W / stages.length;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" aria-hidden>
      <defs>
        <linearGradient id={`grad-${type}`} x1="0%" x2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.1" />
          <stop offset="50%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Connecting line */}
      <motion.line
        x1={step / 2}
        y1={H / 2}
        x2={W - step / 2}
        y2={H / 2}
        stroke={`url(#grad-${type})`}
        strokeWidth="1.5"
        initial={animated ? { pathLength: 0, opacity: 0 } : false}
        whileInView={animated ? { pathLength: 1, opacity: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {stages.map((label, i) => {
        const cx = step / 2 + i * step;
        return (
          <g key={label}>
            <motion.circle
              cx={cx}
              cy={H / 2}
              r="5"
              fill={color}
              initial={animated ? { scale: 0, opacity: 0 } : false}
              whileInView={animated ? { scale: 1, opacity: 1 } : undefined}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.4, ease: 'backOut' }}
            />
            <motion.circle
              cx={cx}
              cy={H / 2}
              r="10"
              fill="none"
              stroke={color}
              strokeOpacity="0.4"
              initial={animated ? { scale: 0, opacity: 0 } : false}
              whileInView={animated ? { scale: [0.5, 1.4, 1], opacity: [0, 0.6, 0.3] } : undefined}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.8 }}
            />
            <motion.text
              x={cx}
              y={H / 2 + 24}
              textAnchor="middle"
              fontSize="8"
              fill="currentColor"
              fontFamily="JetBrains Mono, monospace"
              className="fill-muted-foreground"
              initial={animated ? { opacity: 0, y: H / 2 + 30 } : false}
              whileInView={animated ? { opacity: 1, y: H / 2 + 24 } : undefined}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
            >
              {label.toUpperCase()}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}
