"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from "react";

export type PerformanceProfile = "ultra" | "high" | "medium" | "low" | "battery";
export type PerformanceOverride = "auto" | PerformanceProfile;

export interface PerformanceConfig {
  maxParticles: number;
  usePostProcessing: boolean;
  bloomIntensity: number;
  bloomMipmapBlur: boolean;
  useHeavyTransmission: boolean;
  glassObjectsCount: number;
  dpr: number;
  targetFps: number;
  orbitSpeedMult: number;
  neuralNetworkNodeCount: number;
}

interface PerformanceContextType {
  profile: PerformanceOverride;
  currentProfile: PerformanceProfile;
  fps: number;
  isBenchmarked: boolean;
  config: PerformanceConfig;
  setProfileOverride: (prof: PerformanceOverride) => void;
  reduceMotion: boolean;
  setReduceMotion: (val: boolean) => void;
  detectedSpecs: {
    cores: number;
    memory: number;
    dpr: number;
    connection: string;
    prefersReducedMotion: boolean;
    gpu: string;
    batteryLevel?: number;
    isCharging?: boolean;
  };
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [manualReduceMotion, setManualReduceMotion] = useState<boolean>(false);
  const [fps, setFps] = useState(60);

  // Specifications state for telemetry display
  const [detectedSpecs, setDetectedSpecs] = useState<PerformanceContextType["detectedSpecs"]>({
    cores: 4,
    memory: 4,
    dpr: 1,
    connection: "unknown",
    prefersReducedMotion: false,
    gpu: "unknown",
  });

  const frameTimesRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef<number>(0);

  // Load manual motion setting on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("vanikara_reduce_motion");
      if (stored !== null) {
        setManualReduceMotion(stored === "true");
      }
    }
  }, []);

  const setReduceMotion = (val: boolean) => {
    setManualReduceMotion(val);
    localStorage.setItem("vanikara_reduce_motion", String(val));
  };

  // Safe Browser Cues detection
  useEffect(() => {
    if (typeof window === "undefined") return;

    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 4;
    const dpr = window.devicePixelRatio || 1;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let connection = "unknown";
    const conn = (navigator as any).connection;
    if (conn) {
      connection = `${conn.effectiveType || "unknown"}${conn.saveData ? " (SaveData)" : ""}`;
    }

    let gpu = "unknown";
    try {
      const canvas = document.createElement("canvas");
      const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "unknown";
        }
      }
    } catch (e) {}

    setDetectedSpecs((prev) => ({
      ...prev,
      cores,
      memory,
      dpr,
      prefersReducedMotion,
      connection,
      gpu,
    }));

    if ("getBattery" in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBattery = () => {
          setDetectedSpecs((prev) => ({
            ...prev,
            batteryLevel: battery.level * 100,
            isCharging: battery.charging,
          }));
        };
        updateBattery();
        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingchange", updateBattery);
      });
    }
  }, []);

  // Simple FPS counter loop (no benchmarking or dynamic tuning)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let animFrameId: number;
    let isRunning = true;
    lastFrameTimeRef.current = performance.now();

    const checkFrame = () => {
      if (!isRunning) return;

      const now = performance.now();
      const delta = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;

      if (delta > 300) {
        animFrameId = requestAnimationFrame(checkFrame);
        return;
      }

      frameTimesRef.current.push(delta);
      if (frameTimesRef.current.length > 60) {
        frameTimesRef.current.shift();
      }

      const averageDelta = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
      const currentFps = Math.round(1000 / averageDelta);
      setFps(currentFps);

      animFrameId = requestAnimationFrame(checkFrame);
    };

    animFrameId = requestAnimationFrame(checkFrame);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  const reduceMotion = detectedSpecs.prefersReducedMotion || manualReduceMotion;

  const activeConfig = useMemo<PerformanceConfig>(() => {
    return {
      maxParticles: 8000,
      usePostProcessing: true,
      bloomIntensity: 1.0,
      bloomMipmapBlur: true,
      useHeavyTransmission: true,
      glassObjectsCount: 9,
      dpr: Math.min(detectedSpecs.dpr, 2.0),
      targetFps: 60,
      orbitSpeedMult: reduceMotion ? 0.0 : 1.0,
      neuralNetworkNodeCount: 12,
    };
  }, [detectedSpecs.dpr, reduceMotion]);

  // Maintain compatibility with existing code references to profiles
  const profile: PerformanceOverride = reduceMotion ? "battery" : "high";
  const currentProfile: PerformanceProfile = reduceMotion ? "battery" : "high";
  const setProfileOverride = (prof: PerformanceOverride) => {
    const shouldReduce = prof === "battery" || prof === "low";
    setReduceMotion(shouldReduce);
  };

  return (
    <PerformanceContext.Provider
      value={{
        profile,
        currentProfile,
        fps,
        isBenchmarked: true,
        config: activeConfig,
        setProfileOverride,
        reduceMotion,
        setReduceMotion,
        detectedSpecs,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error("usePerformance must be used within a PerformanceProvider");
  }
  return context;
}
