'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import { createClient } from '@/utils/supabase/client';
import { isAdmin } from '@/lib/isAdmin';
import { useAuthRedirect } from '@/lib/authRedirect';

const LNK = [
  { h: '/',          l: 'Home'      },
  { h: '/about',     l: 'About'     },
  { h: '/services',  l: 'Services'  },
  { h: '/products',  l: 'Products'  },
  { h: '/portfolio', l: 'Portfolio' },
  { h: '/ai',        l: 'AI Lab'    },
  { h: '/contact',   l: 'Contact'   },
];

export default function Navbar() {
  const [o, setO] = useState(false);
  const [s, setS] = useState(false);
  const [u, setU] = useState<any>(null);
  const p = usePathname();
  const sb = createClient();
  
  useAuthRedirect();

  useEffect(() => {
    if (!sb) return;
    const fn = () => setS(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    sb.auth.getUser().then(({ data: { user } }) => setU(user));
    const { data: { subscription: sub } } = sb.auth.onAuthStateChange((_, ses) => setU(ses?.user || null));
    return () => {
      window.removeEventListener('scroll', fn);
      if (sub) sub.unsubscribe();
    };
  }, [sb]);

  useEffect(() => { setO(false); }, [p]);

  const out = async () => {
    await sb.auth.signOut();
    window.location.href = '/';
  };

  const getTitle = () => {
    if (p === '/') return 'VANIKARA';
    const segment = p.split('/').filter(Boolean).pop() || '';
    return `VANIKARA - ${segment.toUpperCase()}`;
  };

  return (
    <header className={`sticky top-0 z-50 transition-all ${s ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-white/80'}`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Vanikara Logo" className="w-10 h-auto" />
          <span className="font-bold text-lg text-slate-900 tracking-tight">{getTitle()}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          {LNK.map(l => (
            <Link key={l.h} href={l.h} className={`text-sm ${p === l.h ? 'text-blue-600' : 'text-slate-600'}`}>{l.l}</Link>
          ))}
          {u && (
            <>
              <Link href="/dashboard" className={`text-sm ${p === '/dashboard' ? 'text-blue-600' : 'text-slate-600'}`}>Dashboard</Link>
              {isAdmin(u.email) && (
                <Link href="/admin" className={`text-sm ${p === '/admin' ? 'text-blue-600' : 'text-slate-600'}`}>Admin</Link>
              )}
            </>
          )}
          {u ? (
            <div className="flex items-center gap-3 ml-4">
              <span className="text-xs text-slate-500">{u.email}</span>
              <Button onClick={out} variant="secondary" size="sm">Logout</Button>
            </div>
          ) : (
            <Button href="/login" variant="primary" size="sm" className="ml-4">Login</Button>
          )}
        </nav>

        <button className="md:hidden" onClick={() => setO(!o)}>Menu</button>
      </div>
      
      {o && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-2">
          {LNK.map(l => <Link key={l.h} href={l.h} className="p-2 text-slate-600 hover:text-blue-600 transition-colors">{l.l}</Link>)}
          {u && (
            <>
              <Link href="/dashboard" className="p-2 text-slate-600 hover:text-blue-600 transition-colors border-t border-slate-100">Dashboard</Link>
              {isAdmin(u.email) && (
                <Link href="/admin" className="p-2 text-slate-600 hover:text-blue-600 transition-colors">Admin</Link>
              )}
            </>
          )}
          <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-3">
             {u && <span className="text-xs text-slate-400 px-2">{u.email}</span>}
             {u ? (
               <Button onClick={out} variant="secondary" size="sm" className="w-full">Logout</Button>
             ) : (
               <Button href="/login" variant="primary" size="sm" className="w-full">Login</Button>
             )}
          </div>
        </div>
      )}
    </header>
  );
}
