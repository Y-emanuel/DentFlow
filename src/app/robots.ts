/**
 * Robots dinámico para SEO.
 * Genera /robots.txt permitiendo indexación completa.
 */

import type { MetadataRoute } from 'next';
import { APP_URL } from '@/lib/constants';

/**
 * Genera el robots.txt permitiendo todo y apuntando al sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}