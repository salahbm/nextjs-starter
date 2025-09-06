import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { COOKIE_KEYS } from '@/constants/cookies';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ru'],

  // Used when no locale matches
  defaultLocale: 'en',

  // The prefix for the locale in the URL
  localePrefix: 'always',

  localeCookie: {
    name: COOKIE_KEYS.LANGUAGE,
    maxAge: 60 * 60 * 24 * 365,
  },

  // The list of paths that should use the default locale
  pathnames: {
    '/': '/',
    '/dashboard': '/dashboard',
  },
});

export type Locale = 'en' | 'ru';

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
