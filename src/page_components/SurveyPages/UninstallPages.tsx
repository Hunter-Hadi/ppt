import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import SingleSurvey from '@/components/survey/SingleSurvey';
import { USER_API } from '@/utils/api';
import { sendNotification } from '@/utils/larkBot';
import { webappPost } from '@/utils/request';
const { getBrowser } = new UAParser();

const UninstallPages: FC = () => {
  // const router = useRouter();
  const { t } = useTranslation();
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const openUrlLinkRef = React.useRef('');
  // const useInitUrlLinkRef = React.useRef(false);
  // useEffect(() => {
  //   // TODO 不管query.from是什么，都打开
  //   if ((router.query.from && router.query.from === 'crx') || true) {
  //     if (useInitUrlLinkRef.current) {
  //       return;
  //     }
  //     useInitUrlLinkRef.current = true;
  //     openUrlLinkRef.current =
  //       'https://api.usechatgpt.ai/app/zmo?ref=webchatgpt';
  //     const openWindow = window.open(openUrlLinkRef.current, '_blank');
  //     // NOTE: 因为现在用户有负面反馈，所以先不管用户是否打开了新窗口，都把点击跳转的逻辑删掉
  //     if (openWindow || true) {
  //       openUrlLinkRef.current = '';
  //     }
  //     router.replace({
  //       pathname: router.pathname,
  //       query: {},
  //     });
  //   }
  // }, [router.query]);
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
  return (
    <AppContainer sx={{ bgcolor: '#fff', pt: 4, pb: 10 }}>
      <AppDefaultSeoLayout title={t('seo:uninstall__title')} />
      <Typography variant={'h1'} mb={2} textAlign='center'>
        Help us improve
      </Typography>
      <Typography variant={'body2'} mb={4} textAlign='center'>
        {`It'll just take a minute.`}
      </Typography>
      {domLoaded && (
        <SingleSurvey
          explain
          enableEmail
          randomOptions
          surveyName={'UninstallSurvey'}
          title={'Why did you uninstall MaxAI.me Chrome extension?'}
          surveyType={'checkbox'}
          cancelText={''}
          options={[
            // `I don't have a ChatGPT account`,
            // `I have privacy concerns`,
            `It wasn't useful for me`,
            `I don't know how to use it`,
            // 'Text-select-popup shows too often',
            'Too many ChatGPT interruptions/re-logins',
            // `Cmd/Alt+J or Text-select-popup isn't working`,
            'It slows down my ChatGPT/browser',
            // `It's not free`,
            `I use other AI extensions`,
            // `Login is required`,
          ]}
          disabledInValid
          submitButtonProps={{ width: 400 }}
          onSubmit={async (submitData) => {
            const browserName = getBrowser().name || 'unknown';
            const browserVersion = getBrowser().version || 'unknown';
            const chromeExtensionVersion =
              new URLSearchParams(
                typeof window !== 'undefined' ? window.location.search : '',
              ).get('version') || 'unknown';
            // submitData.reasons.browserName = browserName;
            // submitData.reasons.browserVersion = browserVersion;
            // submitData.reasons.chromeExtensionVersion = chromeExtensionVersion;

            const reasons = submitData.reasons;
            // 遍历 reasons 对象, 给每个key 加上prefix
            Object.keys(reasons).forEach((key) => {
              const browserNamePrefix =
                browserName === 'unknown' ? 'Other' : browserName;
              reasons[
                `[${browserNamePrefix}]-${key}`
              ] = `[${browserNamePrefix}]-${reasons[key]}`;
              delete reasons[key];
            });
            await webappPost(USER_API.SAVE_SURVEY_DATA, {
              survey_name: 'UninstallSurvey',
              survey_data: submitData,
            });
            //open.larksuite.com/open-apis/bot/v2/hook/
            const reasonString = submitData._Reason.toString();
            const email =
              submitData._Email && submitData._Email !== 'unknown'
                ? submitData._Email
                : '';
            if (reasonString) {
              await sendNotification('UninstallSurvey', {
                date: `${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
                email: email || '',
                reason: reasonString,
                extensionVersion: chromeExtensionVersion,
              });
            }
            location.href = 'https://www.maxai.me';
          }}
        />
      )}
    </AppContainer>
  );
};

export default UninstallPages;
