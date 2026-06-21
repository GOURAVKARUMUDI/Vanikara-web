"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";
import { App } from "@capacitor/app";
import { Keyboard } from "@capacitor/keyboard";
import { useTheme } from "@/components/layout/ThemeContext";

/**
 * CapacitorManager: Manages native bridges and syncs PWA features
 * on iOS and Android platforms via Capacitor plugins.
 */
export default function CapacitorManager() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    // 1. Programmatically Hide native splash screen on mount after Next.js hydration
    const hideSplash = async () => {
      try {
        await SplashScreen.hide();
        console.log("[Capacitor] Branded Native Splash Screen hidden successfully.");
      } catch (err) {
        console.warn("[Capacitor] SplashScreen.hide warning:", err);
      }
    };
    hideSplash();

    // 2. Register hardware back button listener for Android navigation
    const registerBackButton = async () => {
      try {
        await App.addListener("backButton", ({ canGoBack }) => {
          if (canGoBack) {
            window.history.back();
          } else {
            // Exit app if there is no browser back history left
            App.exitApp();
          }
        });
      } catch (err) {
        console.error("[Capacitor] App.addListener(backButton) failure:", err);
      }
    };
    registerBackButton();

    // 3. Configure soft keyboard scroll constraints
    const registerKeyboard = async () => {
      try {
        await Keyboard.setScroll({ scroll: true });
      } catch (err) {
        console.warn("[Capacitor] Keyboard.setScroll warning:", err);
      }
    };
    registerKeyboard();

    return () => {
      // Remove native listeners on unmount
      App.removeAllListeners();
    };
  }, []);

  // 4. Synchronize Native Status Bar styles with Next.js Theme changes
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const syncStatusBar = async () => {
      try {
        // Toggle light vs dark status bar icons dynamically
        await StatusBar.setStyle({
          style: resolvedTheme === "dark" ? Style.Dark : Style.Light,
        });

        // Set status bar background color to match theme backgrounds in Android
        if (Capacitor.getPlatform() === "android") {
          await StatusBar.setBackgroundColor({
            color: resolvedTheme === "dark" ? "#0c1022" : "#FCFDFF",
          });
        }
      } catch (err) {
        console.error("[Capacitor] StatusBar styling sync failure:", err);
      }
    };

    syncStatusBar();
  }, [resolvedTheme]);

  return null; // Non-rendering structural controller
}
