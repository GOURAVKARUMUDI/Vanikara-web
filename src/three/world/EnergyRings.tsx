"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useTheme } from "@/components/layout/ThemeContext";
import { useCygmaWorld } from "@/context/CygmaWorldContext";

/**
 * EnergyRings: Renders the three orbital rings encircling the glass core.
 * Each ring spins at distinct speeds, scales, and angles.
 */
export default function EnergyRings() {
  const { resolvedTheme } = useTheme();
  const { view, sceneReady } = useCygmaWorld();

  const ringGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  const currentRingScale = useRef(1.0);
  const revealProgress = useRef(0);
  const activeTimeRef = useRef(0);

  useFrame((state, delta) => {
    if (!sceneReady) {
      revealProgress.current = 0;
      if (ringGroupRef.current) {
        ringGroupRef.current.scale.set(0, 0, 0);
      }
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

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = activeTime * 0.08 + Math.sin(activeTime * 0.1) * 0.15;
      ring1Ref.current.rotation.y = activeTime * 0.04 + Math.cos(activeTime * 0.15) * 0.15;
      if (ring1Ref.current.material) {
        const mat = ring1Ref.current.material as THREE.Material;
        mat.transparent = true;
        mat.opacity = revealOpacity;
      }
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -activeTime * 0.12 + Math.sin(activeTime * 0.12) * 0.15;
      ring2Ref.current.rotation.z = activeTime * 0.06 + Math.cos(activeTime * 0.18) * 0.15;
      if (ring2Ref.current.material) {
        const mat = ring2Ref.current.material as THREE.Material;
        mat.transparent = true;
        mat.opacity = revealOpacity;
      }
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -activeTime * 0.06 + Math.sin(activeTime * 0.14) * 0.15;
      ring3Ref.current.rotation.z = -activeTime * 0.08 + Math.cos(activeTime * 0.1) * 0.15;
      if (ring3Ref.current.material) {
        const mat = ring3Ref.current.material as THREE.Material;
        mat.transparent = true;
        mat.opacity = revealOpacity;
      }
    }

    // Dynamic ring scaling based on view state
    let targetScale = 1.0;
    if (view === "success") {
      targetScale = 0.0;
    } else if (view === "ai") {
      targetScale = 2.8; // Scale out of camera near-clipping plane
    }

    currentRingScale.current = THREE.MathUtils.lerp(currentRingScale.current, targetScale, 0.06);

    if (ringGroupRef.current) {
      const rs = currentRingScale.current * revealOpacity;
      ringGroupRef.current.scale.set(rs, rs, rs);
    }
  });

  const isDark = resolvedTheme === "dark";
  const ring1Color = isDark ? "#6366f1" : "#bae6fd";
  const ring2Color = isDark ? "#f97316" : "#ffedd5";
  const ring3Color = isDark ? "#c084fc" : "#f0fdf4";

  return (
    <group ref={ringGroupRef}>
      {/* Orbital Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.85, 0.012, 16, 128]} />
        <MeshTransmissionMaterial
          transmission={0.96}
          roughness={0.05}
          thickness={0.18}
          chromaticAberration={0.1}
          ior={1.48}
          color={ring1Color}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.15, 0.009, 16, 128]} />
        <MeshTransmissionMaterial
          transmission={0.96}
          roughness={0.05}
          thickness={0.18}
          chromaticAberration={0.1}
          ior={1.48}
          color={ring2Color}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Orbital Ring 3 */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.45, 0.007, 16, 128]} />
        <MeshTransmissionMaterial
          transmission={0.96}
          roughness={0.06}
          thickness={0.15}
          chromaticAberration={0.1}
          ior={1.48}
          color={ring3Color}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}
