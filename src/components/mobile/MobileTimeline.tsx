"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Milestone {
  phase: string;
  title: string;
  desc: string;
  date: string;
  details: string;
}

interface MobileTimelineProps {
  milestones: Milestone[];
}

export default function MobileTimeline({ milestones }: MobileTimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="relative py-4 px-2">
      {/* Static Vertical Gradient Path Line */}
      <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#1E6BD6] via-[#FF7A00] to-[#FFC400] opacity-80" />

      <div className="space-y-4 relative">
        {milestones.map((item, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div key={item.title} className="relative pl-8 flex flex-col">
              {/* Timeline Indicator Ring Node */}
              <div className="absolute left-[11px] top-3.5 w-3 h-3 rounded-full bg-slate-900 border-2 border-[var(--accent-color)] z-10 shadow-sm" />

              {/* Expandable card block */}
              <div
                onClick={() => toggleExpand(index)}
                className={`p-4 rounded-xl bg-[var(--glass-bg)] border transition-all duration-300 shadow-sm cursor-pointer select-none ${
                  isExpanded ? "border-[var(--accent-color)]/50 shadow-md" : "border-[var(--glass-border)] hover:border-[var(--accent-color)]/20"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--accent-color)]">
                    {item.phase} • {item.date}
                  </span>
                </div>

                <h3 className="font-display font-black text-sm text-[var(--text-primary)] mt-1.5 mb-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-semibold">
                  {item.desc}
                </p>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 text-[10px] text-[var(--text-secondary)] border-t border-[var(--glass-border)] pt-3 leading-relaxed font-semibold">
                        {item.details}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
