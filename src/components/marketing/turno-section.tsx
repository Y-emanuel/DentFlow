/**
 * Componente TurnoSection - Server Component.
 * Sección con título, contexto y formulario de turno.
 * Contiene el id="turno" para ancla desde Hero y Navbar.
 */

import { TEXTOS } from '@/lib/constants';
import { Reveal } from '@/components/motion/reveal';
import { TurnoForm } from '@/components/ui/turno-form';

/**
 * Sección de turno con título, subtítulo y formulario.
 * Es el CORE del producto: el usuario completa y se abre WhatsApp.
 */
export function TurnoSection() {
  return (
    <section
      id="turno"
      className="bg-gradient-to-b from-white to-[var(--color-muted)] section-py scroll-mt-16"
    >
      <div className="mx-auto max-w-7xl container-px">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-10 md:mb-12">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-[var(--color-foreground)] sm:text-4xl text-balance">
              {TEXTOS.turno.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-[var(--color-muted-foreground)] text-balance">
              {TEXTOS.turno.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Formulario */}
        <Reveal delay={0.2}>
          <TurnoForm />
        </Reveal>
      </div>
    </section>
  );
}