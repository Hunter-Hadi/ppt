import { Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useMemo, useState } from 'react';

import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import CustomTablePagination from '@/components/CustomTablePagination';
import EmptyContent from '@/components/select/EmptyContent';
import {
  PromptCard,
  usePromptDetail,
  usePromptSearch,
} from '@/features/prompt';
import FIxedPromptRunner from '@/features/prompt/components/FIxedPromptRunner';
import { hasData } from '@/utils/utils';

const PromptListLayout: FC = () => {
  const router = useRouter();
  const {
    data,
    isFetching,
    current,
    total,
    pageSize,
    setCurrent,
    setPageSize,
  } = usePromptSearch();

  const [selectedPromptId, setSelectedPromptId] = useState<
    string | undefined
  >();

  const { data: promptDetailResponse, isLoading } =
    usePromptDetail(selectedPromptId);

  const promptDetail = promptDetailResponse?.data;

  const handlePromptClick = ({ id }) => {
    setSelectedPromptId(id);
  };

  const handlePageChange = useCallback(
    (event, value) => {
      setCurrent(value);
      router.replace({
        query: {
          ...router.query,
          current: value,
        },
      });
    },
    [router.query],
  );

  const handleonPageSizeChange = useCallback(
    (newPageSize) => {
      setPageSize(newPageSize);
      router.replace({
        query: {
          ...router.query,
          pageSize: newPageSize,
        },
      });
    },
    [router.query],
  );

  const paginationProps = useMemo(
    () => ({
      labelRowsPerPage: 'Prompts per page:',
      rowsPerPageOptions: [8, 12, 16, 20],
    }),
    [],
  );

  return (
    <Stack mb={4}>
      <CustomTablePagination
        total={total}
        current={current}
        pageSize={pageSize}
        sx={{ justifyContent: 'flex-end', pt: 0 }}
        paginationProps={paginationProps}
        onChange={handlePageChange}
        onPageSizeChange={handleonPageSizeChange}
      />
      <Grid container spacing={2}>
        <AppLoadingLayout loading={isFetching}>
          {!hasData(data) ? (
            <Grid item xs={12}>
              <EmptyContent sx={{ py: 4 }} />
            </Grid>
          ) : (
            data.map((prompt) => (
              <Grid key={prompt.id} item xs={12} md={3}>
                <PromptCard
                  active={selectedPromptId === prompt.id}
                  prompt={prompt}
                  onPromptClick={handlePromptClick}
                />
              </Grid>
            ))
          )}
        </AppLoadingLayout>
      </Grid>
      <CustomTablePagination
        total={total}
        current={current}
        pageSize={pageSize}
        sx={{ justifyContent: 'flex-end', pt: 0 }}
        paginationProps={paginationProps}
        onChange={handlePageChange}
        onPageSizeChange={handleonPageSizeChange}
      />

      <FIxedPromptRunner
        promptId={selectedPromptId}
        prompt={promptDetail}
        loading={isLoading}
        onClose={() => {
          setSelectedPromptId(undefined);
        }}
      />
    </Stack>
  );
};
export { PromptListLayout };
