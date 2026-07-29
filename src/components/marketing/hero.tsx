/**
 * Componente Hero - Server Component.
 * Badge, H1, subtítulo y 2 CTAs: scroll a #turno y WhatsApp directo.
 */

import { CalendarCheck, Sparkles } from 'lucide-react';
import { TEXTOS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/motion/reveal';
import { HeroCtaWhatsapp } from './hero-cta-whatsapp';

/**
 * Sección Hero con propuesta de valor y 2 CTAs.
 * CTA primario hace scroll suave a #turno, CTA secundario abre WhatsApp.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-muted)] to-white">
      {/* Decoración de fondo */}
      <div
        className="absolute inset-0 -z-10 opacity-50"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(14, 159, 216, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(37, 211, 102, 0.06) 0%, transparent 50%)',
        }}
      />

      <div className="mx-auto max-w-7xl section-py container-px">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <Reveal>
            <Badge variant="primary" className="mb-6">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {TEXTOS.hero.badge}
            </Badge>
          </Reveal>

          {/* H1 */}
          <Reveal delay={0.1}>
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--color-foreground)] sm:text-5xl md:text-6xl text-balance">
              {TEXTOS.hero.title}
            </h1>
          </Reveal>

          {/* Subtítulo */}
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-[var(--color-muted-foreground)] md:text-xl text-balance">
              {TEXTOS.hero.subtitle}
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {/* CTA primario: scroll a #turno */}
              <a
                href="#turno"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-6 text-base font-medium text-white hover:bg-[var(--color-primary-hover)] shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 sm:w-auto"
              >
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                {TEXTOS.hero.ctaPrimary}
              </a>

              {/* CTA secundario: WhatsApp directo */}
              <HeroCtaWhatsapp
                origen="hero"
                label={TEXTOS.hero.ctaSecondary}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}