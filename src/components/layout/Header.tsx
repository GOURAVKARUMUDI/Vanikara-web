'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { GoogleLogin } from '../auth/GoogleLogin';
import { Logout } from '../auth/Logout';
import Link from 'next/link';

export function Header() {
  const [u, setU] = useState<any>(null);
  const sb = createClient();

  useEffect(() => {
    const { data: { subscription } } = sb.auth.onAuthStateChange((_, s) => {
      setU(s?.user || null);
    });
    return () => subscription.unsubscribe();
  }, [sb]);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-transparent border-b border-white/10">
      <Link href="/" className="text-2xl font-bold text-white">VANIKARA INTELLIGENCE</Link>
      <div className="flex items-center gap-4">
        {u ? (
          <>
            <span className="text-white/70 text-sm hidden md:inline">{u.email}</span>
            <Link href="/dashboard" className="text-white text-sm hover:underline">Dashboard</Link>
            <Logout />
          </>
        ) : (
          <GoogleLogin />
        )}
      </div>
    </nav>
  );
}
