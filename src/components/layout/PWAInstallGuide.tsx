"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Smartphone } from "lucide-react";
import Image from "next/image";

interface PWAInstallGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PWAInstallGuide({ isOpen, onClose }: PWAInstallGuideProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full sm:max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-t-[2.5rem] sm:rounded-[2rem] p-6 shadow-2xl overflow-hidden select-none"
          >
            {/* Ambient Aurora Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[var(--accent-color)]/10 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

            {/* Specluar Reflection Edge */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/20 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/50 dark:border-white/5 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 dark:bg-white/5 border border-slate-200/30 dark:border-white/10 flex items-center justify-center shadow-inner relative overflow-hidden shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Vanikara Logo"
                    width={22}
                    height={15}
                    className="relative z-10"
                  />
                </div>
                <div>
                  <h3 className="font-display font-black text-sm tracking-wide text-[var(--text-primary)]">
                    INSTALL VANIKARA APP
                  </h3>
                  <p className="text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-[var(--accent-color)]" />
                    iOS Safari Guide
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-slate-500/10 border border-transparent hover:border-slate-200 dark:hover:border-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-300 cursor-pointer active:scale-90"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Instructions list */}
            <div className="mt-5 space-y-4 relative z-10 text-[var(--text-primary)]">
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-semibold text-center sm:text-left">
                Add this application to your home screen for quick access and full offline capability on your iOS device.
              </p>

              {/* Step 1 */}
              <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-500/5 border border-slate-200/20 dark:border-white/5 transition-all hover:bg-slate-500/10">
                <div className="w-7 h-7 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] flex items-center justify-center font-display font-black text-xs shrink-0">
                  1
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-bold flex items-center gap-1.5 flex-wrap">
                    Tap the <span className="inline-flex p-1 rounded bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/5"><ShareIcon className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" /></span> share button in Safari.
                  </p>
                  <p className="text-[10px] text-[var(--text-secondary)] leading-normal font-semibold">
                    Located in Safari&apos;s bottom toolbar on iPhone or top right on iPad.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-500/5 border border-slate-200/20 dark:border-white/5 transition-all hover:bg-slate-500/10">
                <div className="w-7 h-7 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] flex items-center justify-center font-display font-black text-xs shrink-0">
                  2
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-bold flex items-center gap-1.5 flex-wrap">
                    Scroll down and tap <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/5 font-semibold text-[10px]"><AddIcon className="w-3 h-3 text-[var(--text-primary)]" /> Add to Home Screen</span>.
                  </p>
                  <p className="text-[10px] text-[var(--text-secondary)] leading-normal font-semibold">
                    You may need to scroll past your sharing shortcuts to find it.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-500/5 border border-slate-200/20 dark:border-white/5 transition-all hover:bg-slate-500/10">
                <div className="w-7 h-7 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] flex items-center justify-center font-display font-black text-xs shrink-0">
                  3
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-bold flex items-center gap-1.5">
                    Tap <span className="text-blue-500 dark:text-blue-400 font-extrabold">Add</span> in the top right corner.
                  </p>
                  <p className="text-[10px] text-[var(--text-secondary)] leading-normal font-semibold">
                    The shortcut will instantly render on your phone&apos;s home screen.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Close Prompt */}
            <div className="mt-5 pt-3 border-t border-slate-200/50 dark:border-white/5 flex justify-end relative z-10">
              <button
                onClick={onClose}
                className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-color)] hover:opacity-85 transition-opacity flex items-center gap-1 cursor-pointer"
              >
                Got It
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Custom SVGs matching Apple platform icons for precision instructions
function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

function AddIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}
