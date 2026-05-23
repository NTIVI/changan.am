"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";

interface CarViewerProps {
  color: string;
  lightsOn: boolean;
  doorsOpen: boolean;
  hoodOpen: boolean;
  viewMode: "exterior" | "interior";
}

// Reusable premium wheel with alloy spokes
function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      {/* Outer Rubber Tire */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.24, 32]} />
        <meshStandardMaterial color="#0c0d0e" roughness={0.92} />
      </mesh>

      {/* Dark Chrome Inner Hub */}
      <mesh position={[0, 0.121, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.01, 24]} />
        <meshStandardMaterial color="#1a1c1e" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Silver Sport Spokes */}
      <group position={[0, 0.123, 0]}>
        {[...Array(5)].map((_, i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 5]} castShadow>
            <boxGeometry args={[0.04, 0.32, 0.015]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.1} />
          </mesh>
        ))}
        {/* Central hub logo cap */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.01, 16]} />
          <meshStandardMaterial color="#b91c1c" metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

function DynamicCarModel({ color, lightsOn, doorsOpen, hoodOpen }: Omit<CarViewerProps, "viewMode">) {
  const bodyRef = useRef<THREE.Group>(null);
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);
  const hoodRef = useRef<THREE.Group>(null);

  // Smooth opening/closing animations
  useFrame(() => {
    // Left Door
    if (leftDoorRef.current) {
      const targetRot = doorsOpen ? -Math.PI / 3.5 : 0;
      leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        leftDoorRef.current.rotation.y,
        targetRot,
        0.08
      );
    }

    // Right Door
    if (rightDoorRef.current) {
      const targetRot = doorsOpen ? Math.PI / 3.5 : 0;
      rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        rightDoorRef.current.rotation.y,
        targetRot,
        0.08
      );
    }

    // Hood (bonnet)
    if (hoodRef.current) {
      const targetRot = hoodOpen ? -Math.PI / 5 : 0;
      hoodRef.current.rotation.z = THREE.MathUtils.lerp(
        hoodRef.current.rotation.z,
        targetRot,
        0.08
      );
    }
  });

  return (
    <group ref={bodyRef} position={[0, 0, 0]}>
      {/* 1. Chassis, structural beams and diffuser */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.22, 1.98]} />
        <meshStandardMaterial color="#050505" roughness={0.95} />
      </mesh>

      {/* Carbon fiber front splitter & diffuser highlights */}
      <mesh position={[2.1, 0.12, 0]} castShadow>
        <boxGeometry args={[0.3, 0.05, 1.9]} />
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-2.1, 0.12, 0]} castShadow>
        <boxGeometry args={[0.3, 0.05, 1.9]} />
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 2. Main Body Shell (Fastback sport line) */}
      <mesh position={[-0.1, 0.58, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.58, 2.0]} />
        <meshPhysicalMaterial 
          color={color} 
          metalness={0.9}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Sloping Fastback Rear pillar / glass styling */}
      <mesh position={[-0.86, 0.94, 0]} rotation={[0, 0, Math.PI / 7.2]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.08, 1.76]} />
        <meshPhysicalMaterial 
          color="#0a0a0c" 
          metalness={0.95} 
          roughness={0.02} 
          transmission={0.92} 
          thickness={0.4} 
        />
      </mesh>

      {/* Sport Active Spoiler Wing (Changan UNI-V Signature feature) */}
      <mesh position={[-1.68, 0.8, 0]} castShadow>
        <boxGeometry args={[0.22, 0.03, 1.54]} />
        <meshPhysicalMaterial color="#08080a" metalness={0.98} roughness={0.05} />
      </mesh>

      {/* Signature Borderless Front Grille (Changan UNI Series style) */}
      <group position={[2.11, 0.45, 0]}>
        {/* Background dark mesh */}
        <mesh castShadow>
          <boxGeometry args={[0.02, 0.38, 1.62]} />
          <meshStandardMaterial color="#0d0e10" roughness={0.9} />
        </mesh>
        {/* Grille elements grid overlay */}
        {[...Array(6)].map((_, r) => (
          <group key={r} position={[0.01, -0.15 + r * 0.06, 0]}>
            {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((c) => (
              <mesh key={c} position={[0, 0, c * 0.14]} castShadow>
                <boxGeometry args={[0.015, 0.025, 0.06]} />
                <meshStandardMaterial color="#2d3139" metalness={0.8} roughness={0.2} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* 3. Openable Engine Bonnet (Hood) */}
      <group position={[1.5, 0.62, 0]} ref={hoodRef}>
        {/* Shift model coordinates so hood pivots from the wind-screen hinge */}
        <mesh position={[-0.48, 0.12, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.96, 0.18, 1.94]} />
          <meshPhysicalMaterial 
            color={color} 
            metalness={0.9}
            roughness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
          />
        </mesh>
      </group>

      {/* Engine Bay Block - visible under opened hood */}
      <group position={[1.35, 0.46, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.82, 0.3, 1.25]} />
          <meshStandardMaterial color="#1a1c1e" roughness={0.85} />
        </mesh>
        {/* Red engine cylinder covers */}
        <mesh position={[0.1, 0.16, 0]}>
          <boxGeometry args={[0.5, 0.04, 0.6]} />
          <meshStandardMaterial color="#dc2626" metalness={0.2} roughness={0.4} />
        </mesh>
      </group>

      {/* 4. Openable Doors (Left and Right Front Doors with Hinge Anchors) */}
      {/* Left Front Door (Hinged at front pillar) */}
      <group position={[0.7, 0.6, 1.01]} ref={leftDoorRef}>
        <mesh position={[-0.5, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.58, 0.04]} />
          <meshPhysicalMaterial 
            color={color} 
            metalness={0.9}
            roughness={0.15}
            clearcoat={1.0}
          />
        </mesh>
      </group>

      {/* Right Front Door (Hinged at front pillar) */}
      <group position={[0.7, 0.6, -1.01]} ref={rightDoorRef}>
        <mesh position={[-0.5, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.58, 0.04]} />
          <meshPhysicalMaterial 
            color={color} 
            metalness={0.9}
            roughness={0.15}
            clearcoat={1.0}
          />
        </mesh>
      </group>

      {/* 5. Translucent cabin roof and glass windows */}
      <mesh position={[-0.2, 1.06, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.44, 1.76]} />
        <meshPhysicalMaterial 
          color="#08080a" 
          metalness={0.95}
          roughness={0.05}
          transmission={0.88}
          thickness={0.55}
        />
      </mesh>

      {/* 6. Complete Premium Interior (Dashboard + Steering Wheel + Sports Seats) */}
      {/* Dashboard console */}
      <mesh position={[0.5, 0.72, 0]}>
        <boxGeometry args={[0.42, 0.28, 1.58]} />
        <meshStandardMaterial color="#0d0e12" roughness={0.78} />
      </mesh>
      
      {/* Steering Wheel block (Driver side - Left Hand Drive) */}
      <group position={[0.45, 0.76, 0.38]} rotation={[0, 0, Math.PI / 6]}>
        {/* Column */}
        <mesh>
          <cylinderGeometry args={[0.018, 0.018, 0.16]} />
          <meshStandardMaterial color="#1a1c22" roughness={0.9} />
        </mesh>
        {/* Ring with red stitch accent */}
        <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.13, 0.022, 10, 24]} />
          <meshStandardMaterial color="#ff1e1e" roughness={0.5} />
        </mesh>
      </group>

      {/* Sports Seats (Red Stitch / Anthracite Leather) */}
      {/* Driver Seat */}
      <group position={[-0.15, 0.58, 0.38]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.12, 0.5]} />
          <meshStandardMaterial color="#16181d" roughness={0.7} />
        </mesh>
        <mesh position={[-0.22, 0.32, 0]} rotation={[0, 0, -Math.PI / 10]} castShadow>
          <boxGeometry args={[0.12, 0.58, 0.48]} />
          <meshStandardMaterial color="#16181d" roughness={0.7} />
        </mesh>
      </group>
      {/* Passenger Seat */}
      <group position={[-0.15, 0.58, -0.38]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.12, 0.5]} />
          <meshStandardMaterial color="#16181d" roughness={0.7} />
        </mesh>
        <mesh position={[-0.22, 0.32, 0]} rotation={[0, 0, -Math.PI / 10]} castShadow>
          <boxGeometry args={[0.12, 0.58, 0.48]} />
          <meshStandardMaterial color="#16181d" roughness={0.7} />
        </mesh>
      </group>

      {/* 7. Front Headlights & Volumetric Projector Beams */}
      <group position={[2.14, 0.52, 0]}>
        {/* Left LED cluster */}
        <mesh position={[0, 0, 0.76]}>
          <boxGeometry args={[0.06, 0.08, 0.28]} />
          <meshBasicMaterial color={lightsOn ? "#ffffff" : "#444444"} />
        </mesh>
        {/* Right LED cluster */}
        <mesh position={[0, 0, -0.76]}>
          <boxGeometry args={[0.06, 0.08, 0.28]} />
          <meshBasicMaterial color={lightsOn ? "#ffffff" : "#444444"} />
        </mesh>
        
        {/* Active spotlight sources */}
        {lightsOn && (
          <>
            <spotLight 
              position={[0.4, 0, 0.76]} 
              angle={Math.PI / 4.8} 
              penumbra={0.65} 
              intensity={4.5} 
              distance={18} 
              color="#fffff5"
              castShadow 
            />
            <spotLight 
              position={[0.4, 0, -0.76]} 
              angle={Math.PI / 4.8} 
              penumbra={0.65} 
              intensity={4.5} 
              distance={18} 
              color="#fffff5"
              castShadow 
            />
          </>
        )}
      </group>

      {/* Rear Tail lights */}
      <group position={[-1.76, 0.55, 0]}>
        <mesh position={[0, 0, 0.72]}>
          <boxGeometry args={[0.04, 0.06, 0.32]} />
          <meshBasicMaterial color={lightsOn ? "#ff1a1a" : "#770000"} />
        </mesh>
        <mesh position={[0, 0, -0.72]}>
          <boxGeometry args={[0.04, 0.06, 0.32]} />
          <meshBasicMaterial color={lightsOn ? "#ff1a1a" : "#770000"} />
        </mesh>
      </group>

      {/* 8. Wheels Layout */}
      <Wheel position={[-1.15, 0.24, 1.0]} />
      <Wheel position={[1.25, 0.24, 1.0]} />
      <Wheel position={[-1.15, 0.24, -1.0]} />
      <Wheel position={[1.25, 0.24, -1.0]} />
    </group>
  );
}

