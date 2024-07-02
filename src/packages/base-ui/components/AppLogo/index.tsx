import Stack from '@mui/material/Stack';
import { SxProps, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { FC } from 'react';

import LazyLoadImage from '@/features/common/components/LazyLoadImage';
import ProLink from '@/features/common/components/ProLink';

export interface IAppLogoProps {
  sx?: SxProps;
  href?: string;
}

const AppLogo: FC<IAppLogoProps> = ({ sx, href = '/' }) => {
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm')); // 屏幕宽度小于 768 时为 true

  return (
    <ProLink href={href} target={'_self'} sx={sx}>
      <Stack direction={'row'} alignItems={'center'} gap={1}>
        <LazyLoadImage
          alt='MaxAI.me'
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
