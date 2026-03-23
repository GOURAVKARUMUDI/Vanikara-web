import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = { 
  title: 'Privacy Policy',
  description: 'Learn how Vanikara protects and manages your personal data and privacy.'
};

/**
 * PrivacyPage: Legal documentation regarding data collection and usage.
 */
export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, fill out a form, contact us, or use our services. This may include your name, email address, company name, phone number, and any other information you choose to provide.

We also automatically collect certain information when you use our services, including log data (IP address, browser type, pages visited, time and date), device information, and cookies and similar tracking technologies.`,
    },
    {
      title: '2. How We Use Your Information',
      content: `We use the information we collect to provide, maintain, and improve our services; process transactions; send technical notices and support messages; respond to your comments and questions; and send you marketing communications (where permitted by law).

We may also use your information to monitor and analyse trends and usage, detect and prevent fraudulent transactions and other illegal activities, and comply with legal obligations.`,
    },
    {
      title: '3. Information Sharing',
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, as long as those parties agree to keep this information confidential.

We may also disclose your information when we believe disclosure is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.`,
    },
    {
      title: '4. Data Security',
      content: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
      title: '5. Cookies',
      content: `We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our service may not function properly.`,
    },
    {
      title: '6. Your Rights',
      content: `Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete the personal information we hold about you; the right to object to or restrict certain processing; and the right to data portability.

To exercise these rights, please contact us at vanikara26@gmail.com.`,
    },
    {
      title: '7. Changes to This Policy',
      content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.`,
    },
    {
      title: '8. Contact Us',
      content: `If you have any questions about this Privacy Policy, please contact us at vanikara26@gmail.com or through our Contact page.`,
    },
  ];

  return (
    <>
      <section className="py-24 text-center" style={{ background: 'linear-gradient(160deg, #f8fafc 0%, #e8f0fe 100%)' }}>
        <div className="max-w-xl mx-auto px-4">
          <span className="section-tag mb-4">Legal</span>
          <h1 className="heading-xl mb-6">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: March 2025</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="p-6 rounded-2xl mb-12 text-sm" style={{ background: '#e8f0fe', border: '1px solid rgba(30,107,214,0.15)', color: '#1E6BD6' }}>
            ℹ️ This policy explains how Vanikara collects, uses, and protects your personal information. By using our services, you agree to this policy.
          </div>

          <div className="space-y-12">
            {sections.map(({ title, content }) => (
              <div key={title}>
                <h2 className="font-bold text-lg text-slate-900 mb-3">{title}</h2>
                <div className="border-l-2 border-blue-600 pl-6">
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
            <Button href="/terms" variant="secondary">Terms of Service</Button>
          </div>
        </div>
      </section>
    </>
  );
}
