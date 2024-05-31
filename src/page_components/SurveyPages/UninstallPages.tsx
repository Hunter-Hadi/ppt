import { Paper, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import { mixpanelTrack } from '@/features/mixpanel/utils';
import FunnelSurveyContentRenderer from '@/features/survey/components/FunnelSurveyContentRenderer';
const { getBrowser } = new UAParser();

const UninstallPages: FC = () => {
  // const router = useRouter();
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

      <Paper
        sx={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 4,
          overflow: 'hidden',
          width: 440,
        }}
      >
        <FunnelSurveyContentRenderer
          sceneType={'SURVEY_UNINSTALL_COMPLETED'}
          SubmitSuccessNode={
            <Stack justifyContent={'center'} alignItems='center' mt={3}>
              <Typography
                variant='custom'
                fontSize={24}
                lineHeight={1.5}
                bgcolor='rgba(255, 246, 122, 0.8)'
              >
                {t('survey:funnel_survey__free_to_close')}
              </Typography>
            </Stack>
          }
        />
      </Paper>
    </AppContainer>
  );
};

export default UninstallPages;
