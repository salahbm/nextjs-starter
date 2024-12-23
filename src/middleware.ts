import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

const { defaultLocale, localePrefix, locales } = routing;

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
    '/(kr|en)/:path*',
  ],
};
