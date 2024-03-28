import { MenuItem, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import ProLink from '@/components/ProLink';
import { isInIframe } from '@/utils/utils';

interface IProps {
  isSmallScreen?: boolean;
}

const LearningCenterItem: FC<IProps> = ({ isSmallScreen }) => {
  const { t } = useTranslation();

  const textRender = () => (
    <ProLink
      href='/learning-center'
      hardRefresh
      color='inherit'
      target={isInIframe() ? '_blank' : '_self'}
      sx={{
        width: '100%',
        py: isSmallScreen ? 1 : 0,
        px: isSmallScreen ? 2 : 0,
      }}
    >
      <Typography
        variant='custom'
        fontSize={16}
        lineHeight={1.5}
        fontWeight={500}
        sx={{
          cursor: 'pointer',
        }}
      >
        {t('modules:header__menu__learning_center')}
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

export default LearningCenterItem;
