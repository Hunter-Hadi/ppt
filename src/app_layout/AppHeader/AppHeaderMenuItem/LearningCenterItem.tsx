import { MenuItem, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import { isInIframe } from '@/utils/utils';

interface IProps {
  isSmallScreen?: boolean;
}

const LearningCenterItem: FC<IProps> = ({ isSmallScreen }) => {
  const { t } = useTranslation();

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
      {t('modules:header__menu__learning_center')}
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
