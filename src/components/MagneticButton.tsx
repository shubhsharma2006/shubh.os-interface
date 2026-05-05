import { ButtonHTMLAttributes, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export default function MagneticButton({ children, className, variant = 'primary', ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-mono text-sm uppercase tracking-[0.18em] transition-[transform,box-shadow,color] duration-300 ease-out will-change-transform',
        variant === 'primary'
          ? 'text-primary-foreground bg-primary glow-primary hover:shadow-[0_0_60px_hsl(var(--primary)/0.55)]'
          : 'text-foreground border border-border hover:border-primary/60 hover:text-primary',
        className,
      )}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: 'var(--gradient-primary)' }} />
      )}
    </button>
  );
}
