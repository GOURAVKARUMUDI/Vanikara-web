"use client";

import { usePWAContext } from "@/context/PWAContext";

/**
  * usePWA: Convenience hook to consume PWA installation states and triggers.
  * Dynamically synchronized across components via global React Context.
  */
export function usePWA() {
  return usePWAContext();
}
