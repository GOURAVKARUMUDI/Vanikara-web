import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Animate';
import SectionHeader from '@/components/ui/SectionHeader';

const UPCOMING = [
  { icon: '🏢', title: 'FinFlow Dashboard', desc: 'Financial analytics for SMEs with AI-powered insights.' },
  { icon: '📅', title: 'EventHub',           desc: 'Campus event management and ticketing with QR check-in.' },
  { icon: '🎓', title: 'GradeU',             desc: 'AI-powered academic performance tracker and study planner.' },
];

export default function ComingSoonSection() {
  return (
    <section id="coming-soon" className="py-24" style={{ background: '#f8fafc' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <SectionHeader tag="In the Pipeline" title="What's Next" />
        </FadeUp>
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {UPCOMING.map(({ icon, title, desc }) => (
            <StaggerItem key={title}>
              <div
                className="p-7 rounded-2xl bg-white border border-dashed border-slate-200 relative opacity-75"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}
              >
                <span
                  className="absolute top-4 right-4 text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full"
                  style={{ background: '#e8f0fe', color: '#1E6BD6' }}
                >
                  SOON
                </span>
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{desc}</p>
                <div className="pt-5 border-t border-slate-50">
                  <a href={`/contact?product=${encodeURIComponent(title)}`} 
                     className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                    Express Interest <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
