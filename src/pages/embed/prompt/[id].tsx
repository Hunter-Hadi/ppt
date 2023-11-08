import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SendIcon from '@mui/icons-material/Send';
import { Button, Stack, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { FC, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import CopyTypography from '@/components/CopyTypography';
import { useRunThisPrompt } from '@/features/prompt';
import { RENDERED_TEMPLATE_PROMPT_DOM_ID } from '@/features/prompt/constant';
import { IPromptDetailData } from '@/features/prompt/types';
import Custom404 from '@/pages/404';
import { ChromeExtensionDetectorState } from '@/store';
import { PROMPT_API } from '@/utils/api';
import { IResponseData, post } from '@/utils/request';
import { renderTemplate } from '@/utils/utils';
const PromptDetailPage: FC<{
  seo: {
    title: string;
    description: string;
  };
  notFound?: boolean;
  promptDetail: IPromptDetailData | null;
}> = (props) => {
  const { seo, promptDetail, notFound } = props;
  const router = useRouter();
  const { checkIsInstalled } = useRecoilValue(ChromeExtensionDetectorState);
  const { runThisPrompt } = useRunThisPrompt();
  const [renderedTemplatePrompt, setRenderedTemplatePrompt] = useState('');
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('');
  const [writingStyle, setWritingStyle] = useState('');
  const [language, setLanguage] = useState('English');
  const [error, setError] = useState('');
  useEffect(() => {
    generate();
  }, []);
  if (notFound || !promptDetail) {
    return <Custom404 />;
  }
  const generate = async () => {
    if (!promptDetail?.prompt_template) {
      return;
    }
    setError('');
    let promptToneAndWritingStyle =
      promptDetail?.optional_prompt_template || '';
    if (String(tone + writingStyle).trim() === '') {
      // not select tone and writing style
      promptToneAndWritingStyle = '';
    }
    if (promptToneAndWritingStyle) {
      if (!promptToneAndWritingStyle.startsWith('\n')) {
        promptToneAndWritingStyle = '\n' + promptToneAndWritingStyle;
      }
    }
    const result = renderTemplate(
      promptDetail.prompt_template + promptToneAndWritingStyle,
      {
        TONE: String(tone || '').toLowerCase(),
        TARGET_LANGUAGE: language,
        WRITTINGSTYLE: String(writingStyle || '').toLowerCase(),
        PROMPT: prompt,
      },
    );
    if (result.data && !result.error) {
      console.log(result.data);
      console.log(promptDetail.prompt_template);
      setRenderedTemplatePrompt(result.data);
    } else {
      setError(result.error);
    }
  };
  const handleRunThisPrompt = async () => {
    if (!checkIsInstalled()) {
      return;
    }
    await runThisPrompt(`#${RENDERED_TEMPLATE_PROMPT_DOM_ID}`);
  };
  return (
    <Stack
      sx={{
        width: '100%',
        height: '100vh',
      }}
    >
      <AppLoadingLayout loading={!renderedTemplatePrompt}>
        {renderedTemplatePrompt && (
          <Stack
            p={1}
            position={'relative'}
            height={0}
            flex={1}
            sx={{
              overflowY: 'auto',
            }}
          >
            <Typography
              id={RENDERED_TEMPLATE_PROMPT_DOM_ID}
              variant={'body1'}
              sx={{
                whiteSpace: 'pre-line',
                color: 'text.primary',
                wordBreak: 'break-word',
              }}
            >
              {renderedTemplatePrompt || error}
            </Typography>
          </Stack>
        )}
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'end'}
          sx={{
            p: 1,
            flexShrink: 0,
            height: 56,
            zIndex: 1,
            bgcolor: 'pageBackground',
          }}
          spacing={1}
        >
          <CopyTypography wrapperMode text={renderedTemplatePrompt}>
            <Button
              variant={'outlined'}
              color={'primary'}
              startIcon={<ContentCopyIcon fontSize={'inherit'} />}
            >
              Copy prompt
            </Button>
          </CopyTypography>
          <Button
            sx={{ flexShrink: 0 }}
            variant={'contained'}
            color={'primary'}
            startIcon={<SendIcon fontSize={'inherit'} />}
            onClick={handleRunThisPrompt}
          >
            Run this prompt
          </Button>
        </Stack>
      </AppLoadingLayout>
    </Stack>
  );
};

export default PromptDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const params = context.params as ParsedUrlQuery;
    const id = params?.id;
    if (!id) {
      // jump to 404
      return {
        notFound: true,
      };
    }
    const result = await post<IResponseData<IPromptDetailData>>(
      PROMPT_API.GET_PROMPT_DETAIL,
      { id },
    );
    if (result.data && result.data.prompt_title) {
      const promptDetail = result.data;
      console.log(JSON.stringify(promptDetail));
      return {
        props: {
          seo: {
            title: `Prompt "${promptDetail.prompt_title}" | MaxAI.me`,
            description: promptDetail.teaser,
          },
          promptDetail,
          updatedAt: Date.now(),
        },
        revalidate: 86400,
      };
    }
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      promptDetail: null,
      seo: {
        title: 'Prompt | MaxAI.me',
        description:
          'Complete your everyday tasks with Prompt Management and 1-Click Prompts in minutes that used to take hours.',
      },
      updatedAt: Date.now(),
    },
    revalidate: 1,
  };
};
