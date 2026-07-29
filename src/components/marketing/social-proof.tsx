/**
 * Componente SocialProof - Server Component.
 * Estadísticas clave que generan confianza.
 */

import { TEXTOS } from '@/lib/constants';
import { Reveal } from '@/components/motion/reveal';

/**
 * Sección de prueba social con estadísticas destacadas.
 */
export function SocialProof() {
  return (
    <section className="bg-white border-y border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl py-12 container-px md:py-16">
        <Reveal>
          <h2 className="text-center text-lg font-medium text-[var(--color-muted-foreground)] mb-8">
            {TEXTOS.socialProof.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {TEXTOS.socialProof.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center"
              >
                <dt className="text-3xl font-extrabold text-[var(--color-primary)] md:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm text-[var(--color-muted-foreground)] md:text-base">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}