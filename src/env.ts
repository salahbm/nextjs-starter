import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    SENTRY_AUTH_TOKEN: z.string().min(1).optional(),
    SENTRY_DSN: z.url().optional(),
    SENTRY_ORG: z.string().min(1).optional(),
    SENTRY_PROJECT: z.string().min(1).optional(),
    BACKEND_API_BASE_URL: z.url().default(''),
    BACKEND_BASE_PATH: z.string().default('api'),
    BACKEND_API_VERSION: z.string().default('v1'),
  },
  client: {
    NEXT_PUBLIC_SENTRY_DSN: z.url().optional(),
    NEXT_PUBLIC_SITE_URL: z.url().optional(),
    NEXT_PUBLIC_BACKEND_API_BASE_URL: z.url().default(''),
    NEXT_PUBLIC_BACKEND_BASE_PATH: z.string().default('api'),
    NEXT_PUBLIC_BACKEND_API_VERSION: z.string().default('v1'),
  },
  shared: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_BACKEND_API_BASE_URL:
      process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL,
    NEXT_PUBLIC_BACKEND_BASE_PATH: process.env.NEXT_PUBLIC_BACKEND_BASE_PATH,
    NEXT_PUBLIC_BACKEND_API_VERSION:
      process.env.NEXT_PUBLIC_BACKEND_API_VERSION,
  },
});
