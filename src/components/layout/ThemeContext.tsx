"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "auto";
export type AtmosphereMode = "morning" | "afternoon" | "evening" | "night";

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  atmosphere: AtmosphereMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("vanikara-theme") as ThemeMode;
      return savedTheme || "auto";
    }
    return "auto";
  });
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [atmosphere, setAtmosphere] = useState<AtmosphereMode>("afternoon");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const calculateAtmosphere = (currentTheme: ThemeMode) => {
    if (typeof window === "undefined") return;

    const hour = new Date().getHours();
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    let targetResolved: "light" | "dark" = "light";
    let targetAtmosphere: AtmosphereMode = "afternoon";

    if (currentTheme === "auto") {
      // 1. Check system theme first
      if (systemPrefersDark) {
        targetResolved = "dark";
        // Map local time to appropriate dark atmosphere
        if (hour >= 17 && hour < 20) {
          targetAtmosphere = "evening";
        } else {
          targetAtmosphere = "night";
        }
      } else {
        // System is light, use local time
        if (hour >= 6 && hour < 12) {
          targetAtmosphere = "morning";
          targetResolved = "light";
        } else if (hour >= 12 && hour < 17) {
          targetAtmosphere = "afternoon";
          targetResolved = "light";
        } else if (hour >= 17 && hour < 20) {
          targetAtmosphere = "evening";
          targetResolved = "dark";
        } else {
          targetAtmosphere = "night";
          targetResolved = "dark";
        }
      }
    } else if (currentTheme === "light") {
      targetResolved = "light";
      if (hour >= 6 && hour < 12) {
        targetAtmosphere = "morning";
      } else {
        targetAtmosphere = "afternoon";
      }
    } else {
      targetResolved = "dark";
      if (hour >= 17 && hour < 20) {
        targetAtmosphere = "evening";
      } else {
        targetAtmosphere = "night";
      }
    }

    setResolvedTheme(targetResolved);
    setAtmosphere(targetAtmosphere);

    // Apply values to HTML element attributes for global selector styling
    const root = document.documentElement;
    root.setAttribute("data-theme", targetResolved);
    root.setAttribute("data-atmosphere", targetAtmosphere);
  };

  useEffect(() => {
    if (!mounted) return;

    // Defer the initial calculation to next tick to avoid synchronous state update warnings
    const deferId = setTimeout(() => {
      calculateAtmosphere(theme);
    }, 0);

    // Watch for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (theme === "auto") {
        calculateAtmosphere("auto");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    
    // Set up timer to refresh atmosphere hourly
    const interval = setInterval(() => {
      calculateAtmosphere(theme);
    }, 60000 * 10); // check every 10 minutes

    return () => {
      clearTimeout(deferId);
      mediaQuery.removeEventListener("change", handleSystemChange);
      clearInterval(interval);
    };
  }, [theme, mounted]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem("vanikara-theme", newTheme);
  };

  // Prevent flash by utilizing resolved attributes computed client-side
  // We can render a shell, but we ensure layout is loaded properly
  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, atmosphere, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
