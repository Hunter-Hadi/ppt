import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

interface IProps {
  mini?: boolean;
}

const IndustriesItem: FC<IProps> = ({ mini }) => {
  return (
    <Stack py={1.5} px={2}>
      <Typography
        variant='custom'
        fontSize={16}
        fontWeight={500}
        lineHeight={1.5}
      >
        Industries
      </Typography>
    </Stack>
  );
};

export default IndustriesItem;
