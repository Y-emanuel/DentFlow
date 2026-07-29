/**
 * Componente TurnoFormSuccess - Server Component.
 * Estado de éxito post-redirect a WhatsApp.
 */

import { CheckCircle2, MessageCircle } from 'lucide-react';

/** Props del componente TurnoFormSuccess. */
interface TurnoFormSuccessProps {
  url: string;
  onReset: () => void;
}

/**
 * Muestra el estado de éxito después de abrir WhatsApp.
 * Incluye botón secundario por si el popup fue bloqueado.
 */
export function TurnoFormSuccess({ url, onReset }: TurnoFormSuccessProps) {
  return (
    <div
      className="flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--color-success)]/20 bg-[var(--color-success)]/5 p-6 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-success)]/10">
        <CheckCircle2
          className="h-8 w-8 text-[var(--color-success)]"
          aria-hidden="true"
        />
      </div>

      <div>
        <h3 className="text-lg font-bold text-[var(--color-foreground)]">
          ¡Ya armamos tu mensaje!
        </h3>
        <p className="mt-1 text-base text-[var(--color-muted-foreground)]">
          Se abrió WhatsApp con todos tus datos. Si no se abrió, tocá acá:
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-whatsapp)] px-6 text-base font-medium text-white hover:bg-[var(--color-whatsapp-hover)] transition-colors shadow-sm"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Abrir WhatsApp
        </a>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-6 text-base font-medium text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors"
        >
          Pedir otro turno
        </button>
      </div>
    </div>
  );
}