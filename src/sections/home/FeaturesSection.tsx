import { StaggerGrid, StaggerItem, FadeUp } from '@/components/Animate';
import Card, { CardBody } from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';

const FEATURES = [
  { icon: '⚡', title: 'Platform Engineering',  desc: 'Scalable cloud-native systems built for performance and reliability at any scale.' },
  { icon: '📱', title: 'Mobile Apps',            desc: 'Cross-platform mobile experiences users love on iOS and Android.' },
  { icon: '🌐', title: 'Web Applications',       desc: 'Fast, accessible, stunning web apps with cutting-edge tech.' },
  { icon: '🛠️', title: 'Custom Software',        desc: 'Bespoke solutions tailored precisely to your business workflows.' },
  { icon: '☁️', title: 'Cloud & DevOps',         desc: 'End-to-end cloud architecture, CI/CD pipelines, and automation.' },
  { icon: '🎨', title: 'UI/UX Design',           desc: 'Intuitive interfaces crafted with research, design systems, and pixel-perfect detail.' },
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
