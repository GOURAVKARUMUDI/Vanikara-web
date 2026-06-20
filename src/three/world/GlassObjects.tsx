"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useCygmaWorld } from "@/context/CygmaWorldContext";
import { useTheme } from "@/components/layout/ThemeContext";
import { usePerformance } from "@/context/PerformanceContext";

// Seeded random number generator
function createSeededRandom(seed: number) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * GlassObjects: Renders dodecahedron glass crystals surrounding the planet.
 * Centrifugal displacement offsets their positions during success passes.
 */
export default function GlassObjects() {
  const { view, sceneReady } = useCygmaWorld();
  const { resolvedTheme } = useTheme();
  const { config } = usePerformance();
  const fragmentRefs = useRef<THREE.Group[]>([]);
  const currentDistanceMult = useRef(1.0);
  
  const revealProgress = useRef(0);
  const activeTimeRef = useRef(0);

  // Generate floating crystal polyhedrons based on performance profile
  const fragments = useMemo(() => {
    const rand = createSeededRandom(88888);
    const list = [];
    const count = config.glassObjectsCount;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI;
      const r = 1.7 + rand() * 0.9;
      const px = Math.cos(angle) * r;
      const pz = Math.sin(angle) * r;
      const py = (rand() - 0.5) * 1.5;

      list.push({
        id: i,
        pos: new THREE.Vector3(px, py, pz),
        size: 0.012 + rand() * 0.02,
        rotSpeed: new THREE.Vector3(
          (rand() - 0.5) * 1.5,
          (rand() - 0.5) * 1.5,
          (rand() - 0.5) * 1.5
        ),
        orbitSpeed: 0.005 + rand() * 0.01,
        phase: rand() * Math.PI * 2,
      });
    }
    return list;
  }, [config.glassObjectsCount]);

  useFrame((state, delta) => {
    if (!sceneReady) {
      revealProgress.current = 0;
      fragments.forEach((frag, idx) => {
        const group = fragmentRefs.current[idx];
        if (group) {
          group.scale.set(0, 0, 0);
        }
      });
      return;
    }

    if (revealProgress.current < 3.0) {
      revealProgress.current = Math.min(3.0, revealProgress.current + delta);
    }
    const timeSinceReady = revealProgress.current;
    const revealOpacity = Math.min(1.0, timeSinceReady / 1.5);

    if (timeSinceReady >= 1.5) {
      activeTimeRef.current += delta;
    }
    const activeTime = activeTimeRef.current;

    let targetDistanceMult = 1.0;
    if (view === "ai") {
      targetDistanceMult = 2.5; // Smoothly push fragments outward
    }
    currentDistanceMult.current = THREE.MathUtils.lerp(currentDistanceMult.current, targetDistanceMult, 0.06);

    fragments.forEach((frag, idx) => {
      const group = fragmentRefs.current[idx];
      if (group) {
        // Orbit speed multiplier during success passes, supporting prefers-reduced-motion
        const orbitSpeed = frag.orbitSpeed * 10 * config.orbitSpeedMult;
        const speedMult = view === "success" ? 6.0 : 1.0;
        const angle = activeTime * orbitSpeed * speedMult + frag.phase;
        const radius = Math.sqrt(frag.pos.x * frag.pos.x + frag.pos.z * frag.pos.z) * currentDistanceMult.current;

        // Perfect horizontal planar orbit around the center (no vertical jitter/bobbing)
        group.position.x = Math.cos(angle) * radius;
        group.position.z = Math.sin(angle) * radius;
        group.position.y = frag.pos.y;

        // Scale by reveal progress
        group.scale.set(revealOpacity, revealOpacity, revealOpacity);

        // Self rotation of the group
        group.rotation.x = activeTime * frag.rotSpeed.x * 0.12 * config.orbitSpeedMult;
        group.rotation.y = activeTime * frag.rotSpeed.y * 0.12 * config.orbitSpeedMult;
        group.rotation.z = activeTime * frag.rotSpeed.z * 0.12 * config.orbitSpeedMult;

        if (view === "success") {
          // Centrifugal displacement: push fragments outward to clear camera view
          group.position.x *= 1.15;
          group.position.z *= 1.15;
        }

        // Set opacity of mesh material
        group.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const mat = child.material as THREE.Material;
            mat.transparent = true;
            mat.opacity = revealOpacity;
          }
        });
      }
    });
  });

  const isDark = resolvedTheme === "dark";
  const fragColor = isDark ? "#93c5fd" : "#e0f2fe";

  return (
    <>
      {fragments.map((frag, idx) => (
        <group
          key={frag.id}
          ref={(el) => {
            if (el) fragmentRefs.current[idx] = el;
          }}
          position={frag.pos}
        >
          <mesh>
            <dodecahedronGeometry args={[frag.size]} />
            {config.useHeavyTransmission ? (
              <MeshTransmissionMaterial
                transmission={0.94}
                roughness={0.06}
                thickness={0.35}
                chromaticAberration={0.18}
                ior={1.5}
                color={fragColor}
                backside={true}
                transparent
                opacity={0}
              />
            ) : (
              <meshPhysicalMaterial
                transmission={0.85}
                roughness={0.1}
                thickness={0.35}
                ior={1.4}
                color={fragColor}
                transparent
                opacity={0}
                depthWrite={false}
              />
            )}
          </mesh>
        </group>
      ))}
    </>
  );
}
