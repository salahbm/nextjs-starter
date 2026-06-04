import { NextRequest, NextResponse } from 'next/server';

import createIntlMiddleware from 'next-intl/middleware';

import { COOKIE_KEYS } from './constants/cookies';
import { routes } from './constants/routes';
import { routing } from './i18n/routing';

const PUBLIC_ROUTES = ['/sign-in', '/sign-up', '/forgot-password', '/success'];

const intlMiddleware = createIntlMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Extract locale
  const segments = pathname.split('/');
  const locale = segments[1] || 'en';

  // Normalize path (remove locale)
  const normalizedPath = pathname.replace(`/${locale}`, '') || '/';

  const token = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;
  const isAuthenticated = Boolean(token);

  const isPublicRoute = PUBLIC_ROUTES.includes(normalizedPath);

  // Redirect unauthenticated users from protected routes
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(`${origin}/${locale}${routes.signIn}`);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(`${origin}/${locale}${routes.dashboard}`);
  }

  // Pass to i18n middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
