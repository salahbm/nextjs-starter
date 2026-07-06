import * as Sentry from '@sentry/nextjs';

import { env } from '@/env';

Sentry.init({
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: Boolean(env.NEXT_PUBLIC_SENTRY_DSN),
  tracesSampleRate: env.NODE_ENV === 'production' ? 0.1 : 1,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
