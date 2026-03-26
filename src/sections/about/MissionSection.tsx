import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Animate';
import Card, { CardBody } from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';

const PILLARS = [
  { icon: '🎯', title: 'Our Mission', desc: 'To build practical and accessible digital solutions that simplify everyday challenges for students.' },
  { icon: '🔭', title: 'Our Vision',  desc: 'To grow into a trusted platform for student-focused innovation, connecting ideas, services, and communities.' },
  { icon: '💡', title: 'Our Values',  desc: 'Execution, continuous learning, collaboration, and solving real problems with meaningful impact.' },
];

export default function MissionSection() {
  return (
    <section id="mission" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map(({ icon, title, desc }) => (
            <StaggerItem key={title}>
              <Card className="h-full text-center">
                <CardBody>
                  <div className="text-4xl mb-5">{icon}</div>
                  <h2 className="font-bold text-slate-900 text-xl mb-3">{title}</h2>
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
