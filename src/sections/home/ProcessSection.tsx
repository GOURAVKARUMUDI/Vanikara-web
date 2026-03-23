import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Animate';
import SectionHeader from '@/components/ui/SectionHeader';

const STEPS = [
  { step: '01', title: 'Discover',  desc: 'We deep-dive into your goals, users, and constraints.' },
  { step: '02', title: 'Design',    desc: 'We prototype and iterate until the solution is perfect.' },
  { step: '03', title: 'Build',     desc: 'Our engineers craft clean, maintainable, tested code.' },
  { step: '04', title: 'Launch',    desc: 'We deploy, monitor, and support your product post-launch.' },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-24" style={{ background: '#f8fafc' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <SectionHeader tag="Our Process" title="How We Work" />
        </FadeUp>
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map(({ step, title, desc }) => (
            <StaggerItem key={step}>
              <div
                className="p-6 rounded-2xl bg-white border border-slate-100 h-full relative"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}
              >
                <span className="absolute top-5 right-5 text-3xl font-black text-slate-100 leading-none select-none">
                  {step}
                </span>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
