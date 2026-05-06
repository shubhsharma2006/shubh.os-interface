import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { tokenize, parse, evaluate, layout, type Token, type FlatNode } from '@/lib/miniCompiler';

const SAMPLES = [
  { name: 'arithmetic', src: '5 + 3 * 2' },
  { name: 'binding', src: 'let x = 10;\nlet y = x * 2 + 4;\ny - 1' },
  { name: 'nested', src: 'let r = (3 + 4) * (8 - 2);\nr / 2' },
];

const ASTVisualization = () => {
  const [src, setSrc] = useState(SAMPLES[1].src);
  const [hovered, setHovered] = useState<string | null>(null);

  const compiled = useMemo(() => {
    try {
      const tokens = tokenize(src);
      const ast = parse(tokens);
      const ev = evaluate(ast);
      const nodes = layout(ast);
      return { tokens, ast, nodes, result: ev.result, env: ev.env, trace: ev.trace, error: null as string | null };
    } catch (e) {
      return { tokens: [] as Token[], nodes: [] as FlatNode[], result: undefined, env: {}, trace: [], error: (e as Error).message };
    }
  }, [src]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let raf = 0;
    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, rect.width, rect.height);

      const pad = 40;
      const W = rect.width - pad * 2;
      const H = rect.height - pad * 2;
      const colors = ['#7DF9FF', '#A78BFA', '#3B82F6', '#34D399', '#FBBF24'];

      const xy = (n: FlatNode) => ({ x: pad + n.x * W, y: pad + n.y * H });

      // edges
      const byId = new Map(compiled.nodes.map((n) => [n.id, n]));
      compiled.nodes.forEach((n) => {
        if (!n.parent) return;
        const p = byId.get(n.parent); if (!p) return;
        const a = xy(p), b = xy(n);
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, 'rgba(125, 249, 255, 0.55)');
        grad.addColorStop(1, 'rgba(167, 139, 250, 0.4)');
        ctx.strokeStyle = grad; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(a.x, a.y);
        ctx.bezierCurveTo(a.x, (a.y + b.y) / 2, b.x, (a.y + b.y) / 2, b.x, b.y);
        ctx.stroke();
      });

      // nodes
      compiled.nodes.forEach((n) => {
        const { x, y } = xy(n);
        const color = colors[n.depth % colors.length];
        const isHover = hovered === n.id;
        const r = 5 + Math.sin(t * 2 + n.depth) * 0.8;
        ctx.fillStyle = color + '22';
        ctx.beginPath(); ctx.arc(x, y, r * 3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(x, y, isHover ? r + 3 : r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(229, 231, 235, 0.85)';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, x, y - 10);
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [compiled.nodes, hovered]);

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    const pad = 40; const W = rect.width - pad * 2; const H = rect.height - pad * 2;
    let h: string | null = null;
    for (const n of compiled.nodes) {
      const nx = pad + n.x * W; const ny = pad + n.y * H;
      if ((nx - x) ** 2 + (ny - y) ** 2 < 14 ** 2) { h = n.id; break; }
    }
    setHovered(h);
  };

  return (
    <section id="ast" className="relative py-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            // chapter 06 · live compiler pipeline
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Tokenize · parse · <span className="text-gradient">execute</span>.
          </h2>
          <p className="mt-4 max-w-2xl font-mono text-sm text-muted-foreground">
            <span className="text-primary">{'>'}</span> Type into the editor. The pipeline lexes, builds an AST, then evaluates — live.
          </p>
        </motion.div>

        {/* Sample chips */}
        <div className="mb-6 flex flex-wrap gap-2 font-mono text-xs">
          {SAMPLES.map((s) => (
            <button
              key={s.name}
              onClick={() => setSrc(s.src)}
              className="rounded-full border border-border bg-surface/50 px-3 py-1 text-muted-foreground transition hover:border-primary/50 hover:text-primary"
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Editor + tokens + result */}
          <div className="space-y-4">
            <div className="glass holo-border overflow-hidden rounded-xl">
              <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>source.lex</span>
                <span className={compiled.error ? 'text-destructive' : 'text-primary'}>
                  {compiled.error ? 'parse error' : 'compiled ✓'}
                </span>
              </div>
              <textarea
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                spellCheck={false}
                className="block h-44 w-full resize-none bg-transparent p-4 font-mono text-sm text-foreground outline-none"
              />
            </div>

            <div className="glass rounded-xl p-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">tokens</div>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {compiled.tokens.map((t, i) => (
                  <span
                    key={i}
                    className="rounded border border-border bg-surface/60 px-2 py-0.5 text-foreground"
                    title={t.type}
                  >
                    <span className="text-muted-foreground">{t.type}:</span> {t.raw}
                  </span>
                ))}
                {compiled.tokens.length === 0 && <span className="text-muted-foreground">—</span>}
              </div>
            </div>

            <div className="glass rounded-xl p-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">execution</div>
              {compiled.error ? (
                <div className="font-mono text-sm text-destructive">{'> '}{compiled.error}</div>
              ) : (
                <>
                  <div className="font-mono text-sm">
                    <span className="text-muted-foreground">{'> '}result =</span>{' '}
                    <span className="text-primary text-glow">{String(compiled.result)}</span>
                  </div>
                  {Object.keys(compiled.env).length > 0 && (
                    <div className="mt-2 font-mono text-xs text-muted-foreground">
                      env: {Object.entries(compiled.env).map(([k, v]) => `${k}=${v}`).join(', ')}
                    </div>
                  )}
                  {compiled.trace.length > 0 && (
                    <div className="mt-3 max-h-28 space-y-0.5 overflow-y-auto font-mono text-[11px] text-muted-foreground">
                      {compiled.trace.map((t, i) => <div key={i}>· {t}</div>)}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* AST canvas */}
          <div className="glass holo-border relative h-[460px] overflow-hidden rounded-xl">
            <div className="absolute left-4 top-3 z-10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              ast.tree · {compiled.nodes.length} nodes
            </div>
            <canvas
              ref={canvasRef}
              onMouseMove={handleMove}
              onMouseLeave={() => setHovered(null)}
              className="h-full w-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ASTVisualization;
