/**
 * Componente Badge - Server Component.
 * Etiqueta pequeña para destacar información.
 */

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

/** Variantes del badge. */
type BadgeVariant = 'default' | 'primary' | 'success';

/** Props del componente Badge. */
interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

/** Mapa de variantes a clases. */
const variantClasses: Record<BadgeVariant, string> = {
  default:
    'bg-[var(--color-muted)] text-[var(--color-muted-foreground)] border-[var(--color-border)]',
  primary:
    'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20',
  success:
    'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20',
};

/**
 * Badge para destacar información breve.
 */
export function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}