import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const AffiliateCallToActions = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        py: 12,
        bgcolor: '#f9fafb',
      }}
    >
      <Box maxWidth={1312} mx='auto' px={2}>
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
