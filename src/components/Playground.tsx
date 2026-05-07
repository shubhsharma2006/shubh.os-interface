import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 80;

function Field() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { mouse, viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positions = useMemo(() => {
    const arr: { x: number; y: number; z: number; speed: number; phase: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 6,
        z: (Math.random() - 0.5) * 4,
        speed: 0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;
    if (!meshRef.current) return;
    for (let i = 0; i < COUNT; i++) {
      const p = positions[i];
      const dx = p.x - mx;
      const dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
      const repel = Math.max(0, 1.6 - dist) / dist;
      const x = p.x + dx * repel * 0.6;
      const y = p.y + dy * repel * 0.6 + Math.sin(t * p.speed + p.phase) * 0.15;
      const z = p.z + Math.cos(t * p.speed + p.phase) * 0.1;
      dummy.position.set(x, y, z);
      dummy.rotation.set(t * p.speed * 0.4, t * p.speed * 0.6, 0);
      const s = 0.08 + repel * 0.05;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#22d3ee"
        emissive="#0891b2"
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.8}
      />
    </instancedMesh>
  );
}

export default function Playground() {
  return (
    <section id="playground" className="relative py-32">
      <div className="container-x">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              05 — playground
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Move your <span className="text-gradient">cursor</span>.
            </h2>
          </div>
          <p className="max-w-md text-base text-muted-foreground">
            A small, useless, beautiful thing. Side projects and experiments are how I keep the craft sharp.
          </p>
        </div>

        <div className="relative h-[60vh] min-h-[420px] overflow-hidden rounded-2xl glass holo-border">
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 6], fov: 50 }}
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
            <pointLight position={[-5, -5, 2]} intensity={0.8} color="#a78bfa" />
            <Field />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
