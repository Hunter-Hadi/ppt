import { Box, debounce, Stack, SxProps } from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { AppHeaderHeightState } from '@/store';

import PaymentTypeSwitch from '../PaymentTypeSwitch';
import FeaturesTableContent from './FeaturesTableContent';
import FeaturesTableHeader from './FeaturesTableHeader';
import { IFeatureColumnsType, IFeatureColumnType } from './type';

interface IProps {
  sx?: SxProps;
  popularPlan?: IFeatureColumnType;
}

export const FeatureTableColumns: IFeatureColumnsType = [
  {
    key: 'features',
    columnType: 'features',
    sx: {
      width: 350,
    },
  },
  {
    key: 'elite',
    columnType: 'elite',
    sx: {
      width: {
        xs: 230,
        md: 300,
      },
    },
  },
  {
    key: 'pro',
    columnType: 'pro',
    sx: {
      width: {
        xs: 230,
        md: 300,
      },
    },
  },
  // {
  //   key: 'basic',
  //   columnType: 'basic',
  //   sx: {
  //     width: {
  //       xs: 220,
  //       md: 240,
  //     },
  //   },
  // },
  {
    key: 'free',
    columnType: 'free',
    sx: {
      width: {
        xs: 230,
        md: 300,
      },
    },
  },
];

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
      setFixedHeaderWidth(tableContainerRef.current?.clientWidth);
      const tableContainerRect =
        tableContainerRef.current.getBoundingClientRect();
      setFixedHeaderLeft(tableContainerRect.left);
    }
  }, []);

  useEffect(() => {
    const resizeHandle = () => {
      if (tableContainerRef.current) {
        setFixedHeaderWidth(tableContainerRef.current?.clientWidth);
        const tableContainerRect =
          tableContainerRef.current.getBoundingClientRect();
        setFixedHeaderLeft(tableContainerRect.left);
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
            onScroll={(e) => {
              e.preventDefault();
            }}
          >
            <FeaturesTableHeader
              inFixed
              popularPlan={popularPlan}
              showPaymentSwitch
            />
          </Box>
        </Box>
      ) : null}
      <Stack sx={sx} spacing={4}>
        <PaymentTypeSwitch sx={{ mx: 'auto !important' }} />

        <Box
          ref={tableContainerRef}
          sx={{
            overflow: 'auto',
            pt: popularPlan ? 2 : 0,
          }}
        >
          {
            // 渲染 空白 div 撑高 overflow: auto 的容器，给 header popular 留位置
            popularPlan && <Box height={36} />
          }
          {/* header */}
          <FeaturesTableHeader popularPlan={popularPlan} />
          {/* content */}
          <FeaturesTableContent popularPlan={popularPlan} />
        </Box>
      </Stack>
    </>
  );
};

export default PlanFeaturesTable;
