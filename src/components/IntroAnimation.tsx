'use client';

import { useEffect, useState } from 'react';
import { logger } from '@/utils/logger';

interface Props { onComplete: () => void; }

export default function IntroAnimation({ onComplete }: Props) {
  const [assembled, setAssembled] = useState(false);
  const [fading, setFading]       = useState(false);

  useEffect(() => {
    logger.group('IntroAnimation Phases');
    logger.info('Animation started');
    
    const t1 = setTimeout(() => {
      logger.info('Logo revealed');
      setAssembled(true);
    }, 500);
    const t2 = setTimeout(() => {
      logger.info('Fade out started');
      setFading(true);
    }, 3000);
    const t3 = setTimeout(() => {
      logger.info('Animation complete');
      logger.groupEnd();
      onComplete();
    }, 3800);
    
    return () => { 
      clearTimeout(t1); 
      clearTimeout(t2); 
      clearTimeout(t3); 
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700 ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ background: '#0f172a' }}
    >
      {/* New Logo Image */}
      <div 
        className="mb-12 transition-all duration-1000 ease-out"
        style={{ 
          transform: assembled ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
          opacity: assembled ? 1 : 0
        }}
      >
        <img src="/logo.png" alt="Vanikara Logo" className="w-32 h-auto drop-shadow-[0_0_30px_rgba(30,107,214,0.3)]" />
      </div>

      {/* Brand name */}
      <div className="overflow-hidden">
        <h1
          className="font-extrabold text-white tracking-[0.3em] uppercase transition-all duration-700"
          style={{
            fontSize: 'clamp(1.75rem,7vw,3rem)',
            transform: assembled ? 'translateY(0)' : 'translateY(64px)',
            opacity: assembled ? 1 : 0,
            transitionDelay: '0.3s',
          }}
        >
          VANIKARA
        </h1>
      </div>

      <p
        className="mt-3 text-slate-400 text-sm tracking-[0.2em] uppercase transition-all duration-500"
        style={{
          opacity: assembled ? 0.75 : 0,
          transitionDelay: '0.6s',
        }}
      >
        Innovative Technology Solutions
      </p>

      {/* Progress bar */}
      <div className="mt-10 h-0.5 w-40 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full loader-bar"
          style={{ background: 'linear-gradient(90deg,#1E6BD6,#FF7A00,#FFC400)' }}
        />
      </div>
    </div>
  );
}
