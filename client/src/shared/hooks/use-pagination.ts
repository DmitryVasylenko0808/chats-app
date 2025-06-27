import { useEffect, useState } from 'react';

export const usePagination = (
  initialPage: number = 1,
  initialLimit: number = 10,
  resetPageDependecies: unknown[] = []
) => {
  const [page, setPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);

  useEffect(() => {
    setPage(initialPage);
  }, [limit, ...resetPageDependecies]);

  const onPageChange = (page: number) => setPage(page);
  const onLimitChange = (limit: number) => setLimit(limit);

  return { page, limit, onPageChange, onLimitChange };
};
