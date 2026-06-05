'use client';

import { PropsWithChildren } from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { env } from '@/env';

// next-themes renders an inline <script> to prevent theme flicker (FOUC).
// React 19 warns about script tags inside components — this is a false positive.
// Suppress the specific console.error until next-themes releases a fix.
if (typeof window !== 'undefined' && env.NODE_ENV === 'development') {
  const orig = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Encountered a script tag')
    )
      return;
    orig.apply(console, args);
  };
}

export default function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
