import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * Footer: The application's universal footer.
 * Provides navigation links, social media connections, and legal information in a high-contrast dark theme.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-16 pb-8" style={{ background: '#0f172a', color: '#94a3b8' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/8">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 no-underline">
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-extrabold text-lg shrink-0"
                style={{ background: 'linear-gradient(135deg,#1E6BD6,#FF7A00)' }}>V
              </div>
              <span className="font-extrabold text-[1.15rem] text-white tracking-tight">VANIKARA</span>
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-[260px]">
              Building innovative technology solutions that empower businesses and students.
            </p>
            <div className="flex gap-2">
              {[
                { s: 'tw', h: 'https://twitter.com/vanikara' },
                { s: 'li', h: 'https://linkedin.com/company/vanikara' },
                { s: 'gh', h: 'https://github.com/vanikara' },
                { s: 'in', h: 'https://instagram.com/vanikara' }
              ].map(({ s, h }) => (
                <a key={s} href={h} target="_blank" rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 hover:bg-blue-600 hover:text-white"
                  style={{ background: 'rgba(255,255,255,0.07)', color: '#94a3b8' }}>
                  {s.toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <FooterLinks links={[
              { href: '/about',     label: 'About'     },
              { href: '/services',  label: 'Services'  },
              { href: '/portfolio', label: 'Portfolio' },
              { href: '/contact',   label: 'Contact'   },
            ]} />
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Products</h4>
            <FooterLinks links={[
              { href: '/products', label: 'Student Marketplace' },
              { href: '/products', label: 'Campus Connect'      },
              { href: '/products', label: 'Cloud Printing'      },
            ]} />
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
            <FooterLinks links={[
              { href: '/privacy', label: 'Privacy Policy' },
              { href: '/terms',   label: 'Terms of Service' },
            ]} />
            <div className="mt-5">
              <p className="text-xs mb-1 text-slate-500">Contact us</p>
              <a href="mailto:vanikara26@gmail.com"
                className="text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors no-underline">
                vanikara26@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-8 text-xs text-slate-500">
          <p>© {year} Vanikara Technologies. All rights reserved.</p>
          <p>Crafted with <span className="text-orange-400">♥</span> for innovation</p>
        </div>

      </div>
    </footer>
  );
}

interface FooterLinkItem {
  href: string;
  label: string;
}

/**
 * FooterLinks: Sub-component for rendering lists of footer navigation items.
 */
function FooterLinks({ links }: { links: FooterLinkItem[] }) {
  return (
    <ul className="space-y-2.5 list-none p-0">
      {links.map(({ href, label }) => (
        <li key={label}>
          <Link href={href}
            className="text-sm text-slate-400 hover:text-white transition-colors no-underline">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
