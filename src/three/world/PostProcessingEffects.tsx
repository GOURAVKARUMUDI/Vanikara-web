"use client";

import React from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { PerformanceConfig } from "@/context/PerformanceContext";

interface PostProcessingEffectsProps {
  bloomIntensity: number;
  config: PerformanceConfig;
}

export default function PostProcessingEffects({ bloomIntensity, config }: PostProcessingEffectsProps) {
  return (
    <EffectComposer>
      <Bloom
        intensity={bloomIntensity * config.bloomIntensity}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.75}
        mipmapBlur={config.bloomMipmapBlur}
      />
    </EffectComposer>
  );
}
