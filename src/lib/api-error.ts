/**
 * Custom error class for API responses.
 * Thrown by the API layer when a request fails.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
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
