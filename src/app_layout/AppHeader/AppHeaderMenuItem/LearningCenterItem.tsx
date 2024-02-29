import { MenuItem, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { isInIframe } from '@/utils/utils';

interface IProps {
  isSmallScreen?: boolean;
}

const LearningCenterItem: FC<IProps> = ({ isSmallScreen }) => {
  const { t } = useTranslation('modules');

  const textRender = () => (
    <Typography
      variant='custom'
      fontSize={16}
      lineHeight={1.5}
      fontWeight={500}
      sx={{
        cursor: 'pointer',
      }}
    >
      {t('header__menu__learning_center')}
    </Typography>
  );

  const handleClick = () => {
    window.open('/learning-center', isInIframe() ? '_blank' : '_self');
  };

  if (isSmallScreen) {
    return <MenuItem onClick={handleClick}>{textRender()}</MenuItem>;
  }

  return (
    <Stack px={2} onClick={handleClick}>
      {textRender()}
    </Stack>
  );
};

export default LearningCenterItem;
