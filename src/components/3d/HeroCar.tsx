"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function AbstractHeroCar() {
  const group = useRef<THREE.Group>(null);
  
  return (
    <group ref={group} dispose={null}>
      {/* Dynamic float animation */}
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
        
        {/* Main Body Chassis (Deep Metallic Obsidian Black) */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.2, 0.7, 1.95]} />
          <meshPhysicalMaterial 
            color="#141416" 
            metalness={0.95}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.03}
            reflectivity={0.9}
          />
        </mesh>

        {/* Aerodynamic Roof & Cabin (Sleek High-End Glass) */}
        <mesh position={[-0.1, 0.85, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.45, 1.7]} />
          <meshPhysicalMaterial 
            color="#08080a" 
            metalness={0.98}
            roughness={0.05}
            transmission={0.85}
            thickness={1.2}
            clearcoat={1.0}
          />
        </mesh>

        {/* Front Splitter / Carbon Spoiler Lip */}
        <mesh position={[2.15, 0.15, 0]} castShadow>
          <boxGeometry args={[0.2, 0.1, 1.9]} />
          <meshStandardMaterial color="#09090b" roughness={0.7} metalness={0.8} />
        </mesh>

        {/* Rear Aerodynamic Spoiler Wing */}
        <mesh position={[-2.05, 0.8, 0]} castShadow>
          <boxGeometry args={[0.15, 0.1, 1.75]} />
          <meshStandardMaterial color="#09090b" roughness={0.6} metalness={0.9} />
        </mesh>

        {/* LED Matrix Headlights (Warm Cool White) */}
        <mesh position={[2.11, 0.42, 0.65]}>
          <boxGeometry args={[0.02, 0.1, 0.35]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>
        <mesh position={[2.11, 0.42, -0.65]}>
          <boxGeometry args={[0.02, 0.1, 0.35]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>

        {/* Headlight 3D Volumetric Beams (Soft Glowing Cones) */}
        <mesh position={[3.3, 0.42, 0.65]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.9, 2.5, 32, 1, true]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.07} 
            blending={THREE.AdditiveBlending} 
            side={THREE.DoubleSide} 
          />
        </mesh>
        <mesh position={[3.3, 0.42, -0.65]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.9, 2.5, 32, 1, true]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.07} 
            blending={THREE.AdditiveBlending} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* Tail lights (Premium Laser Red Bar) */}
        <mesh position={[-2.11, 0.48, 0]}>
          <boxGeometry args={[0.02, 0.08, 1.8]} />
          <meshBasicMaterial color="#e11d48" toneMapped={false} />
        </mesh>

        {/* Wheels & Rims (Chrome spokes + Rubber tires) */}
        {/* Rear Right */}
        <group position={[-1.2, 0.15, 0.98]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.48, 0.48, 0.28, 32]} />
            <meshStandardMaterial color="#09090b" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.02, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>

        {/* Front Right */}
        <group position={[1.3, 0.15, 0.98]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.48, 0.48, 0.28, 32]} />
            <meshStandardMaterial color="#09090b" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.02, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>

        {/* Rear Left */}
        <group position={[-1.2, 0.15, -0.98]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.48, 0.48, 0.28, 32]} />
            <meshStandardMaterial color="#09090b" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.02, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>

        {/* Front Left */}
        <group position={[1.3, 0.15, -0.98]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.48, 0.48, 0.28, 32]} />
            <meshStandardMaterial color="#09090b" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.02, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>

        {/* Ambient Underglow (Deep Crimson Red Brand Glow) */}
        <pointLight position={[0, -0.2, 0]} intensity={18} distance={2.5} color="#e11d48" />
      </Float>
    </group>
  );
}

export function HeroCar() {
  return (
    <Canvas camera={{ position: [0, 1.2, 5.2], fov: 42 }}>
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 15, 10]} intensity={2.0} angle={0.3} penumbra={0.8} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <Environment preset="city" />
      <Suspense fallback={null}>
        <AbstractHeroCar />
        <ContactShadows position={[0, -0.34, 0]} opacity={0.7} scale={8} blur={2.2} />
      </Suspense>
      <OrbitControls
        autoRotate
        autoRotateSpeed={1.2}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 2.15}
      />
    </Canvas>
  );
}
