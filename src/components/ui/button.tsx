/**
 * Componente Button - Server Component.
 * Variantes: primary, whatsapp, outline, ghost, link.
 */

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

/** Variantes visuales del botón. */
type ButtonVariant =
  | 'primary'
  | 'whatsapp'
  | 'outline'
  | 'ghost'
  | 'link';

/** Tamaños del botón. */
type ButtonSize = 'sm' | 'md' | 'lg';

/** Props del componente Button. */
interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
  onClick?: string;
}

/** Clases base compartidas por todas las variantes. */
const baseClasses =
  'inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius-md)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

/** Mapa de variantes a clases. */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-sm hover:shadow-md',
  whatsapp:
    'bg-[var(--color-whatsapp)] text-white hover:bg-[var(--color-whatsapp-hover)] shadow-sm hover:shadow-md',
  outline:
    'border border-[var(--color-border)] bg-white text-[var(--color-foreground)] hover:bg-[var(--color-muted)]',
  ghost:
    'text-[var(--color-foreground)] hover:bg-[var(--color-muted)]',
  link: 'text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] underline-offset-4 hover:underline',
};

/** Mapa de tamaños a clases. */
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-12 px-6 text-base',
};

/**
 * Componente Button polimórfico.
 * Si recibe `href`, renderiza un <a>. Si no, un <button>.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  target,
  rel,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}