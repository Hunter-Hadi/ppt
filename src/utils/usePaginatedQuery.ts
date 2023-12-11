import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface PaginatedData<T> {
  data: T[];
  current_page_size: number;
  total: number;
  current_page: number;
  msg: string;
  status: string;
}

// @ts-ignore
export interface PaginatedQueryResult<T> {
  current: number;
  setCurrent: (current: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  data: T[];
  total: number;
}

const usePaginatedQuery = <T>(
  queryKey: (string | number)[],
  fetchFunction: (
    current: number,
    pageSize: number,
  ) => Promise<PaginatedData<T>>,
  defaultSettings?: {
    pageSize?: number;
    current?: number;
  },
): PaginatedQueryResult<T> => {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  const [current, setCurrent] = useState(0);
  const [pageSize, setPageSize] = useState(defaultSettings?.pageSize ?? 10);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (router.isReady) {
      setCurrent(Number(router.query.current) || 0);
      setEnabled(true);
    }
  }, [router.isReady]);
  const { data, isLoading, isError, error, isFetching } = useQuery<
    PaginatedData<T>,
    unknown
  >({
    queryKey: [...queryKey, current, pageSize],
    queryFn: async () => {
      const result = await fetchFunction(current, pageSize);
      setTotal(result.total);
      return result;
    },
    enabled,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
  const hasNextPage = current + 1 < Math.ceil(total / pageSize);
  const hasPrevPage = current > 0;
  useEffect(() => {
    if (!isFetching && !isLoading && !isError && data) {
      if (data.data.length === 0 && current > 0) {
        setCurrent(0);
        router.replace({
          query: {
            ...router.query,
            current: 0,
          },
        });
      }
    }
  }, [current, data, isFetching, isLoading, isError]);
  return {
    current,
    setCurrent,
    pageSize,
    setPageSize,
    hasNextPage,
    data: data?.data ?? [],
    isLoading,
    isError,
    error,
    isFetching,
    hasPrevPage,
    total,
  };
};

export default usePaginatedQuery;
