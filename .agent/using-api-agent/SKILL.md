---
name: using-api-agent
description: 'Using the API Agent for HTTP requests with proper error handling and type safety'
---

# API Agent

The Agent class (`src/lib/agent.ts`) is a centralized HTTP client for making API requests with proper error handling and type safety.

## Key Features

- **Singleton Pattern**: A single instance is exported as default with cookie-based auth (`credentials: 'include'`)
- **Automatic URL Resolution**: Detects SSR vs client environment and uses appropriate API base URLs from env
- **Type Safety**: Generic methods (`get<T>`, `post<T>`, etc.) for typed responses
- **Error Handling**: Throws `ApiClientError` with standardized error information
- **Cookie-based Auth**: Uses `credentials: 'include'` for automatic cookie handling

## Basic Usage

```typescript
import agent from '@/lib/agent';

// GET request
const data = await agent.get<ResponseType>('api/endpoint', {
  params: { page: 1, size: 10 },
  signal: abortController.signal,
});

// POST request
const result = await agent.post<ResponseType>('api/endpoint', { data: 'value' });

// PUT request
const updated = await agent.put<ResponseType>('api/endpoint/123', { name: 'new' });

// PATCH request
const patched = await agent.patch<ResponseType>('api/endpoint/123', { status: 'active' });

// DELETE request
await agent.delete('api/endpoint/123');
```

## Request Options

```typescript
interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  credentials?: RequestCredentials;
}
```

## Manual Token Management

If you need to manually set a bearer token (rarely needed with cookie-based auth):

```typescript
import agent, { Agent } from '@/lib/agent';

// Set bearer token manually
agent.setBearerToken('your-token-here');

// Clear bearer token
agent.clearBearerToken();
```

## FormData Support

The Agent automatically handles FormData by removing the Content-Type header:

```typescript
const formData = new FormData();
formData.append('file', file);
formData.append('name', 'document');

await agent.post<ResponseType>('api/upload', formData);
```

## URL Resolution

The Agent automatically resolves URLs based on environment:

- **SSR (Node.js)**: Uses `env.BACKEND_API_BASE_URL_DEV` or `env.BACKEND_API_BASE_URL_PROD`
- **Client (Browser)**: Uses `env.NEXT_PUBLIC_BACKEND_API_BASE_URL_DEV` or `env.NEXT_PUBLIC_BACKEND_API_BASE_URL_PROD`

No manual URL configuration is needed in most cases.
