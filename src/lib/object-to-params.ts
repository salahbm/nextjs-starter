import { isEmptyValue } from '@/lib/is-empty-value';

import { formatDate } from '@/utils/date';

export const objectToSearchParams = (params: Record<string, unknown>) => {
  const searchParams = new URLSearchParams();

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== 'all'),
  );

  Object.entries(filteredParams).forEach(([key, value]) => {
    if (isEmptyValue(value)) return;

    if (Array.isArray(value)) {
      if (value.some((v) => typeof v === 'object' && v !== null)) {
        searchParams.set(key, JSON.stringify(value));
      } else {
        value.forEach((v) => {
          if (!isEmptyValue(v)) searchParams.append(key, String(v));
        });
      }
    } else if (value instanceof Date) {
      searchParams.set(key, formatDate(value, 'yyyy-MM-dd', 'en'));
    } else if (typeof value === 'object' && value !== null) {
      searchParams.set(key, JSON.stringify(value));
    } else {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
};
