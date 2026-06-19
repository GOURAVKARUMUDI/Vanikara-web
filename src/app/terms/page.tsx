"use client";

import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import { ShieldAlert, Mail, ArrowUpRight } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      id: 'section-1',
      title: '1. Acceptance of Terms',
      content: `By accessing and using VANIKARA Intelligence Private Limited's services, website, or applications, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.

These terms apply to all visitors, users, customers, and contributors who access our platform.`,
    },
    {
      id: 'section-2',
      title: '2. Use of Services',
      content: `You may use our services only for lawful purposes. You agree not to use our systems in any way that violates applicable local or national laws; to transmit unauthorized advertising; to impersonate any entity; or to interfere with server cluster performance.`,
    },
    {
      id: 'section-3',
      title: '3. Intellectual Property',
      content: `All content, features, and visual designs — including text, logos, icons, three.js coordinate algorithms, and codebases — are the exclusive property of VANIKARA Intelligence Private Limited and are protected by Indian and international copyright and trademark laws.

You may not modify, copy, distribute, or create derivative works without our express prior written approval.`,
    },
    {
      id: 'section-4',
      title: '4. User Accounts',
      content: `If you create an account, you are solely responsible for maintaining credentials confidentiality. You agree to accept liability for all activities logged under your account. Notify our support immediately upon noticing security breaches.`,
    },
    {
      id: 'section-5',
      title: '5. Payment & Subscriptions',
      content: `For any premium services (e.g. printing binding services, paid AI queries), you agree to clear all fees in accordance with parameters set at purchase. All transaction payments are routed securely through authorized gateways.`,
    },
    {
      id: 'section-6',
      title: '6. Limitation of Liability',
      content: `To the maximum extent permitted by law, VANIKARA Intelligence Private Limited shall not be liable for any indirect, incidental, or special damages, or any loss of profits, data, or goodwill arising out of your access to our services.`,
    },
    {
      id: 'section-7',
      title: '7. Disclaimer of Warranties',
      content: `Our platforms are provided "as is" and "as available" without warranties of any kind. We do not warrant that service nodes will run uninterrupted, error-free, or that any codebase bugs will be resolved instantly.`,
    },
    {
      id: 'section-8',
      title: '8. Governing Law',
      content: `These terms shall be governed by and construed in accordance with the laws of India, under the jurisdiction of the courts of Andhra Pradesh, India.`,
    },
    {
      id: 'section-9',
      title: '9. CYGMA AI Workspace Terms & Safeguards',
      content: `CYGMA AI is an advanced workspace wrapper utilizing third-party AI models connected through secure API nodes. We do not claim ownership of connected models (such as those provided by OpenAI).

By accessing the CYGMA AI Workspace, you agree not to submit prompts or request outputs that engage in illegal activities, malware scripting, spam generation, or privacy violations.

Rate limits and caps apply: Guest users are restricted to 50 requests per 24-hour cycle. Authenticated workspaces have customized query budgets. We reserve the right to suspend accounts attempting to scrape data, trigger prompt injection attacks, or compromise server security.`,
    },
    {
      id: 'section-10',
      title: '10. Changes to Terms',
      content: `We reserve the right to modify these terms at any time. We will post modified versions to this page. Continued usage of our services after updates represents acceptance of the updated terms.`,
    },
  ];

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100; // Offset for fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="pb-24 bg-transparent">
      <PageHero
        tag="Legal Controls"
        title={<>Terms & <span className="gradient-text">Conditions</span></>}
        subtitle="Last updated: April 17, 2026"
      />

      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Sticky Table of Contents */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 p-6 rounded-3xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-md shadow-sm space-y-4">
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-[var(--text-primary)] border-b border-[var(--glass-border)] pb-3 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[var(--accent-color)]" />
                Table of Contents
              </h3>
              <nav className="flex flex-col gap-2">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => handleScroll(sec.id)}
                    className="text-left text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors py-1 cursor-pointer block truncate"
                  >
                    {sec.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Column: Policy Content */}
          <div className="lg:col-span-8 space-y-12">
            <div className="p-6 rounded-2xl text-xs sm:text-sm bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--accent-color)] font-semibold backdrop-blur-md shadow-sm">
              ⚠️ Please read these terms carefully before accessing the services of VANIKARA Intelligence Private Limited.
            </div>

            <div className="space-y-10">
              {sections.map((sec) => (
                <div key={sec.id} id={sec.id} className="scroll-mt-28 space-y-3">
                  <h2 className="font-display font-black text-lg text-[var(--text-primary)] uppercase tracking-wide">
                    {sec.title}
                  </h2>
                  <div className="border-l-2 border-[var(--accent-color)] pl-6 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed space-y-4 font-medium">
                    {sec.content.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-[var(--glass-border)] flex flex-wrap gap-3">
              <Button href="/contact" variant="primary" className="gap-1">
                Contact Office <Mail className="w-4.5 h-4.5" />
              </Button>
              <Button href="/privacy" variant="ghost" className="gap-1">
                Privacy Policy <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
