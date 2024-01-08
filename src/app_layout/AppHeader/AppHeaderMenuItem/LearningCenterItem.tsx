import { MenuItem, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import { isInIframe } from '@/utils/utils';

interface IProps {
  mini?: boolean;
}

const LearningCenterItem: FC<IProps> = ({ mini }) => {
  const textRender = () => (
    <Typography
      variant='custom'
      fontSize={16}
      lineHeight={1.5}
      fontWeight={500}
    >
      Learning-center
    </Typography>
  );

  const handleClick = () => {
    window.open('/learning-center', isInIframe() ? '_blank' : '_self');
  };

  if (mini) {
    return <MenuItem onClick={handleClick}>{textRender()}</MenuItem>;
  }

  return (
    <Stack px={2} onClick={handleClick}>
      {textRender()}
    </Stack>
  );
};

export default LearningCenterItem;
