import { buttonClasses, Paper, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useState } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import CustomIcon from '@/components/CustomIcon';
import useBrowserAgent from '@/features/common/hooks/useBrowserAgent';
import { mixpanelTrack } from '@/features/mixpanel/utils';
import FunnelSurveyContentRenderer from '@/features/survey/components/FunnelSurveyContentRenderer';

import CTAInstallButton from '../CTAInstallButton';

const UninstallPages: FC = () => {
  // const router = useRouter();

  const { browserAgent: agent } = useBrowserAgent();

  const { t } = useTranslation();
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const openUrlLinkRef = React.useRef('');
  useEffect(() => {
    const keyboardOrMouseEventListener = () => {
      if (openUrlLinkRef.current) {
        window.open(openUrlLinkRef.current, '_blank');
        openUrlLinkRef.current = '';
        return;
      }
    };
    window.addEventListener('keydown', keyboardOrMouseEventListener);
    window.addEventListener('mousedown', keyboardOrMouseEventListener);
    return () => {
      window.removeEventListener('keydown', keyboardOrMouseEventListener);
      window.removeEventListener('mousedown', keyboardOrMouseEventListener);
    };
  }, []);

  useEffect(() => {
    if (domLoaded) {
      mixpanelTrack('uninstall_completed');
    }
  }, [domLoaded]);

  return (
    <AppContainer
      sx={{
        position: 'relative',
        display: 'block',
        height: 'calc(100vh - 64px)',
        bgcolor: '#F8F6FF',
        flex: 'unset',
      }}
    >
      <AppDefaultSeoLayout title={t('seo:uninstall__title')} />

      <Stack
        justifyContent={'center'}
        alignItems='center'
        spacing={{
          xs: 4,
          sm: 6,
        }}
        sx={{
          width: 'max-content',
          position: 'absolute',
          top: {
            xs: '50%',
            sm: '40%',
          },
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography
          variant='custom'
          fontSize={32}
          lineHeight={1.5}
          fontWeight={900}
          textAlign='center'
          mx='auto'
        >
          {t('pages:uninstall_survey__title')}
        </Typography>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            // overflow: 'hidden',
            width: {
              xs: 'max-content',
              sm: 440,
            },
          }}
        >
          <FunnelSurveyContentRenderer
            sceneType={'SURVEY_UNINSTALL_COMPLETED'}
            SubmitSuccessNode={
              <Stack
                justifyContent={'center'}
                alignItems='center'
                mt={3}
                px={2}
              >
                <CTAInstallButton
                  variant={'contained'}
                  text={t('survey:funnel_survey__reinstall_cta_btn__text')}
                  trackerLinkProps={{
                    queryRefEnable: true,
                    pathnameRefEnable: false,
                  }}
                  adaptiveLabel
                  startIcon={
                    <CustomIcon
                      icon={agent === 'Edge' ? 'EdgeColor' : 'Chrome'}
                      sx={{
                        fontSize: '24px !important',
                      }}
                    />
                  }
                  sx={{
                    height: 48,
                    px: 3,
                    fontSize: 16,
                    background: '#0059D8',
                    '&:hover': {
                      background: '#0059D8',
                    },
                    [`& .${buttonClasses.startIcon}`]: {
                      display: {
                        xs: 'none',
                        sm: 'inherit',
                      },
                    },
                  }}
                />
              </Stack>
            }
          />
        </Paper>
      </Stack>
    </AppContainer>
  );
};

export default UninstallPages;