// Controller for camera transitions between exterior and interior
function CameraController({ viewMode }: { viewMode: "exterior" | "interior" }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    if (cameraRef.current) {
      if (viewMode === "interior") {
        // Move camera inside the cabin looking at steering wheel & dashboard
        cameraRef.current.position.set(-0.06, 0.85, 0.38);
      } else {
        // Normal exterior camera position
        cameraRef.current.position.set(5.2, 2.2, 5.2);
      }
    }
  }, [viewMode]);

  return (
    <PerspectiveCamera 
      ref={cameraRef} 
      makeDefault 
      fov={45} 
      position={[5.2, 2.2, 5.2]} 
    />
  );
}

export function CarViewer({ color, lightsOn, doorsOpen, hoodOpen, viewMode }: CarViewerProps) {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[550px] relative bg-slate-900/5 dark:bg-black/40 rounded-3xl overflow-hidden border border-gray-200/40 dark:border-gray-800/40">
      <Canvas shadows>
        <CameraController viewMode={viewMode} />
        
        {/* Lights */}
        <ambientLight intensity={0.45} />
        <directionalLight 
          position={[10, 15, 10]} 
          intensity={1.4} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        
        <Environment preset="city" />

        <Suspense fallback={null}>
          <DynamicCarModel 
            color={color} 
            lightsOn={lightsOn} 
            doorsOpen={doorsOpen} 
            hoodOpen={hoodOpen} 
          />
          <ContactShadows position={[0, -0.21, 0]} opacity={0.7} scale={12} blur={2.2} />
        </Suspense>

        <OrbitControls 
          enableZoom={viewMode === "exterior"} 
          enableRotate={true}
          enablePan={false}
          minPolarAngle={viewMode === "interior" ? Math.PI / 4.5 : 0}
          maxPolarAngle={viewMode === "interior" ? Math.PI / 1.6 : Math.PI / 2.1}
        />
      </Canvas>

      {/* Watermark badge inside 3D viewer */}
      <div className="absolute top-4 left-4 bg-white/70 dark:bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-bold text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-gray-850">
        3D ИНТЕРАКТИВНЫЙ ОБЗОР
      </div>
    </div>
  );
}
