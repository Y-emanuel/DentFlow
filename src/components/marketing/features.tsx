/**
 * Componente Features - Server Component.
 * 6 features enfocadas en el paciente con animación stagger.
 */

import {
  Clock,
  Bell,
  CheckCircle2,
  Stethoscope,
  Timer,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { TEXTOS } from '@/lib/constants';
import { Reveal } from '@/components/motion/reveal';
import { Stagger, StaggerItem } from '@/components/motion/stagger';

/** Mapa de iconos por índice de feature. */
const ICONS: readonly LucideIcon[] = [
  Clock,
  Bell,
  CheckCircle2,
  Stethoscope,
  Timer,
  Wallet,
];

/**
 * Sección de features con 6 ventajas para el paciente.
 * Usa Stagger para animación escalonada al entrar en viewport.
 */
export function Features() {
  return (
    <section
      id="especialidades"
      className="bg-[var(--color-muted)] section-py"
    >
      <div className="mx-auto max-w-7xl container-px">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 md:mb-16">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-[var(--color-foreground)] sm:text-4xl text-balance">
              {TEXTOS.features.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-[var(--color-muted-foreground)] text-balance">
              {TEXTOS.features.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Grid de features */}
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TEXTOS.features.items.map((item, index) => {
            const Icon = ICONS[index] ?? Clock;
            return (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-soft transition-shadow hover:shadow-soft-lg">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)]/10">
                    <Icon
                      className="h-6 w-6 text-[var(--color-primary)]"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base text-[var(--color-muted-foreground)]">
                    {item.description}
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