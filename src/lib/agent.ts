/**
 * API Agent for handling HTTP requests
 * This module provides a centralized way to make API calls with proper error handling and type safety
 */
import { ApiClientError, type ApiErrorResponse } from '@/contracts/api';
import { env } from '@/env';

// HTTP methods supported by the agent
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Configuration options for requests
interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  credentials?: RequestCredentials;
}

// Next.js specific fetch request config
interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

/**
 * Main API agent class for handling HTTP requests
 */
export class Agent {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private apiVersion: string;
  private defaultCredentials: RequestCredentials;

  constructor(
    baseUrl = '',
    apiVersion = '',
    credentials: RequestCredentials = 'same-origin',
  ) {
    this.baseUrl = baseUrl;
    this.apiVersion = apiVersion;
    this.defaultCredentials = credentials;
    this.defaultHeaders = {
      Accept: 'application/json',
    };
  }

  /**
   * Set the base URL for API requests
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /**
   * Set default headers for all requests
   */
  setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };
  }

  /**
   * Add an authorization header with a bearer token
   */
  setBearerToken(token: string): void {
    this.defaultHeaders.Authorization = `Bearer ${token}`;
  }

  /**
   * Remove the authorization header
   */
  clearBearerToken(): void {
    delete this.defaultHeaders.Authorization;
  }

  /**
   * Set the API version
   */
  setApiVersion(version: string): void {
    this.apiVersion = version;
  }

  /**
   * Set the credentials mode for requests
   */
  setCredentials(credentials: RequestCredentials): void {
    this.defaultCredentials = credentials;
  }

  getApiConfig() {
    const isServer = typeof window === 'undefined';

    const envBaseUrl = isServer
      ? env.BACKEND_API_BASE_URL
      : env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

    const envBasePath = isServer
      ? env.BACKEND_BASE_PATH
      : env.NEXT_PUBLIC_BACKEND_BASE_PATH;

    const envVersion = isServer
      ? env.BACKEND_API_VERSION
      : env.NEXT_PUBLIC_BACKEND_API_VERSION;

    return {
      baseUrl: this.baseUrl || envBaseUrl,
      basePath: envBasePath,
      version: this.apiVersion || envVersion,
    };
  }

  /**
   * Create the full URL with query parameters
   */
  private createUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): string {
    // Remove leading slash to avoid double slashes
    const normalizedEndpoint = endpoint.startsWith('/')
      ? endpoint.slice(1)
      : endpoint;

    // Determine base URL. Browser-side requests can only access NEXT_PUBLIC_*
    // variables, so keep a public backend URL in sync for client components.
    const { baseUrl, basePath, version } = this.getApiConfig();

    // Construct full URL with API version
    const versionedEndpoint = `${basePath}/${version}/${normalizedEndpoint}`;

    // Remove trailing slash from baseUrl and leading slash from versionedEndpoint to avoid double slashes
    const normalizedBaseUrl = baseUrl?.replace(/\/$/, '');
    const normalizedVersionedEndpoint = versionedEndpoint.replace(/^\//, '');

    const url = normalizedBaseUrl
      ? `${normalizedBaseUrl}/${normalizedVersionedEndpoint}`
      : `/${versionedEndpoint}`;

    // Add query parameters if provided
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });

      const queryString = searchParams.toString();
      if (queryString) {
        return `${url}?${queryString}`;
      }
    }

    return url;
  }

  /**
   * Process the API response
   */
  private async processResponse<T>(response: Response): Promise<T> {
    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    const isJson = contentType
      ? contentType.includes('application/json')
      : false;

    // Parse the response body
    const data = isJson ? await response.json() : await response.text();

    // Handle error responses
    if (!response.ok) {
      const errorData = isJson ? (data as ApiErrorResponse) : null;

      const errorMessage =
        typeof errorData?.message === 'string'
          ? errorData.message
          : `API Error: ${response.statusText}`;

      const errorCode =
        typeof errorData?.code === 'string' ? errorData.code : 'INTERNAL_ERROR';

      throw new ApiClientError(
        errorMessage,
        response.status,
        errorCode,
        errorData?.data ?? null,
        errorData?.details ?? null,
        {
          method: errorData?.method,
          path: errorData?.path,
          requestId:
            errorData?.requestId ??
            response.headers.get('x-request-id') ??
            undefined,
          timestamp: errorData?.timestamp,
        },
      );
    }

    return data as T;
  }

  /**
   * Make an HTTP request
   */
  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    body?: unknown,
    options: RequestOptions = {},
  ): Promise<T> {
    const { headers = {}, params, signal, cache, next, credentials } = options;

    // Create the full URL with query parameters
    const url = this.createUrl(endpoint, params);

    // Prepare the request options
    const requestOptions: RequestInit & { next?: NextFetchRequestConfig } = {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
      signal,
      cache,
      next,
      credentials: credentials ?? this.defaultCredentials,
    };

    // Add the request body for non-GET requests
    if (body && method !== 'GET') {
      // If it's FormData, pass it as is and remove Content-Type header
      if (body instanceof FormData) {
        requestOptions.body = body;
        // Remove Content-Type header to let browser set it with boundary
        const headerObj = requestOptions.headers as Record<string, string>;
        delete headerObj['Content-Type'];
      } else {
        requestOptions.body = JSON.stringify(body);
        // Set Content-Type only when there's actual JSON data
        const headerObj = requestOptions.headers as Record<string, string>;
        headerObj['Content-Type'] = 'application/json';
      }
    }

    try {
      // Make the request
      const response = await fetch(url, requestOptions);
      return this.processResponse<T>(response);
    } catch (error) {
      // Handle fetch errors
      if (error instanceof ApiClientError) {
        throw error;
      }

      // Convert other errors to ApiClientError
      if (error instanceof DOMException && error.name === 'AbortError')
        throw error;
      throw new ApiClientError(
        (error as Error).message || 'Network error',
        0, // No status code for network errors
        'NETWORK_ERROR',
        null,
        error instanceof Error ? { error: error.message } : { error },
      );
    }
  }

  /**
   * Make a GET request
   */
  get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, options);
  }

  /**
   * Make a POST request
   */
  post<T>(
    endpoint: string,
    data?: unknown,
    options: RequestOptions = {},
  ): Promise<T> {
    return this.request<T>('POST', endpoint, data, options);
  }

  /**
   * Make a PUT request
   */
  put<T>(
    endpoint: string,
    data?: unknown,
    options: RequestOptions = {},
  ): Promise<T> {
    return this.request<T>('PUT', endpoint, data, options);
  }

  /**
   * Make a PATCH request
   */
  patch<T>(
    endpoint: string,
    data?: unknown,
    options: RequestOptions = {},
  ): Promise<T> {
    return this.request<T>('PATCH', endpoint, data, options);
  }

  /**
   * Make a DELETE request
   */
  delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('DELETE', endpoint, undefined, options);
  }
}

// Create and export a singleton instance with cookie-based auth for Nest.js backend
const agent = new Agent('', '', 'include');

// Export the agent singleton
export default agent;
