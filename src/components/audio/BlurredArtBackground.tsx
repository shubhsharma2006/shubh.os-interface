import { AnimatePresence, motion } from 'framer-motion';

export default function BlurredArtBackground({ cover }: { cover?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
      <AnimatePresence mode="sync">
        <motion.div
          key={cover || 'default'}
          initial={{ opacity: 0 }}
          animate={{ opacity: cover ? 0.55 : 0.25 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          style={{
            backgroundImage: cover
              ? `url(${cover})`
              : 'radial-gradient(ellipse at 30% 20%, hsl(var(--primary)/0.6), transparent 60%), radial-gradient(ellipse at 80% 80%, hsl(var(--accent)/0.5), transparent 60%), radial-gradient(ellipse at 50% 50%, hsl(var(--secondary)/0.4), transparent 70%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(60px) saturate(160%)',
            transform: 'scale(1.3)',
          }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-background/40" />
    </div>
  );
}
