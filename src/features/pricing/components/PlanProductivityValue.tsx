import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { SxProps } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';

import { PLAN_PRODUCTIVITY_VALUES } from '@/features/pricing/constant';
import { RENDER_PLAN_TYPE } from '@/features/pricing/type';

interface IProps {
  renderType: RENDER_PLAN_TYPE;
  isPopular?: boolean;
  sx?: SxProps;
}

const PlanProductivityValue: FC<IProps> = ({ renderType, isPopular, sx }) => {
  const { t } = useTranslation();
  const productivityValue = useMemo(
    () => PLAN_PRODUCTIVITY_VALUES[renderType],
    [renderType],
  );

  // const color = isPopular ? 'promotionColor.fontMain' : 'primary.main';
  const color = 'primary.main';

  return (
    <Stack direction={'row'} alignItems='center' spacing={0.5} sx={sx}>
      <Typography variant='custom' fontSize={16} lineHeight={1.5} color={color}>
        {t('pages:pricing__productivity')}
      </Typography>
      <Stack direction={'row'} alignItems='center' spacing={0.4}>
        {Array.from({ length: productivityValue }).map((_, index) => {
          return <RocketLaunchIcon key={index} sx={{ color, fontSize: 18 }} />;
        })}
      </Stack>
    </Stack>
  );
};

export default PlanProductivityValue;
