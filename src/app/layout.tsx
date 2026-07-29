/**
 * Layout raíz de DentFlow.
 * Configura html lang es-AR, fonts Inter y Plus Jakarta Sans, metadata global.
 */

import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { siteMetadata, localBusinessJsonLd, faqPageJsonLd } from '@/lib/seo';
import './globals.css';

/** Fuente Inter para cuerpo y formulario. */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/** Fuente Plus Jakarta Sans para títulos. */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['700', '800'],
  variable: '--font-plus-jakarta',
});

/** Viewport para responsive y evitar zoom en inputs iOS. */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0E9FD8',
};

/** Metadata exportada para Next.js Metadata API. */
export const metadata: Metadata = siteMetadata;

/**
 * Layout raíz que envuelve toda la aplicación.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${inter.variable} ${plusJakarta.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {children}
        {/* JSON-LD para rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageJsonLd),
          }}
        />
      </body>
    </html>
  );
}