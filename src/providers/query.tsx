'use client';

import { type PropsWithChildren, useEffect } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/lib/query-client';

import { ApiClientError } from '@/contracts';

/**
 * Determines if an error should be retried.
 * Don't retry:
 * - Network errors (status 0) — connection failures
 * - Client errors (4xx) except 408 (Request Timeout) and 429 (Too Many Requests)
 */
const shouldRetry = (failureCount: number, error: unknown): boolean => {
  if (error instanceof ApiClientError) {
    // Don't retry network errors — user needs to fix connection first
    if (error.isNetworkError) return false;

    // Don't retry client errors except specific cases
    if (error.isClientError) {
      if (error.status === 408 || error.status === 429) {
        return failureCount < 2;
      }
      return false;
    }

    // Retry server errors (5xx) up to 2 times
    return failureCount < 2;
  }

  // Don't retry unknown errors
  return false;
};

const QueryProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const queryCache = queryClient.getQueryCache();
    const mutationCache = queryClient.getMutationCache();

    // Configure default options with retry logic
    queryClient.setDefaultOptions({
      queries: {
        retry: shouldRetry,
        retryDelay: (attemptIndex: number) =>
          Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    });

    // Cleanup: reset error handlers on unmount
    return () => {
      queryCache.config.onError = undefined;
      mutationCache.config.onError = undefined;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
