'use client';

/**
 * Isla cliente navbar-mobile - Drawer para navegación móvil.
 * Botón hamburguesa que abre un panel lateral con links y CTA WhatsApp.
 */

import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { TEXTOS } from '@/lib/constants';
import { buildGenericWhatsappUrl } from '@/lib/whatsapp';

/**
 * Navbar móvil con drawer lateral.
 * Maneja estado abierto/cerrado y bloquea scroll del body cuando está abierto.
 */
export function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);

  // Bloquear scroll del body cuando el drawer está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Cerrar drawer con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleWhatsAppClick = () => {
    const url = buildGenericWhatsappUrl('navbar-mobile');
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius-sm)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors"
        aria-label="Abrir menú"
        aria-expanded={isOpen}
        aria-controls="mobile-drawer"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        id="mobile-drawer"
        className={`lg:hidden fixed top-0 right-0 z-[70] h-full w-80 max-w-[85vw] shadow-soft-lg transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: '#ffffff',
          color: '#0f172a',
          isolation: 'isolate',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <div
          className="flex h-16 items-center justify-between border-b border-slate-200 px-4"
          style={{ backgroundColor: '#ffffff' }}
        >
          <span
            className="font-display font-bold text-lg"
            style={{ color: '#0f172a' }}
          >
            {TEXTOS.nav.logo}
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-slate-100 transition-colors"
            style={{ color: '#0f172a' }}
            aria-label="Cerrar menú"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav
          className="flex flex-col p-4"
          style={{ backgroundColor: '#ffffff' }}
          aria-label="Navegación móvil"
        >
          <ul className="flex flex-col gap-1">
            {TEXTOS.nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-slate-100 transition-colors"
                  style={{ color: '#0f172a' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-lg px-5 text-base font-medium text-white transition-colors shadow-sm"
            style={{ backgroundColor: '#25d366' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1da851')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#25d366')}
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {TEXTOS.nav.cta}
          </button>
        </nav>
      </div>
    </>
  );
}