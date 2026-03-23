import HeroSection from '@/sections/home/HeroSection';
import FeaturesSection from '@/sections/home/FeaturesSection';
import ProcessSection from '@/sections/home/ProcessSection';
import CTABanner from '@/sections/home/CTABanner';

/**
 * HomePage: The main entry point of the Vanikara website.
 * Assembles the Hero, Features, Process, and final CTA sections.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <CTABanner
        title="Ready to Build Something Amazing?"
        subtitle="Let's turn your idea into a world-class digital product."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="See Portfolio →"
        secondaryHref="/portfolio"
      />
    </>
  );
}
