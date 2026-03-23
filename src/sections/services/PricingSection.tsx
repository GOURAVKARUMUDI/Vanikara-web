import Link from 'next/link';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Animate';
import SectionHeader from '@/components/ui/SectionHeader';

const PACKAGES = [
  {
    name: 'Starter', price: '₹50K', period: 'project',
    desc: 'Perfect for MVPs.',
    features: ['1 Core Feature', 'Basic UI', 'Responsive Web App', '1 Month Support'],
    highlight: false,
  },
  {
    name: 'Growth', price: '₹1.5L', period: 'project',
    desc: 'Complete product build.',
    features: ['Full-stack App', 'Custom UI/UX', 'API Integration', 'Cloud Deploy', '3 Months Support'],
    highlight: true,
  },
  {
    name: 'Enterprise', price: 'Custom', period: '',
    desc: 'Large-scale solutions.',
    features: ['Unlimited Features', 'Dedicated Team', 'SLA Guarantees', 'On-site Consult', '12 Months Support'],
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24" style={{ background: '#f8fafc' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <SectionHeader
            tag="Pricing"
            title="Transparent Pricing"
            subtitle="No hidden costs. Every package includes code delivery and documentation."
          />
        </FadeUp>
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-[860px] mx-auto">
          {PACKAGES.map(({ name, price, period, desc, features, highlight }) => (
            <StaggerItem key={name}>
              <div
                className={`h-full flex flex-col p-8 rounded-3xl relative ${highlight ? 'scale-[1.03]' : ''}`}
                style={{
                  background: highlight ? '#1E6BD6' : '#fff',
                  border:    highlight ? 'none' : '1px solid #e2e8f0',
                  boxShadow: highlight ? '0 20px 40px rgba(30,107,214,.3)' : '0 1px 3px rgba(0,0,0,.06)',
                }}
              >
                {highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold text-white px-3 py-1 rounded-full whitespace-nowrap"
                    style={{ background: '#FF7A00' }}
                  >
                    ⭐ Most Popular
                  </div>
                )}
                <h3 className={`font-bold text-lg mb-1 ${highlight ? 'text-white' : 'text-slate-900'}`}>{name}</h3>
                <p className={`text-sm mb-5 ${highlight ? 'text-white/70' : 'text-slate-500'}`}>{desc}</p>
                <div className="mb-6">
                  <span className={`text-4xl font-extrabold ${highlight ? 'text-white' : 'text-slate-900'}`}>{price}</span>
                  {period && (
                    <span className={`text-sm ml-1 ${highlight ? 'text-white/60' : 'text-slate-400'}`}>/ {period}</span>
                  )}
                </div>
                <ul className="space-y-2 list-none p-0 flex-1 mb-6">
                  {features.map(f => (
                    <li key={f} className={`flex gap-2 text-sm items-start ${highlight ? 'text-white/85' : 'text-slate-500'}`}>
                      <span className={`font-bold shrink-0 ${highlight ? 'text-white' : 'text-blue-500'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block text-center py-3 rounded-full font-semibold text-sm transition-all"
                  style={{
                    background: highlight ? '#fff' : '#1E6BD6',
                    color:      highlight ? '#1E6BD6' : '#fff',
                  }}
                >
                  Get Started
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
