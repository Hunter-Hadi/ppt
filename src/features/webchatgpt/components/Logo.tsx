import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import { CustomImageBox } from '@/components/CustomImage';
import ProLink from '@/components/ProLink';
import {
  BRAND_NAME,
  WEBCHATGPT_HOME_PAGE,
} from '@/features/webchatgpt/constant';

interface IProps {
  imageSize?: number;
}

const Logo: FC<IProps> = ({ imageSize = 28 }) => {
  return (
    <ProLink
      href={{
        pathname: WEBCHATGPT_HOME_PAGE,
      }}
      target={'_self'}
      muiLinkProps={{ title: 'webchatgpt' }}
    >
      <Stack direction={'row'} alignItems={'center'} gap={1}>
        <CustomImageBox
          width={imageSize}
          height={imageSize}
          src={'/assets/webchatgpt/logo.png'}
        />
        <Typography
          color='text.primary'
          component='h1'
          fontSize={24}
          fontWeight={800}
          sx={{
            display: {
              xs: 'none',
              sm: 'inline',
            },
          }}
        >
          {BRAND_NAME}
        </Typography>
      </Stack>
    </ProLink>
  );
};

export default Logo;
