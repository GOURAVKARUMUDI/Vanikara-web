import Link from 'next/link';
import { FadeUp } from '@/components/Animate';
import Badge from '@/components/ui/Badge';

const STATS = [
  ['📈', 'Active Listings', '2,400+'],
  ['👥', 'Campus Users',    '8,000+'],
  ['📦', 'Orders Served',   '12,000+'],
];

export default function FlagshipProduct() {
  return (
    <section id="flagship-product" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div
            className="rounded-3xl p-8 sm:p-12 text-white"
            style={{ background: 'linear-gradient(135deg,#1B2A4A,#1E3A6E)' }}
          >
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              {/* Copy */}
              <div className="flex-1 min-w-0">
                <Badge variant="orange" className="mb-5">🚀 Flagship Product</Badge>
                <h2
                  className="font-extrabold leading-tight mb-4"
                  style={{ fontSize: 'clamp(1.75rem,3vw,2.5rem)' }}
                >
                  Student Marketplace Platform
                </h2>
                <p className="text-white/75 text-lg leading-relaxed mb-7">
                  A comprehensive digital ecosystem for campus life — trade textbooks,
                  print documents, and get on-campus deliveries, all from one app.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="px-7 py-3 rounded-full font-semibold bg-white text-blue-600 hover:-translate-y-0.5 transition-all inline-flex items-center justify-center"
                  >
                    Request Demo
                  </Link>
                  <a
                    href="#product-features"
                    className="px-7 py-3 rounded-full font-semibold text-white border border-white/25 hover:bg-white/10 transition-all inline-flex items-center justify-center"
                  >
                    Learn More ↓
                  </a>
                </div>
              </div>

              {/* Stats widget */}
              <div
                className="w-full lg:w-72 shrink-0 rounded-2xl p-6 space-y-3"
                style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)' }}
              >
                {STATS.map(([icon, label, val]) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,.07)' }}
                  >
                    <span className="text-xl">{icon}</span>
                    <div className="min-w-0">
                      <div className="text-[0.7rem] text-white/60">{label}</div>
                      <div className="font-extrabold text-lg leading-tight">{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
