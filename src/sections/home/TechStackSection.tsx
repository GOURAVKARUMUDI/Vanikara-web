"use client";

import { FadeUp } from "@/components/Animate";
import Card, { CardBody } from "@/components/ui/Card";
import { SectionContainer, ContentContainer } from "@/components/ui/Containers";

const TECHS = [
  { name: "Next.js", type: "Frontend Framework", desc: "React server components & optimization." },
  { name: "TypeScript", type: "Language Safety", desc: "Strict type constraints and scale." },
  { name: "CSS Modules & Variables", type: "Styling Engine", desc: "Flexible control without bloat." },
  { name: "TailwindCSS v4", type: "Layout Utility", desc: "Modern styling framework." },
  { name: "Framer Motion", type: "Animations System", desc: "Physics-based interaction modeling." },
  { name: "Supabase", type: "Backend Services", desc: "Authentication, RLS, private buckets." },
  { name: "PostgreSQL", type: "Database Engine", desc: "Robust schema structure and relations." },
  { name: "OpenAI API", type: "Artificial Intelligence", desc: "CYGMA model calculations & prompts." },
];

export default function TechStackSection() {
  return (
    <SectionContainer id="tech-stack">
      <ContentContainer>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUp>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-color)]">
              TECHNOLOGY STACK
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-primary)] leading-tight mt-2">
              Engineered with Modern Best Practices
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-4">
              We leverage reliable systems and advanced frameworks to build responsive, performant, and secure solutions.
            </p>
          </FadeUp>
        </div>

        <div className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
          {TECHS.map((tech, i) => (
            <FadeUp key={tech.name} delay={i * 0.05} className="w-[85vw] sm:w-auto shrink-0 snap-center sm:snap-align-none">
              <Card hover className="h-full">
                <CardBody className="flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-color)]">
                      {tech.type}
                    </span>
                    <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mt-1 mb-2">
                      {tech.name}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </FadeUp>
          ))}
        </div>
      </ContentContainer>
    </SectionContainer>
  );
}
