import {
  Stack,
  SxProps,
  TablePagination,
  TablePaginationProps,
} from '@mui/material';
import React, { FC } from 'react';

import { GaContent, gaEvent, generateGaEvent } from '@/utils/gtag';

interface ICustomTablePaginationProps {
  /**
   * <item>总数量
   */
  total: string | number;
  /**
   * 每页<item>数量
   */
  pageSize: string | number | undefined;
  /**
   * 当前页数
   */
  current: string | number | undefined;
  maxPage?: string | number | undefined;
  onChange?: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    value: number,
  ) => void;
  onPageSizeChange?: (newPageSize: number) => void;
  sx?: SxProps;

  paginationProps?: Partial<TablePaginationProps>;
}

/**
 * ！！！
 * Tips:
 * Mui TablePagination 的 page 是从 0 开始的
 */
const CustomTablePagination: FC<ICustomTablePaginationProps> = ({
  total,
  current,
  pageSize,
  maxPage = 0,
  sx,
  paginationProps,
  onChange,
  onPageSizeChange,
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

  const ga = generateGaEvent('click', 'pagination', {
    value: coverCurrentPage(),
  });

  const handleChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    value: number,
  ) => {
    onChange && onChange(event, value);
    gaEvent(ga);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    onPageSizeChange && onPageSizeChange(Number(value));
    onChange && onChange(null, 0);
  };

  return (
    <div>
      {numTotal > numPageSize ? (
        <Stack
          direction='row'
          sx={{ justifyContent: 'center', px: 2, pt: 4, ...sx }}
        >
          <GaContent gaEvent={ga}>
            <TablePagination
              component={'div'}
              sx={{
                '& > .MuiTablePagination-toolbar': {
                  pl: 0,
                },
                '.MuiTablePagination-select': {
                  fontSize: 16,
                },
              }}
              count={numTotal}
              page={coverCurrentPage()}
              rowsPerPage={numPageSize}
              onPageChange={handleChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
              {...paginationProps}
            />
          </GaContent>
        </Stack>
      ) : null}
    </div>
  );
};

export default CustomTablePagination;
