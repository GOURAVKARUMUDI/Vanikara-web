import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import ServicesGrid from '@/sections/services/ServicesGrid';
import PricingSection from '@/sections/services/PricingSection';
import CTABanner from '@/sections/home/CTABanner';

export const metadata: Metadata = { 
  title: 'What We Build',
  description: 'Explore the digital platforms, student solutions, and AI ecosystems engineered by VANIKARA.'
};

/**
 * ServicesPage: Detailed overview of what Vanikara builds.
 * Includes Services Grid, Pricing, and CTA Banner.
 */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        tag="What We Build"
        title={<>Platforms Built for <span className="gradient-text">Impact</span></>}
        subtitle="We build innovative digital solutions, from student marketplaces to evolving AI ecosystems."
      />
      <ServicesGrid />
      <PricingSection />
      <CTABanner
        title="Not Sure Which Service?"
        primaryLabel="Let's Talk →"
        primaryHref="/contact"
      />
    </>
  );
}
