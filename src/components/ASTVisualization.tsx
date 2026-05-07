import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ASTNode {
  id: string;
  label: string;
  x: number;
  y: number;
  depth: number;
  children: string[];
}

const ASTVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedCode, setSelectedCode] = useState<'simple' | 'complex'>('simple');
  const [animationProgress, setAnimationProgress] = useState(0);

  // Simple AST: const x = 5 + 3
  const simpleAST: Record<string, ASTNode> = {
    root: {
      id: 'root',
      label: 'Program',
      x: 50,
      y: 10,
      depth: 0,
      children: ['var1'],
    },
    var1: {
      id: 'var1',
      label: 'VariableDeclaration',
      x: 50,
      y: 25,
      depth: 1,
      children: ['id1', 'init1'],
    },
    id1: {
      id: 'id1',
      label: 'Identifier: x',
      x: 35,
      y: 40,
      depth: 2,
      children: [],
    },
    init1: {
      id: 'init1',
      label: 'BinaryExpression',
      x: 65,
      y: 40,
      depth: 2,
      children: ['left1', 'op1', 'right1'],
    },
    left1: {
      id: 'left1',
      label: 'Literal: 5',
      x: 50,
      y: 55,
      depth: 3,
      children: [],
    },
    op1: {
      id: 'op1',
      label: 'Operator: +',
      x: 65,
      y: 55,
      depth: 3,
      children: [],
    },
    right1: {
      id: 'right1',
      label: 'Literal: 3',
      x: 80,
      y: 55,
      depth: 3,
      children: [],
    },
  };

  // Complex AST: const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1)
  const complexAST: Record<string, ASTNode> = {
    root: {
      id: 'root',
      label: 'Program',
      x: 50,
      y: 5,
      depth: 0,
      children: ['var2'],
    },
    var2: {
      id: 'var2',
      label: 'VariableDeclaration',
      x: 50,
      y: 15,
      depth: 1,
      children: ['id2', 'arrow'],
    },
    id2: {
      id: 'id2',
      label: 'Identifier: factorial',
      x: 30,
      y: 25,
      depth: 2,
      children: [],
    },
    arrow: {
      id: 'arrow',
      label: 'ArrowFunction',
      x: 70,
      y: 25,
      depth: 2,
      children: ['param', 'ternary'],
    },
    param: {
      id: 'param',
      label: 'Parameter: n',
      x: 60,
      y: 35,
      depth: 3,
      children: [],
    },
    ternary: {
      id: 'ternary',
      label: 'ConditionalExpression',
      x: 80,
      y: 35,
      depth: 3,
      children: ['test', 'consequent', 'alternate'],
    },
    test: {
      id: 'test',
      label: 'BinaryExpression: <=',
      x: 70,
      y: 50,
      depth: 4,
      children: ['n1', 'one1'],
    },
    n1: {
      id: 'n1',
      label: 'Identifier: n',
      x: 60,
      y: 60,
      depth: 5,
      children: [],
    },
    one1: {
      id: 'one1',
      label: 'Literal: 1',
      x: 80,
      y: 60,
      depth: 5,
      children: [],
    },
    consequent: {
      id: 'consequent',
      label: 'Literal: 1',
      x: 85,
      y: 50,
      depth: 4,
      children: [],
    },
    alternate: {
      id: 'alternate',
      label: 'BinaryExpression: *',
      x: 95,
      y: 50,
      depth: 4,
      children: ['n2', 'call'],
    },
    n2: {
      id: 'n2',
      label: 'Identifier: n',
      x: 90,
      y: 65,
      depth: 5,
      children: [],
    },
    call: {
      id: 'call',
      label: 'CallExpression',
      x: 100,
      y: 65,
      depth: 5,
      children: [],
    },
  };

  const currentAST = selectedCode === 'simple' ? simpleAST : complexAST;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const animate = () => {
      // Clear
      ctx.fillStyle = 'rgba(15, 23, 42, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      Object.values(currentAST).forEach((node) => {
        node.children.forEach((childId) => {
          const child = currentAST[childId];
          if (!child) return;

          const x1 = (node.x / 100) * canvas.width;
          const y1 = (node.y / 100) * canvas.height;
          const x2 = (child.x / 100) * canvas.width;
          const y2 = (child.y / 100) * canvas.height;

          // Gradient line
          const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
          gradient.addColorStop(0, 'rgba(0, 217, 255, 0.3)');
          gradient.addColorStop(1, 'rgba(167, 139, 250, 0.3)');

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        });
      });

      // Draw nodes
      Object.values(currentAST).forEach((node) => {
        const x = (node.x / 100) * canvas.width;
        const y = (node.y / 100) * canvas.height;

        // Determine color based on depth
        const colors = ['#00d9ff', '#a78bfa', '#fbbf24', '#34d399', '#f87171'];
        const color = colors[node.depth % colors.length];

        // Glow
        ctx.fillStyle = color + '20';
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();

        // Node
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Pulse animation
        const pulse = Math.sin(animationProgress * 0.05 + node.depth) * 0.5 + 0.5;
        ctx.strokeStyle = color + Math.floor(pulse * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      setAnimationProgress((p) => (p + 1) % 360);
      requestAnimationFrame(animate);
    };

    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [currentAST, animationProgress]);

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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="ast" className="relative py-32">
      <div className="container-x">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-14"
        >
          <motion.div variants={itemVariants} className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            // chapter 06 · ast visualization
          </motion.div>
          <motion.h2 variants={itemVariants} className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Parsing <span className="text-gradient">intelligence</span>.
          </motion.h2>
        </motion.div>

        {/* Controls */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-8 flex gap-4"
        >
          {(['simple', 'complex'] as const).map((code) => (
            <button
              key={code}
              onClick={() => setSelectedCode(code)}
              className={`rounded-lg px-4 py-2 font-mono text-sm transition-all ${
                selectedCode === code
                  ? 'border-primary bg-primary/20 text-primary'
                  : 'border border-white/10 bg-white/5 text-muted-foreground hover:border-primary/50'
              }`}
            >
              {code === 'simple' ? 'const x = 5 + 3' : 'factorial(n)'}
            </button>
          ))}
        </motion.div>

        {/* Canvas */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative mb-8 h-96 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md"
        >
          <canvas ref={canvasRef} className="h-full w-full" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        {/* Description */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
        >
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">{'>'}</span> This AST visualizer demonstrates compiler fundamentals: parsing code into abstract syntax trees,
            analyzing structure, and optimizing execution. Each node represents a language construct, connected through a hierarchical graph.
            This is the foundation of intelligent code analysis and transformation systems.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ASTVisualization;
