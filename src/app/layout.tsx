import type { Metadata } from 'next';
import './globals.css';
import MainLayout from '@/components/MainLayout';
import ClientLogger from '@/components/ClientLogger';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: {
    default: 'Vanikara — Innovative Technology Solutions',
    template: '%s | Vanikara',
  },
  description:
    'Vanikara builds premium digital platforms — from student marketplaces to enterprise software. We craft technology that matters.',
  keywords: ['Vanikara', 'technology', 'software development', 'platform engineering', 'web apps'],
  openGraph: {
    title: 'Vanikara — Innovative Technology Solutions',
    description: 'We build technology that matters.',
    url: 'https://vanikara.com',
    siteName: 'Vanikara',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        <ClientLogger />
        <MainLayout>
          {children}
        </MainLayout>
        <WhatsAppButton variant="floating" />
      </body>
    </html>
  );
}
