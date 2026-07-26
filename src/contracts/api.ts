/**
 * API contract types and errors shared across the application.
 */

export interface ApiErrorResponse {
  message?: string;
  code?: string;
  data?: unknown;
  details?: unknown;
  method?: string;
  path?: string;
  requestId?: string;
  timestamp?: string;
}

export class ApiClientError extends Error {
  readonly status: number;
  readonly code: string;
  readonly data: unknown;
  readonly details: unknown;
  readonly meta?: {
    method?: string;
    path?: string;
    requestId?: string;
    timestamp?: string;
  };

  constructor(
    message: string,
    status: number,
    code: string,
    data?: unknown,
    details?: unknown,
    meta?: {
      method?: string;
      path?: string;
      requestId?: string;
      timestamp?: string;
    },
  ) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
    this.data = data ?? null;
    this.details = details ?? null;
    this.meta = meta;
  }

  /** True if the error is a client error (4xx) */
  get isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  /** True if the error is a server error (5xx) */
  get isServerError(): boolean {
    return this.status >= 500 && this.status < 600;
  }

  /** True if the error is a network/connection failure */
  get isNetworkError(): boolean {
    return this.status === 0;
  }
}
