import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  interactive?: boolean;
}

export function GlassCard({ children, className, glow, interactive }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-white/[0.04] dark:bg-white/[0.02]",
        "border border-white/[0.12] dark:border-white/[0.08]",
        "backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
        glow && "shadow-[0_0_40px_rgba(0,245,255,0.08)]",
        interactive && "hover:border-primary/30 hover:bg-white/[0.08] transition-all duration-500",
        className
      )}
    >
      {/* Inner highlight for Apple-like depth */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
