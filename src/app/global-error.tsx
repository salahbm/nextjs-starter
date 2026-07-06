'use client';

import { useEffect } from 'react';

import * as Sentry from '@sentry/nextjs';

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
      <body className="flex h-screen flex-col items-center justify-center gap-4 bg-background">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-primary px-4 py-2 text-primary-foreground"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
