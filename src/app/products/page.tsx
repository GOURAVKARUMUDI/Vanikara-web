import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import FlagshipProduct from '@/sections/products/FlagshipProduct';
import ProductShowcase from '@/sections/products/ProductShowcase';
import ComingSoonSection from '@/sections/products/ComingSoonSection';
import CTABanner from '@/sections/home/CTABanner';

export const metadata: Metadata = { 
  title: 'Products',
  description: 'Explore the digital platforms engineered by Vanikara, including our flagship Student Marketplace.'
};

/**
 * ProductsPage: Showcases internal and external products built by Vanikara.
 * Features a Flagship product reveal and a showcase of upcoming platforms.
 */
export default function ProductsPage() {
  return (
    <>
      <PageHero
        tag="Our Products"
        title={<>Products Designed for <span className="gradient-text">Real Impact</span></>}
        subtitle="Platforms that solve genuine problems for students, businesses, and communities."
      />
      <FlagshipProduct />
      <ProductShowcase />
      <ComingSoonSection />
      <CTABanner
        title="Interested in Our Products?"
        subtitle="Get a personalised demo of the Student Marketplace Platform."
        primaryLabel="Request a Demo"
        primaryHref="/contact"
      />
    </>
  );
}
