import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { FC, useEffect, useRef } from 'react';
import {
  authLogout,
  useCommonUserProfile,
  useConnectMaxAIAccount,
} from 'src/packages/auth';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';

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
  const handleLogout = () => {
    authLogout();
    window.location.reload();
  };
  return (
    <AppLoadingLayout loading={false} sx={{ minHeight: '90vh' }}>
      <AppDefaultSeoLayout />
      <LoginWrapper>
        <Stack>
          email: {userProfile?.email}
          role: {currentUserRole}
        </Stack>
        <Stack>
          <Button onClick={handleLogout}>Logout</Button>
        </Stack>
      </LoginWrapper>
    </AppLoadingLayout>
  );
};

export default TestSyncLogin;
