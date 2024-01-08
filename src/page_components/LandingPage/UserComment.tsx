import { Box, Typography } from '@mui/material';
import React from 'react';

const UserComment = () => {
  return (
    <Box
      py={{
        xs: 7,
        md: 14,
      }}
      px={2}
      bgcolor='white'
    >
      <Typography
        variant='custom'
        component='h2'
        textAlign={'center'}
        fontSize={{
          xs: 24,
          sm: 32,
          lg: 48,
        }}
        mb={6}
      >
        1M+ professionals choose MaxAI.me
      </Typography>
    </Box>
  );
};

export default UserComment;
