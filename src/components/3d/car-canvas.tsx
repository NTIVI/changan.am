"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, PresentationControls, Stage, useGLTF, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

// We create a highly aesthetic placeholder abstract car shape for now,
// since we don't have a real GLTF model URL.
// In a real project, we would use: const { scene } = useGLTF('/models/car.glb')
function AbstractCarPlaceholder({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  
  return (
    <group ref={group} dispose={null}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 1.2, 2]} />
          <meshPhysicalMaterial 
            color={color} 
            metalness={0.8}
            roughness={0.2}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>
        {/* Top cabin */}
        <mesh position={[-0.2, 1.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.8, 1.8]} />
          <meshPhysicalMaterial 
            color="#111" 
            metalness={0.9}
            roughness={0.1}
            transmission={0.9}
            thickness={0.5}
          />
        </mesh>
        {/* Wheels */}
        <mesh position={[-1.2, 0, 1.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#222" roughness={0.8} />
        </mesh>
        <mesh position={[1.4, 0, 1.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#222" roughness={0.8} />
        </mesh>
        <mesh position={[-1.2, 0, -1.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#222" roughness={0.8} />
        </mesh>
        <mesh position={[1.4, 0, -1.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#222" roughness={0.8} />
        </mesh>
      </Float>
    </group>
  );
}

export function CarCanvas({ color = "#ffffff" }: { color?: string }) {
  return (
    <Canvas shadows camera={{ position: [5, 2, 5], fov: 45 }}>
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6}>
          <PresentationControls 
            global 
            zoom={0.8} 
            rotation={[0, -Math.PI / 4, 0]} 
            polar={[-Math.PI / 4, Math.PI / 4]} 
            azimuth={[-Math.PI / 2, Math.PI / 2]}
          >
            <AbstractCarPlaceholder color={color} />
          </PresentationControls>
        </Stage>
      </Suspense>
      <OrbitControls makeDefault enableZoom={true} enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  );
}
