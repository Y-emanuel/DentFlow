/**
 * Sitemap dinámico para SEO.
 * Genera /sitemap.xml con la ruta principal del sitio.
 */

import type { MetadataRoute } from 'next';
import { APP_URL } from '@/lib/constants';

/**
 * Genera el sitemap.xml con la única ruta de la landing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: APP_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}