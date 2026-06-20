"use client";

import HeroSection from "@/sections/home/HeroSection";
import dynamic from "next/dynamic";

const WhoWeAre = dynamic(() => import("@/sections/home/WhoWeAre"), { ssr: false });
const OurVision = dynamic(() => import("@/sections/home/OurVision"), { ssr: false });
const FeaturesSection = dynamic(() => import("@/sections/home/FeaturesSection"), { ssr: false });
const TechStackSection = dynamic(() => import("@/sections/home/TechStackSection"), { ssr: false });
const WhyChooseUs = dynamic(() => import("@/sections/home/WhyChooseUs"), { ssr: false });
const CygmaPreviewSection = dynamic(() => import("@/sections/home/CygmaPreviewSection"), { ssr: false });
const InnovationTimeline = dynamic(() => import("@/sections/home/InnovationTimeline"), { ssr: false });
const StatsSection = dynamic(() => import("@/sections/home/StatsSection"), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/sections/home/TestimonialsSection"), { ssr: false });
const CTABanner = dynamic(() => import("@/sections/home/CTABanner"), { ssr: false });

/**
 * HomePage: Main landing entry compiling 12 Liquid Glass sections.
 */
export default function HomePage() {
  return (
    <>
      {/* 1. Hero Experience (incorporating dynamic particles, mesh gradients, glass buttons) */}
      <HeroSection />
      
      {/* 2. Our Vision */}
      <div className="lazy-section">
        <OurVision />
      </div>
      
      {/* 3. Who We Are */}
      <div className="lazy-section">
        <WhoWeAre />
      </div>
      
      {/* 4. Services Grid (custom interactive hover features) */}
      <div className="lazy-section">
        <FeaturesSection />
      </div>
      
      {/* 5. Technology Stack (logo grid detailing React, TS, Supabase, Framer, Tailwind) */}
      <div className="lazy-section">
        <TechStackSection />
      </div>
      
      {/* 6. Why Choose VANIKARA (clean value statement blocks) */}
      <div className="lazy-section">
        <WhyChooseUs />
      </div>
      
      {/* 7. Cygma AI Preview Workspace */}
      <div className="lazy-section">
        <CygmaPreviewSection />
      </div>
      
      {/* 8. Innovation Timeline (scrollytelling animation) */}
      <div className="lazy-section">
        <InnovationTimeline />
      </div>
      
      {/* 9. Statistics Counters (animated scroll count triggers) */}
      <div className="lazy-section">
        <StatsSection />
      </div>
      
      {/* 10. Testimonials (future-ready) */}
      <div className="lazy-section">
        <TestimonialsSection />
      </div>
      
      {/* 11. Call To Action Banner */}
      <div className="lazy-section">
        <CTABanner
          title="Ready to Build Tomorrow?"
          subtitle="Collaborate on our student ecosystem or deploy specialized automations."
          primaryLabel="Get in Touch"
          primaryHref="/contact"
          secondaryLabel="Explore Projects"
          secondaryHref="/projects"
        />
      </div>
    </>
  );
}
