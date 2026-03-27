'use client';

import { useState } from 'react';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';

export default function AIPage() {
  const [p, setP] = useState('');
  const [r, setR] = useState('');
  const [l, setL] = useState(false);

  const ask = async () => {
    if (!p) return;
    setL(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: p }),
      });
      const d = await res.json();
      if (d.success) {
        setR(d.data.reply);
      } else {
        setR(d.error || 'Failed to generate response');
      }
    } catch (err) {
      setR('Connection error. Please try again.');
    } finally {
      setL(false);
    }
  };

  return (
    <>
      <PageHero
        tag="AI Assistant"
        title={<>Explore the <span className="gradient-text">VANIKARA INTELLIGENCE AI Lab</span></>}
        subtitle="Interact with our custom-trained models to solve problems or generate insights."
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-8 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Your Prompt</label>
                <textarea
                  value={p}
                  onChange={(e) => setP(e.target.value)}
                  placeholder="Ask me anything about technology, students, or VANIKARA INTELLIGENCE..."
                  className="w-full h-40 p-5 bg-white border border-slate-200 rounded-2xl text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <Button 
                onClick={ask} 
                disabled={l || !p} 
                className="w-full py-4 text-base shadow-lg shadow-blue-600/20"
              >
                {l ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing Prompt...
                  </span>
                ) : 'Generate AI Response →'}
              </Button>

              {r && (
                <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="p-8 bg-white border border-blue-100 rounded-[28px] shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-all duration-700"></div>
                    <h3 className="text-xs font-black text-blue-600 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                      AI Insight
                    </h3>
                    <p className="whitespace-pre-wrap text-slate-700 leading-relaxed font-medium">
                      {r}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { t: 'Security First', d: 'All prompts are sanitized and logs are encrypted for your privacy.' },
               { t: 'GPT Powered', d: 'Leveraging state-of-the-art models fine-tuned for building startups.' },
               { t: 'Always Learning', d: 'Our AI Lab is constantly updated with new datasets and capabilities.' }
             ].map((f, i) => (
               <div key={i} className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                 <h4 className="font-bold text-slate-900 mb-2">{f.t}</h4>
                 <p className="text-xs text-slate-500 leading-relaxed">{f.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>
    </>
  );
}
