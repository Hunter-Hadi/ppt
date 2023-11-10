import {
  Backdrop,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import CopyTypography from '@/components/CopyTypography';
import CustomIcon from '@/components/CustomIcon';
import CustomModal from '@/components/CustomModal';
import ProLink from '@/components/ProLink';
import { useInitInviteCode } from '@/features/user';
import { useInstallChromeExtensionLink } from '@/hooks';
import { useInitI18n } from '@/i18n/hooks';
import { AppState, ChromeExtensionDetectorState } from '@/store';

const ChromeExtensionDetector = () => {
  const router = useRouter();
  const { installChromeExtensionLink } = useInstallChromeExtensionLink();
  const [showModal, setShowModal] = useState(false);
  const setChromeExtensionDetector = useSetRecoilState(
    ChromeExtensionDetectorState,
  );
  // 检测弹窗的方法.
  const handleCheckPopup = () => {
    // 检测逻辑
    const chromeExtensionInstalled = document.getElementById(
      'USE_CHAT_GPT_AI_ROOT',
    );
    if (!chromeExtensionInstalled) {
      setShowModal(true);
      return false;
    }
    setShowModal(false);
    return true;
  };
  useEffect(() => {
    setChromeExtensionDetector({ checkIsInstalled: handleCheckPopup });
  }, [setChromeExtensionDetector]);
  const promptCopyLink = useMemo(() => {
    if (
      typeof window !== 'undefined' &&
      router.pathname.startsWith('/prompts')
    ) {
      return location.href;
    }
    return '';
  }, [router]);
  return (
    <>
      {showModal && (
        <CustomModal
          onClose={() => {
            setShowModal(false);
          }}
          show={showModal}
          sx={{
            mt: '20%',
            height: 'unset',
            width: '90%',
            maxWidth: 464,
          }}
        >
          <Stack spacing={2} p={4}>
            <Typography variant={'h5'}>
              Install MaxAI.me Chrome extension to continue.
            </Typography>
            <ProLink
              target={'_blank'}
              href={installChromeExtensionLink}
              sx={{ width: '100%' }}
            >
              <Button
                fullWidth
                variant={'contained'}
                color={'primary'}
                startIcon={<CustomIcon icon={'Chrome'} />}
                sx={{
                  height: 56,
                }}
              >
                {`Add to Chrome for free`}
              </Button>
            </ProLink>
            {promptCopyLink && (
              <Stack
                direction={'row'}
                sx={{
                  display: 'none',
                  '@media (max-width: 768px)': {
                    display: 'flex',
                  },
                }}
              >
                <Typography component={'span'}>Or</Typography>
                <CopyTypography
                  text={promptCopyLink}
                  sx={{ textDecoration: 'underline' }}
                >
                  copy prompt url
                </CopyTypography>
              </Stack>
            )}
          </Stack>
        </CustomModal>
      )}
    </>
  );
};

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
  useInitI18n();
  useInitInviteCode();

  return (
    <>
      <ChromeExtensionDetector />
      <AppGlobalBackdrop />
    </>
  );
};
export default AppInit;
