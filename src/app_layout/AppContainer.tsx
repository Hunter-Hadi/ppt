import { Container, Stack, SxProps } from '@mui/material';
import React, { FC } from 'react';

const AppContainer: FC<{ children: React.ReactNode; sx?: SxProps }> = (
  props,
) => {
  return (
    <Stack
      direction='row'
      sx={{
        width: '100%',
        flex: 1,
        minHeight: `calc(100% - 65px)`,
        bgcolor: 'pageBackground',
        ...props.sx,
      }}
    >
      <Container maxWidth={'lg'}>{props.children}</Container>
    </Stack>
  );
};
export default AppContainer;
