"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeUp } from "@/components/Animate";

interface Milestone {
  phase: string;
  title: string;
  desc: string;
  date: string;
}

const MILESTONES: Milestone[] = [
  { phase: "Phase 1", title: "The Idea", desc: "Three friends identify student campus inefficiencies and agree to launch a dedicated product hub.", date: "Feb 2026" },
  { phase: "Phase 2", title: "Planning & Validation", desc: "Interviewing 100+ university students to narrow down pg finder (FriskFree) and textbook printing (Vanik) logistics.", date: "Feb 2026" },
  { phase: "Phase 3", title: "Company Incorporation", desc: "VANIKARA Intelligence Private Limited is officially incorporated under the Companies Act, 2013.", date: "April 17, 2026" },
  { phase: "Phase 4", title: "First Product Launch", desc: "Beta release of Vanik campus marketplace supporting print and binding workflows.", date: "April 2026" },
  { phase: "Phase 5", title: "Current Growth", desc: "Expanding operational PG discovery channels and scaling student accounts in public.", date: "Present" },
  { phase: "Phase 6", title: "Future AI Vision", desc: "Integrating CYGMA AI automation engines for voice-driven recommendation interfaces.", date: "Future" },
];

export default function InnovationTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Animate line height based on scroll progress
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="innovation-timeline" ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <FadeUp>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-color)]">
              INNOVATION TIMELINE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-primary)] leading-tight mt-2">
              Our Journey of Milestones
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-4">
              Watch how our startup evolved from a shared dorm room conversation into a structured product ecosystem.
            </p>
          </FadeUp>
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Vertical line background */}
          <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-200/20" />
          
          {/* Animated fill line */}
          <motion.div 
            className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-[#1E6BD6] via-[#FF7A00] to-[#FFC400]"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12">
            {MILESTONES.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.title} className="flex flex-col sm:flex-row relative">
                  
                  {/* Timeline Circle Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-1.5 w-4 h-4 rounded-full bg-[var(--bg-gradient)] border-2 border-[var(--accent-color)] z-10 shadow-md transition-colors" />

                   {/* Left Side Content (Desktop) */}
                  <div className="pl-10 sm:pl-0 sm:w-1/2 flex sm:justify-end sm:order-1">
                    {!isEven && (
                      <div className="hidden sm:block text-right pr-12 pt-1.5">
                        <span className="text-xs font-bold text-[var(--text-secondary)]">{item.date}</span>
                      </div>
                    )}
                    {isEven && (
                      <FadeUp delay={0.05} className="w-full sm:max-w-md sm:pr-12 text-left sm:text-right">
                        <div className="p-6 rounded-3xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-md shadow-sm">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-color)]">
                            {item.phase} <span className="sm:hidden">• {item.date}</span>
                          </span>
                          <h3 className="font-display font-black text-lg text-[var(--text-primary)] mt-1 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </FadeUp>
                    )}
                  </div>

                  {/* Right Side Content (Desktop) */}
                  <div className="pl-10 sm:pl-0 sm:w-1/2 sm:order-2">
                    {isEven && (
                      <div className="hidden sm:block pl-12 pt-1.5">
                        <span className="text-xs font-bold text-[var(--text-secondary)]">{item.date}</span>
                      </div>
                    )}
                    {!isEven && (
                      <FadeUp delay={0.05} className="w-full sm:max-w-md sm:pl-12 text-left">
                        <div className="p-6 rounded-3xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-md shadow-sm">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-color)]">
                            {item.phase} <span className="sm:hidden">• {item.date}</span>
                          </span>
                          <h3 className="font-display font-black text-lg text-[var(--text-primary)] mt-1 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </FadeUp>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
