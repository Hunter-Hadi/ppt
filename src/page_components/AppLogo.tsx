import {
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { FC } from 'react';

import { CustomImageBox } from '@/components/CustomImage';
import ProLink from '@/components/ProLink';

interface IProps {
  sx?: SxProps;
}

const AppLogo: FC<IProps> = ({ sx }) => {
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm')); // 屏幕宽度小于 768 时为 true

  return (
    <ProLink
      href={{
        pathname: '/',
      }}
      target={'_self'}
      muiLinkProps={{ title: 'MaxAI.me' }}
      sx={sx}
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
