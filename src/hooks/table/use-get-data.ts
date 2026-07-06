import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ColumnSort } from '@tanstack/react-table';

import { objectToSearchParams } from '@/lib/object-to-params';

type User = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
  lastLogin: Date;
  loginCount: number;
};

export type PaginatedResponse = {
  data: User[];
  paging: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
};

async function getData(
  page: number,
  size: number,
  sort: ColumnSort[] | ColumnSort,
  search: string,
): Promise<PaginatedResponse> {
  const query = objectToSearchParams({ page, size, sort, search });
  const response = await fetch(`/api/table?${query}`);
  const data = await response.json();
  return (
    data ?? {
      data: [],
      paging: { page: 0, size: 0, totalPages: 0, totalElements: 0 },
    }
  );
}

export const useGetData = (
  page: number,
  size: number,
  sort: ColumnSort[] | ColumnSort,
  search: string,
) =>
  useQuery({
    queryKey: ['table-data', { page, size, sort, search }],
    queryFn: () => getData(page, size, sort, search),
    placeholderData: keepPreviousData,
  });
