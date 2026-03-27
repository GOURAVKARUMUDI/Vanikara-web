import { FadeUp } from '@/components/Animate';
import SectionHeader from '@/components/ui/SectionHeader';

const TIMELINE = [
  { year: '2026', event: 'March 2026 — VANIKARA INTELLIGENCE PRIVATE LIMITED founded' },
  { year: '2026', event: 'Initial product ideas and validation phase' },
  { year: '2026', event: 'Development started for Vanik marketplace' },
  { year: '2026', event: 'Development started for FriskFree platform' },
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-24" style={{ background: '#f8fafc' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <SectionHeader tag="Journey" title="Our Milestones" />
        </FadeUp>
        <div className="max-w-2xl mx-auto">
          {TIMELINE.map(({ year, event }, i) => (
            <FadeUp key={`${year}-${i}`} delay={i * 0.1}>
              <div className="flex gap-5 mb-8">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {year.slice(2)}
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="w-0.5 flex-1 bg-slate-200 mt-2" />
                  )}
                </div>
                <div className="pt-1.5 pb-8">
                  <div className="font-bold text-blue-600 text-sm mb-0.5">{year}</div>
                  <p className="text-slate-600 text-sm leading-relaxed">{event}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
