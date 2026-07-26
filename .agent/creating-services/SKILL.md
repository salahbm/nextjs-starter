---
name: creating-services
description: 'Creating service classes for API resources following the established pattern'
---

# Services

Services are class-based singletons that wrap the Agent for specific API resources. They live in `src/services` and follow a consistent pattern.

## Service Pattern

### File Naming

- Use kebab-case: `resource.service.ts` (singular resource name)
- Example: `applicant.service.ts`, `admin.service.ts`, `auth.service.ts`

### Structure

```typescript
/**
 * Resource Service for Nest.js backend
 * Handles resource management operations
 */
import agent, { Agent } from '@/lib/agent';
import type { ResourceType, RequestType, ResponseType } from '@/types/resource.types';

export class ResourceService {
  private agent: Agent;

  constructor(agent: Agent) {
    this.agent = agent;
  }

  /**
   * Create a new resource
   * POST /api/resource
   */
  async create(input: RequestType): Promise<ResponseType> {
    return this.agent.post<ResponseType>('api/resource', input);
  }

  /**
   * List resources with pagination
   * GET /api/resource
   */
  async list(
    params: ResourceListParams,
    signal?: AbortSignal,
  ): Promise<PaginatedResult<ResourceType>> {
    return this.agent.get<PaginatedResult<ResourceType>>('api/resource', {
      params,
      signal,
    });
  }

  /**
   * Get resource by ID
   * GET /api/resource/:id
   */
  async detail(id: string, signal?: AbortSignal): Promise<ResourceDetail> {
    return this.agent.get<ResourceDetail>(`api/resource/${id}`, { signal });
  }

  /**
   * Update resource
   * PUT /api/resource/:id
   */
  async update(id: string, input: RequestType): Promise<ResponseType> {
    return this.agent.put<ResponseType>(`api/resource/${id}`, input);
  }

  /**
   * Delete resource
   * DELETE /api/resource/:id
   */
  async delete(id: string): Promise<void> {
    return this.agent.delete(`api/resource/${id}`);
  }
}

// Create and export a singleton instance
export const resourceService = new ResourceService(agent);
```

## Key Points

1. **Class-based**: Each service is a class with the Agent injected via constructor
2. **Singleton**: Export a singleton instance for use throughout the app
3. **Typed methods**: Use generics for type-safe return values
4. **Signal support**: Accept `AbortSignal` for request cancellation
5. **JSDoc comments**: Document each method with the HTTP method and endpoint

## Common Methods

- `create(input)` - POST to create a new resource
- `list(params, signal?)` - GET with pagination and filtering
- `detail(id, signal?)` - GET single resource by ID
- `update(id, input)` - PUT to update a resource
- `delete(id)` - DELETE a resource

## Re-exporting Types

Services should re-export types from their corresponding type files for convenience:

```typescript
import type { ResourceDetail, ResourceListParams } from '@/types/resource.types';

export type { ResourceDetail, ResourceListParams };
```
