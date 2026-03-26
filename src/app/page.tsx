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
        title="Be One of Our First Users"
        subtitle="Join us early and be part of our journey"
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Explore Our Work →"
        secondaryHref="/portfolio"
      />
    </>
  );
}
