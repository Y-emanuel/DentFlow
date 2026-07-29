/**
 * Componente HowItWorks - Server Component.
 * 3 pasos: elegir especialidad, elegir fecha/horario, confirmar por WhatsApp.
 */

import { ListChecks, CalendarClock, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { TEXTOS } from '@/lib/constants';
import { Reveal } from '@/components/motion/reveal';
import { Stagger, StaggerItem } from '@/components/motion/stagger';

/** Mapa de iconos por índice de paso. */
const STEP_ICONS: readonly LucideIcon[] = [
  ListChecks,
  CalendarClock,
  MessageCircle,
];

/**
 * Sección "Cómo funciona" con 3 pasos visuales.
 */
export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-white section-py">
      <div className="mx-auto max-w-7xl container-px">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 md:mb-16">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-[var(--color-foreground)] sm:text-4xl text-balance">
              {TEXTOS.howItWorks.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-[var(--color-muted-foreground)] text-balance">
              {TEXTOS.howItWorks.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Pasos */}
        <Stagger className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
          {TEXTOS.howItWorks.steps.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? ListChecks;
            return (
              <StaggerItem key={step.number} index={index}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Conector entre pasos (desktop) */}
                  {index < TEXTOS.howItWorks.steps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-12 left-[60%] w-full h-[2px] bg-gradient-to-r from-[var(--color-primary)]/30 to-transparent"
                      aria-hidden="true"
                    />
                  )}

                  {/* Número + icono */}
                  <div className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                    <Icon
                      className="h-10 w-10 text-[var(--color-primary)]"
                      aria-hidden="true"
                    />
                    <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white shadow-sm">
                      {step.number}
                    </span>
                  </div>

                  {/* Texto */}
                  <h3 className="text-xl font-bold text-[var(--color-foreground)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base text-[var(--color-muted-foreground)] max-w-xs">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}