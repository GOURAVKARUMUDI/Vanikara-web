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
      logger.info('Logo pieces assembled');
      setAssembled(true);
    }, 300);
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
      {/* Logo pieces */}
      <div className="flex items-end gap-2 mb-8" style={{ perspective: 900 }}>
        <Piece
          color="#1E6BD6"
          w={28} h={80}
          initTransform="rotateY(-90deg) rotateX(30deg)"
          assembled={assembled}
          delay={0}
        />
        <Piece
          color="#FF7A00"
          w={28} h={104}
          initTransform="rotateX(90deg) rotateY(-30deg)"
          assembled={assembled}
          delay={150}
        />
        <Piece
          color="#FFC400"
          w={28} h={60}
          initTransform="rotateY(90deg) rotateX(-30deg)"
          assembled={assembled}
          delay={300}
        />
      </div>

      {/* Brand name */}
      <div className="overflow-hidden">
        <h1
          className="font-extrabold text-white tracking-[0.3em] uppercase transition-all duration-700"
          style={{
            fontSize: 'clamp(1.75rem,7vw,3rem)',
            transform: assembled ? 'translateY(0)' : 'translateY(64px)',
            opacity: assembled ? 1 : 0,
            transitionDelay: assembled ? '0.5s' : '0s',
          }}
        >
          VANIKARA
        </h1>
      </div>

      <p
        className="mt-3 text-slate-400 text-sm tracking-[0.2em] uppercase transition-all duration-500"
        style={{
          opacity: assembled ? 0.75 : 0,
          transitionDelay: assembled ? '0.9s' : '0s',
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

function Piece({ color, w, h, initTransform, assembled, delay }: {
  color: string; w: number; h: number;
  initTransform: string; assembled: boolean; delay: number;
}) {
  return (
    <div
      className="rounded-md transition-all"
      style={{
        width: w, height: h,
        background: color,
        opacity: assembled ? 1 : 0,
        transform: assembled ? 'none' : initTransform,
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
        transitionDelay: `${delay}ms`,
        boxShadow: assembled ? `0 8px 30px ${color}55` : 'none',
      }}
    />
  );
}
