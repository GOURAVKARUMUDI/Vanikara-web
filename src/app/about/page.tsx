import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import MissionSection from '@/sections/about/MissionSection';
import TimelineSection from '@/sections/about/TimelineSection';
import TeamSection from '@/sections/about/TeamSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Animate';
import Card, { CardBody } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the Vanikara mission, our specialized team, and our commitment to architectural excellence.',
};

/**
 * AboutPage: Tells the story of Vanikara and the team behind it.
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        tag="Our Story"
        title={<>About <span className="gradient-text">Vanikara</span></>}
        subtitle="VANIKARA is an early-stage startup building practical digital solutions for students. What began as a shared vision between three friends is now growing into a focused effort to solve real-world problems through technology."
      />

      {/* Our Mission Statement */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <p className="text-xl sm:text-2xl leading-relaxed text-slate-600 font-medium italic">
              "Our mission is to simplify student life by building practical digital tools that solve everyday challenges — from accessing resources to finding the right place to stay."
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-24" style={{ background: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <SectionHeader tag="Our Journey" title="The Story of Vanikara" />
          </FadeUp>
          <div className="max-w-3xl mx-auto">
            <FadeUp delay={0.1}>
              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  VANIKARA was founded on a shared vision between three friends who set out to build something meaningful of their own.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  What began as a simple idea evolved into a journey shaped by challenges, continuous learning, and persistence. Today, a growing team of 6+ members is working together to build practical digital solutions for students, particularly in marketplaces and discovery platforms.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-6 font-semibold text-slate-900 border-l-4 border-blue-600 pl-6 my-10">
                  Each founder contributes a unique strength to the company — from vision and product thinking to development and growth — forming a balanced and execution-focused team.
                </p>

                <div className="mt-12 pt-10 border-t border-slate-200">
                  <h4 className="text-xl font-bold text-slate-900 mb-6 font-display">Our Current Projects</h4>
                  <div className="space-y-8">
                    <div>
                      <h5 className="font-bold text-blue-600 text-sm tracking-wider uppercase mb-2">Vanik</h5>
                      <p className="text-slate-600 leading-relaxed">A second-hand marketplace with integrated binding and printing services.</p>
                    </div>
                    <div>
                      <h5 className="font-bold text-blue-600 text-sm tracking-wider uppercase mb-2">FriskFree</h5>
                      <p className="text-slate-600 leading-relaxed">A platform that helps students find PGs and hostels based on their university and location.</p>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed mt-12 pt-10 border-t border-slate-200">
                  Together, they established VANIKARA with a clear mission to build practical, scalable solutions that address real-world challenges faced by students and local communities.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <MissionSection />

      {/* Founders Section */}
      <section id="founders" className="py-24" style={{ background: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <SectionHeader tag="Leadership" title="The Founders" />
          </FadeUp>
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <Card className="h-full border-t-4 border-t-blue-600">
                <CardBody className="p-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-xl mb-6 font-bold">MGC</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Giri Charan Miriyala </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">"Leads vision, ideation, and product direction"</p>
                </CardBody>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="h-full border-t-4 border-t-indigo-600">
                <CardBody className="p-8">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl mb-6 font-bold">GK</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Gourav Karumudi</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">"Handles development, system design, and technical execution"</p>
                </CardBody>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="h-full border-t-4 border-t-orange-600">
                <CardBody className="p-8">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 text-xl mb-6 font-bold">CHCR</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Hari Charan Reddy Chejarala </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">"Drives marketing, partnerships, and growth strategy"</p>
                </CardBody>
              </Card>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      <TimelineSection />

      {/* Collaborations Section */}
      <section id="collaborations" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <SectionHeader tag="Partnerships" title="Collaborations" />
          </FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <FadeUp delay={0.1}>
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                VANIKARA is collaborating with <strong>Barg Technologies</strong> to support upcoming projects and expand technical and operational capabilities.
              </p>
              <a
                href="https://bargtechnologies.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all duration-300 group"
              >
                Visit Barg Technologies
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </FadeUp>
          </div>
        </div>
      </section>

      <TeamSection />

      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <FadeUp>
          <p className="text-slate-400 italic text-sm tracking-wide">
            "We are currently in our early stage, building our first set of products while continuously learning and improving."
          </p>
        </FadeUp>
      </div>
    </div>
  );
}
