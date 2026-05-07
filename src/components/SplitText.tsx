import { motion } from 'framer-motion';
import { splitChild, stagger } from '@/lib/motion';

export default function SplitText({
  text,
  className = '',
  as: Tag = 'span',
  delay = 0.04,
}: {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
}) {
  const words = text.split(' ');
  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={stagger(delay)}
      initial="hidden"
      animate="visible"
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.25em]">
          <motion.span variants={splitChild} className="inline-block">
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
