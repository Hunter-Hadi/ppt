import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

interface IProps {
  mini?: boolean;
}

const FeaturesItem: FC<IProps> = ({ mini }) => {
  return (
    <Stack py={1.5} px={2}>
      <Typography
        variant='custom'
        fontSize={16}
        fontWeight={500}
        lineHeight={1.5}
      >
        Features
      </Typography>
    </Stack>
  );
};

export default FeaturesItem;
