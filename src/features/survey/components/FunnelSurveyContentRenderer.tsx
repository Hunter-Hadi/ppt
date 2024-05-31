import { LoadingButton, loadingButtonClasses } from '@mui/lab';
import {
  CircularProgress,
  Paper,
  Stack,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useCallback, useEffect, useMemo } from 'react';

import ResponsiveImage from '@/components/ResponsiveImage';
import { aesJsonEncrypt } from '@/features/common/utils/dataHelper/encryptionHelper';
import { getBasicInfoForMixpanel } from '@/features/mixpanel/utils';
import {
  FUNNEL_SURVEY_CONFIG,
  FUNNEL_SURVEY_MIXPANEL_EVENTNAME,
} from '@/features/survey/constants/funnelSurveyConfig';
import { IFunnelSurveySceneType } from '@/features/survey/types';
import { getClientUserId } from '@/features/track_user_interactions/utils';
import { APP_API } from '@/utils/api';
import { webappPost } from '@/utils/request';

import useFunnelSurveyController from '../hooks/useFunnelSurveyController';

interface IFunnelSurveyContentRendererProps {
  sceneType: IFunnelSurveySceneType;
  sx?: SxProps;
}

const FunnelSurveyContentRenderer: FC<IFunnelSurveyContentRendererProps> = ({
  sceneType,
  sx,
}) => {
  const { closePopup } = useFunnelSurveyController(sceneType);
  const { t } = useTranslation();
  const currentSurveyConfig = FUNNEL_SURVEY_CONFIG[sceneType];

  const [formData, setFormData] = React.useState<Record<string, string>>({});

  const [loading, setLoading] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const formIsValid = useMemo(() => {
    return currentSurveyConfig.questionSetting.every((questionItem) => {
      return !!formData[questionItem.name];
    });
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const data = {
        event_key: FUNNEL_SURVEY_MIXPANEL_EVENTNAME[sceneType],
        client_user_id: getClientUserId(true),
        data: {
          ...getBasicInfoForMixpanel(),
          ...formData,
        },
      };
      // 通知后端发送 mixpanel 事件
      await webappPost(APP_API.SEND_MIXPANEL_LOG, {
        info: aesJsonEncrypt(data),
      });
      setSubmitSuccess(true);
      setLoading(false);
    } catch (error) {
      // 即使接口报错也显示提交成功
      console.error(error);
      setSubmitSuccess(true);
      setLoading(false);
    }
  }, [formData, sceneType]);

  useEffect(() => {
    // 如果提交成功了， 5秒后关闭弹窗
    if (submitSuccess) {
      setTimeout(() => {
        closePopup();
      }, 5000);
    }
  }, [submitSuccess, closePopup]);

  return (
    <Paper
      sx={{
        borderRadius: 4,
        width: 440,
        minWidth: 440,
        overflow: 'hidden',
        ...sx,
      }}
    >
      <ResponsiveImage
        alt={sceneType}
        src={
          submitSuccess
            ? '/assets/survey/funnel-survey/submit-success.png'
            : '/assets/survey/funnel-survey/banner.png'
        }
        width={880}
        height={240}
      />
      <Stack p={3}>
        {submitSuccess ? (
          <>
            <Typography
              variant='custom'
              fontSize={24}
              lineHeight={1.4}
              fontWeight={700}
              textAlign='center'
            >
              {t('survey:funnel_survey__submit_success__title')}
            </Typography>
            <Typography
              variant='custom'
              fontSize={14}
              lineHeight={1.5}
              mt={1}
              textAlign='center'
            >
              {t('survey:funnel_survey__submit_success__description')}
            </Typography>
          </>
        ) : (
          <>
            <Typography
              variant='custom'
              fontSize={24}
              lineHeight={1.4}
              fontWeight={700}
              textAlign='center'
            >
              {t(currentSurveyConfig.popupTitle)}
            </Typography>
          </>
        )}

        {submitSuccess ? null : (
          <>
            {currentSurveyConfig.questionSetting.map((questionItem) => (
              <Stack key={questionItem.name} spacing={1}>
                <Typography
                  variant='custom'
                  fontSize={16}
                  lineHeight={1.5}
                  fontWeight={500}
                  mt={3}
                >
                  {t(questionItem.label)}
                </Typography>
                <TextField
                  size='small'
                  multiline
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.shiftKey === false) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                    },
                  }}
                  inputProps={{
                    sx: {
                      fontSize: 16,
                    },
                  }}
                  placeholder={
                    questionItem.meta?.placeholder &&
                    t(questionItem.meta?.placeholder)
                  }
                  value={formData[questionItem.name] || ''}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      [questionItem.name]: e.target.value,
                    }));
                  }}
                />
              </Stack>
            ))}

            <LoadingButton
              variant='contained'
              loading={loading}
              loadingIndicator={
                <Stack
                  direction='row'
                  spacing={1}
                  alignItems='center'
                  sx={{
                    color: 'primary.main',
                    width: 'max-content',
                  }}
                >
                  <CircularProgress size={18} />
                  <Typography
                    variant='custom'
                    fontSize={16}
                    lineHeight={1.5}
                    textAlign='left'
                  >
                    {t('survey:funnel_survey__cta_button__loading_text')}
                  </Typography>
                </Stack>
              }
              disabled={!formIsValid}
              disableElevation
              fullWidth
              onClick={handleSubmit}
              sx={{
                mt: 4,
                minHeight: 48,
                fontSize: 16,
                fontWeight: 700,
                borderRadius: 2,

                [`& .${loadingButtonClasses.loadingIndicator}`]: {
                  position: 'static',
                  transform: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                },
              }}
            >
              {loading ? (
                <></>
              ) : (
                <span>
                  {t('survey:funnel_survey__cta_button__submit_text')}
                </span>
              )}
            </LoadingButton>
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default FunnelSurveyContentRenderer;
