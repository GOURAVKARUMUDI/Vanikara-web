import { FadeUp } from "@/components/Animate";
import Button from "@/components/ui/Button";
import { SectionContainer, ContentContainer } from "@/components/ui/Containers";
import { Phone, Mail, MessageCircle, FileText } from "lucide-react";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABanner({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTABannerProps) {
  return (
    <SectionContainer id="cta-banner">
      <ContentContainer className="max-w-4xl">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md p-6 sm:p-16 text-center shadow-xl shadow-black/5">
            {/* Inner background spotlight glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent-color)]/10 blur-[100px] rounded-full pointer-events-none -mr-40 -mt-40"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none -ml-40 -mb-40"></div>

            <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-6">
              <h2
                className="font-display font-black text-[var(--text-primary)] leading-tight"
                style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.75rem)" }}
              >
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-lg mx-auto">
                  {subtitle}
                </p>
              )}
              
              {/* Desktop CTAs */}
              <div className="hidden sm:flex flex-row gap-4 justify-center items-center pt-4">
                <Button href={primaryHref} variant="primary" size="lg" magnetic>
                  {primaryLabel}
                </Button>
                {secondaryLabel && secondaryHref && (
                  <Button href={secondaryHref} variant="ghost" size="lg" magnetic>
                    {secondaryLabel}
                  </Button>
                )}
              </div>

              {/* Mobile Contact Grid (60-30-10 compact panel) */}
              <div className="grid grid-cols-2 gap-3 sm:hidden pt-4">
                <a href={primaryHref} className="flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--accent-color)] text-white shadow-md active:scale-95 transition-transform">
                  <FileText className="w-5 h-5 mb-1.5" />
                  <span className="text-[10px] font-bold tracking-wide uppercase">Start</span>
                </a>
                <a href="tel:+1234567890" className="flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] active:bg-slate-500/10 active:scale-95 transition-all">
                  <Phone className="w-5 h-5 mb-1.5 text-blue-500" />
                  <span className="text-[10px] font-bold tracking-wide uppercase">Call</span>
                </a>
                <a href="mailto:contact@vanikara.com" className="flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] active:bg-slate-500/10 active:scale-95 transition-all">
                  <Mail className="w-5 h-5 mb-1.5 text-orange-500" />
                  <span className="text-[10px] font-bold tracking-wide uppercase">Email</span>
                </a>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] active:bg-slate-500/10 active:scale-95 transition-all">
                  <MessageCircle className="w-5 h-5 mb-1.5 text-emerald-500" />
                  <span className="text-[10px] font-bold tracking-wide uppercase">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </ContentContainer>
    </SectionContainer>
  );
}
