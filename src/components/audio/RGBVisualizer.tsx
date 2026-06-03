import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
  className?: string;
}

export default function RGBVisualizer({ analyser, isPlaying, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const bars = 64;
    const data = new Uint8Array(analyser?.frequencyBinCount ?? bars);
    let phase = 0;

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      if (analyser && isPlaying && !reduced) {
        analyser.getByteFrequencyData(data);
      } else {
        // Idle: gentle synthetic wave so it still looks alive
        phase += 0.03;
        for (let i = 0; i < bars; i++) {
          data[i] = Math.max(
            0,
            40 + Math.sin(phase + i * 0.25) * 25 + Math.sin(phase * 0.6 + i * 0.1) * 15
          );
        }
      }

      const barW = w / bars;
      const gap = Math.max(1, barW * 0.18);
      const midY = h / 2;

      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < bars; i++) {
        const v = data[i] / 255;
        const bh = Math.max(2, v * h * 0.85);
        const x = i * barW;
        const hue = 200 + (i / bars) * 90; // blue -> violet -> cyan-ish
        const grad = ctx.createLinearGradient(0, midY - bh / 2, 0, midY + bh / 2);
        grad.addColorStop(0, `hsla(${hue}, 95%, 65%, 0.95)`);
        grad.addColorStop(0.5, `hsla(${hue + 30}, 90%, 55%, 0.9)`);
        grad.addColorStop(1, `hsla(${hue + 60}, 95%, 60%, 0.95)`);
        ctx.fillStyle = grad;
        // mirrored bar
        const r = Math.min(barW / 2, 4);
        roundRect(ctx, x + gap / 2, midY - bh / 2, barW - gap, bh, r);
        ctx.fill();

        // soft glow dot at peak
        ctx.fillStyle = `hsla(${hue + 30}, 100%, 75%, ${0.15 + v * 0.4})`;
        ctx.beginPath();
        ctx.arc(x + barW / 2, midY - bh / 2, 2 + v * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onVis = () => {
      if (document.hidden && rafRef.current) cancelAnimationFrame(rafRef.current);
      else rafRef.current = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [analyser, isPlaying, reduced]);

  return <canvas ref={canvasRef} className={className} />;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
