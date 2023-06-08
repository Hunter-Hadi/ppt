import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import SingleSurvey from '@/components/survey/SingleSurvey';
import { USER_API } from '@/utils/api';
import { sendLarkBotMessage } from '@/utils/larkBot';
import { post } from '@/utils/request';
const { getBrowser } = new UAParser();

const InstallPage: FC = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <AppContainer sx={{ bgcolor: '#fff', pt: 4, pb: 10 }}>
      <AppDefaultSeoLayout title={'Uninstall | MaxAI.me'} />
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
            `I don't have a ChatGPT account`,
            `I have privacy concerns`,
            `It wasn't useful for me`,
            `I don't know how to use it`,
            'Text-select-popup shows too often',
            'Too many ChatGPT interruptions/re-logins',
            `Cmd/Alt+J or Text-select-popup isn't working`,
            'It slows down my ChatGPT/browser',
            `It's not free`,
            `I use other AI extensions`,
            `Login is required`,
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
            // submitData.reasons.chromeExtensionVersion = browserVersion;
            await post(USER_API.SAVE_SURVEY_DATA, {
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
              await sendLarkBotMessage(
                'UninstallSurvey',
                `Date: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}${
                  email ? `\nEmail: ${email}` : ''
                }\nReason: ${reasonString}\nBrowser: ${browserName}-${browserVersion}\nChrome Extension: ${chromeExtensionVersion}`,
                {
                  uuid: '5bddd049-128a-497f-a26a-343849140779',
                },
              );
            }
            location.href = 'https://www.maxai.me';
          }}
        />
      )}
    </AppContainer>
  );
};

export default InstallPage;
