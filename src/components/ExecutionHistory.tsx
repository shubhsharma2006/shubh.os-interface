import { motion } from 'framer-motion';
import { useState } from 'react';

interface TimelineEntry {
  year: number;
  title: string;
  description: string;
  status: 'COMPLETE' | 'ACTIVE' | 'ARCHIVED';
  achievements: string[];
}

const ExecutionHistory = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const timeline: TimelineEntry[] = [
    {
      year: 2026,
      title: 'AI INFRASTRUCTURE EVOLVED',
      description: 'Architected next-generation agentic systems and intelligent interfaces.',
      status: 'ACTIVE',
      achievements: ['Agentic Workflows', 'Neural Interfaces', 'Real-time Inference'],
    },
    {
      year: 2025,
      title: 'COMPILER ENGINE INITIALIZED',
      description: 'Built Lexica.lang DSL with Pratt parser and WASM backend.',
      status: 'COMPLETE',
      achievements: ['Parser Design', 'AST Optimization', 'WASM Compilation'],
    },
    {
      year: 2024,
      title: 'FRONTEND SYSTEMS MASTERED',
      description: 'Developed advanced 3D visualization and motion systems.',
      status: 'COMPLETE',
      achievements: ['Three.js Expertise', 'Motion Design', 'WebGL Pipelines'],
    },
    {
      year: 2023,
      title: 'DEVELOPER TOOLS FRAMEWORK',
      description: 'Created observability and debugging tools for AI systems.',
      status: 'COMPLETE',
      achievements: ['DevTools Architecture', 'Real-time Dashboards', 'Analytics'],
    },
    {
      year: 2022,
      title: 'SYSTEMS FOUNDATION LAID',
      description: 'Established core backend and database architecture.',
      status: 'COMPLETE',
      achievements: ['System Design', 'Database Optimization', 'API Architecture'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const statusColors = {
    ACTIVE: 'text-cyan-400',
    COMPLETE: 'text-emerald-400',
    ARCHIVED: 'text-gray-500',
  };

  return (
    <section id="experience" className="relative py-32">
      <div className="container-x">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-14"
        >
          <motion.div variants={itemVariants} className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            // chapter 04 · execution history
          </motion.div>
          <motion.h2 variants={itemVariants} className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            System <span className="text-gradient">evolution</span>.
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative space-y-4"
        >
          {/* Vertical line */}
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary via-primary/50 to-transparent md:left-12" />

          {timeline.map((entry, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative pl-16 md:pl-28"
              onClick={() => setExpandedId(expandedId === i ? null : i)}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-primary bg-background md:left-6" />

              {/* Card */}
              <motion.div
                className="group cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-white/10"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-primary">[{entry.year}]</span>
                      <span className={`font-mono text-xs font-semibold ${statusColors[entry.status]}`}>{entry.status}</span>
                    </div>
                    <h3 className="mb-2 font-mono text-lg font-semibold text-foreground">{entry.title}</h3>
                    <p className="text-sm text-muted-foreground">{entry.description}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedId === i ? 180 : 0 }}
                    className="ml-4 text-primary"
                  >
                    ▼
                  </motion.div>
                </div>

                {/* Expanded content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedId === i ? 'auto' : 0,
                    opacity: expandedId === i ? 1 : 0,
                    marginTop: expandedId === i ? 16 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-white/10 pt-4"
                >
                  <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Key Achievements</p>
                    <div className="flex flex-wrap gap-2">
                      {entry.achievements.map((achievement, j) => (
                        <span
                          key={j}
                          className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExecutionHistory;
