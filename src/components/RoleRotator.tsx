import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ROLES = [
  'Systems Engineer',
  'AI Infrastructure Builder',
  'Compiler Developer',
  'Workflow Architect',
  'Backend Engineer',
];

export default function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="inline-flex items-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[i]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-foreground"
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
      <span className="ml-1 inline-block h-[1em] w-[2px] translate-y-[2px] bg-primary animate-blink" />
    </span>
  );
}
