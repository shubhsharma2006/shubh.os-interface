import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { FloatingCore } from './3d/FloatingCore';

export default function CompilerCore() {
  return (
    <div className="relative h-full w-full">
      {/* Glow halo behind canvas */}
      <div className="pointer-events-none absolute inset-0" style={{ background: 'var(--gradient-glow)' }} />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#a78bfa" intensity={0.5} />
        
        <Suspense fallback={null}>
          <FloatingCore />
        </Suspense>
      </Canvas>
    </div>
  );
}
