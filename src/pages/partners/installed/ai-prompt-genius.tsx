import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ProLink from '@/components/ProLink';
import LandingPageEmbedBox from '@/page_components/LandingPage/LandingPageEmbedBox';
import FixedCtaButton from '@/page_components/partners/FixedCtaButton';

const AIPromptGenius = () => {
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        position: 'relative',
      }}
    >
      <AppDefaultSeoLayout />
      <Stack
        height={336}
        bgcolor={'#F8F9FA'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={2}
        px={{
          xs: 2,
          sm: 0,
        }}
      >
        <Typography
          component='h2'
          variant='custom'
          textAlign={'center'}
          fontSize={48}
        >
          🎉 AI Prompt Genius
          <br />
          has been installed
        </Typography>
        <Typography>
          To get started,{' '}
          <ProLink
            muiLinkProps={{
              rel: 'noopener nofollow',
            }}
            href='https://docs.aipromptgenius.app/tutorial/01-create-edit-and-use-prompts/'
            underline='always'
            target={'_blank'}
          >
            click here
          </ProLink>{' '}
          to view the first part of the tutorial.
        </Typography>
      </Stack>
      <Box position='relative'>
        <Box
          sx={{
            position: 'absolute',
            top: -24,
            left: '50%',
            bgcolor: '#F4EBFB',
            transform: 'translateX(-50%)',
            borderRadius: 99,
            px: 2,
            py: 1,
            whiteSpace: 'nowrap',
          }}
        >
          <Typography color='primary'>{`Try our partner's new extension 👇`}</Typography>
        </Box>
        <LandingPageEmbedBox sx={{ pt: 2, pb: 10 }} linkRef='aipromptgenius' />
      </Box>
      <FixedCtaButton propRef='aipromptgenius' />
    </Box>
  );
};
export default AIPromptGenius;
