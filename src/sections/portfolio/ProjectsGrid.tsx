import { StaggerGrid, StaggerItem } from '@/components/Animate';

const PROJECTS = [
  { tag: 'SaaS Platform', title: 'Campus Connect', desc: 'Social learning platform for universities with study groups, resource sharing, and peer tutoring.', stack: ['Next.js', 'PostgreSQL', 'AWS', 'Stripe'], color: '#1E6BD6', bg: '#e8f0fe', emoji: '🎓', metrics: [['8K+', 'Users'], ['99.9%', 'Uptime'], ['4.8★', 'Rating']] },
  { tag: 'Dashboard',     title: 'FinFlow',        desc: 'Real-time financial analytics for SMEs with AI-powered insights and invoice management.', stack: ['React', 'Python', 'FastAPI', 'Chart.js'], color: '#7c3aed', bg: '#f3f0ff', emoji: '📊', metrics: [['500+', 'Businesses'], ['3.2B', 'Data Points'], ['40%', 'Time Saved']] },
  { tag: 'Mobile App',    title: 'DeliveryZone',   desc: 'Cross-campus delivery app with real-time tracking, partner earnings, and automated dispatch.', stack: ['React Native', 'Node.js', 'WebSocket', 'MongoDB'], color: '#FF7A00', bg: '#fff7ed', emoji: '🛵', metrics: [['12K+', 'Deliveries'], ['<30min', 'Avg Time'], ['95%', 'On-time']] },
  { tag: 'E-Commerce',    title: 'Student Marketplace', desc: 'Marketplace for buying/selling textbooks with escrow payments, chat, and smart pricing.', stack: ['Next.js', 'Supabase', 'Vercel', 'Razorpay'], color: '#059669', bg: '#ecfdf5', emoji: '📚', metrics: [['2.4K+', 'Listings'], ['₹12L+', 'Transacted'], ['98%', 'Satisfaction']] },
  { tag: 'Automation',    title: 'PrintOps',        desc: 'Cloud printing management system with queue management and seamless payment flow.', stack: ['Node.js', 'React', 'AWS Lambda', 'PostgreSQL'], color: '#0891b2', bg: '#ecfeff', emoji: '🖨️', metrics: [['15K+', 'Jobs'], ['<5min', 'Queue'], ['99%', 'Success']] },
  { tag: 'Analytics',     title: 'EventPulse',      desc: 'Event analytics and attendee management for campus orgs with QR check-in and live stats.', stack: ['Vue.js', 'Django', 'Redis', 'PostgreSQL'], color: '#db2777', bg: '#fdf2f8', emoji: '🎉', metrics: [['300+', 'Events'], ['50K+', 'Attendees'], ['4.9★', 'Rating']] },
];

export default function ProjectsGrid() {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map(({ tag, title, desc, stack, color, bg, emoji, metrics }) => (
            <StaggerItem key={title}>
              <article
                className="card-hover h-full rounded-2xl overflow-hidden border border-slate-100 bg-white"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}
              >
                {/* Card header strip */}
                <div className="p-6 flex items-start justify-between" style={{ background: bg }}>
                  <div>
                    <span
                      className="inline-block text-[0.7rem] font-bold px-2.5 py-0.5 rounded-full text-white mb-2"
                      style={{ background: color }}
                    >{tag}</span>
                    <h2 className="font-extrabold text-slate-900 text-xl">{title}</h2>
                  </div>
                  <span className="text-4xl shrink-0 ml-2">{emoji}</span>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{desc}</p>
                  <div className="flex gap-4 mb-5">
                    {metrics.map(([val, lbl]) => (
                      <div key={String(lbl)}>
                        <div className="font-extrabold text-base" style={{ color }}>{val}</div>
                        <div className="text-[0.7rem] text-slate-400 mt-0.5">{lbl}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.map(s => (
                      <span
                        key={s}
                        className="text-[0.7rem] font-semibold px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-600"
                      >{s}</span>
                    ))}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
