"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshTransmissionMaterial } from "@react-three/drei";

// Deterministic pseudo-random number generator for react purity compliance
function createSeededRandom(seed: number) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

interface CygmaCoreProps {
  theme?: "light" | "dark";
}

export default function CygmaCore({ theme = "dark" }: CygmaCoreProps) {
  const coreRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const innerParticlesRef = useRef<THREE.Points>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const fragmentRefs = useRef<THREE.Mesh[]>([]);

  // Generate a small cluster of neural particles inside the glass core
  const innerParticleCount = 60;
  const [particlePositions, particleSpeeds] = useMemo(() => {
    const rand = createSeededRandom(12345);
    const pos = new Float32Array(innerParticleCount * 3);
    const spd = new Float32Array(innerParticleCount * 3);
    for (let i = 0; i < innerParticleCount; i++) {
      const u = rand();
      const v = rand();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(rand()) * 0.75;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      spd[i * 3] = (rand() - 0.5) * 0.2;
      spd[i * 3 + 1] = (rand() - 0.5) * 0.2;
      spd[i * 3 + 2] = (rand() - 0.5) * 0.2;
    }
    return [pos, spd];
  }, []);

  // Generate crystal fragments orbiting parameters (radius 1.7 to 2.4)
  const fragments = useMemo(() => {
    const rand = createSeededRandom(67890);
    const list = [];
    const count = 7;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI;
      const r = 1.75 + rand() * 0.6;
      const px = Math.cos(angle) * r;
      const py = (rand() - 0.5) * 1.3;
      const pz = Math.sin(angle) * r;

      list.push({
        id: i,
        pos: new THREE.Vector3(px, py, pz),
        size: 0.05 + rand() * 0.07,
        rotSpeed: new THREE.Vector3(
          (rand() - 0.5) * 1.2,
          (rand() - 0.5) * 1.2,
          (rand() - 0.5) * 1.2
        ),
        orbitSpeed: 0.08 + rand() * 0.12,
        phase: rand() * Math.PI * 2
      });
    }
    return list;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Scale-up transition between 2.0s and 4.5s (2.5s duration)
    let scale = 0;
    if (time > 2.0) {
      const alpha = Math.min(1.0, (time - 2.0) / 2.5);
      const c1 = 1.70158;
      const c3 = c1 + 1;
      const easeOutBack = 1 + c3 * Math.pow(alpha - 1, 3) + c1 * Math.pow(alpha - 1, 2);
      scale = easeOutBack;
    }

    // 1. Slow, organic floating motion for the core group around base Y=0.2
    if (coreRef.current) {
      coreRef.current.scale.set(scale, scale, scale);
      coreRef.current.rotation.y = time * 0.08;
      coreRef.current.rotation.x = Math.sin(time * 0.04) * 0.05;
      coreRef.current.position.y = 0.2 + Math.sin(time * 0.4) * 0.05;
    }

    // 2. Pulse the inner glowing energy core
    if (glowRef.current) {
      const pulse = 1.0 + Math.sin(time * 2.0) * 0.05;
      glowRef.current.scale.set(pulse, pulse, pulse);
    }

    // 3. Rotate internal particles
    if (innerParticlesRef.current) {
      innerParticlesRef.current.rotation.y = -time * 0.15;
      innerParticlesRef.current.rotation.x = time * 0.05;
    }

    // 4. Spin thin orbital rings on offset axes
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.25;
      ring1Ref.current.rotation.y = time * 0.12;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.3;
      ring2Ref.current.rotation.z = time * 0.18;
    }

    // 5. Orbit and self-rotate floating crystal fragments
    fragments.forEach((frag, idx) => {
      const mesh = fragmentRefs.current[idx];
      if (mesh) {
        mesh.rotation.x += frag.rotSpeed.x * 0.015;
        mesh.rotation.y += frag.rotSpeed.y * 0.015;
        mesh.rotation.z += frag.rotSpeed.z * 0.015;

        const angle = time * frag.orbitSpeed + frag.phase;
        const radius = Math.sqrt(frag.pos.x * frag.pos.x + frag.pos.z * frag.pos.z);
        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.z = Math.sin(angle) * radius;
        mesh.position.y = frag.pos.y + Math.sin(time * 0.7 + frag.phase) * 0.15;
      }
    });
  });

  // Dynamic theme colors
  const primaryGlowColor = theme === "dark" ? "#3b82f6" : "#0284c7";
  const accentGlowColor = theme === "dark" ? "#f97316" : "#ea580c";
  const ring1Color = theme === "dark" ? "#60a5fa" : "#0284c7";
  const ring2Color = theme === "dark" ? "#f97316" : "#ff7800";
  const fragColor = theme === "dark" ? "#93c5fd" : "#0ea5e9";

  return (
    <group ref={coreRef}>
      {/* Subtle internal point light inside crystal core */}
      <pointLight 
        color={theme === "dark" ? "#60a5fa" : "#bae6fd"} 
        intensity={theme === "dark" ? 2.5 : 1.8} 
        distance={4.0} 
        decay={2}
      />

      {/* A. Internal Energy Node (Glowing Base Core) */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial
          color={primaryGlowColor}
          transparent
          opacity={theme === "dark" ? 0.8 : 0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* B. Secondary Inner Contrast Glow */}
      <mesh scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshBasicMaterial
          color={accentGlowColor}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* C. Internal Rotating Neural Particles (Refracted by Outer Glass) */}
      <points ref={innerParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color={theme === "dark" ? "#e2e8f0" : "#ffffff"}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* D. Main Liquid Glass Crystal Core */}
      <mesh>
        <icosahedronGeometry args={[1.25, 2]} />
        <MeshTransmissionMaterial
          transmission={0.98}
          roughness={0.02}
          thickness={0.8}
          distortion={0.1}
          temporalDistortion={0.05}
          chromaticAberration={1.2}
          anisotropicBlur={0.15}
          ior={1.75}
          color={theme === "dark" ? "#60a5fa" : "#bae6fd"}
          backside={true}
          transmissionSampler={true}
        />
      </mesh>

      {/* E. Thin Orbital Glass Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.85, 0.015, 16, 128]} />
        <MeshTransmissionMaterial
          transmission={0.95}
          roughness={0.05}
          thickness={0.2}
          chromaticAberration={0.1}
          ior={1.48}
          color={ring1Color}
        />
      </mesh>

      {/* F. Thin Orbital Glass Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.15, 0.01, 16, 128]} />
        <MeshTransmissionMaterial
          transmission={0.95}
          roughness={0.05}
          thickness={0.2}
          chromaticAberration={0.1}
          ior={1.48}
          color={ring2Color}
        />
      </mesh>

      {/* G. Floating Crystal Fragments surrounding Core */}
      {fragments.map((frag, idx) => (
        <mesh
          key={frag.id}
          ref={(el) => {
            if (el) fragmentRefs.current[idx] = el;
          }}
          position={frag.pos}
        >
          <dodecahedronGeometry args={[frag.size]} />
          <MeshTransmissionMaterial
            transmission={0.95}
            roughness={0.08}
            thickness={0.4}
            chromaticAberration={0.2}
            ior={1.50}
            color={fragColor}
            backside={true}
          />
        </mesh>
      ))}
    </group>
  );
}
