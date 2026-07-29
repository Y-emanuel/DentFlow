'use client';

/**
 * Componente Error - Boundary de error global.
 * Captura errores de runtime y muestra un mensaje amigable.
 */

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

/** Props del componente Error. */
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Boundary de error que captura errores no manejados.
 * Permite al usuario reintentar la carga.
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error capturado:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <AlertCircle className="h-8 w-8 text-red-500" aria-hidden="true" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-foreground)]">
          Algo salió mal
        </h2>
        <p className="mt-2 text-base text-[var(--color-muted-foreground)]">
          Hubo un error al cargar la página. Probá de nuevo.
        </p>
      </div>
      <button
        type="button"
        onClick={reset}
        className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] px-6 text-base font-medium text-white hover:bg-[var(--color-primary-hover)] transition-colors"
      >
        Reintentar
      </button>
    </div>
  );
}