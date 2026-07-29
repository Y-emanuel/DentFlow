/**
 * Componente Select - Server Component.
 * Select nativo estilizado con Tailwind.
 */

import { cn } from '@/lib/utils';
import type { SelectHTMLAttributes, ReactNode } from 'react';

/** Props del componente Select, extendiendo atributos nativos. */
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

/**
 * Select estilizado para formularios.
 * Incluye label, mensaje de error y hint opcional.
 */
export function Select({
  label,
  error,
  hint,
  className,
  id,
  children,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-[var(--color-foreground)]"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'h-12 w-full rounded-[var(--radius-md)] border bg-white px-4 text-base text-[var(--color-foreground)] transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:border-[var(--color-primary)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'appearance-none bg-no-repeat pr-10 select-arrow',
          error
            ? 'border-red-400 focus-visible:ring-red-400'
            : 'border-[var(--color-border)]',
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p
          id={`${selectId}-error`}
          className="text-sm text-red-500"
          role="alert"
        >
          {error}
        </p>
      )}
      {hint && !error && (
        <p
          id={`${selectId}-hint`}
          className="text-sm text-[var(--color-muted-foreground)]"
        >
          {hint}
        </p>
      )}
    </div>
  );
}