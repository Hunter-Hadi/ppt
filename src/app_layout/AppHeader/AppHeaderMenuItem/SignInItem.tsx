import { Theme } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import ProLink from '@/components/ProLink';
import { APP_PROJECT_LINK } from '@/global_constants';
import { isInIframe } from '@/utils/utils';

interface IProps {
  isSmallScreen?: boolean;
}

const SignInItem: FC<IProps> = ({ isSmallScreen = false }) => {
  const { t } = useTranslation();

  const textRender = () => (
    <ProLink
      href={APP_PROJECT_LINK}
      hardRefresh
      color='inherit'
      underline='hover'
      target={isInIframe() ? '_blank' : '_self'}
      sx={{
        width: '100%',
        py: isSmallScreen ? 1 : 0,
        px: isSmallScreen ? 2 : 0,
        '&:hover': {
          textDecorationColor: (t) => (t as Theme).palette.primary.main,
        },
      }}
    >
      <Typography
        variant='custom'
        fontSize={16}
        lineHeight={1.5}
        fontWeight={500}
      >
        {t('common:sign_in')}
      </Typography>
    </ProLink>
  );

  if (isSmallScreen) {
    return (
      <MenuItem
        sx={{
          p: 0,
        }}
      >
        {textRender()}
      </MenuItem>
    );
  }

  return <Stack px={2}>{textRender()}</Stack>;
};

export default SignInItem;
