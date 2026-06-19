'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console diagnostic
    console.error('Captured runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-12 bg-transparent relative z-10">
      <div className="max-w-md w-full p-8 rounded-3xl border border-red-500/15 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl space-y-6">
        {/* Warning Icon */}
        <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-500 text-3xl">
          ⚠
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-display font-black text-[var(--text-primary)] uppercase tracking-wider">
            Something Went Wrong
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            An unexpected error occurred in the system. The incident has been logged.
          </p>
        </div>

        {error.message && (
          <div className="p-3.5 bg-red-500/5 rounded-xl border border-red-500/10 font-mono text-[10px] text-red-500 break-all select-all">
            {error.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full font-semibold text-xs tracking-wider bg-[var(--accent-color)] text-white hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer uppercase"
          >
            Try Again
          </button>
          <Button href="/" variant="secondary" size="md" className="w-full sm:w-auto">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
