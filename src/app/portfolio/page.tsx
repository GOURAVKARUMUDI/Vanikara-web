import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import ProjectsGrid from '@/sections/portfolio/ProjectsGrid';
import CTABanner from '@/sections/home/CTABanner';

export const metadata: Metadata = { 
  title: 'Portfolio',
  description: 'Browse the portfolio of digital products and engineering projects delivered by the VANIKARA INTELLIGENCE PRIVATE LIMITED team.'
};

/**
 * PortfolioPage: Showcases clinical and commercial projects built with passion.
 */
export default function PortfolioPage() {
  return (
    <>
      <PageHero
        tag="Our Work"
        title={<>Products We're <span className="gradient-text">Proud Of</span></>}
        subtitle="From campuses to corporates — digital products built with passion, precision, and purpose."
      />
      <ProjectsGrid />
      <CTABanner
        title="Your Product Could Be Next"
        subtitle="Let's build something remarkable together."
        primaryLabel="Start Your Project"
        primaryHref="/contact"
      />
    </>
  );
}
