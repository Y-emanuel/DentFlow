/**
 * Componente Input - Server Component.
 * Input nativo estilizado con Tailwind, 48px altura, 16px font.
 */

import { cn } from '@/lib/utils';
import type { InputHTMLAttributes } from 'react';

/** Props del componente Input, extendiendo atributos nativos. */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

/**
 * Input estilizado para formularios.
 * Incluye label, mensaje de error y hint opcional.
 */
export function Input({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--color-foreground)]"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'h-12 w-full rounded-[var(--radius-md)] border bg-white px-4 text-base text-[var(--color-foreground)] transition-colors',
          'placeholder:text-[var(--color-muted-foreground)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:border-[var(--color-primary)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-red-400 focus-visible:ring-red-400'
            : 'border-[var(--color-border)]',
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="text-sm text-red-500"
          role="alert"
        >
          {error}
        </p>
      )}
      {hint && !error && (
        <p
          id={`${inputId}-hint`}
          className="text-sm text-[var(--color-muted-foreground)]"
        >
          {hint}
        </p>
      )}
    </div>
  );
}