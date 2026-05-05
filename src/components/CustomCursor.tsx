import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.body.classList.add('has-cursor');

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    let raf = 0;

    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const enter = () => ring.current?.classList.add('scale-[1.8]', 'border-primary');
    const leave = () => ring.current?.classList.remove('scale-[1.8]', 'border-primary');

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [data-cursor="hover"]').forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      document.body.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-primary mix-blend-difference" />
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[200] h-8 w-8 rounded-full border border-foreground/40 transition-[transform,border-color] duration-200 ease-out mix-blend-difference" />
    </>
  );
}
