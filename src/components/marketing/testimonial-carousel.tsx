'use client';

/**
 * Isla cliente testimonial-carousel - Carrusel de testimonios.
 * Navegación con botones anterior/siguiente y indicadores.
 */

import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Tipo de dato de un testimonio. */
interface Testimonio {
  nombre: string;
  texto: string;
  rating: number;
  tratamiento: string;
}

/** Props del componente TestimonialCarousel. */
interface TestimonialCarouselProps {
  testimonios: readonly Testimonio[];
}

/**
 * Carrusel de testimonios con navegación manual.
 * Muestra un testimonio a la vez con botones e indicadores.
 */
export function TestimonialCarousel({ testimonios }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonios.length - 1 : prev - 1,
    );
  }, [testimonios.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === testimonios.length - 1 ? 0 : prev + 1,
    );
  }, [testimonios.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (testimonios.length === 0) {
    return null;
  }

  const current = testimonios[currentIndex];
  if (!current) {
    return null;
  }

  return (
    <div className="relative mx-auto max-w-3xl">
      {/* Card del testimonio */}
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-8 shadow-soft md:p-10">
        <Quote
          className="absolute top-6 right-6 h-12 w-12 text-[var(--color-primary)]/10"
          aria-hidden="true"
        />

        {/* Estrellas */}
        <div className="flex gap-1 mb-4" aria-label={`${current.rating} de 5 estrellas`}>
          {Array.from({ length: current.rating }, (_, i) => (
            <Star
              key={i}
              className="h-5 w-5 fill-[var(--color-primary)] text-[var(--color-primary)]"
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Texto */}
        <blockquote className="text-lg text-[var(--color-foreground)] md:text-xl text-balance">
          &ldquo;{current.texto}&rdquo;
        </blockquote>

        {/* Autor */}
        <figcaption className="mt-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-base font-bold text-[var(--color-primary)]">
            {current.nombre.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-[var(--color-foreground)]">
              {current.nombre}
            </p>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              {current.tratamiento}
            </p>
          </div>
        </figcaption>
      </div>

      {/* Controles */}
      <div className="mt-6 flex items-center justify-center gap-4">
        {/* Botón anterior */}
        <button
          type="button"
          onClick={goToPrevious}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label="Testimonio anterior"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Indicadores */}
        <div className="flex gap-2" role="tablist" aria-label="Seleccionar testimonio">
          {testimonios.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={cn(
                'h-2 rounded-full transition-all',
                index === currentIndex
                  ? 'w-8 bg-[var(--color-primary)]'
                  : 'w-2 bg-[var(--color-border)] hover:bg-[var(--color-muted-foreground)]',
              )}
              aria-label={`Ir al testimonio ${index + 1}`}
              aria-selected={index === currentIndex}
              role="tab"
            />
          ))}
        </div>

        {/* Botón siguiente */}
        <button
          type="button"
          onClick={goToNext}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label="Testimonio siguiente"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}