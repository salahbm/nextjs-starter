import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Validate that the incoming `locale` parameter is valid
  let locale = await requestLocale;

  // Ensure that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale as 'en' | 'kr')) {
    locale = routing.defaultLocale;
  }

  // If locale is still invalid, trigger a 404
  if (!routing.locales.includes(locale as 'en' | 'kr') || !locale) notFound();

  return {
    locale, // Ensure the locale is returned
    messages: (await import(`../../locales/${locale}.json`)).default,
  };
});
