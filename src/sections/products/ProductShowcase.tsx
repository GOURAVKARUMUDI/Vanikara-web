import { StaggerGrid, StaggerItem } from '@/components/Animate';
import Card, { CardBody } from '@/components/ui/Card';

const FEATURES = [
  { icon: '📚', title: 'Textbook Marketplace', desc: 'Buy/sell second-hand textbooks with verified listings, secure payments, and campus delivery.' },
  { icon: '🖨️', title: 'Cloud Printing',       desc: 'Upload from any device and print at campus kiosks — no USB drives needed.' },
  { icon: '🚚', title: 'Campus Delivery',       desc: 'Same-day delivery on campus, managed by student delivery partners.' },
  { icon: '🔐', title: 'Secure Payments',       desc: 'PCI-compliant escrow payments for buyer protection every transaction.' },
  { icon: '📊', title: 'Smart Dashboard',       desc: 'Real-time analytics for listings, earnings, and order history.' },
  { icon: '🤝', title: 'Peer Networking',        desc: 'Connect with classmates and collaborate on campus projects.' },
];

export default function ProductShowcase() {
  return (
    <section id="product-features" className="pb-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon, title, desc }) => (
            <StaggerItem key={title}>
              <Card className="h-full">
                <CardBody>
                  <div className="text-3xl mb-4">{icon}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </CardBody>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
