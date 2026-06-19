"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import CygmaCore from "./CygmaCore";
import BackgroundObjects from "./BackgroundObjects";

interface CygmaCanvasProps {
  isSuccess?: boolean;
  position?: "fixed" | "absolute";
  theme?: "light" | "dark";
}

/**
 * CameraAndLightsRig: Smoothly handles camera orbit, scroll parallax, mouse drift,
 * and dynamically interpolates lighting values between Light and Dark mode over 600-800ms.
 */
function CameraAndLightsRig({ theme }: { theme: "light" | "dark" }) {
  // Light references
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.PointLight>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);

  // Smooth scroll tracking ref
  const scrollYRef = useRef<number>(0);

  // Target colors and intensities for Lerping
  const targets = {
    dark: {
      ambientColor: new THREE.Color("#060b18"),
      ambientIntensity: 0.3,
      dirColor: new THREE.Color("#3b82f6"),
      dirIntensity: 5.0,
      fillColor: new THREE.Color("#6366f1"),
      fillIntensity: 2.5,
      spotColor: new THREE.Color("#f97316"),
      spotIntensity: 6.0,
      fogColor: new THREE.Color("#040814"),
      fogNear: 4.0,
      fogFar: 10.0,
    },
    light: {
      ambientColor: new THREE.Color("#f8fafc"),
      ambientIntensity: 0.8,
      dirColor: new THREE.Color("#ffffff"),
      dirIntensity: 3.0,
      fillColor: new THREE.Color("#e0f2fe"),
      fillIntensity: 2.0,
      spotColor: new THREE.Color("#fef3c7"),
      spotIntensity: 1.5,
      fogColor: new THREE.Color("#f1f5f9"),
      fogNear: 3.5,
      fogFar: 9.0,
    }
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer; // Normalized mouse coordinates [-1, 1]
    const { camera, size } = state;
    
    // Smooth scroll position tracking (lerped to remove scroll stutters)
    if (typeof window !== "undefined") {
      scrollYRef.current = THREE.MathUtils.lerp(scrollYRef.current, window.scrollY, 0.08);
    }

    const aspect = size.width / size.height;

    // Responsive camera distance (Z) based on viewport aspect ratio
    let responsiveZ = 5.8;
    if (aspect < 1) {
      responsiveZ = 5.8 + (1 - aspect) * 3.5;
    }

    // Base coordinates
    const baseX = 0;
    let baseY = 0.2;
    let baseZ = responsiveZ;

    // Phase 1: 0–2s Dolly-In Transition (from Z=12.0 down to Z=responsiveZ, Y=1.2 to Y=0.2)
    if (time < 2.0) {
      const alpha = time / 2.0;
      const easeAlpha = 1 - Math.pow(1 - alpha, 3); // easeOutCubic
      baseY = 1.2 + (0.2 - 1.2) * easeAlpha;
      baseZ = 12.0 + (responsiveZ - 12.0) * easeAlpha;
    }

    // Phase 2 & 3: Orbit, parallax, and scroll tracking blend in smoothly from 2s to 5s
    const orbitBlend = Math.min(1.0, Math.max(0.0, (time - 2.0) / 3.0));
    
    // Slow orbital drift (blended)
    const orbitRadiusX = 0.35;
    const orbitRadiusY = 0.2;
    const orbitX = Math.sin(time * 0.15) * orbitRadiusX * orbitBlend;
    const orbitY = Math.cos(time * 0.2) * orbitRadiusY * orbitBlend;

    // Mouse parallax (blended)
    const parallaxX = pointer.x * 0.5 * orbitBlend;
    const parallaxY = pointer.y * 0.45 * orbitBlend;

    // Scroll depth tracking
    const scrollZ = scrollYRef.current * 0.005;
    const scrollYOffset = -scrollYRef.current * 0.0035;

    const targetX = baseX + orbitX + parallaxX;
    const targetY = baseY + orbitY + parallaxY + scrollYOffset;
    const targetZ = baseZ + scrollZ;

    // Sub-pixel gentle camera breathing zoom
    const breathing = Math.sin(time * 0.25) * 0.12 * orbitBlend;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ + breathing, 0.05);
    
    // Adjust lookAt target to match the centered Crystal Core center at Y = 0.2
    const lookAtTarget = new THREE.Vector3(0, 0.2 + scrollYOffset * 0.25, 0);
    camera.lookAt(lookAtTarget);

    // 2. Smoothly interpolate (lerp) lights & scene fog colors/intensities
    const active = theme === "dark" ? targets.dark : targets.light;
    const lerpSpeed = 0.07; // ~700ms transition time at 60 FPS

    // Volumetric lights wake up from 0 intensity during the first 2 seconds
    const wakeUpFactor = Math.min(1.0, time / 2.0);

    if (ambientRef.current) {
      ambientRef.current.color.lerp(active.ambientColor, lerpSpeed);
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, active.ambientIntensity * wakeUpFactor, lerpSpeed);
    }
    if (dirLightRef.current) {
      dirLightRef.current.color.lerp(active.dirColor, lerpSpeed);
      dirLightRef.current.intensity = THREE.MathUtils.lerp(dirLightRef.current.intensity, active.dirIntensity * wakeUpFactor, lerpSpeed);
    }
    if (fillLightRef.current) {
      fillLightRef.current.color.lerp(active.fillColor, lerpSpeed);
      fillLightRef.current.intensity = THREE.MathUtils.lerp(fillLightRef.current.intensity, active.fillIntensity * wakeUpFactor, lerpSpeed);
    }
    if (spotLightRef.current) {
      spotLightRef.current.color.lerp(active.spotColor, lerpSpeed);
      spotLightRef.current.intensity = THREE.MathUtils.lerp(spotLightRef.current.intensity, active.spotIntensity * wakeUpFactor, lerpSpeed);
    }

    // Dynamic fog color adjustment
    const scene = state.scene;
    if (scene.fog && scene.fog instanceof THREE.Fog) {
      scene.fog.color.lerp(active.fogColor, lerpSpeed);
      scene.fog.near = THREE.MathUtils.lerp(scene.fog.near, active.fogNear, lerpSpeed);
      scene.fog.far = THREE.MathUtils.lerp(scene.fog.far, active.fogFar, lerpSpeed);
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} />
      
      {/* Volumetric key light / Rim lighting */}
      <directionalLight
        ref={dirLightRef}
        position={[-6, 6, -3]}
      />

      {/* Volumetric filler light */}
      <pointLight
        ref={fillLightRef}
        position={[0, 4, 2]}
      />

      {/* Contrast spotlight */}
      <spotLight
        ref={spotLightRef}
        position={[8, -6, 5]}
        angle={0.6}
        penumbra={1}
      />
    </>
  );
}

export default function CygmaCanvas({ 
  isSuccess = false, 
  position = "fixed",
  theme = "dark"
}: CygmaCanvasProps) {
  const initialFogColor = theme === "dark" ? "#020617" : "#f8fafc";

  return (
    <div className={`w-full h-full ${position === "absolute" ? "absolute" : "fixed"} inset-0 z-0 pointer-events-none`}>
      <Canvas
        camera={{ position: [0, 1.2, 12], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Dynamic Fog parameters */}
        <fog attach="fog" args={[initialFogColor, 4, 10]} />

        {/* Cinematic light controls and camera animations rig */}
        <CameraAndLightsRig theme={theme} />

        {/* Low-clutter backdrop elements */}
        <BackgroundObjects theme={theme} />

        {/* Physical crystal intelligence glass sphere */}
        <CygmaCore theme={theme} />

        {/* Dynamic post-processing composer */}
        <EffectComposer>
          <Bloom
            intensity={theme === "dark" ? 1.2 : 0.6}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.8}
            mipmapBlur={true}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
