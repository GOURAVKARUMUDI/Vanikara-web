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
    <section id="pricing" className="py-24 bg-transparent">
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
                className={`h-full flex flex-col p-8 rounded-3xl relative backdrop-blur-md transition-all ${
                  highlight ? 'scale-[1.03] shadow-blue' : 'shadow-card'
                }`}
                style={{
                  background: highlight ? 'var(--accent-color)' : 'var(--glass-bg)',
                  border:    highlight ? 'none' : '1px solid var(--glass-border)',
                }}
              >
                {highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold text-white px-3 py-1 rounded-full whitespace-nowrap bg-brand-orange"
                  >
                    ⭐ Most Popular
                  </div>
                )}
                <h3 className={`font-display font-black text-lg mb-1 ${highlight ? 'text-white' : 'text-[var(--text-primary)]'}`}>{name}</h3>
                <p className={`text-sm mb-5 ${highlight ? 'text-white/70' : 'text-[var(--text-secondary)]'}`}>{desc}</p>
                <div className="mb-6">
                  <span className={`text-4xl font-extrabold ${highlight ? 'text-white' : 'text-[var(--text-primary)]'}`}>{price}</span>
                  {period && (
                    <span className={`text-sm ml-1 ${highlight ? 'text-white/60' : 'text-[var(--text-secondary)]/50'}`}>/ {period}</span>
                  )}
                </div>
                <ul className="space-y-2 list-none p-0 flex-1 mb-6">
                  {features.map(f => (
                    <li key={f} className={`flex gap-2 text-sm items-start ${highlight ? 'text-white/85' : 'text-[var(--text-secondary)]'}`}>
                      <span className={`font-bold shrink-0 ${highlight ? 'text-white' : 'text-[var(--accent-color)]'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block text-center py-3 rounded-full font-semibold text-sm transition-all"
                  style={{
                    background: highlight ? '#fff' : 'var(--accent-color)',
                    color:      highlight ? 'var(--accent-color)' : '#fff',
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
