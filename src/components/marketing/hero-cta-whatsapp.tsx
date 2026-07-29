'use client';

/**
 * Isla cliente hero-cta-whatsapp - Botón que abre WhatsApp directo.
 * Construye mensaje genérico y abre wa.me en nueva pestaña.
 */

import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buildGenericWhatsappUrl } from '@/lib/whatsapp';

/** Props del componente HeroCtaWhatsapp. */
interface HeroCtaWhatsappProps {
  origen: string;
  label: string;
  variant?: 'whatsapp' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/** Clases base del botón. */
const baseClasses =
  'inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius-md)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 whitespace-nowrap';

/** Mapa de variantes. */
const variantClasses = {
  whatsapp:
    'bg-[var(--color-whatsapp)] text-white hover:bg-[var(--color-whatsapp-hover)] shadow-sm hover:shadow-md',
  outline:
    'border border-[var(--color-border)] bg-white text-[var(--color-foreground)] hover:bg-[var(--color-muted)]',
} as const;

/** Mapa de tamaños. */
const sizeClasses = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-12 px-6 text-base',
} as const;

/**
 * Botón CTA que abre WhatsApp con mensaje genérico en nueva pestaña.
 */
export function HeroCtaWhatsapp({
  origen,
  label,
  variant = 'whatsapp',
  size = 'md',
  className,
}: HeroCtaWhatsappProps) {
  const handleClick = () => {
    const url = buildGenericWhatsappUrl(origen);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      {label}
    </button>
  );
}