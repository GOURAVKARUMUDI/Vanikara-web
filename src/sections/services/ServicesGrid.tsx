import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Animate';
import Card, { CardBody } from '@/components/ui/Card';

const SERVICES = [
  { icon: '🏗️', title: 'Platform Engineering',  desc: 'Scalable cloud-native platforms using microservices, serverless, and modern infra.', features: ['Microservices', 'API Design', 'Event-Driven Systems', 'Auto-scaling'] },
  { icon: '📱', title: 'Mobile App Development', desc: 'Cross-platform apps users love on iOS and Android.', features: ['React Native', 'iOS & Android', 'Offline-first', 'Push Notifications'] },
  { icon: '🌐', title: 'Web Applications',        desc: 'Fast, accessible Next.js apps optimised for SEO and performance.', features: ['Next.js / SSR', 'PWA', 'TypeScript', 'SEO Optimised'] },
  { icon: '🛠️', title: 'Custom Software',         desc: 'Bespoke systems for complex workflows — ERP to analytics.', features: ['Process Automation', 'Legacy Migration', 'Data Pipelines', 'Integrations'] },
  { icon: '☁️', title: 'Cloud & DevOps',          desc: 'Bulletproof pipelines, Docker, and cloud infra that scales.', features: ['AWS / GCP / Azure', 'Docker & K8s', 'CI/CD', 'IaC'] },
  { icon: '🎨', title: 'UI/UX Design',            desc: 'Beautiful, intuitive interfaces backed by user research.', features: ['User Research', 'Figma Prototypes', 'Design Systems', 'Usability Testing'] },
];

export default function ServicesGrid() {
  return (
    <section id="services-grid" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ icon, title, desc, features }) => (
            <StaggerItem key={title}>
              <Card className="h-full">
                <CardBody>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                    style={{ background: '#e8f0fe' }}>{icon}</div>
                  <h2 className="font-bold text-slate-900 text-lg mb-2.5">{title}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{desc}</p>
                  <ul className="space-y-1.5 list-none p-0 flex-1">
                    {features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="text-blue-500 font-bold shrink-0">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-slate-50">
                    <a href={`/contact?service=${encodeURIComponent(title)}`} 
                       className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                      Get a Quote <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </a>
                  </div>
                </CardBody>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
