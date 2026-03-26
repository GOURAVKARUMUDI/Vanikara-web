'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import IntroAnimation from '@/components/IntroAnimation';

const STATS = [
  { value: '2',    label: 'Products Building' },
  { value: '0',    label: 'Happy Clients'      },
  { value: '2026', label: 'Founded Year'       },
  { value: '6+',   label: 'Team Members'        },
];

export default function HeroSection() {
  const [showIntro, setShowIntro] = useState(false);
  const [mounted, setMounted]     = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!sessionStorage.getItem('vanikara-intro')) setShowIntro(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {showIntro && (
        <IntroAnimation onComplete={() => {
          sessionStorage.setItem('vanikara-intro', '1');
          setShowIntro(false);
        }} />
      )}

      <section
        id="hero"
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#f8fafc 0%,#e8f0fe 55%,#fff7ed 100%)' }}
      >
        <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(30,107,214,.09),transparent 70%)' }} />
        <div className="absolute bottom-[-100px] left-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(255,122,0,.06),transparent 70%)' }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="text-center max-w-4xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Badge>Building real-world solutions for students and local communities</Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-extrabold leading-[1.07] tracking-tight mb-6 text-slate-900"
              style={{ fontSize: 'clamp(2.5rem,6vw,4.25rem)' }}
            >
              Building Real Solutions{' '}
              <span className="gradient-text">for Students</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              A team of 6+ building platforms to simplify student life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Button href="/portfolio" variant="primary" size="lg" id="hero-cta-contact">
                Explore Our Work
              </Button>
              <Button href="/contact" variant="secondary" size="lg" id="hero-cta-work">
                Get in Touch
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20 max-w-2xl mx-auto"
            >
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 leading-none">{value}</div>
                  <div className="text-xs sm:text-sm text-slate-500 mt-1.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
