import { Pagination, Stack, SxProps } from '@mui/material';
import React, { FC } from 'react';

import { GaContent, gaEvent, generateGaEvent } from '@/utils/gtag';

interface ICustomPaginationProps {
  /**
   * <item>总数量
   */
  total: string | number | undefined;
  /**
   * 每页<item>数量
   */
  pageSize: string | number | undefined;
  /**
   * 当前页数
   */
  current: string | number | undefined;
  maxPage?: string | number | undefined;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  sx?: SxProps;
}

const CustomPagination: FC<ICustomPaginationProps> = ({
  total,
  current,
  pageSize,
  maxPage = 0,
  onChange,
  sx,
}) => {
  if (!total || (!current && current !== 0) || !pageSize) {
    return null;
  }
  const numTotal = Number(total);
  const numCurrent = Number(current);
  const numPageSize = Number(pageSize);
  const numMaxSize = Number(maxPage);
  const coverCurrentPage = (): number => {
    if (numMaxSize) {
      if (numCurrent > numMaxSize) {
        return numMaxSize;
      }
    }
    return numCurrent;
  };
  const coverTotalCount = (): number => {
    if (numMaxSize) {
      if (Math.ceil(numTotal / numPageSize) > numMaxSize) {
        return numMaxSize;
      }
    }
    return Math.ceil(numTotal / numPageSize);
  };

  const ga = generateGaEvent('click', 'pagination', {
    value: coverCurrentPage(),
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onChange && onChange(event, value);
    gaEvent(ga);
  };

  return (
    <div>
      {numTotal > numPageSize ? (
        <Stack
          spacing={2}
          direction='row'
          sx={{ justifyContent: 'center', pt: 4, ...sx }}
        >
          <GaContent gaEvent={ga}>
            <Pagination
              count={coverTotalCount()}
              page={coverCurrentPage()}
              onChange={handleChange}
            />
          </GaContent>
        </Stack>
      ) : null}
    </div>
  );
};

export default CustomPagination;
