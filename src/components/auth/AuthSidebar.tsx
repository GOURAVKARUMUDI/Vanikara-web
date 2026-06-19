"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Cpu, Network, Radio } from "lucide-react";

export default function AuthSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
      className="hidden lg:flex flex-col w-80 p-6 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[2.5rem] shadow-xl backdrop-blur-xl shrink-0 h-[calc(100vh-8rem)] relative overflow-hidden group select-none"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-color)]/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-[var(--accent-color)]/10 transition-colors" />

      {/* Header section */}
      <div className="mb-6 flex-shrink-0">
        <div className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-color)] flex items-center gap-1.5 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          SYSTEM NODE ACTIVE
        </div>
        <h3 className="font-display font-black text-lg tracking-tight text-[var(--text-primary)]">
          CYGMA PLATFORM
        </h3>
      </div>

      {/* Core information body */}
      <div className="flex-1 overflow-y-auto space-y-5 pr-1 scrollbar-none">
        <div className="space-y-2">
          <h4 className="text-[9px] font-black uppercase tracking-wider text-[var(--text-secondary)]">
            Technical Vision
          </h4>
          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium">
            VANIKARA Intelligence is built to deploy physically accurate RAG indexing systems, student marketplaces, and scalable SaaS workspaces across high-density nodes.
          </p>
        </div>

        <div className="border-t border-[var(--glass-border)] pt-4 space-y-3.5">
          <h4 className="text-[9px] font-black uppercase tracking-wider text-[var(--text-secondary)]">
            Active Core Metrics
          </h4>

          {/* Metric 1 */}
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)] mt-0.5">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-[var(--text-primary)]">Model Router v1.2</span>
              <span className="block text-[9px] text-[var(--text-secondary)]">Routing live OpenAI completions</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)] mt-0.5">
              <Network className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-[var(--text-primary)]">Core Connection Nodes</span>
              <span className="block text-[9px] text-[var(--text-secondary)]">Latency average is 28ms</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)] mt-0.5">
              <Radio className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-[var(--text-primary)]">Public Grounding (RAG)</span>
              <span className="block text-[9px] text-[var(--text-secondary)]">Offline for guest sandbox preview</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="border-t border-[var(--glass-border)] pt-4 mt-4 flex-shrink-0">
        <div className="p-2.5 bg-yellow-500/5 border border-yellow-500/10 rounded-xl flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[9px] text-amber-400 font-medium leading-normal">
            Every authentication attempt is fully monitored under secure corporate policy constraints.
          </p>
        </div>
      </div>

    </motion.div>
  );
}
