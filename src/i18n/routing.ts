import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'kr'],

  // Used when no locale matches
  defaultLocale: 'en',

  // The prefix for the locale in the URL
  localePrefix: 'never',
  pathnames: {
    en: '/',
    kr: '/',
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
