import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !routing.locales.includes(locale as 'en' | 'ko')) {
    locale = routing.defaultLocale;
  }

  // Import the requested locale's messages and the fallback (English) messages'
  const localeMessages = (await import(`../../locales/${locale}.json`)).default;
  const fallbackMessages = (await import(`../../locales/en.json`)).default;

  // Merge locale messages with fallback messages, using fallback if key is missing
  const mergedMessages = { ...fallbackMessages, ...localeMessages };
  return {
    messages: mergedMessages,
    locale,
  };
});
