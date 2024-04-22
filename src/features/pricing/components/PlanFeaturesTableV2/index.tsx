import { Box, debounce, Stack, SxProps } from '@mui/material';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { AppHeaderHeightState } from '@/store';

import PaymentTypeSwitch from '../PaymentTypeSwitch';
import FeaturesTableContent from './FeaturesTableContent';
import FeaturesTableHeader from './FeaturesTableHeader';

// 第一列的最小宽度 320
export const FEATURE_TABLE_FIRST_COLUMN_WIDTH = {
  xs: 240,
  lg: 320,
};

export type IFeatureColumn = 'features' | 'free' | 'basic' | 'pro' | 'elite';

export const TABLE_COLUMN = ['features', 'free', 'basic', 'pro', 'elite'];

interface IProps {
  sx?: SxProps;
  popularPlan?: IFeatureColumn;
}

const PlanFeaturesTable: FC<IProps> = ({ sx, popularPlan }) => {
  // fixed table header 的容器
  const tableFixedHeaderContainerRef = useRef<HTMLElement>(null);

  // table container 容器
  const tableContainerRef = useRef<HTMLElement>(null);

  // 是否显示 fixed table header
  const [showFixedHeader, setShowFixedHeader] = useState(false);

  // fixed table header 的宽度
  // 需要在 resize 时，同步 table container 容器的宽度
  const [fixedHeaderWidth, setFixedHeaderWidth] = useState<number>(0);

  // fixed table header 的 left 值
  const [fixedHeaderLeft, setFixedHeaderLeft] = useState<number>(0);

  const appHeaderHeight = useRecoilValue(AppHeaderHeightState);

  useEffect(() => {
    // 初始化 fixed table header 的宽度
    if (tableContainerRef.current) {
      setFixedHeaderWidth(tableContainerRef.current?.clientWidth - 2);
      const tableContainerRect =
        tableContainerRef.current.getBoundingClientRect();
      setFixedHeaderLeft(tableContainerRect.left + 1);
    }
  }, []);

  useEffect(() => {
    const resizeHandle = () => {
      if (tableContainerRef.current) {
        setFixedHeaderWidth(tableContainerRef.current?.clientWidth - 2);
        const tableContainerRect =
          tableContainerRef.current.getBoundingClientRect();
        setFixedHeaderLeft(tableContainerRect.left + 1);
      }
    };

    const debouncedHandle = debounce(resizeHandle, 200);

    window.addEventListener('resize', debouncedHandle);

    return () => {
      window.removeEventListener('resize', debouncedHandle);
    };
  }, []);

  useEffect(() => {
    // window.scroll 纵向滚动的监听
    const scrollHandler = () => {
      const tableContainer = tableContainerRef.current;
      if (!tableContainer) return;
      const tableContainerRect = tableContainer.getBoundingClientRect();

      setShowFixedHeader(
        tableContainerRect.top <= 30 && tableContainerRect.bottom >= 400,
      );

      const tableContainerEl = tableContainerRef.current;

      if (tableContainerEl && tableFixedHeaderContainerRef.current) {
        const scrollLeft = tableContainerEl.scrollLeft;
        tableFixedHeaderContainerRef.current.scrollLeft = scrollLeft;
      }
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    // table container 横向滚动的监听
    const tableContainerEl = tableContainerRef.current;

    if (!tableContainerEl) {
      return;
    }

    const horizontalScrollHandler = () => {
      if (tableFixedHeaderContainerRef.current) {
        const scrollLeft = tableContainerEl.scrollLeft;
        tableFixedHeaderContainerRef.current.scrollLeft = scrollLeft;
      }
    };

    tableContainerEl.addEventListener('scroll', horizontalScrollHandler);

    return () => {
      tableContainerEl.removeEventListener('scroll', horizontalScrollHandler);
    };
  }, []);

  const tableStackSx = useMemo(() => {
    return {
      overflow: popularPlan ? 'unset' : 'auto',
      // minWidth: 1078,
      width: {
        xs: 'max-content',
        lg: 'unset',
      },
      border: '1px solid',
      borderColor: '#E0E0E0',
      borderRadius: 2,
    };
  }, [popularPlan]);

  return (
    <>
      {showFixedHeader ? (
        // fixed table header
        <Box
          overflow='hidden'
          sx={{
            position: 'fixed',
            top: appHeaderHeight,
            zIndex: (t) => t.zIndex.drawer + 10,
            left: fixedHeaderLeft,
            right: 0,
            width: fixedHeaderWidth,
            m: '0px !important',
          }}
        >
          <Box
            sx={{
              // mx: 'auto',

              overflow: 'auto',

              /* Chrome/Safari/Opera */
              '&::-webkit-scrollbar': {
                display: 'none',
              },

              // Firefox
              'scrollbar-width': 'none',
            }}
            ref={tableFixedHeaderContainerRef}
            onScroll={(e) => e.preventDefault()}
          >
            <FeaturesTableHeader
              inFixed
              // showPaymentTypeSwitch
              popularPlan={popularPlan}
              sx={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
            />
          </Box>
        </Box>
      ) : null}
      <Stack sx={sx} spacing={4}>
        <PaymentTypeSwitch sx={{ mx: 'auto !important' }} />

        <Box overflow={popularPlan ? 'auto' : 'unset'} ref={tableContainerRef}>
          {
            // 渲染 空白 div 撑高 overflow: auto 的容器，给 header popular 留位置
            popularPlan && <Box height={36} />
          }
          <Stack sx={tableStackSx}>
            <FeaturesTableHeader popularPlan={popularPlan} />
            <FeaturesTableContent />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default PlanFeaturesTable;
