import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

import { CustomImageBox } from '@/components/CustomImage';
import ProLink from '@/components/ProLink';

const AppLogo = () => {
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm')); // 屏幕宽度小于 768 时为 true

  return (
    <ProLink
      href={{
        pathname: '/',
      }}
      target={'_self'}
      muiLinkProps={{ title: 'MaxAI.me' }}
    >
      <Stack direction={'row'} alignItems={'center'} gap={1}>
        <CustomImageBox
          width={isDownSm ? 24 : 32}
          height={isDownSm ? 24 : 32}
          src={'/logo.svg'}
        />
        <Typography
          variant='custom'
          component='h1'
          color='text.primary'
          fontSize={isDownSm ? 16 : 20}
          fontWeight={800}
        >
          MaxAI.me
        </Typography>
      </Stack>
    </ProLink>
  );
};

export default AppLogo;
