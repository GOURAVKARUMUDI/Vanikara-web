import HeroSection from "@/sections/home/HeroSection";
import WhoWeAre from "@/sections/home/WhoWeAre";
import OurVision from "@/sections/home/OurVision";
import FeaturesSection from "@/sections/home/FeaturesSection";
import TechStackSection from "@/sections/home/TechStackSection";
import WhyChooseUs from "@/sections/home/WhyChooseUs";
import CygmaPreviewSection from "@/sections/home/CygmaPreviewSection";
import InnovationTimeline from "@/sections/home/InnovationTimeline";
import StatsSection from "@/sections/home/StatsSection";
import TestimonialsSection from "@/sections/home/TestimonialsSection";
import CTABanner from "@/sections/home/CTABanner";

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
