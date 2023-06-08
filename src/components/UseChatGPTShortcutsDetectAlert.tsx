import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { FC, useEffect, useRef, useState } from 'react';

import AppPaperCardLayout from '@/app_layout/AppPaperCardLayout';
import CustomModal from '@/components/CustomModal';
import ProLink from '@/components/ProLink';
import VideoPlayer from '@/components/VideoPlayer';
import { sendLarkBotMessage } from '@/utils/larkBot';
import { routerToShortcutsPage } from '@/utils/utils';

const UseChatGPTShortcutsDetectAlert: FC = () => {
  const [modalShow, setShowModal] = useState(false);
  const isOpenRef = useRef(false);
  const isSendBot = useRef(false);
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === 'KeyJ' && (event.metaKey || event.altKey)) {
        if (isOpenRef.current) {
          return;
        }
        let timer = setTimeout(() => {
          setShowModal(true);
        }, 1000);
        setTimeout(() => {
          const useChatGPTChromeExtensionElement = document.getElementById(
            'USE_CHAT_GPT_AI_ROOT',
          );
          if (useChatGPTChromeExtensionElement) {
            if (useChatGPTChromeExtensionElement.classList.contains('open')) {
              isOpenRef.current = true;
              clearTimeout(timer);
            }
          } else {
            clearTimeout(timer);
          }
        }, 500);
      }
    };
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);
  useEffect(() => {
    if (modalShow && !isSendBot.current) {
      isSendBot.current = true;
      sendLarkBotMessage(
        '[Extension Installed]',
        `Cmd/Alt + J shortcut is not responding\ndate: [${dayjs().format(
          'YYYY-MM-DD HH:mm:ss',
        )}]`,
        {
          uuid: 'dd385931-45f4-4de1-8e48-8145561b0f9d',
        },
      );
    }
    const listener = () => {
      if (modalShow) {
        window.location.reload();
      }
    };
    window.addEventListener('focus', listener);
    return () => {
      window.removeEventListener('focus', listener);
    };
  }, [modalShow]);
  return (
    <CustomModal
      width={600}
      height={'unset'}
      sx={{
        maxWidth: {
          xs: '90%',
          sm: 600,
        },
      }}
      show={modalShow}
      onClose={() => {
        setShowModal(false);
      }}
    >
      <AppPaperCardLayout
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        <Alert severity={'error'}>
          <Stack spacing={2}>
            <Typography variant={'h1'}>
              Your Cmd/Alt + J shortcut is not responding
            </Typography>
            <Typography variant={'body1'}>
              {`Please perform a force reconfiguration of the Cmd/Alt+J shortcut on `}
              <ProLink
                href={'/'}
                underline={'always'}
                sx={{ fontWeight: 700, fontSize: 'inherit' }}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  routerToShortcutsPage();
                }}
              >
                this page
              </ProLink>
              {` as instructed in the video.`}
            </Typography>
            <Box
              sx={{
                position: 'relative',
                width: '470px',
                height: '162.5px',
              }}
            >
              <VideoPlayer
                muted
                loop
                autoPlay
                width={'100%'}
                height={'100%'}
                src={'/assets/installed/reconfigure.mp4'}
              />
            </Box>
            <Button
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                const appRoot = document.getElementById(
                  'USE_CHAT_GPT_AI_ROOT',
                )?.shadowRoot;
                if (appRoot) {
                  const jumpLink = appRoot.querySelector(
                    'a[href="chrome://extensions/shortcuts"]',
                  ) as HTMLAnchorElement;
                  if (jumpLink) {
                    jumpLink.click();
                  } else {
                    const jumpButton = document
                      .getElementById('USE_CHAT_GPT_AI_ROOT')
                      ?.shadowRoot?.querySelector(
                        '#usechatgpt-www-to-shortcuts',
                      ) as HTMLButtonElement;
                    jumpButton?.click();
                  }
                }
              }}
              variant={'contained'}
              color={'primary'}
              sx={{ height: 56, fontSize: 24, fontWeight: 700 }}
            >
              Set up shortcut
            </Button>
            {/*<Typography>*/}
            {/*  Or copy{' '}*/}
            {/*  <CopyTypography*/}
            {/*    text={`chrome://extensions/shortcuts`}*/}
            {/*    sx={{*/}
            {/*      p: 0,*/}
            {/*      minWidth: 20,*/}
            {/*      fontWeight: 700,*/}
            {/*      display: 'inline-block',*/}
            {/*      color: 'rgba(0, 0, 0, 0.87)',*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <b>chrome://extensions/shortcuts</b>*/}
            {/*  </CopyTypography>{' '}*/}
            {/*  into your web browser.*/}
            {/*</Typography>*/}
            <Typography variant={'body1'}>
              Additionally, please be aware that the shortcut will only function
              once the page has fully loaded and not during the refreshing
              process.
            </Typography>
          </Stack>
        </Alert>
      </AppPaperCardLayout>
    </CustomModal>
  );
};
export default UseChatGPTShortcutsDetectAlert;
