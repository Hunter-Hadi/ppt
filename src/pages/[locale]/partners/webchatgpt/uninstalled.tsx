import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import UAParser from 'ua-parser-js';

import HomePageContent from '@/features/landing/components/HomePageContent';
import WebChatGPTSingleSurvey from '@/features/webchatgpt/components/Survey';
import WebChatGPTSurveyExplain from '@/features/webchatgpt/components/Survey/SurveyExplain';
import { UNINSTALL_SURVET_NAME } from '@/features/webchatgpt/constant';
import WebChatGPTHeader from '@/features/webchatgpt/layout/WebChatGPTHeader';
import { makeStaticProps } from '@/i18n/utils/staticHelper';
import FixedCtaButton from '@/page_components/PartnersPages/components/FixedCtaButton';
import TryExtensionButton from '@/page_components/PartnersPages/components/TryExtensionButton';
import { USER_API } from '@/utils/api';
import { post } from '@/utils/crx_request';
import { sendLarkBotMessage } from '@/utils/larkBot';
const { getBrowser } = new UAParser();

const WebChatGPTUninstalled = () => {
  const propRef = 'webchatgpt_uninstall';

  const router = useRouter();
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const openUrlLinkRef = React.useRef('');
  const useInitUrlLinkRef = React.useRef(false);
  useEffect(() => {
    // TODO 不管query.from是什么，都打开
    if ((router.query.from && router.query.from === 'crx') || true) {
      if (useInitUrlLinkRef.current) {
        return;
      }
      useInitUrlLinkRef.current = true;
      openUrlLinkRef.current = 'https://api.maxai.me/app/zmo?ref=webchatgpt';
      const openWindow = window.open(openUrlLinkRef.current, '_blank');
      // NOTE: 因为现在用户有负面反馈，所以先不管用户是否打开了新窗口，都把点击跳转的逻辑删掉
      if (openWindow || true) {
        openUrlLinkRef.current = '';
      }
      router.replace({
        pathname: router.pathname,
        query: {},
      });
    }
  }, [router.query]);
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
    <Stack>
      <WebChatGPTHeader />
      <Stack
        bgcolor={'#F8F9FA'}
        alignItems={'center'}
        justifyContent={'center'}
        py={{
          xs: 2,
          md: 4,
          xxl: 8,
        }}
        pb={{
          xs: 4,
          md: 8,
          xxl: 16,
        }}
        sx={{
          position: 'relative',
        }}
      >
        <Typography variant={'h1'} mb={2} textAlign='center'>
          Help us improve
        </Typography>
        <Typography variant={'body2'} mb={4} textAlign='center'>
          {`It'll just take a minute.`}
        </Typography>
        {domLoaded && (
          <WebChatGPTSingleSurvey
            hiddenSubmitWithoutSelected
            explain
            ExplainComponent={WebChatGPTSurveyExplain}
            enableEmail
            randomOptions
            surveyName={'UninstallSurvey'}
            title={'Why did you uninstall WebChatGPT?'}
            surveyType={'checkbox'}
            cancelText={''}
            checkBoxSx={{
              p: '5px',
              color: 'rgba(0, 0, 0, 0.87)',
              '&.Mui-checked': {
                color: 'rgba(0, 0, 0, 0.87)',
              },
            }}
            options={[
              // `Privacy concerns`,
              `Not useful for me`,
              `I don't know how to use it`,
              `It slows down my ChatGPT`,
              `Extension not working (technical issue)`,
              // 'ChatGPT Plus has Web Browsing',
            ]}
            disabledInValid
            submitButtonProps={{
              width: 400,
              bgcolor: 'rgba(0, 0, 0, 0.87)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.77)',
              },
              color: '#fff',
            }}
            onSubmit={async (submitData) => {
              const browserName = getBrowser().name || 'Other';
              const reasons = submitData.reasons;
              // 遍历 reasons 对象, 给每个key 加上prefix
              Object.keys(reasons).forEach((key) => {
                reasons[
                  `[${browserName}]-${key}`
                ] = `[${browserName}]-${reasons[key]}`;
                delete reasons[key];
              });
              await post(USER_API.SAVE_SURVEY_DATA, {
                survey_name: UNINSTALL_SURVET_NAME,
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
                  }\nReason: ${reasonString}`,
                  {
                    uuid: '5bddd049-128a-497f-a26a-343849140779',
                  },
                );
              }

              router.push(`/`);
            }}
          />
        )}

        <TryExtensionButton
          propRef={propRef}
          sx={{
            bottom: -24,
            top: 'unset',
          }}
        />
      </Stack>
      <Box pb={11}>
        <HomePageContent propRef={propRef} />
        <FixedCtaButton propRef={propRef} partnerPageType='uninstalled' />
      </Box>
    </Stack>
  );
};

export default WebChatGPTUninstalled;

const getStaticProps = makeStaticProps();
export { getStaticProps };
