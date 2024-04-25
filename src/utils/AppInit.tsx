import { Backdrop, CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';

import ChromeExtensionDetector from '@/features/extension/components/ChromeExtensionDetector';
import ExtensionUpdateRemindDialog from '@/features/extension/components/ExtensionUpdateRemindDialog';
import useInitExtensionStatus from '@/features/extension/hooks/useInitExtensionStatus';
import { useInitInviteCode } from '@/features/user';
import { AppState } from '@/store';
import { useInitMixPanel } from '@/features/mixpanel/utils';

const AppGlobalBackdrop = () => {
  const { globalLoading } = useRecoilValue(AppState);
  return (
    <Backdrop
      sx={{
        color: '#fff',
        userSelect: 'none',
        zIndex: 21474836440,
      }}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onClickCapture={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      open={globalLoading}
    >
      <Stack alignItems={'center'} spacing={2}>
        <CircularProgress size={16} color='inherit' />
        <Typography
          mt={1.5}
          variant='body2'
          fontWeight={400}
          fontSize={16}
          lineHeight={1.25}
        >
          loading...
        </Typography>
      </Stack>
    </Backdrop>
  );
};

const AppInit = () => {
  useInitExtensionStatus();
  useInitInviteCode();
  useInitMixPanel();

  return (
    <>
      <ChromeExtensionDetector />
      <ExtensionUpdateRemindDialog />
      <AppGlobalBackdrop />
    </>
  );
};
export default AppInit;
