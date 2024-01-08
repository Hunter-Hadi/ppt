import { Box, Stack, SxProps } from '@mui/material';
import React, { FC } from 'react';

const AppContainer: FC<{
  children: React.ReactNode;
  sx?: SxProps;
  maxWidth?: string | number;
}> = ({ children, sx, maxWidth = 'lg' }) => {
  return (
    <Stack
      direction='row'
      sx={{
        width: '100%',
        flex: 1,
        minHeight: `calc(100% - 65px)`,
        bgcolor: 'pageBackground',
        ...sx,
      }}
    >
      <Box
        sx={{
          boxSizing: 'border-box',
          width: '100%',
          mx: 'auto',
          px: 2,
          maxWidth: maxWidth,
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
export default AppContainer;
