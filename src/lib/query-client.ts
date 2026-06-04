import { QueryClient } from '@tanstack/react-query';

/**
 * Global QueryClient instance.
 * Used for accessing query cache outside of React components.
 * Error handlers are configured dynamically in QueryProvider.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: false,
      networkMode: 'online',
    },
    mutations: {
      networkMode: 'online',
    },
  },
});
