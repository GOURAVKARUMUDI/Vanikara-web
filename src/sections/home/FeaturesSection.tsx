import { StaggerGrid, StaggerItem, FadeUp } from '@/components/Animate';
import Card, { CardBody } from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';

const FEATURES = [
  { icon: '🌐', title: 'Web Development',       desc: 'High-performance, student-focused web experiences built for modern learning environments.' },
  { icon: '🛍️', title: 'Marketplace Platforms',  desc: 'Scalable multi-vendor platforms tailored for campus commerce and resource sharing.' },
  { icon: '🎨', title: 'UI/UX Design',           desc: 'Intuitive user interfaces crafted with a deep understanding of student behavior.' },
  { icon: '📍', title: 'Local Discovery',        desc: 'Solutions that connect students with local hostels, services, and opportunities.' },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <SectionHeader
            tag="What We Do"
            title="Full-Spectrum Technology Services"
            subtitle="From concept to production, we handle every layer of your product."
          />
        </FadeUp>
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon, title, desc }) => (
            <StaggerItem key={title}>
              <Card className="h-full">
                <CardBody>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                    style={{ background: '#e8f0fe' }}>
                    {icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2.5 text-[1.0375rem]">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </CardBody>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
