import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

function OrbitingNodes() {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    const arr: { pos: THREE.Vector3; speed: number; phase: number; color: string }[] = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.8 + Math.random() * 0.6;
      arr.push({
        pos: new THREE.Vector3(Math.cos(angle) * radius, (Math.random() - 0.5) * 1.4, Math.sin(angle) * radius),
        speed: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        color: i % 2 === 0 ? '#7DF9FF' : '#A78BFA',
      });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.15;
  });

  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={n.color} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function Crystal() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

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
      const s = 1 + Math.sin(t * 1.6) * 0.08;
      inner.current.scale.setScalar(s);
    }
    if (ring1.current) ring1.current.rotation.x = t * 0.4;
    if (ring2.current) { ring2.current.rotation.y = t * 0.5; ring2.current.rotation.z = t * 0.2; }
    if (ring3.current) { ring3.current.rotation.x = t * 0.25; ring3.current.rotation.y = t * 0.35; }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <Icosahedron ref={outer} args={[1.5, 1]}>
        <meshStandardMaterial
          color="#7DF9FF"
          emissive="#7DF9FF"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </Icosahedron>

      <Icosahedron ref={inner} args={[0.7, 2]}>
        <meshStandardMaterial
          color="#A78BFA"
          emissive="#7DF9FF"
          emissiveIntensity={2.6}
          metalness={0.6}
          roughness={0.15}
          toneMapped={false}
        />
      </Icosahedron>

      <Torus ref={ring1} args={[2.1, 0.012, 16, 100]}>
        <meshBasicMaterial color="#7DF9FF" transparent opacity={0.7} toneMapped={false} />
      </Torus>
      <Torus ref={ring2} args={[2.5, 0.008, 16, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color="#A78BFA" transparent opacity={0.6} toneMapped={false} />
      </Torus>
      <Torus ref={ring3} args={[3.0, 0.006, 16, 120]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.5} toneMapped={false} />
      </Torus>

      <OrbitingNodes />
    </Float>
  );
}

function ScrollCamera() {
  useFrame(({ camera }) => {
    const y = window.scrollY;
    const target = 5.5 + Math.min(y / 800, 1.2);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, target, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, Math.min(y / 1200, 0.6), 0.05);
  });
  return null;
}

export default function CompilerCore() {
  return (
    <div className="relative h-full w-full">
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
          <ScrollCamera />
        </Suspense>
        <EffectComposer>
          <Bloom intensity={1.1} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0008, 0.0012] as unknown as [number, number]}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
