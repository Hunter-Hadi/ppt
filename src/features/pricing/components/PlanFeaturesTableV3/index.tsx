import { Box, debounce, Stack, SxProps } from '@mui/material';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { AppHeaderHeightState } from '@/store';

import PaymentTypeSwitch from '../PaymentTypeSwitch';
import FeaturesTableContent from './FeaturesTableContent';
import FeaturesTableHeader from './FeaturesTableHeader';
import { IFeatureColumnsType, IFeatureColumnType } from './type';

export interface IPlanFeaturesTableProps {
  noFixedHeader?: boolean;
  sx?: SxProps;
  popularPlan?: IFeatureColumnType;
  needToHiddenPlan?: IFeatureColumnType[];
  notShowPaymentSwitch?: boolean;
}

const PlanFeaturesTable: FC<IPlanFeaturesTableProps> = ({
  noFixedHeader,
  sx,
  popularPlan,
  needToHiddenPlan = [],
  notShowPaymentSwitch = false,
}) => {
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

  const featureTableColumns = useMemo<IFeatureColumnsType>(() => {
    const columnType: IFeatureColumnType[] = [
      'features',
      'elite',
      'pro',
      // 'basic',
      'free',
    ];
    const filteredColumnType = columnType.filter(
      (type) => !needToHiddenPlan.includes(type),
    );

    // features 列的宽度比例
    const featuresColumnWidthRatio = 0.28;

    return filteredColumnType.map((type) => {
      const width =
        type === 'features'
          ? `${Math.round(featuresColumnWidthRatio * 100)}%`
          : `${Math.round(
              ((1 - featuresColumnWidthRatio) /
                (filteredColumnType.length - 1)) *
                100,
            )}%`;
      return {
        key: type,
        columnType: type,
        sx: {
          width: {
            // TODO: refine 适配不同屏幕宽度
            xs: '50%',
            sm: width,
          },
        },
      };
    });
  }, [needToHiddenPlan]);

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
      {showFixedHeader && !noFixedHeader ? (
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
              featureTableColumns={featureTableColumns}
              inFixed
              popularPlan={popularPlan}
              showPaymentSwitch
              needToHiddenPlan={needToHiddenPlan}
            />
          </Box>
        </Box>
      ) : null}
      <Stack sx={sx} spacing={4}>
        {!notShowPaymentSwitch && (
          <PaymentTypeSwitch sx={{ mx: 'auto !important' }} />
        )}

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
          <FeaturesTableHeader
            featureTableColumns={featureTableColumns}
            popularPlan={popularPlan}
            needToHiddenPlan={needToHiddenPlan}
          />
          {/* content */}
          <FeaturesTableContent
            featureTableColumns={featureTableColumns}
            popularPlan={popularPlan}
            needToHiddenPlan={needToHiddenPlan}
          />
        </Box>
      </Stack>
    </>
  );
};

export default PlanFeaturesTable;
