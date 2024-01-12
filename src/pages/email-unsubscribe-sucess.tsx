import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack, Typography } from '@mui/material';
import React from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';

const EmailUnsubscribeSuccess = () => {
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
          <Typography variant='h5'>Unsubscribed successfully</Typography>
          <Typography variant='body2' textAlign={'center'}>
            {`Your email address has been successfully removed from our newsletter
            list. You will no longer receive future updates. We're sorry to see
            you go, but you're welcome back anytime to catch up with the latest
            content!`}
          </Typography>
        </Stack>
      </Stack>
    </AppContainer>
  );
};

export default EmailUnsubscribeSuccess;
