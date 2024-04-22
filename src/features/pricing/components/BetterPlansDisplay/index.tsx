import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/material/styles';
import React, { FC } from 'react';

import BetterPlanDisplayItem from '@/features/pricing/components/BetterPlansDisplay/BetterPlanDisplayItem';
import PaymentTypeSwitch from '@/features/pricing/components/PaymentTypeSwitch';
import { BETTER_PLANS_DATA } from '@/features/pricing/constant/better_plans';

interface IBetterPlansDisplayProps {
  sx?: SxProps;
  popularPlan?: 'basic' | 'pro' | 'elite';
}

// 精选计划展示
const BetterPlansDisplay: FC<IBetterPlansDisplayProps> = ({
  sx,
  popularPlan,
}) => {
  return (
    <Stack spacing={8} sx={sx}>
      <PaymentTypeSwitch sx={{ mx: 'auto !important' }} />

      <Box>
        <Grid container spacing={4}>
          {BETTER_PLANS_DATA.map((betterPlanItem) => {
            const isPopular = betterPlanItem.renderPlan === popularPlan;
            return (
              <Grid item key={betterPlanItem.renderPlan} xs={12} md={4}>
                <BetterPlanDisplayItem
                  isPopular={isPopular}
                  {...betterPlanItem}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Stack>
  );
};

export default BetterPlansDisplay;
