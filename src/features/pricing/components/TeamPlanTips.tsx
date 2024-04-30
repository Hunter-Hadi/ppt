import { Alert, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { PricingPlanCategoryState } from '@/features/pricing/store';

const TeamPlanTips = () => {
  const { t } = useTranslation();

  const pricingPlanCategory = useRecoilValue(PricingPlanCategoryState);
  if (pricingPlanCategory !== 'team') {
    return null;
  }
  return (
    <Alert
      sx={{
        bgcolor: '#ece2fe',
        // border: '1px solid #ad82f7',
        width: '1250px',
        mx: 'auto',
        maxWidth: '1250px',
        mt: 5,
        mb: 4,
        borderRadius: 2,

        '& .MuiAlert-icon': {
          display: 'none',
        },
        '& .MuiAlert-message': {
          width: '100%',
        },
      }}
    >
      <Stack
        position={'relative'}
        overflow={'hidden'}
        spacing={2}
        alignItems='center'
        width={'100%'}
      >
        <Typography
          variant={'custom'}
          fontSize={'20px'}
          fontWeight={400}
          lineHeight={1.2}
        >
          {t('pages:team_plan__title__description1')}
        </Typography>
        <Typography
          variant={'custom'}
          fontSize={'20px'}
          fontWeight={400}
          lineHeight={1.2}
        >
          {t('pages:team_plan__title__description2')}
        </Typography>
      </Stack>
    </Alert>
  );
};

export default TeamPlanTips;
