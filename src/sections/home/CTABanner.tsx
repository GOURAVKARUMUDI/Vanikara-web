import { FadeUp } from '@/components/Animate';
import Button from '@/components/ui/Button';

interface CTABannerProps {
  title: string;
  subtitle?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  dark?: boolean;
}

export default function CTABanner({
  title, subtitle,
  primaryLabel, primaryHref,
  secondaryLabel, secondaryHref,
  dark = true,
}: CTABannerProps) {
  const bg = dark
    ? 'linear-gradient(135deg,#1B2A4A,#1E6BD6)'
    : 'linear-gradient(135deg,#1E6BD6,#0891b2)';

  return (
    <FadeUp>
      <section
        id="cta-banner"
        className="py-24 text-center"
        style={{ background: bg }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <h2
            className="font-extrabold text-white mb-4"
            style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)' }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/70 text-lg mb-9">{subtitle}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={primaryHref} variant="white" size="lg" id="cta-primary">
              {primaryLabel}
            </Button>
            {secondaryLabel && secondaryHref && (
              <Button href={secondaryHref} variant="ghost" size="lg" id="cta-secondary">
                {secondaryLabel}
              </Button>
            )}
          </div>
        </div>
      </section>
    </FadeUp>
  );
}
