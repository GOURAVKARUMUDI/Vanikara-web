import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Animate';
import SectionHeader from '@/components/ui/SectionHeader';

const TECH = [
  { icon: '⚛️', name: 'React / Next.js' },
  { icon: '🐍', name: 'Python / FastAPI' },
  { icon: '☁️', name: 'AWS / Vercel'    },
  { icon: '🗄️', name: 'PostgreSQL'      },
  { icon: '🐳', name: 'Docker / K8s'    },
  { icon: '📦', name: 'TypeScript'      },
];

export default function TechStackSection() {
  return (
    <section id="tech-stack" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <SectionHeader tag="Technology" title="Our Tech Stack" />
        </FadeUp>
        <StaggerGrid className="flex flex-wrap justify-center gap-3">
          {TECH.map(({ icon, name }) => (
            <StaggerItem key={name}>
              <div
                className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white border border-slate-100 font-semibold text-slate-800 text-sm"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}
              >
                <span className="text-xl">{icon}</span> {name}
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
