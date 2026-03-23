import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientLogger from '@/components/ClientLogger';

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
    <html lang="en">
      <body>
        <ClientLogger />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
