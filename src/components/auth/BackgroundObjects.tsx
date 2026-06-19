"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic pseudo-random number generator for react purity compliance
function createSeededRandom(seed: number) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * Animated Particle Cloud (Layer 5: Tiny Floating Particles)
 * Very low density, slow drifting motion.
 */
function EnergyParticles({ count = 200, theme = "dark" }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random positions and speed vectors
  const [positions, speeds] = useMemo(() => {
    const rand = createSeededRandom(11111);
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand() - 0.5) * 15;
      pos[i * 3 + 1] = (rand() - 0.5) * 10;
      pos[i * 3 + 2] = (rand() - 0.5) * 8;

      spd[i * 3] = (rand() - 0.5) * 0.005;
      spd[i * 3 + 1] = (rand() - 0.5) * 0.005;
      spd[i * 3 + 2] = (rand() - 0.5) * 0.005;
    }
    return [pos, spd];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const positionAttr = geometry.attributes.position;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      let x = positionAttr.getX(i) + speeds[i * 3];
      let y = positionAttr.getY(i) + speeds[i * 3 + 1] + Math.sin(time * 0.5 + i) * 0.0005;
      let z = positionAttr.getZ(i) + speeds[i * 3 + 2];

      // Boundary reset
      if (Math.abs(x) > 8) x = (Math.random() - 0.5) * 15;
      if (Math.abs(y) > 6) y = (Math.random() - 0.5) * 10;
      if (Math.abs(z) > 5) z = (Math.random() - 0.5) * 8;

      positionAttr.setXYZ(i, x, y, z);
    }
    positionAttr.needsUpdate = true;
  });

  const particleColor = theme === "dark" ? "#94a3b8" : "#475569";

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={particleColor}
        transparent
        opacity={theme === "dark" ? 0.25 : 0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Floating Neural Network Grid (Layer 4: Soft, minimal connections)
 * Only 12 nodes for a very clean look.
 */
function NeuralNetworkGrid({ nodeCount = 12, theme = "dark" }) {
  const nodes = useMemo(() => {
    const rand = createSeededRandom(22222);
    const items = [];
    for (let i = 0; i < nodeCount; i++) {
      items.push({
        position: new THREE.Vector3(
          (rand() - 0.5) * 10,
          (rand() - 0.5) * 8,
          (rand() - 0.5) * 4 - 1
        ),
        phase: rand() * Math.PI * 2,
        speed: 0.15 + rand() * 0.2,
      });
    }
    return items;
  }, [nodeCount]);

  const lineRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions: number[] = [];
    
    const activeCoords = nodes.map((node) => {
      const offset = Math.sin(time * node.speed + node.phase) * 0.15;
      return new THREE.Vector3(
        node.position.x,
        node.position.y + offset,
        node.position.z
      );
    });

    const threshold = 4.0;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = activeCoords[i].distanceTo(activeCoords[j]);
        if (dist < threshold) {
          positions.push(activeCoords[i].x, activeCoords[i].y, activeCoords[i].z);
          positions.push(activeCoords[j].x, activeCoords[j].y, activeCoords[j].z);
        }
      }
    }

    lineRef.current.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const lineColor = theme === "dark" ? "#1e6bd6" : "#60a5fa";

  return (
    <group>
      {/* Node Spheres */}
      {nodes.map((node, idx) => (
        <mesh key={idx} position={node.position}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial 
            color={lineColor} 
            transparent 
            opacity={theme === "dark" ? 0.3 : 0.5} 
          />
        </mesh>
      ))}

      {/* Connection Lines */}
      <lineSegments ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={theme === "dark" ? 0.08 : 0.15}
          blending={theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </lineSegments>
    </group>
  );
}

interface BackgroundObjectsProps {
  theme?: "light" | "dark";
}

export default function BackgroundObjects({ theme = "dark" }: BackgroundObjectsProps) {
  return (
    <group>
      <EnergyParticles count={150} theme={theme} />
      <NeuralNetworkGrid nodeCount={12} theme={theme} />
    </group>
  );
}
