import { routing } from './i18n/routing';

import createMiddleware from 'next-intl/middleware';

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
