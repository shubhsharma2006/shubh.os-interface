import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 0-100
  x: number;
  y: number;
}

const SkillNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const skills: Skill[] = [
    // AI Systems
    { id: 'llm', name: 'LLM Integration', category: 'AI Systems', level: 95, x: 15, y: 20 },
    { id: 'embeddings', name: 'Embeddings', category: 'AI Systems', level: 90, x: 25, y: 15 },
    { id: 'agents', name: 'Agentic Systems', category: 'AI Systems', level: 88, x: 20, y: 10 },

    // Frontend Engineering
    { id: 'react', name: 'React', category: 'Frontend', level: 98, x: 50, y: 25 },
    { id: 'threejs', name: 'Three.js', category: 'Frontend', level: 92, x: 60, y: 20 },
    { id: 'animation', name: 'Motion Design', category: 'Frontend', level: 94, x: 55, y: 15 },
    { id: 'webgl', name: 'WebGL', category: 'Frontend', level: 85, x: 65, y: 25 },

    // Compiler Systems
    { id: 'parser', name: 'Parser Design', category: 'Compilers', level: 89, x: 80, y: 20 },
    { id: 'ast', name: 'AST Optimization', category: 'Compilers', level: 87, x: 85, y: 15 },
    { id: 'wasm', name: 'WASM', category: 'Compilers', level: 86, x: 75, y: 25 },

    // Backend Architecture
    { id: 'typescript', name: 'TypeScript', category: 'Backend', level: 96, x: 50, y: 60 },
    { id: 'systems', name: 'Systems Design', category: 'Backend', level: 91, x: 60, y: 65 },
    { id: 'databases', name: 'Databases', category: 'Backend', level: 88, x: 40, y: 65 },

    // Developer Tooling
    { id: 'devtools', name: 'DevTools', category: 'Tooling', level: 90, x: 25, y: 75 },
    { id: 'observability', name: 'Observability', category: 'Tooling', level: 87, x: 35, y: 80 },
  ];

  const categoryColors: Record<string, string> = {
    'AI Systems': '#00d9ff',
    Frontend: '#a78bfa',
    Compilers: '#fbbf24',
    Backend: '#34d399',
    Tooling: '#f87171',
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.1)';
      ctx.lineWidth = 1;

      skills.forEach((skill, i) => {
        const x1 = (skill.x / 100) * canvas.width;
        const y1 = (skill.y / 100) * canvas.height;

        // Connect to nearby skills
        skills.slice(i + 1).forEach((otherSkill) => {
          const x2 = (otherSkill.x / 100) * canvas.width;
          const y2 = (otherSkill.y / 100) * canvas.height;

          const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      skills.forEach((skill) => {
        const x = (skill.x / 100) * canvas.width;
        const y = (skill.y / 100) * canvas.height;
        const radius = 8 + (skill.level / 100) * 6;

        const isHovered = hoveredSkill === skill.id;
        const distance = Math.sqrt((mousePos.x - x) ** 2 + (mousePos.y - y) ** 2);
        const isNear = distance < 100;

        // Glow
        if (isHovered || isNear) {
          ctx.fillStyle = categoryColors[skill.category] + '40';
          ctx.beginPath();
          ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node
        ctx.fillStyle = categoryColors[skill.category];
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Border
        ctx.strokeStyle = categoryColors[skill.category] + '80';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [hoveredSkill, mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    // Check hover
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let hovered: string | null = null;
    skills.forEach((skill) => {
      const skillX = (skill.x / 100) * canvas.width;
      const skillY = (skill.y / 100) * canvas.height;
      const distance = Math.sqrt((x - skillX) ** 2 + (y - skillY) ** 2);

      if (distance < 30) {
        hovered = skill.id;
      }
    });

    setHoveredSkill(hovered);
  };

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
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  return (
    <section id="skills" className="relative py-32">
      <div className="container-x">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-14"
        >
          <motion.div variants={itemVariants} className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            // chapter 02 · neural capabilities
          </motion.div>
          <motion.h2 variants={itemVariants} className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Core <span className="text-gradient">competencies</span>.
          </motion.h2>
        </motion.div>

        {/* Canvas Network */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative mb-12 h-96 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md"
        >
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredSkill(null)}
            className="h-full w-full cursor-crosshair"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        {/* Legend */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 gap-4 md:grid-cols-5"
        >
          {Object.entries(categoryColors).map(([category, color]) => (
            <motion.div key={category} variants={itemVariants} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-muted-foreground">{category}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillNetwork;
