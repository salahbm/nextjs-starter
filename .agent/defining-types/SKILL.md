---
name: defining-types
description: 'Defining types for services and hooks following the established pattern'
---

# Types

Types are defined in separate files under `src/types` and imported by services and hooks. They provide type safety across the data layer.

## File Naming

- Use kebab-case: `resource.types.ts` (singular resource name)
- Example: `applicant.types.ts`, `admin.types.ts`, `auth.types.ts`

## Structure

```typescript
// src/types/resource.types.ts
import { ISort } from '@/types/data-table';
import { PaginatedResult } from '@/contracts';

export type ResourceListParams = {
  page: number;
  size: number;
  sort: ISort;
  search?: string;
  country?: string;
  partner?: string;
  isArchived?: boolean;
  isAlert?: boolean;
  status?: string;
  // ... other filters
};

export type ResourceDetail = ResourceType & {
  files: StoredFile[];
  work: Work[];
  visa: Visa[];
};

export type CreateResourceRequest = {
  name: string;
  email: string;
  // ... request fields
};

export type UpdateResourceRequest = Partial<CreateResourceRequest>;
```

## Common Type Patterns

### List Params

For paginated list endpoints, include pagination and filtering:

```typescript
export type ResourceListParams = {
  page: number;
  size: number;
  sort: ISort;
  search?: string;
  // ... resource-specific filters
};
```

### Detail Types

Extend the base resource type with related data:

```typescript
export type ResourceDetail = ResourceType & {
  files: StoredFile[];
  // ... other relations
};
```

### Request/Response Types

Separate request and response types for clarity:

```typescript
export type CreateResourceRequest = {
  name: string;
  // ... fields
};

export type UpdateResourceRequest = Partial<CreateResourceRequest>;
```

## Re-exporting in Services

Services should re-export types for convenience:

```typescript
// src/services/resource.service.ts
import type { ResourceDetail, ResourceListParams } from '@/types/resource.types';

export type { ResourceDetail, ResourceListParams };
```

## Importing in Hooks

Hooks import types from either the service or the types file:

```typescript
// Option 1: Import from service (if re-exported)
import { ResourceListParams } from '@/services/resource.service';

// Option 2: Import directly from types file
import { ResourceListParams } from '@/types/resource.types';
```
