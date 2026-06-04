'use client';

import { useQueryState } from 'nuqs';

import { DataTable } from '@/components/shared/data-table';
import { Input } from '@/components/ui/input';
import Loader from '@/components/ui/loader';

import { useDataTable } from '@/hooks/common/use-data-table';
import { useDebounce } from '@/hooks/common/use-debounce';
import { useQueryReader } from '@/hooks/common/use-query-reader';
import { useGetData } from '@/hooks/table';

import { columns } from './columns';

export function TasksTable() {
  // Use the improved query reader hook to get URL parameters
  const [search, setSearch] = useQueryState('search');

  const debouncedSearch = useDebounce(setSearch);

  const query = useQueryReader({
    page: { type: 'number', defaultValue: 1 },
    size: { type: 'number', defaultValue: 10 },
    sort: { type: 'object', defaultValue: [{ id: 'createdAt', desc: true }] },
    search: { type: 'string', defaultValue: '' },
  });

  const { data, isLoading, isFetching } = useGetData(
    query.page,
    query.size,
    query.sort,
    query.search,
  );
  const { table } = useDataTable({
    data: data?.data,
    columns: columns,
    pageCount: data?.paging.totalPages,
    initialState: {
      columnPinning: { left: ['select'] },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
    meta: {
      includePaginationReset: true,
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={search}
        type="search"
        placeholder="Search..."
        onChange={(e) => debouncedSearch(e.target.value)}
      />
      <DataTable table={table} isLoading={isLoading || isFetching} />
    </div>
  );
}
