import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import ServicesGrid from '@/sections/services/ServicesGrid';
import PricingSection from '@/sections/services/PricingSection';
import CTABanner from '@/sections/home/CTABanner';

export const metadata: Metadata = { 
  title: 'Services',
  description: 'From software engineering to mobile app development, Vanikara offers full-cycle technology solutions.'
};

/**
 * ServicesPage: Detailed overview of what Vanikara offers.
 * Includes Services Grid, Pricing, and CTA Banner.
 */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        tag="What We Offer"
        title={<>Services Built for <span className="gradient-text">Scale</span></>}
        subtitle="Comprehensive technology services from design to deployment. We partner with you at every stage."
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
