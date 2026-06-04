/**
 * Centralized query key factory.
 * All query keys are defined here as string arrays only.
 * Parameters should be passed separately when calling useQuery/useMutation:
 *   [...queryKeys.auth.me, { userId }]
 *
 * Keys are hierarchical and role-aware to prevent cache collisions.
 *
 * Pattern: ['feature', 'entity', 'action']
 * Usage: useQuery({ queryKey: [...queryKeys.auth.me], ... })
 */
export const queryKeys = {
  // ============================================
  // AUTH
  // ============================================
  auth: {
    all: ['auth'] as const,
    me: ['auth', 'me'] as const,
    session: ['auth', 'session'] as const,
  },

  // ============================================
  // USERS
  // ============================================
  users: {
    all: ['users'] as const,
    list: ['users', 'list'] as const,
    detail: ['users', 'detail'] as const,
  },
} as const;
