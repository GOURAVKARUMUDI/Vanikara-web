import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import MissionSection from '@/sections/about/MissionSection';
import TimelineSection from '@/sections/about/TimelineSection';
import TechStackSection from '@/sections/about/TechStackSection';
import TeamSection from '@/sections/about/TeamSection';
import CTABanner from '@/sections/home/CTABanner';

export const metadata: Metadata = { 
  title: 'About',
  description: 'Our mission is to build technology that simplifies and empowers life for students and businesses alike.'
};

/**
 * AboutPage: Tells the story of Vanikara.
 * Includes Mission, Timeline, Tech Stack, and Team sections.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        tag="Our Story"
        title={<>About <span className="gradient-text">Vanikara</span></>}
        subtitle="We are a technology company driven by the belief that great software changes lives. From campuses to corporations, we build platforms people love to use."
      />
      <MissionSection />
      <TimelineSection />
      <TechStackSection />
      <TeamSection />
      <CTABanner
        title="Want to Work With Us?"
        primaryLabel="Get in Touch"
        primaryHref="/contact"
      />
    </>
  );
}
