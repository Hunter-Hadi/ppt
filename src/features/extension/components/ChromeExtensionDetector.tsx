import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import CopyTypography from '@/components/CopyTypography';
import CustomModal from '@/components/CustomModal';
import { MAXAI_EXTENSION_ROOT_ID } from '@/features/extension/constant';
import useBrowserAgent from '@/hooks/useBrowserAgent';
import CTAInstallButton from '@/page_components/CTAInstallButton';
import { ChromeExtensionDetectorState } from '@/store';

const ChromeExtensionDetector = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const setChromeExtensionDetector = useSetRecoilState(
    ChromeExtensionDetectorState,
  );

  const { browserAgent } = useBrowserAgent();

  // 检测弹窗的方法.
  const handleCheckPopup = () => {
    // 检测逻辑
    const chromeExtensionInstalled = document.getElementById(
      MAXAI_EXTENSION_ROOT_ID,
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
              Install MaxAI.me {browserAgent} extension to continue.
            </Typography>
            <CTAInstallButton variant='contained' />
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

export default ChromeExtensionDetector;
