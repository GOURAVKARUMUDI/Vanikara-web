"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCygmaWorld } from "@/context/CygmaWorldContext";

export default function Preloader() {
  const { sceneReady, setAppRevealComplete } = useCygmaWorld();
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    if (sceneReady) {
      setShouldHide(true);
    }
  }, [sceneReady]);

  return (
    <AnimatePresence 
      onExitComplete={() => {
        // Once the loader finishes its exit animation, signal the app to fade in the UI
        setAppRevealComplete(true);
      }}
    >
      {!shouldHide && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712]/60 backdrop-blur-3xl"
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Pulsing glow behind logo */}
            <div className="absolute w-32 h-32 bg-[var(--accent-color)]/30 blur-[40px] rounded-full animate-pulse pointer-events-none" />
            
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 shadow-2xl relative z-10 overflow-hidden mb-6">
              {/* Spinning border effect */}
              <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-[spin_2s_linear_infinite] opacity-50" />
              <div className="absolute inset-[1px] bg-[#030712] rounded-2xl" />
              <Image 
                src="/logo.png" 
                alt="Vanikara Loader Logo" 
                className="w-10 h-auto relative z-10 animate-pulse" 
                width={40} 
                height={40} 
              />
            </div>
            
            <span className="font-display font-black text-xs tracking-widest text-[var(--text-primary)] uppercase">
              Initializing Environment
            </span>
            <div className="w-32 h-0.5 bg-white/10 rounded-full mt-4 overflow-hidden relative">
              <motion.div 
                className="h-full bg-[var(--accent-color)] absolute left-0 top-0"
                initial={{ width: "0%" }}
                animate={sceneReady ? { width: "100%" } : { width: "80%" }}
                transition={{ duration: sceneReady ? 0.4 : 1.2, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
