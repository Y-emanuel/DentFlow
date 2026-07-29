/**
 * Componente Navbar - Server Component.
 * Logo, links ancla y CTA WhatsApp directo.
 */

import Link from 'next/link';
import { Smile } from 'lucide-react';
import { TEXTOS } from '@/lib/constants';
import { NavbarMobile } from './navbar-mobile';
import { HeroCtaWhatsapp } from './hero-cta-whatsapp';

/**
 * Navbar superior con logo, links de navegación y CTA de WhatsApp.
 * En móvil usa el componente cliente NavbarMobile con drawer.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-white">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between container-px"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-[var(--color-foreground)]"
          aria-label="DentFlow - Inicio"
        >
          <Smile
            className="h-7 w-7 text-[var(--color-primary)]"
            aria-hidden="true"
          />
          <span className="font-display">{TEXTOS.nav.logo}</span>
        </Link>

        {/* Links desktop */}
        <ul className="hidden lg:flex items-center gap-8">
          {TEXTOS.nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA WhatsApp desktop */}
        <div className="hidden lg:block">
          <HeroCtaWhatsapp
            origen="navbar"
            label={TEXTOS.nav.cta}
            size="sm"
          />
        </div>

        {/* Navbar móvil */}
        <NavbarMobile />
      </nav>
    </header>
  );
}