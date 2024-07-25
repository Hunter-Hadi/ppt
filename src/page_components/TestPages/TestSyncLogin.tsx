import { LoadingButton } from '@mui/lab'
import { Box, Divider, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import React from 'react'
import {
  authLogout,
  useCommonUserProfile,
  useConnectMaxAIAccount,
} from 'src/packages/auth'

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'
import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import AppBar from '@/packages/base-ui/components/AppBar'
import { useExtensionDetectionAlert } from '@/packages/browser-extension/components/ExtensionDetectionAlert'
import MaxAIExtensionWrapper from '@/packages/browser-extension/components/MaxAIExtensionWrapper'
import useMaxAIExtensionState from '@/packages/browser-extension/hooks/useMaxAIExtensionState'
import {
  COMMON_MAXAI_API_HOST,
  COMMON_MAXAI_APP_PROJECT_HOST,
  COMMON_MAXAI_WWW_PROJECT_HOST,
  COMMON_PROJECT_BASE_PATH,
} from '@/packages/common'
import { useMaxAIAlertModals } from '@/packages/common/components/MaxAIAlertModals'
import MaxAICommonRoot from '@/packages/common/components/MaxAICommonRoot'
import Toast from '@/packages/common/utils/toast'
import LanguageSelector from '@/packages/nextjs-ui/components/LanguageSelector'
import MaxAILazyLoadImage from '@/packages/base-ui/components/MaxAILazyLoadImage'

const TestSyncLogin = () => {
  const { isLogin, loading, error, connectMaxAIAccount } =
    useConnectMaxAIAccount()
  const { userProfile } = useCommonUserProfile()
  const maxAIExtensionState = useMaxAIExtensionState()
  const { openExtensionInstallAlert, openExtensionUpgradeAlert } =
    useExtensionDetectionAlert()

  const { openDesktopBrowsersAlert } = useMaxAIAlertModals()

  const handleLogout = () => {
    authLogout()
    window.location.reload()
  }

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

        <AppLoadingLayout loading={false} sx={{ minHeight: '90vh' }}>
          <AppDefaultSeoLayout />
          <Stack>email: {userProfile?.email}</Stack>
          <AppBar
            MenuListComponents={
              <Stack flex={1}>
                <Box>
                  <LanguageSelector />
                </Box>
              </Stack>
            }
            // CtaContentComponents={null}
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
              const hasMaxAIExtension = maxAIExtensionState.check(true)
              console.log(`hasMaxAIExtension`, hasMaxAIExtension)
            }}
          >
            check maxai extension
          </Button>
          <Button onClick={openExtensionInstallAlert}>
            open maxai extension install Alert
          </Button>
          <Button onClick={openExtensionUpgradeAlert}>
            open maxai extension upgrade Alert
          </Button>
          <Button onClick={openDesktopBrowsersAlert}>
            open maxai Desktop Browser Alert
          </Button>
          <MaxAIExtensionWrapper
            feedback={(loading) => {
              return loading ? 'loading...' : 'loaded'
            }}
          >
            has maxai extension
          </MaxAIExtensionWrapper>
          <Divider />
        </Stack>

        <Stack py={3} direction='row' alignItems={'center'} spacing={2}>
          <h3>Toast:</h3>
          <Button
            variant='contained'
            color='success'
            onClick={() => {
              Toast.success('success Toast')
            }}
          >
            success Toast
          </Button>
          <Button
            variant='contained'
            color='warning'
            onClick={() => {
              Toast.warning('warning Toast')
            }}
          >
            warning Toast
          </Button>
          <Button
            variant='contained'
            color='info'
            onClick={() => {
              Toast.info('info Toast')
            }}
          >
            info Toast
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={() => {
              Toast.error('error Toast Toast', {
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right',
                },
              })
            }}
          >
            error Toast
          </Button>
          <Divider />
        </Stack>

        <Stack>
          <h3>maxai LazyLoadImage:</h3>

          <Box height={2000} bgcolor='#000' />

          <MaxAILazyLoadImage
            alt='video-cover'
            src='/assets/landing/hero-section/video-cover.png'
            width={256}
            height={144}
          />
        </Stack>
      </Stack>
    </MaxAICommonRoot>
  )
}

export default TestSyncLogin
