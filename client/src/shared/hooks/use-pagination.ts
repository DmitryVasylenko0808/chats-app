import { useEffect, useState } from 'react';

export const usePagination = (resetPageDependecies: any[] = []) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(1);

  useEffect(() => {
    setPage(1);
  }, [limit, ...resetPageDependecies]);

  const onPageChange = (page: number) => setPage(page);
  const onLimitChange = (limit: number) => setLimit(limit);

  return { page, limit, onPageChange, onLimitChange };
};
