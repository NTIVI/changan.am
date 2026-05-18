"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function AbstractHeroCar() {
  const group = useRef<THREE.Group>(null);
  
  return (
    <group ref={group} dispose={null}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Main Body Chassis */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.2, 0.8, 2]} />
          <meshPhysicalMaterial 
            color="#FF1E1E" 
            metalness={0.9}
            roughness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>
        
        {/* Aerodynamic Cabin Structure */}
        <mesh position={[-0.2, 0.95, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.5, 1.7]} />
          <meshPhysicalMaterial 
            color="#111115" 
            metalness={0.95}
            transmission={0.8}
            thickness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* LED Headlights */}
        <mesh position={[2.1, 0.45, 0.7]}>
          <boxGeometry args={[0.1, 0.15, 0.35]} />
          <meshBasicMaterial color="#FFEEEE" />
        </mesh>
        <mesh position={[2.1, 0.45, -0.7]}>
          <boxGeometry args={[0.1, 0.15, 0.35]} />
          <meshBasicMaterial color="#FFEEEE" />
        </mesh>

        {/* Tail lights */}
        <mesh position={[-2.1, 0.45, 0.7]}>
          <boxGeometry args={[0.1, 0.1, 0.4]} />
          <meshBasicMaterial color="#FF1E1E" />
        </mesh>
        <mesh position={[-2.1, 0.45, -0.7]}>
          <boxGeometry args={[0.1, 0.1, 0.4]} />
          <meshBasicMaterial color="#FF1E1E" />
        </mesh>

        {/* Wheels */}
        <mesh position={[-1.2, 0.1, 1.02]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.42, 0.42, 0.25, 32]} />
          <meshStandardMaterial color="#18181A" roughness={0.85} metalness={0.1} />
        </mesh>
        <mesh position={[1.3, 0.1, 1.02]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.42, 0.42, 0.25, 32]} />
          <meshStandardMaterial color="#18181A" roughness={0.85} metalness={0.1} />
        </mesh>
        <mesh position={[-1.2, 0.1, -1.02]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.42, 0.42, 0.25, 32]} />
          <meshStandardMaterial color="#18181A" roughness={0.85} metalness={0.1} />
        </mesh>
        <mesh position={[1.3, 0.1, -1.02]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.42, 0.42, 0.25, 32]} />
          <meshStandardMaterial color="#18181A" roughness={0.85} metalness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export function HeroCar() {
  return (
    <Canvas camera={{ position: [0, 1.2, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} intensity={1.5} castShadow />
      <Environment preset="city" />
      <Suspense fallback={null}>
        <AbstractHeroCar />
        <ContactShadows position={[0, -0.35, 0]} opacity={0.6} scale={10} blur={2} />
      </Suspense>
      <OrbitControls
        autoRotate
        autoRotateSpeed={1.5}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  );
}
