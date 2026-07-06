import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/constants/brand';

import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
  }));
}
