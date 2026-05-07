import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

const StatsDashboard = () => {
  const stats: Stat[] = [
    { label: 'Projects Deployed', value: 37, suffix: '', icon: '📦' },
    { label: 'Systems Active', value: 12, suffix: '', icon: '⚙️' },
    { label: 'AI Models Tested', value: 48, suffix: '', icon: '🧠' },
    { label: 'Uptime', value: 99, suffix: '%', icon: '⚡' },
  ];

  const [displayValues, setDisplayValues] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    const timers = stats.map((stat, i) => {
      const increment = stat.value / 30; // Animate over ~30 frames
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(interval);
        }
        setDisplayValues((prev) => {
          const newValues = [...prev];
          newValues[i] = Math.floor(current);
          return newValues;
        });
      }, 30);

      return interval;
    });

    return () => timers.forEach(clearInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="stats" className="relative py-32">
      <div className="container-x">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-14"
        >
          <motion.div variants={itemVariants} className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            // chapter 05 · system metrics
          </motion.div>
          <motion.h2 variants={itemVariants} className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            By the <span className="text-gradient">numbers</span>.
          </motion.h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={itemVariants}>
              <GlassCard interactive className="p-8 h-full">
                {/* Icon */}
                <div className="mb-6 text-4xl">{stat.icon}</div>

                {/* Value */}
                <div className="mb-2">
                  <div className="font-display text-5xl font-bold text-gradient">
                    {displayValues[i]}
                    <span className="text-2xl">{stat.suffix}</span>
                  </div>
                </div>

                {/* Label */}
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom info */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
        >
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">{'>'}</span> All systems operational. Last update: {new Date().toLocaleDateString()}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsDashboard;
