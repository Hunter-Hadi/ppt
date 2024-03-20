import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AFFILIATE_PROGRAM_LINK } from '@/page_components/AffiliatePages/constant';

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
          href={AFFILIATE_PROGRAM_LINK}
          target='_blank'
          variant='contained'
          sx={{
            width: '100%',
            height: 160,
            fontSize: 48,
            mb: 8,
          }}
        >
          {t('affiliate:call_to_action__text')}
        </Button>
      </Box>
    </Box>
  );
};

export default AffiliateCallToActions;
