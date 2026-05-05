import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus } from '@react-three/drei';
import * as THREE from 'three';

function Crystal() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }, delta) => {
    const t = clock.getElapsedTime();
    if (outer.current) {
      outer.current.rotation.y += delta * 0.25;
      outer.current.rotation.x = THREE.MathUtils.lerp(outer.current.rotation.x, pointer.y * 0.4, 0.05);
      outer.current.rotation.z = THREE.MathUtils.lerp(outer.current.rotation.z, pointer.x * -0.3, 0.05);
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.6;
      inner.current.rotation.x += delta * 0.3;
      const s = 1 + Math.sin(t * 1.6) * 0.06;
      inner.current.scale.setScalar(s);
    }
    if (ring1.current) ring1.current.rotation.x = t * 0.4;
    if (ring2.current) { ring2.current.rotation.y = t * 0.5; ring2.current.rotation.z = t * 0.2; }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      {/* Outer faceted crystal — wireframe */}
      <Icosahedron ref={outer} args={[1.5, 1]}>
        <meshStandardMaterial
          color="#7DF9FF"
          emissive="#7DF9FF"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.85}
        />
      </Icosahedron>

      {/* Inner glowing core */}
      <Icosahedron ref={inner} args={[0.7, 2]}>
        <meshStandardMaterial
          color="#A78BFA"
          emissive="#7DF9FF"
          emissiveIntensity={2.2}
          metalness={0.6}
          roughness={0.15}
        />
      </Icosahedron>

      {/* Energy rings */}
      <Torus ref={ring1} args={[2.1, 0.012, 16, 100]}>
        <meshBasicMaterial color="#7DF9FF" transparent opacity={0.55} />
      </Torus>
      <Torus ref={ring2} args={[2.5, 0.008, 16, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color="#A78BFA" transparent opacity={0.5} />
      </Torus>
    </Float>
  );
}

export default function CompilerCore() {
  return (
    <div className="relative h-full w-full">
      {/* Glow halo behind canvas */}
      <div className="pointer-events-none absolute inset-0" style={{ background: 'var(--gradient-glow)' }} />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.6} color="#7DF9FF" />
        <pointLight position={[-5, -3, 2]} intensity={1.2} color="#A78BFA" />
        <Suspense fallback={null}>
          <Crystal />
        </Suspense>
      </Canvas>
    </div>
  );
}
