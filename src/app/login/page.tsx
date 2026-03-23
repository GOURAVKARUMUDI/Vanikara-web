'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { logger } from '@/utils/logger';

/**
 * LoginPage: Secure access portal for Vanikara users.
 * Features a simulated email/password login flow with structured logging and feedback.
 */
export default function LoginPage() {
  const [email, setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]  = useState(false);
  const [status, setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    logger.lifecycle('LoginPage', 'mount');
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    logger.group('Login Attempt');
    logger.info('Submitting login form', { email });
    
    setStatus('loading');
    try {
      await new Promise(r => setTimeout(r, 1200));
      
      if (email && password.length >= 6) {
        logger.info('Login successful');
        setStatus('success');
        setTimeout(() => { 
          logger.info('Redirecting to dashboard...');
          logger.groupEnd();
          window.location.href = '/'; 
        }, 1200);
      } else {
        logger.warn('Login failed: invalid credentials or password too short');
        setStatus('error');
        logger.groupEnd();
      }
    } catch (err) {
      logger.error('Login system error', err);
      setStatus('error');
      logger.groupEnd();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(160deg,#f8fafc 0%,#e8f0fe 55%,#fff7ed 100%)' }}>

      <div className="w-full max-w-[420px]">
        {/* Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100"
          style={{ boxShadow: '0 20px 50px rgba(0,0,0,.1)' }}>

          {/* Logo & Title */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 no-underline">
              <div className="w-10 h-10 rounded-[11px] flex items-center justify-center font-extrabold text-xl text-white"
                style={{ background: 'linear-gradient(135deg,#1E6BD6,#FF7A00)' }}>V</div>
              <span className="font-extrabold text-[1.2rem] text-slate-900 tracking-tight">VANIKARA</span>
            </Link>
            <h1 className="font-bold text-2xl text-slate-900 mb-1">Welcome back</h1>
            <p className="text-slate-500 text-sm">Sign in to your Vanikara account</p>
          </div>

          {/* Google */}
          <button type="button"
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold text-sm mb-5 hover:border-blue-400 hover:shadow-md transition-all"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">or continue with email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Error / Success */}
          {status === 'error' && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-700 flex items-center gap-2"
              style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
              ⚠️ Invalid credentials. Please check and try again.
            </div>
          )}
          {status === 'success' && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm text-green-700 flex items-center gap-2"
              style={{ background: '#ecfdf5', border: '1px solid #6ee7b7' }}>
              ✅ Signed in! Redirecting…
            </div>
          )}

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input id="login-email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                type="email" required autoComplete="email" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <Link href="/contact" className="text-xs text-blue-600 hover:text-blue-800 transition-colors font-medium no-underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input id="login-password"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  type={showPw ? 'text' : 'password'} required autoComplete="current-password"
                  placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-base leading-none bg-none border-none p-0">
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <button type="submit" disabled={status === 'loading'}
              className="w-full py-3.5 rounded-full font-semibold text-white text-base transition-all hover:-translate-y-0.5 disabled:opacity-60 mt-2"
              style={{ background: 'linear-gradient(135deg,#1E6BD6,#1557c0)', boxShadow: '0 4px 14px rgba(30,107,214,.35)' }}>
              {status === 'loading' ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-slate-500">
            Don't have an account?{' '}
            <Link href="/contact" className="text-blue-600 font-semibold hover:text-blue-800 no-underline">
              Request Access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
