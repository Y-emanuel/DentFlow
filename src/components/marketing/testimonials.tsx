/**
 * Componente Testimonials - Server Component wrapper.
 * Contiene el título y delega el carrusel a la isla cliente.
 */

import { TEXTOS, TESTIMONIOS } from '@/lib/constants';
import { Reveal } from '@/components/motion/reveal';
import { TestimonialCarousel } from '@/components/marketing/testimonial-carousel';

/**
 * Sección de testimonios con carrusel cliente.
 */
export function Testimonials() {
  return (
    <section id="opiniones" className="bg-white section-py">
      <div className="mx-auto max-w-7xl container-px">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 md:mb-16">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-[var(--color-foreground)] sm:text-4xl text-balance">
              {TEXTOS.testimonials.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-[var(--color-muted-foreground)] text-balance">
              {TEXTOS.testimonials.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Carrusel */}
        <Reveal delay={0.2}>
          <TestimonialCarousel testimonios={TESTIMONIOS} />
        </Reveal>
      </div>
    </section>
  );
}