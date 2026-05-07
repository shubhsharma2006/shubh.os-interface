import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

const STAGES = [
  {
    n: '01',
    title: 'Discover',
    body: 'Workshops, audits and research to understand the brief, the user and the constraints.',
  },
  {
    n: '02',
    title: 'Design',
    body: 'Wireframes, motion studies and design systems. Iterate fast on prototypes that feel real.',
  },
  {
    n: '03',
    title: 'Build',
    body: 'Production-grade frontend with type safety, motion and 3D — built for scale and speed.',
  },
  {
    n: '04',
    title: 'Ship',
    body: 'Performance-tuned releases, analytics, A/B tests and continuous post-launch iteration.',
  },
];

function MorphingMesh({ progress }: { progress: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.y = t * 0.3;
      const p = progress.current;
      const scale = 1 + Math.sin(t) * 0.05;
      ref.current.scale.setScalar(scale + p * 0.2);
    }
    if (matRef.current) {
      const p = progress.current;
      const hue = 0.5 + p * 0.2;
      matRef.current.color.setHSL(hue, 0.7, 0.55);
      matRef.current.emissive.setHSL(hue, 0.7, 0.3);
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial
        ref={matRef}
        wireframe
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  useTransform(scrollYProgress, (v) => {
    progress.current = v;
    return v;
  }).get();

  return (
    <section id="process" ref={sectionRef} className="relative py-32">
      <div className="container-x">
        <div className="mb-16">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            03 — process
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            How I <span className="text-gradient">work</span>.
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="relative aspect-square w-full max-w-[480px] overflow-hidden rounded-2xl glass holo-border">
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 4], fov: 45 }}
              gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            >
              <ambientLight intensity={0.4} />
              <pointLight position={[5, 5, 5]} intensity={1} />
              <pointLight position={[-5, -5, -5]} intensity={0.6} color="#a78bfa" />
              <MorphingMesh progress={progress} />
            </Canvas>
          </div>

          <div className="space-y-6">
            {STAGES.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl glass holo-border p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex items-start gap-6">
                  <div className="font-mono text-3xl text-muted-foreground/50">{s.n}</div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-2 text-base text-muted-foreground">{s.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
