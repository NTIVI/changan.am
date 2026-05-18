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

function DynamicCarModel({ color, lightsOn, doorsOpen, hoodOpen }: Omit<CarViewerProps, "viewMode">) {
  const bodyRef = useRef<THREE.Group>(null);
  const leftDoorRef = useRef<THREE.Mesh>(null);
  const rightDoorRef = useRef<THREE.Mesh>(null);
  const hoodRef = useRef<THREE.Mesh>(null);

  // We can write beautiful lerps inside useFrame for opening door and hood animations!
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Left Door rotation
    if (leftDoorRef.current) {
      const targetRot = doorsOpen ? -Math.PI / 4 : 0;
      leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        leftDoorRef.current.rotation.y,
        targetRot,
        0.1
      );
    }

    // Right Door rotation
    if (rightDoorRef.current) {
      const targetRot = doorsOpen ? Math.PI / 4 : 0;
      rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        rightDoorRef.current.rotation.y,
        targetRot,
        0.1
      );
    }

    // Hood rotation (front engine bonnet)
    if (hoodRef.current) {
      const targetRot = hoodOpen ? -Math.PI / 6 : 0;
      hoodRef.current.rotation.z = THREE.MathUtils.lerp(
        hoodRef.current.rotation.z,
        targetRot,
        0.1
      );
    }
  });

  return (
    <group ref={bodyRef} position={[0, 0, 0]}>
      {/* Chassis and underbody */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.3, 1.9]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.9} />
      </mesh>

      {/* Main Body Shell */}
      <mesh position={[-0.1, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.6, 2.0]} />
        <meshPhysicalMaterial 
          color={color} 
          metalness={0.8}
          roughness={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Front Engine block (Bonnet) */}
      <group position={[1.5, 0.6, 0]}>
        <mesh ref={hoodRef} position={[-0.4, 0, 0]} castShadow receiveShadow>
          {/* Shift anchor point to bonnet rear hinge */}
          <boxGeometry args={[1.0, 0.4, 1.96]} />
          <meshPhysicalMaterial 
            color={color} 
            metalness={0.8}
            roughness={0.2}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </group>

      {/* Engine Inside (Visible when hood opens!) */}
      {hoodOpen && (
        <mesh position={[1.5, 0.4, 0]}>
          <boxGeometry args={[0.7, 0.35, 1.2]} />
          <meshStandardMaterial color="#2E3033" metalness={0.7} roughness={0.4} />
        </mesh>
      )}

      {/* Left Front Door Mesh (Left side is -Z in 3D coordinate) */}
      <group position={[0.2, 0.7, 1.01]}>
        <mesh ref={leftDoorRef} position={[-0.5, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.6, 0.05]} />
          <meshPhysicalMaterial 
            color={color} 
            metalness={0.8}
            roughness={0.2}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </group>

      {/* Right Front Door Mesh */}
      <group position={[0.2, 0.7, -1.01]}>
        <mesh ref={rightDoorRef} position={[-0.5, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.6, 0.05]} />
          <meshPhysicalMaterial 
            color={color} 
            metalness={0.8}
            roughness={0.2}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </group>

      {/* Translucent cabin roof and glass windows */}
      <mesh position={[-0.2, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.5, 1.7]} />
        <meshPhysicalMaterial 
          color="#0F0F12" 
          metalness={0.9}
          roughness={0.1}
          transmission={0.85}
          thickness={0.6}
        />
      </mesh>

      {/* Front Headlights & Active Lights */}
      <group position={[2.15, 0.55, 0]}>
        {/* Left LED */}
        <mesh position={[0, 0, 0.75]}>
          <boxGeometry args={[0.08, 0.12, 0.3]} />
          <meshBasicMaterial color={lightsOn ? "#FFFFFF" : "#555555"} />
        </mesh>
        {/* Right LED */}
        <mesh position={[0, 0, -0.75]}>
          <boxGeometry args={[0.08, 0.12, 0.3]} />
          <meshBasicMaterial color={lightsOn ? "#FFFFFF" : "#555555"} />
        </mesh>
        
        {/* Glowing spotlights pointing forward */}
        {lightsOn && (
          <>
            <spotLight 
              position={[0.5, 0, 0.75]} 
              angle={Math.PI / 4} 
              penumbra={0.5} 
              intensity={4} 
              distance={15} 
              color="#FFFFF3"
              castShadow 
            />
            <spotLight 
              position={[0.5, 0, -0.75]} 
              angle={Math.PI / 4} 
              penumbra={0.5} 
              intensity={4} 
              distance={15} 
              color="#FFFFF3"
              castShadow 
            />
          </>
        )}
      </group>

      {/* Rear Tail lights */}
      <group position={[-1.75, 0.55, 0]}>
        <mesh position={[0, 0, 0.7]}>
          <boxGeometry args={[0.05, 0.08, 0.35]} />
          <meshBasicMaterial color={lightsOn ? "#FF1E1E" : "#800000"} />
        </mesh>
        <mesh position={[0, 0, -0.7]}>
          <boxGeometry args={[0.05, 0.08, 0.35]} />
          <meshBasicMaterial color={lightsOn ? "#FF1E1E" : "#800000"} />
        </mesh>
      </group>

      {/* Wheels */}
      <mesh position={[-1.1, 0.2, 0.98]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.22, 32]} />
        <meshStandardMaterial color="#1A1C1E" roughness={0.8} />
      </mesh>
      <mesh position={[1.2, 0.2, 0.98]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.22, 32]} />
        <meshStandardMaterial color="#1A1C1E" roughness={0.8} />
      </mesh>
      <mesh position={[-1.1, 0.2, -0.98]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.22, 32]} />
        <meshStandardMaterial color="#1A1C1E" roughness={0.8} />
      </mesh>
      <mesh position={[1.2, 0.2, -0.98]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.22, 32]} />
        <meshStandardMaterial color="#1A1C1E" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Controller for camera transitions between exterior and interior
function CameraController({ viewMode }: { viewMode: "exterior" | "interior" }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    if (cameraRef.current) {
      if (viewMode === "interior") {
        // Move camera inside the cabin looking at dashboard
        cameraRef.current.position.set(-0.2, 1.0, 0.1);
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
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 15, 10]} 
          intensity={1.2} 
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
          <ContactShadows position={[0, -0.28, 0]} opacity={0.65} scale={12} blur={2.4} />
        </Suspense>

        <OrbitControls 
          enableZoom={viewMode === "exterior"} 
          enableRotate={true}
          enablePan={false}
          minPolarAngle={viewMode === "interior" ? Math.PI / 4 : 0}
          maxPolarAngle={viewMode === "interior" ? Math.PI / 1.5 : Math.PI / 2.1}
        />
      </Canvas>

      {/* Watermark badge inside 3D viewer */}
      <div className="absolute top-4 left-4 bg-white/70 dark:bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-bold text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-gray-850">
        3D ИНТЕРАКТИВНЫЙ ОБЗОР
      </div>
    </div>
  );
}
