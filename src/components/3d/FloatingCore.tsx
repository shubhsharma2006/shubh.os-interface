import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function FloatingCore() {
  const mainRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (mainRef.current) {
      // Rotate based on time and mouse
      mainRef.current.rotation.x = Math.sin(time / 4) * 0.2 + mouse.y * 0.5;
      mainRef.current.rotation.y = time / 2 + mouse.x * 0.5;
      
      // Subtle floating motion
      mainRef.current.position.y = Math.sin(time / 2) * 0.1;
    }

    if (outerRef.current) {
      outerRef.current.rotation.x = -time / 3;
      outerRef.current.rotation.y = -time / 4;
      outerRef.current.rotation.z = Math.sin(time / 2) * 0.2;
    }
  });

  return (
    <group>
      {/* Inner Core - Distorted Sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={mainRef} args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#00d9ff"
            speed={3}
            distort={0.4}
            radius={1}
            emissive="#00d9ff"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Outer Wireframe Shell */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial
          color="#a78bfa"
          wireframe
          transparent
          opacity={0.2}
          emissive="#a78bfa"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Ambient Glow */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#00d9ff" distance={5} />
    </group>
  );
}
