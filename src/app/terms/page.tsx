import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = { 
  title: 'Terms of Service',
  description: 'The legal agreement governing your use of VANIKARA INTELLIGENCE PRIVATE LIMITED products and services.'
};

/**
 * TermsPage: Legal agreement and usage policies for Vanikara services.
 */
export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using VANIKARA INTELLIGENCE PRIVATE LIMITED's services, website, or products, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.

These terms apply to all users of our services, including without limitation users who are browsers, vendors, customers, merchants, and contributors of content.`,
    },
    {
      title: '2. Use of Services',
      content: `You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services in any way that violates any applicable law or regulation; to transmit any unsolicited or unauthorised advertising; to impersonate any person or entity; or to engage in any conduct that restricts or inhibits anyone's use of our services.`,
    },
    {
      title: '3. Intellectual Property',
      content: `All content, features, and functionality of VANIKARA INTELLIGENCE PRIVATE LIMITED's services — including but not limited to text, graphics, logos, icons, images, audio clips, and software — are the exclusive property of VANIKARA INTELLIGENCE PRIVATE LIMITED and are protected by copyright, trademark, and other intellectual property laws.

You may not reproduce, modify, distribute, or create derivative works without our express written consent.`,
    },
    {
      title: '4. User Accounts',
      content: `If you create an account with us, you are responsible for maintaining the security of your account and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately upon becoming aware of any breach of security or unauthorised use of your account.`,
    },
    {
      title: '5. Payment Terms',
      content: `For paid services, you agree to pay all fees in accordance with the pricing and payment terms presented to you at the time of purchase. All fees are exclusive of taxes unless stated otherwise. You are responsible for paying all applicable taxes.`,
    },
    {
      title: '6. Limitation of Liability',
      content: `To the maximum extent permitted by law, VANIKARA INTELLIGENCE PRIVATE LIMITED shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.`,
    },
    {
      title: '7. Disclaimer of Warranties',
      content: `Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, timely, secure, or error-free, or that any defects will be corrected.`,
    },
    {
      title: '8. Termination',
      content: `We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, third parties, or for any other reason.`,
    },
    {
      title: '9. Governing Law',
      content: `These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Andhra Pradesh, India.`,
    },
    {
      title: '10. Changes to Terms',
      content: `We reserve the right to modify these Terms at any time. We will provide notice of significant changes by updating the date at the top of this page. Your continued use of our services after such modifications constitutes your acceptance of the updated Terms.`,
    },
  ];

  return (
    <>
      <section className="py-24 text-center" style={{ background: 'linear-gradient(160deg, #f8fafc 0%, #e8f0fe 100%)' }}>
        <div className="max-w-xl mx-auto px-4">
          <span className="section-tag mb-4">Legal</span>
          <h1 className="heading-xl mb-6">Terms of Service</h1>
          <p className="text-slate-500 text-sm">Last updated: March 2025</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="p-6 rounded-2xl mb-12 text-sm" style={{ background: '#fff7ed', border: '1px solid rgba(255,122,0,0.15)', color: '#FF7A00' }}>
            ⚠️ Please read these Terms of Service carefully before using VANIKARA INTELLIGENCE PRIVATE LIMITED's products or services.
          </div>

          <div className="space-y-12">
            {sections.map(({ title, content }) => (
              <div key={title}>
                <h2 className="font-bold text-lg text-slate-900 mb-3">{title}</h2>
                <div className="border-l-2 border-orange-500 pl-6">
                  {content.split('\n\n').map((para, i) => (
                    <p key={i} className="text-slate-500 leading-relaxed text-[0.9375rem] mb-4 last:mb-0">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-3">
            <Button href="/contact" variant="primary">Contact Us</Button>
            <Button href="/privacy" variant="secondary">Privacy Policy</Button>
          </div>
        </div>
      </section>
    </>
  );
}
