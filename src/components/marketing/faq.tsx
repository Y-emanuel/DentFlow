/**
 * Componente FAQ - Server Component wrapper.
 * Contiene el título y delega el acordeón a la isla cliente.
 */

import { TEXTOS, FAQS } from '@/lib/constants';
import { Reveal } from '@/components/motion/reveal';
import { FaqAccordion } from '@/components/marketing/faq-accordion';

/**
 * Sección de preguntas frecuentes con acordeón cliente.
 */
export function FAQ() {
  return (
    <section id="preguntas" className="bg-[var(--color-muted)] section-py">
      <div className="mx-auto max-w-3xl container-px">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-[var(--color-foreground)] sm:text-4xl text-balance">
              {TEXTOS.faq.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-[var(--color-muted-foreground)] text-balance">
              {TEXTOS.faq.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Acordeón */}
        <Reveal delay={0.2}>
          <FaqAccordion faqs={FAQS} />
        </Reveal>
      </div>
    </section>
  );
}