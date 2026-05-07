import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function FloatingCore() {
  const mainRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mainRef.current) {
      mainRef.current.rotation.x = Math.sin(t / 4) * 0.2 + mouse.y * 0.4;
      mainRef.current.rotation.y = t / 3 + mouse.x * 0.5;
      mainRef.current.position.y = Math.sin(t / 2) * 0.1;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x = -t / 4;
      outerRef.current.rotation.y = -t / 5;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = t / 6;
      ringsRef.current.rotation.x = Math.sin(t / 3) * 0.4;
    }
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.4}>
        <Sphere ref={mainRef} args={[1.05, 96, 96]}>
          <MeshDistortMaterial
            color="#22d3ee"
            speed={2}
            distort={0.32}
            radius={1}
            emissive="#0891b2"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.85}
          />
        </Sphere>
      </Float>

      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.95, 1]} />
        <meshStandardMaterial
          color="#a78bfa"
          wireframe
          transparent
          opacity={0.22}
          emissive="#a78bfa"
          emissiveIntensity={0.3}
        />
      </mesh>

      <group ref={ringsRef}>
        {[2.4, 2.7, 3.0].map((r, i) => (
          <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, 0, i * 0.5]}>
            <torusGeometry args={[r, 0.008, 8, 128]} />
            <meshBasicMaterial color={i % 2 ? '#22d3ee' : '#a78bfa'} transparent opacity={0.5} />
          </mesh>
        ))}
      </group>

      <pointLight position={[0, 0, 0]} intensity={2.5} color="#22d3ee" distance={6} />
      <pointLight position={[3, 2, 2]} intensity={1} color="#a78bfa" distance={8} />
    </group>
  );
}
