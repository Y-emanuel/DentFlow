'use client';

/**
 * Isla cliente faq-accordion - Acordeón de preguntas frecuentes.
 * Solo una pregunta abierta a la vez, con animación suave.
 */

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Tipo de dato de un FAQ. */
interface FaqItem {
  pregunta: string;
  respuesta: string;
}

/** Props del componente FaqAccordion. */
interface FaqAccordionProps {
  faqs: readonly FaqItem[];
}

/**
 * Acordeón de preguntas frecuentes.
 * Solo un item abierto a la vez. Accesible con aria-expanded y aria-controls.
 */
export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div
            key={faq.pregunta}
            className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white"
          >
            {/* Pregunta */}
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => toggleItem(index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-inset"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span>{faq.pregunta}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 flex-shrink-0 text-[var(--color-muted-foreground)] transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>

            {/* Respuesta */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                'grid transition-all duration-200 ease-out',
                isOpen
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-base text-[var(--color-muted-foreground)]">
                  {faq.respuesta}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}