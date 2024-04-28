import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';

import { PLAN_USAGE_QUERIES } from '@/features/pricing/constant';
import { IDisplayFeaturesItem } from '@/features/pricing/constant/better_plans';
import { RENDER_PLAN_TYPE } from '@/features/pricing/type';
import { numberWithCommas } from '@/utils/dataHelper/numberHelper';

/**
 *
 * feature 用量相关的功能需要单独渲染
 */
interface IProps {
  renderPlan: RENDER_PLAN_TYPE;
  displayFeatureData: IDisplayFeaturesItem;
}

const FeaturesUsageItemRender: FC<IProps> = ({
  displayFeatureData,
  renderPlan,
}) => {
  const { t } = useTranslation();

  const usageValueText = useMemo(() => {
    const value =
      PLAN_USAGE_QUERIES[renderPlan][
        displayFeatureData.featuresUsageCategory ?? 'fast_text'
      ];
    if (value === -1) {
      return t('common:unlimited');
    }

    return `${numberWithCommas(value, 0)}`;
  }, [renderPlan, displayFeatureData.featuresUsageCategory, t]);

  if (!displayFeatureData.featuresUsageCategory) {
    return null;
  }
  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={1.5}>
        <Box width={20} lineHeight={0}>
          {displayFeatureData.status === 'checked' ? (
            <CheckCircleOutlineOutlinedIcon
              sx={{
                color: 'text.primary',
                fontSize: 20,
              }}
            />
          ) : (
            <CloseOutlinedIcon
              sx={{
                color: 'error.main',
                fontSize: 20,
              }}
            />
          )}
        </Box>
        <Stack spacing={0.5}>
          <Typography
            variant='custom'
            fontSize={14}
            lineHeight={1.5}
            color='text.primary'
          >
            <strong>{usageValueText}</strong>
            {` `}
            {typeof displayFeatureData.title === 'string'
              ? t(displayFeatureData.title)
              : displayFeatureData.title}
          </Typography>
          {typeof displayFeatureData.description === 'string' ? (
            <Typography
              variant='custom'
              fontSize={12}
              lineHeight={1.5}
              color='customText.tertiary'
            >
              {t(displayFeatureData.description)}
            </Typography>
          ) : (
            displayFeatureData.description
          )}
          <Typography
            variant='custom'
            fontSize={12}
            lineHeight={1.5}
            color='customText.tertiary'
          >
            {typeof displayFeatureData.moreDescription === 'string'
              ? t(displayFeatureData.moreDescription)
              : displayFeatureData.moreDescription}
          </Typography>
        </Stack>
      </Stack>
      {displayFeatureData.divider && <Divider />}
    </Stack>
  );
};

export default FeaturesUsageItemRender;
