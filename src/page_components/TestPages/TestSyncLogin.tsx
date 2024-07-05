import { LoadingButton } from '@mui/lab';
import { Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React from 'react';
import {
  authLogout,
  useCommonUserProfile,
  useConnectMaxAIAccount,
} from 'src/packages/auth';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import AppBar from '@/packages/base-ui/components/AppBar';
import { useExtensionDetectionAlert } from '@/packages/browser-extension/components/ExtensionDetectionAlert';
import MaxAIExtensionWrapper from '@/packages/browser-extension/components/MaxAIExtensionWrapper';
import useMaxAIExtensionState from '@/packages/browser-extension/hooks/useMaxAIExtensionState';
import {
  COMMON_MAXAI_API_HOST,
  COMMON_MAXAI_APP_PROJECT_HOST,
  COMMON_MAXAI_WWW_PROJECT_HOST,
  COMMON_PROJECT_BASE_PATH,
} from '@/packages/common';
import MaxAICommonRoot from '@/packages/common/components/MaxAICommonRoot';
import LanguageSelector from '@/packages/nextjs-ui/components/LanguageSelector';

const TestSyncLogin = () => {
  const { isLogin, loading, error, connectMaxAIAccount } =
    useConnectMaxAIAccount();
  const { userProfile } = useCommonUserProfile();
  const maxAIExtensionState = useMaxAIExtensionState();
  const { openExtensionDetectionAlert } = useExtensionDetectionAlert();

  const handleLogout = () => {
    authLogout();
    window.location.reload();
  };
  return (
    <MaxAICommonRoot>
      <Stack>
        <Typography>app: {COMMON_MAXAI_APP_PROJECT_HOST}</Typography>
        <Typography>www: {COMMON_MAXAI_WWW_PROJECT_HOST}</Typography>
        <Typography>api: {COMMON_MAXAI_API_HOST}</Typography>
        <Typography>basePath: {COMMON_PROJECT_BASE_PATH}</Typography>
        {!isLogin && (
          <>
            <Typography>error: {error}</Typography>
            <LoadingButton onClick={connectMaxAIAccount} loading={loading}>
              Login
            </LoadingButton>
          </>
        )}

        <AppLoadingLayout loading={!isLogin} sx={{ minHeight: '90vh' }}>
          <AppDefaultSeoLayout />
          <Stack>email: {userProfile?.email}</Stack>
          <AppBar
            MenuListComponents={<LanguageSelector />}
            AvatarProps={{
              logoutRedirectUrl: '/',
            }}
          />
          <Stack>
            <Button onClick={handleLogout}>Logout</Button>
          </Stack>
        </AppLoadingLayout>

        <Stack py={3}>
          <h3>maxai extension</h3>
          <Typography>
            loaded: {maxAIExtensionState.loaded.toString()}
          </Typography>
          <Typography>
            hasExtension: {maxAIExtensionState.hasExtension.toString()}
          </Typography>
          <Typography>
            extensionVersion: {maxAIExtensionState.extensionVersion}
          </Typography>
          <Button
            onClick={() => {
              const hasMaxAIExtension = maxAIExtensionState.check(true);
              console.log(`hasMaxAIExtension`, hasMaxAIExtension);
            }}
          >
            check maxai extension
          </Button>
          <Button onClick={openExtensionDetectionAlert}>
            open maxai extension detection Alert
          </Button>
          <MaxAIExtensionWrapper
            feedback={(loading) => {
              return loading ? 'loading...' : 'loaded';
            }}
          >
            has maxai extension
          </MaxAIExtensionWrapper>
          <Divider />
        </Stack>
      </Stack>
    </MaxAICommonRoot>
  );
};

export default TestSyncLogin;
