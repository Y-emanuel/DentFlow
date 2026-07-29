/**
 * Componente Footer - Server Component.
 * Logo, tagline, links y CTA WhatsApp.
 */

import Link from 'next/link';
import { Smile } from 'lucide-react';
import { TEXTOS } from '@/lib/constants';
import { HeroCtaWhatsapp } from './hero-cta-whatsapp';

/**
 * Footer con logo, tagline, links de navegación y CTA de WhatsApp.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto max-w-7xl container-px py-12 md:py-16">
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          {/* Logo y tagline */}
          <div className="flex flex-col items-center gap-3 lg:items-start">
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
            <p className="text-sm text-[var(--color-muted-foreground)] max-w-xs">
              {TEXTOS.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Navegación del footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {TEXTOS.nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
                    aria-current="page"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA WhatsApp */}
          <HeroCtaWhatsapp
            origen="footer"
            label={TEXTOS.footer.cta}
            size="sm"
          />
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-[var(--color-border)] pt-6 text-center">
          <p className="text-sm text-[var(--color-muted-foreground)]">
            &copy; {currentYear} {TEXTOS.nav.logo}. {TEXTOS.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}