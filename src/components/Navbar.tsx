'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import { logger } from '@/utils/logger';

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: '/',          label: 'Home'      },
  { href: '/about',     label: 'About'     },
  { href: '/services',  label: 'Services'  },
  { href: '/products',  label: 'Products'  },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact',   label: 'Contact'   },
];

/**
 * Navbar: Universal navigation header with scroll-aware styling and mobile responsiveness.
 */
export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname              = usePathname();

  useEffect(() => {
    logger.lifecycle('Navbar', 'mount');
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      logger.lifecycle('Navbar', 'unmount');
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Close menu on route change
  useEffect(() => { 
    logger.info(`Route changed to: ${pathname}`);
    setOpen(false); 
  }, [pathname]);

  return (
    <header className={[
      'sticky top-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm'
        : 'bg-white/80 backdrop-blur-sm border-b border-transparent',
    ].join(' ')}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-extrabold text-lg"
              style={{ background: 'linear-gradient(135deg,#1E6BD6,#FF7A00)' }}>
              V
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight uppercase">VANIKARA</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={[
                  'px-3.5 py-2 rounded-full text-sm font-medium transition-colors duration-200',
                  pathname === href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50',
                ].join(' ')}
              >
                {label}
              </Link>
            ))}
            <Button href="/login" variant="primary" size="sm" className="ml-2">
              Login
            </Button>
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <div className="w-5 flex flex-col gap-[5px]">
              <span className={`block h-0.5 w-full bg-current rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-0.5 w-full bg-current rounded transition-all duration-300 ${open ? 'opacity-0 -translate-x-2' : ''}`} />
              <span className={`block h-0.5 w-full bg-current rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="bg-white border-t border-slate-100 px-4 pb-5 pt-2">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={[
                  'px-4 py-3 rounded-xl text-base font-medium transition-colors',
                  pathname === href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50',
                ].join(' ')}
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 px-4">
              <Button href="/login" variant="primary" className="w-full">
                Login
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
