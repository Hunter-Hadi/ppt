import { Box, debounce, Stack, SxProps } from '@mui/material';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { RENDER_PLAN_TYPE } from '@/features/pricing/type';
import { AppHeaderHeightState } from '@/store';

import PaymentTypeSwitch from '../PaymentTypeSwitch';
import FeaturesTableContent from './FeaturesTableContent';
import FeaturesTableHeader from './FeaturesTableHeader';

// 第一列的最小宽度 390
export const FEATURE_TABLE_FIRST_COLUMN_WIDTH = 440;

export type IFeatureColumn = 'features' | 'free' | 'pro' | 'elite';

export const TABLE_COLUMN = ['features', 'free', 'pro', 'elite'];

export type IFeatureTableVariant = 'normal' | 'mini';

interface IProps {
  sx?: SxProps;
  variant?: IFeatureTableVariant;
  assignRenderPlan?: RENDER_PLAN_TYPE[];
  popularPlan?: IFeatureColumn;
}

const PlanFeaturesTable: FC<IProps> = ({
  sx,
  variant = 'normal',
  assignRenderPlan,
  popularPlan,
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

  const assignRenderPlanPrefix = useMemo(() => {
    // 在 feature table 渲染的过程中不会区分 monthly 和 yearly
    // 所以这里需要统一下

    return (
      assignRenderPlan?.map((plan) => plan.split('_')[0] as RENDER_PLAN_TYPE) ??
      []
    );
  }, [assignRenderPlan]);

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
        tableContainerRect.top <= 65 && tableContainerRect.bottom >= 400,
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
      minWidth: assignRenderPlanPrefix.length > 0 ? 'unset' : 1078,
      width: popularPlan
        ? {
            xs: 'max-content',
            md: 'unset',
          }
        : 'unset',
      border: '1px solid',
      borderColor: '#E0E0E0',
      borderRadius: 2,
    };
  }, [assignRenderPlanPrefix, popularPlan]);

  return (
    <>
      {showFixedHeader && variant !== 'mini' ? (
        <Box overflow='hidden'>
          <Box
            sx={{
              position: 'fixed',
              top: appHeaderHeight,
              zIndex: (t) => t.zIndex.drawer + 10,
              left: fixedHeaderLeft,
              right: 0,
              width: fixedHeaderWidth,
              // mx: 'auto',

              // overflow: 'hidden',

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
              variant={variant}
              showPaymentTypeSwitch
              assignRenderPlan={assignRenderPlanPrefix}
              popularPlan={popularPlan}
              popularStyle={'badge'}
              sx={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
            />
          </Box>
        </Box>
      ) : null}
      <Stack sx={sx} spacing={4}>
        {assignRenderPlanPrefix.length <= 0 ? <PaymentTypeSwitch /> : null}

        <Box overflow={popularPlan ? 'auto' : 'unset'} ref={tableContainerRef}>
          {
            // 渲染 空白 div 撑高 overflow: auto 的容器，给 header popular 留位置
            popularPlan && <Box height={36} />
          }

          <Stack sx={tableStackSx}>
            <FeaturesTableHeader
              variant={variant}
              assignRenderPlan={assignRenderPlanPrefix}
              popularPlan={popularPlan}
            />
            <FeaturesTableContent
              variant={variant}
              assignRenderPlan={assignRenderPlanPrefix}
            />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default PlanFeaturesTable;
