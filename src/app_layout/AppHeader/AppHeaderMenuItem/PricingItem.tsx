import { Stack, Typography } from '@mui/material';
import React from 'react';

const PricingItem = () => {
  return (
    <Stack py={1.5} px={2}>
      <Typography
        variant='custom'
        fontSize={16}
        fontWeight={500}
        lineHeight={1.5}
      >
        Pricing
      </Typography>
    </Stack>
  );
};

export default PricingItem;
