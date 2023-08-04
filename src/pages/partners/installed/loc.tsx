import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import LandingPageEmbedBox from '@/page_components/LandingPage/LandingPageEmbedBox';
import FixedCtaButton from '@/page_components/partners/FixedCtaButton';

const LocPartners = () => {
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        position: 'relative',
      }}
    >
      <AppDefaultSeoLayout />
      <Stack
        height={240}
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
          🎉 L.O.C has been installed
        </Typography>
        {/* <Typography>
          To get started,{' '}
          <ProLink
            muiLinkProps={{
              rel: 'noopener nofollow',
            }}
            href='https://api.notion.com/v1/oauth/authorize?client_id=323a93e9-98a0-4f5a-a194-af728f1b817e&response_type=code&owner=user&redirect_uri=https%3A%2F%2Ftheo-lartigau.notion.site%2FChatGPT-to-Notion-af29d9538dca4493a15bb4ed0fde7f91'
            underline='always'
            target={'_blank'}
          >
            click here
          </ProLink>{' '}
          .
        </Typography> */}
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
        <LandingPageEmbedBox sx={{ pt: 2, pb: 10 }} linkRef='installed-loc' />
      </Box>
      <FixedCtaButton propRef='installed-loc' />
    </Box>
  );
};
export default LocPartners;
