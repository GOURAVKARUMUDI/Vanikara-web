import type { Metadata } from 'next';
import { FadeUp } from '@/components/Animate';
import PageHero from '@/components/ui/PageHero';
import ContactForm from '@/sections/contact/ContactForm';
import ContactInfo from '@/sections/contact/ContactInfo';

export const metadata: Metadata = { 
  title: 'Contact',
  description: 'Reach out to VANIKARA INTELLIGENCE PRIVATE LIMITED for inquiries, support, or partnership opportunities.'
};

/**
 * ContactPage: The main communication hub for Vanikara.
 * Features a lead-generation form and company contact details.
 */
export default function ContactPage() {
  return (
    <>
      <PageHero
        tag="Get in Touch"
        title={<>Let's <span className="gradient-text">Connect</span></>}
        subtitle="Have a project in mind? Want a demo? We'd love to hear from you."
      />
      <section id="contact-body" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
            <FadeUp>
              <ContactForm />
            </FadeUp>
            <FadeUp delay={0.15}>
              <ContactInfo />
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
