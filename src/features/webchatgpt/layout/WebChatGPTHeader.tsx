import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar, Divider, IconButton, Stack, Toolbar } from '@mui/material';
import React, { FC } from 'react';

import Logo from '@/features/webchatgpt/components/Logo';
const WebChatGPTHeader: FC = () => {
  return (
    <AppBar
      component={'header'}
      position={'sticky'}
      sx={{
        bgcolor: '#F8F9FA',
        zIndex: (t) => t.zIndex.drawer + 10,
        boxShadow: (t) => (t.palette.mode === 'dark' ? 1 : 'none'),
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          boxSizing: 'border-box',
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          maxWidth: 'lg',
          mx: 'auto',
          px: {
            xs: 2,
            lg: 2,
          },
        }}
      >
        <Logo />
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          {/* right actions content */}
          <IconButton
            href='https://github.com/qunash/chatgpt-advanced/'
            target='_blank'
            size='large'
            sx={{
              color: '#000',
            }}
          >
            <GitHubIcon fontSize='inherit' />
          </IconButton>
        </Stack>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};
export default WebChatGPTHeader;
