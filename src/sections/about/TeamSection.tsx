import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Animate';
import Card, { CardBody } from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';

const TEAM = [
  { name: 'Arun Kumar',   role: 'CEO & Co-Founder',  emoji: '👨‍💼' },
  { name: 'Priya Nair',   role: 'CTO & Co-Founder',  emoji: '👩‍💻' },
  { name: 'Rahul Sharma', role: 'Lead Engineer',      emoji: '👨‍💻' },
  { name: 'Divya Reddy',  role: 'Head of Design',     emoji: '👩‍🎨' },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-24" style={{ background: '#f8fafc' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <SectionHeader tag="People" title="Meet the Team" />
        </FadeUp>
        <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map(({ name, role, emoji }) => (
            <StaggerItem key={name}>
              <Card className="text-center">
                <CardBody className="p-6">
                  <div
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-4"
                    style={{ background: '#e8f0fe' }}
                  >
                    {emoji}
                  </div>
                  <h3 className="font-bold text-slate-900 text-[0.9375rem]">{name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{role}</p>
                </CardBody>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
