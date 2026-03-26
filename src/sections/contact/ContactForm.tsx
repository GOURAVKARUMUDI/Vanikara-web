'use client';

import { useState, FormEvent, ReactNode } from 'react';
import Button from '@/components/ui/Button';
import WhatsAppButton from '@/components/WhatsAppButton';
import { logger } from '@/utils/logger';

/**
 * ContactForm: Lead-generation form for Vanikara.
 * Implements a simulated submission flow with structured logging and user feedback.
 */
export default function ContactForm() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '', bot: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.bot) return; // Silent reject for bots
    
    logger.form('Contact', 'submit', form);
    
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          bot: form.bot
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      logger.form('Contact', 'success');
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '', bot: '' });
    } catch (err: any) {
      logger.error('Failed to submit contact form', err);
      alert(err.message || 'Something went wrong. Please try again.');
      setStatus('idle');
    }
  }

  return (
    <div
      className="rounded-3xl border border-slate-100 p-8 sm:p-10 bg-white"
      style={{ boxShadow: '0 10px 30px rgba(0,0,0,.08)' }}
    >
      <h2 className="font-bold text-2xl text-slate-900 mb-1">Send a Message</h2>
      <p className="text-slate-500 mb-8 text-sm">We'll reply within 24 hours, Monday–Friday.</p>

      {status === 'success' ? (
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: '#ecfdf5', border: '1px solid #6ee7b7' }}
        >
          <div className="text-5xl mb-4">✅</div>
          <h3 className="font-bold text-green-800 text-xl mb-2">Message Sent!</h3>
          <p className="text-green-700 text-sm mb-6">Thanks — we'll be in touch shortly. For immediate assistance, chat with us on WhatsApp:</p>
          
          <div className="mb-6">
            <WhatsAppButton 
              name={form.name} 
              email={form.email} 
              message={form.message} 
              variant="inline" 
            />
          </div>

          <button
            onClick={() => setStatus('idle')}
            className="text-xs font-bold uppercase tracking-widest text-green-600 hover:text-green-800 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Full Name *">
              <input
                id="contact-name"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                type="text" required placeholder="Your name"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </FormField>
            <FormField label="Email *">
              <input
                id="contact-email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                type="email" required placeholder="you@example.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </FormField>
          </div>
          <FormField label="Subject">
            <input
              id="contact-subject"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              type="text" placeholder="What is this about?"
              value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
            />
          </FormField>
          <div className="hidden" aria-hidden="true">
            <input 
              type="text" 
              name="bot_field" 
              tabIndex={-1} 
              autoComplete="off" 
              value={form.bot} 
              onChange={e => setForm({ ...form, bot: e.target.value })} 
            />
          </div>
          <FormField label="Message *">
            <textarea
              id="contact-message"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-y min-h-[140px]"
              required placeholder="Tell us about your project…"
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
            />
          </FormField>
          <Button
            id="contact-submit"
            type="submit"
            disabled={status === 'sending'}
            className="w-full"
            size="lg"
          >
            {status === 'sending' ? 'Sending…' : 'Send Message →'}
          </Button>
        </form>
      )}
    </div>
  );
}

/**
 * FormField: Internal helper for rendering labeled input groups.
 */
function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
