import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { AFFILIATE_PROGRAM_SIGN_UP_LINK } from '@/page_components/AffiliatePages/constant';

const AffiliateCallToActions = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        bgcolor: '#f9fafb',
        py: 12,
        backgroundImage: 'url(/assets/affiliate/cta-bg.png)',
        backgroundPosition: 'center',
        backgroundPositionY: '20%',
        backgroundSize: 'cover',
      }}
    >
      <Box maxWidth={1312} mx='auto' px={2} sx={{}}>
        <Typography
          variant='custom'
          component='h2'
          textAlign={'center'}
          fontSize={{
            xs: 36,
            sm: 48,
          }}
          mb={6}
        >
          {t('affiliate:call_to_action__title')}
        </Typography>
        <Button
          href={AFFILIATE_PROGRAM_SIGN_UP_LINK}
          target='_blank'
          variant='contained'
          sx={{
            width: '100%',
            height: 160,
            fontSize: {
              xs: 36,
              sm: 48,
            },
            mb: 8,
            textAlign: 'center',
          }}
        >
          {t('affiliate:call_to_action__text')}
        </Button>
      </Box>
    </Box>
  );
};

export default AffiliateCallToActions;
