'use client';

import { useEffect } from 'react';

import * as Sentry from '@sentry/nextjs';
import { useTranslations } from 'next-intl';

import { ErrorView } from '@/views/error';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Error');

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <ErrorView
      title={t('title')}
      description={t('description')}
      actionLabel={t('retry')}
      onRetry={reset}
    />
  );
}
