import { Stack, SxProps, Typography } from '@mui/material';
import React, { FC } from 'react';

import AIProviderDescription from '.';

const SupportPanel: FC<{ sx?: SxProps }> = ({ sx }) => {
  return (
    <Stack
      p={2}
      alignItems='center'
      sx={{
        mt: 2,
        border: '1px solid rgba(0, 0, 0, 0.08)',
        background:
          'linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), #FFFFFF',
        ...sx,
      }}
    >
      <Typography variant='h5' fontWeight={500} mb={0.5}>
        ✨ Free Copilot on Chrome (Plugins & GPT-4 ✓)
      </Typography>
      <Typography variant='body2' mb={2} color='text.secondary'>
        MaxAI.me on any website without copy-pasting.
      </Typography>
      <Typography variant='body1' mb={2}>
        We support all popular AI Provders to power the extension.
      </Typography>
      <AIProviderDescription />
    </Stack>
  );
};

export default SupportPanel;
