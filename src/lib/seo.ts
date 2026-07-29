/**
 * Configuración SEO centralizada de DentFlow.
 * Metadata, OpenGraph, Twitter Cards y JSON-LD.
 */

import type { Metadata } from 'next';
import { APP_URL, WHATSAPP_NUMBER, FAQS } from './constants';

/** Título principal del sitio. */
const SITE_TITLE =
  'DentFlow - Turnos dentales por WhatsApp en 30 segundos';

/** Descripción meta (150 caracteres aprox). */
const SITE_DESCRIPTION =
  'Sacá tu turno dental en 30 segundos. Elegí especialidad, fecha y horario, y te llevamos directo a WhatsApp con todo listo para confirmar.';

/** Imagen OG por defecto. */
const OG_IMAGE = '/images/og-dentflow.png';

/**
 * Metadata principal del sitio para Next.js Metadata API.
 */
export const siteMetadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | DentFlow',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'dentista',
    'turnos dentales',
    'clínica dental',
    'odontología',
    'WhatsApp turnos',
    'ortodoncia',
    'implantes dentales',
    'urgencias dentales',
    'limpieza dental',
    'blanqueamiento',
  ],
  authors: [{ name: 'DentFlow' }],
  creator: 'DentFlow',
  publisher: 'DentFlow',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: APP_URL,
    siteName: 'DentFlow',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'DentFlow - Turnos dentales por WhatsApp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/og-dentflow.png',
  },
};

/**
 * JSON-LD LocalBusiness para rich snippets de Google.
 */
export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'DentFlow',
  description: SITE_DESCRIPTION,
  url: APP_URL,
  telephone: `+${WHATSAPP_NUMBER}`,
  image: `${APP_URL}${OG_IMAGE}`,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AR',
    addressRegion: 'Buenos Aires',
    addressLocality: 'Buenos Aires',
  },
  openingHours: [
    'Mo-Sa 09:00-13:00',
    'Mo-Sa 14:00-18:00',
  ],
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '120',
  },
} as const;

/**
 * JSON-LD FAQPage para rich snippets de preguntas frecuentes.
 */
export const faqPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.pregunta,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.respuesta,
    },
  })),
} as const;