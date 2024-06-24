import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { FC, useEffect, useRef } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import {
  useCommonUserProfile,
  useConnectMaxAIAccount,
} from '@/features/common-auth';

const LoginWrapper: FC<{
  children?: React.ReactNode;
}> = (props) => {
  const {
    connectMaxAIAccount,
    loading: buttonLoading,
    error,
    isLogin,
  } = useConnectMaxAIAccount(true);
  const { userProfile, syncUserInfo } = useCommonUserProfile();
  const onceRef = useRef(false);
  useEffect(() => {
    if (!userProfile?.email && isLogin && !onceRef.current) {
      onceRef.current = true;
      syncUserInfo().then().catch();
    }
  }, [isLogin]);
  if (isLogin) {
    return <>{props.children}</>;
  }
  return (
    <Stack>
      {error && <Typography>{error}</Typography>}
      <LoadingButton loading={buttonLoading} onClick={connectMaxAIAccount}>
        Login
      </LoadingButton>
    </Stack>
  );
};
const TestSyncLogin = () => {
  const { userProfile, currentUserRole } = useCommonUserProfile();
  return (
    <AppLoadingLayout loading={false} sx={{ minHeight: '90vh' }}>
      <AppDefaultSeoLayout />
      <LoginWrapper>
        <Stack>
          email: {userProfile?.email}
          role: {currentUserRole}
        </Stack>
      </LoginWrapper>
    </AppLoadingLayout>
  );
};

export default TestSyncLogin;
