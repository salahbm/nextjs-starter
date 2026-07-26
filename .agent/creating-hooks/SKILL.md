---
name: creating-hooks
description: 'Creating React Query hooks for data fetching and mutations'
---

# Hooks

Hooks use React Query for data fetching and mutations, wrapping service calls. They live in `src/hooks` organized by resource.

## File Naming

- Use kebab-case: `use-resource.ts` or `use-resources.ts`
- Organize in folders: `src/hooks/resource/`
- Example: `src/hooks/applicant/use-applicants.ts`, `src/hooks/applicant/use-applicant-detail.ts`

## Query Hook Pattern

For fetching lists of data with pagination:

```typescript
// src/hooks/resource/use-resources.ts
import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from '@tanstack/react-query';

import { QueryKeys } from '@/constants/query-keys';
import { ResourceListParams, resourceService } from '@/services/resource.service';

export type IGetAllResourcesParams = ResourceListParams;

export const resourceListOptions = (params: IGetAllResourcesParams) =>
  queryOptions({
    queryKey: [...QueryKeys.resources.list, { ...params }],
    queryFn: ({ signal }) => resourceService.list(params, signal),
    placeholderData: keepPreviousData,
  });

export const useGetAllResources = (params: IGetAllResourcesParams) => {
  return useQuery(resourceListOptions(params));
};
```

## Detail Hook Pattern

For fetching a single resource by ID:

```typescript
import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from '@tanstack/react-query';

import { QueryKeys } from '@/constants/query-keys';
import { ResourceDetail } from '@/types/resource.types';
import { resourceService } from '@/services/resource.service';

export const resourceDetailOptions = (id?: string) =>
  queryOptions({
    queryFn: ({ signal }) => resourceService.detail(id!, signal),
    queryKey: [...QueryKeys.resources.detail, { id }],
    placeholderData: keepPreviousData,
    enabled: !!id,
  });

export const useResourceDetail = (id?: string) =>
  useQuery(resourceDetailOptions(id));
```

## Mutation Hook Pattern

For creating, updating, or deleting resources:

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QueryKeys } from '@/constants/query-keys';
import { resourceService } from '@/services/resource.service';

const createResource = resourceService.create;

export const useCreateResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.resources.lists });
    },
  });
};
```

## Update Mutation Pattern

For updating resources with optimistic updates:

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QueryKeys } from '@/constants/query-keys';
import { resourceService } from '@/services/resource.service';

export const useUpdateResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; input: UpdateResourceRequest }) =>
      resourceService.update(data.id, data.input),
    onSuccess: (data) => {
      queryClient.setQueryData(
        [...QueryKeys.resources.detail, { id: data.data?.id, data: data.data }]
      );
      queryClient.invalidateQueries({ queryKey: QueryKeys.resources.lists });
    },
  });
};
```

## Key Points

1. **queryOptions**: Define reusable query options for better composability
2. **Signal support**: Pass AbortSignal to service calls for request cancellation
3. **Placeholder data**: Use `keepPreviousData` for smoother pagination
4. **Query invalidation**: Invalidate relevant queries after mutations
5. **Type safety**: Use typed params and return values
6. **QueryKeys**: Use centralized query keys from `@/constants/query-keys`

## Using Hooks in Components

```typescript
'use client';

import { useGetAllResources } from '@/hooks/resource/use-resources';

export function ResourceListView() {
  const { data, isLoading, error } = useGetAllResources({
    page: 1,
    size: 10,
    sort: [{ id: 'createdAt', desc: true }],
  });

  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;

  // Render data
}
```
