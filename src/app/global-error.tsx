'use client';

import { useEffect } from 'react';

import * as Sentry from '@sentry/nextjs';
import { AlertTriangle, RefreshCw } from 'lucide-react';

import '@/styles/globals.css';

// Global error boundary renders outside the [locale] layout (no i18n context),
// so its copy stays in English.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--muted)_0%,transparent_60%)]"
          aria-hidden
        />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-8 flex items-center justify-center">
            <span
              className="bg-linear-to-br from-primary/20 via-primary/10 to-transparent bg-clip-text text-[clamp(6rem,22vw,14rem)] leading-none font-bold text-transparent select-none"
              aria-hidden
            >
              500
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
              <AlertTriangle className="size-16" strokeWidth={1.5} />
            </span>
          </div>
          <h1 className="typo-header mb-3 text-foreground">
            Something went wrong
          </h1>
          <p className="typo-body-2 max-w-md text-muted-foreground">
            An unexpected error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            className="typo-body-2 mt-8 inline-flex h-12 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-primary-foreground transition-all hover:bg-primary/80"
          >
            <RefreshCw className="size-4" />
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
