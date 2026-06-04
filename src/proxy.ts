import { NextRequest, NextResponse } from 'next/server';

import createIntlMiddleware from 'next-intl/middleware';

import { hasLocale } from 'next-intl';

import { COOKIE_KEYS } from './constants/cookies';
import { routes } from './constants/routes';
import { routing } from './i18n/routing';

const PUBLIC_ROUTES = ['/sign-in', '/sign-up', '/forgot-password', '/success'];

const intlMiddleware = createIntlMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Extract locale from first path segment, fallback to default
  const segments = pathname.split('/');
  const firstSegment = segments[1] || '';
  const locale = hasLocale(routing.locales, firstSegment)
    ? firstSegment
    : routing.defaultLocale;

  // Normalize path: strip the locale prefix to get the actual route
  const normalizedPath = hasLocale(routing.locales, firstSegment)
    ? '/' + segments.slice(2).join('/')
    : pathname;
  const routePath = normalizedPath === '' ? '/' : normalizedPath;

  const token = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;
  const isAuthenticated = Boolean(token);
  const isPublicRoute = PUBLIC_ROUTES.includes(routePath);

  // Redirect unauthenticated users from protected routes
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(`/${locale}${routes.signIn}`, origin));
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL(`/${locale}${routes.home}`, origin));
  }

  // Pass to i18n middleware for locale negotiation and routing
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
