import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';

const EmailUnsubscribeSuccessPages = () => {
  const { t } = useTranslation();
  return (
    <AppContainer
      sx={{
        bgcolor: '#fff',
        pt: 10,
        pb: 40,
      }}
    >
      <AppDefaultSeoLayout title={'Email unsubscribe success | MaxAI.me'} />
      <Stack
        width={'100%'}
        alignItems='center'
        justifyContent='center'
        spacing={4}
        height={'auto'}
      >
        <CheckCircleIcon
          sx={{
            fontSize: 64,
            color: 'rgba(52, 168, 83, 1)',
          }}
        />
        <Stack
          alignItems='center'
          justifyContent='center'
          maxWidth={640}
          spacing={1}
        >
          <Typography variant='h5'>
            {t('pages:email_unsubscribe_success__title')}
          </Typography>
          <Typography variant='body2' textAlign={'center'}>
            {t('pages:email_unsubscribe_success__content')}
          </Typography>
        </Stack>
      </Stack>
    </AppContainer>
  );
};

export default EmailUnsubscribeSuccessPages;
