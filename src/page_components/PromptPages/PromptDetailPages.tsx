import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import SendIcon from '@mui/icons-material/Send';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Breadcrumbs,
  Button,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import sanitizeHtml from 'sanitize-html';
import sanitize from 'sanitize-html';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import CopyTypography from '@/components/CopyTypography';
import ProLink from '@/components/ProLink';
import { webPageRunMaxAIShortcuts } from '@/features/common/utils/postMessageToCRX';
import useExtensionUpdateRemindDialogState from '@/features/extension/hooks/useExtensionUpdateRemindDialog';
import { ChromeExtensionDetectorState } from '@/features/extension/store';
import { PromptCardTag, useSharePromptLinks } from '@/features/prompt';
import LiveCrawlingFlag from '@/features/prompt/components/LiveCrawlingFlag';
import { RENDERED_TEMPLATE_PROMPT_DOM_ID } from '@/features/prompt/constant';
import { IPromptDetailData, IPromptVariable } from '@/features/prompt/types';
import {
  generateVariableHtmlContent,
  isLiveCrawling,
  renderTemplate,
} from '@/features/prompt/utils';
import usePromptLibraryAuth from '@/features/prompt_library/hooks/usePromptLibraryAuth';
import { promptLibraryCardDetailDataToActions } from '@/features/shortcuts/utils/promptInterpreter';
import { RESOURCES_URL } from '@/global_constants';
import Custom404 from '@/pages/404';
import { PROMPT_API } from '@/utils/api';
import { generateRandomColorWithTheme } from '@/utils/dataHelper/colorHelper';
import { IResponseData, webappPost } from '@/utils/request';

const PromptDetailPages: FC<{
  id?: string;
  seo: {
    title: string;
    description: string;
  };
  notFound?: boolean;
  defaultPromptDetail: IPromptDetailData | null;
}> = (props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { seo, defaultPromptDetail, notFound, id } = props;
  const {
    checkMaxAIChromeExtensionInstall,
    setMaxAIChromeExtensionInstallHandler,
  } = usePromptLibraryAuth();
  const { checkIsInstalled } = useRecoilValue(ChromeExtensionDetectorState);
  const {
    isExtensionVersionGreaterThanRequiredVersion,
    openUpdateRemindDialog,
  } = useExtensionUpdateRemindDialogState();
  useEffect(() => {
    setMaxAIChromeExtensionInstallHandler(async () => {
      // 1. 先判断是否安装了插件
      // 2. 如果安装了插件，判断插件的版本是否大于 2.4.7
      // 3. 如果大于 2.4.7 ，返回 true
      // 4. 如果小于 2.4.7 ，弹出提示框，返回 false
      const isInstallExtension = checkIsInstalled();
      if (isInstallExtension) {
        if (isExtensionVersionGreaterThanRequiredVersion('2.4.7')) {
          return true;
        } else {
          openUpdateRemindDialog();
          return false;
        }
      } else {
        return false;
      }
    });
  }, [
    checkIsInstalled,
    isExtensionVersionGreaterThanRequiredVersion,
    openUpdateRemindDialog,
  ]);
  const [loaded, setLoaded] = useState<boolean>(
    defaultPromptDetail?.prompt_template !== undefined,
  );
  const [promptDetail, setPromptDetail] = useState<IPromptDetailData | null>(
    defaultPromptDetail,
  );
  useEffect(() => {
    webappPost<IResponseData<IPromptDetailData>>(PROMPT_API.GET_PROMPT_DETAIL, {
      id,
    })
      .then((result) => {
        if (result.data && result.data.prompt_title) {
          const promptDetail = result.data;
          promptDetail.prompt_template = sanitizeHtml(
            promptDetail.prompt_template,
            {
              allowedTags: [],
              allowedAttributes: false,
              nonBooleanAttributes: [],
              disallowedTagsMode: 'recursiveEscape',
            } as sanitize.IOptions,
          );
          setPromptDetail(promptDetail);
        }
      })
      .catch((e) => {
        console.log('csr get data error: \t', e);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [id]);

  const renderedTemplatePromptMemo = useMemo(() => {
    const { prompt_template = '', variables = [] } = promptDetail || {};

    const moreVariables = variables.reduce((pre, cur) => {
      pre[cur.name] = generateVariableHtmlContent(
        {
          name: `{{${cur.name}}}`,
          color: generateRandomColorWithTheme(
            cur.name,
            theme.palette.mode === 'dark',
          ),
        } as IPromptVariable,
        false,
        false,
      );
      return pre;
    }, {} as Record<string, any>);
    const result = renderTemplate(prompt_template, {
      ...moreVariables,
    });
    return result.data;
  }, [promptDetail, theme.palette.mode]);

  const [shareMenuAnchorEl, setShareMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const { shareLink, twitterShareLink, emailShareLink, facobookShareLink } =
    useSharePromptLinks(promptDetail?.id, promptDetail?.prompt_title);

  const isLiveCrawlingFlag = isLiveCrawling(promptDetail?.variables);

  const shareMenuList = useMemo(() => {
    return [
      {
        id: 'copy link',
        content: (
          <CopyTypography wrapperMode text={shareLink}>
            <Stack direction='row' alignItems='center' gap={1} fontSize={16}>
              <ContentCopyIcon fontSize={'inherit'} />
              <Typography variant='body2'>
                {t('pages:prompt_detail_page__button__copy_link')}
              </Typography>
            </Stack>
          </CopyTypography>
        ),
      },
      {
        id: 'Email',
        content: (
          <ProLink
            href={emailShareLink}
            target='_blank'
            sx={{
              color: 'inherit',
            }}
          >
            <Stack direction='row' alignItems='center' gap={1} fontSize={16}>
              <EmailOutlinedIcon fontSize={'inherit'} />

              <Typography variant='body2'>Email</Typography>
            </Stack>
          </ProLink>
        ),
      },
      {
        id: 'Twitter',
        content: (
          <ProLink
            href={twitterShareLink}
            target='_blank'
            sx={{
              color: 'inherit',
            }}
          >
            <Stack direction='row' alignItems='center' gap={1} fontSize={16}>
              <TwitterIcon fontSize={'inherit'} />
              <Typography variant='body2'>Twitter</Typography>
            </Stack>
          </ProLink>
        ),
      },
      {
        id: 'Facebook',
        content: (
          <ProLink
            href={facobookShareLink}
            target='_blank'
            sx={{
              color: 'inherit',
            }}
          >
            <Stack direction='row' alignItems='center' gap={1} fontSize={16}>
              <FacebookOutlinedIcon fontSize={'inherit'} />
              <Typography variant='body2'>Facebook</Typography>
            </Stack>
          </ProLink>
        ),
      },
    ];
  }, [shareLink, twitterShareLink, emailShareLink, facobookShareLink, t]);

  const handleShareMenuClose = () => {
    setShareMenuAnchorEl(null);
  };

  if (notFound || (loaded && !promptDetail)) {
    return <Custom404 />;
  }

  return (
    <Stack
      sx={{
        flex: 1,
        minHeight: 'calc(100% - 65px)',
      }}
    >
      <AppLoadingLayout loading={!loaded}>
        <AppContainer
          sx={{
            bgcolor: '#fff',
            minHeight: 'unset',
            flex: 'unset',
            flexShrink: 0,
            mb: 4,
          }}
        >
          <AppDefaultSeoLayout
            title={seo?.title}
            description={seo?.description}
            openGraph={{
              images: [
                {
                  url: `${RESOURCES_URL}/prompt_imgs/${id}.png`,
                },
              ],
            }}
          />
          <Breadcrumbs
            aria-label='breadcrumb'
            sx={{
              my: 2,
              fontSize: 14,
              '.MuiBreadcrumbs-separator': {
                fontSize: 14,
                mt: '5px',
              },
            }}
          >
            <ProLink
              underline={'hover'}
              href={'/prompts'}
              sx={{ fontSize: 14, color: 'text.secondary' }}
            >
              Prompts
            </ProLink>
            <Typography variant={'custom'} fontSize={14} color='text.primary'>
              {promptDetail?.prompt_title}
            </Typography>
          </Breadcrumbs>
          <Stack spacing={2}>
            <Typography
              variant={'custom'}
              fontSize={32}
              lineHeight={1.25}
              component={'h2'}
            >
              {promptDetail?.prompt_title}
            </Typography>
            <Typography
              variant={'custom'}
              color={'text.secondary'}
              fontSize={16}
              sx={{
                MozBoxOrient: 'vertical',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: `2`,
                boxOrient: 'vertical',
                lineClamp: `2`,
                display: '-webkit-box',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
              }}
            >
              {isLiveCrawlingFlag && <LiveCrawlingFlag />}
              {promptDetail?.teaser}
            </Typography>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <PromptCardTag
                tag={`${promptDetail?.category}${
                  promptDetail?.use_case ? ` / ${promptDetail?.use_case}` : ''
                }`}
              />
            </Stack>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'end'}
            >
              <Button
                sx={{ flexShrink: 0, height: 45 }}
                variant={'contained'}
                color={'primary'}
                startIcon={<SendIcon fontSize={'inherit'} />}
                onClick={async () => {
                  if (promptDetail) {
                    if (await checkMaxAIChromeExtensionInstall()) {
                      webPageRunMaxAIShortcuts(
                        promptLibraryCardDetailDataToActions(promptDetail),
                      );
                    }
                  }
                }}
              >
                {t('pages:prompt_detail_page__button__run_this_prompt')}
              </Button>
            </Stack>
          </Stack>
          {/*<Stack>*/}
          {/*  <p>language: {language}</p>*/}
          {/*  <p>tone: {tone}</p>*/}
          {/*  <p>writingStyle: {writingStyle}</p>*/}
          {/*  <p>prompt: {prompt}</p>*/}
          {/*</Stack>*/}
        </AppContainer>
        <AppContainer>
          {promptDetail?.prompt_template && (
            <Stack my={1} mb={4} position={'relative'}>
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'end'}
                sx={{
                  height: 56,
                  position: 'sticky',
                  top: {
                    '@media (max-width: 320px)': {
                      top: 82,
                    },
                    xs: 82,
                    sm: 64,
                  },
                  zIndex: 1,
                  bgcolor: 'pageBackground',
                }}
                spacing={1}
              >
                <CopyTypography wrapperMode text={promptDetail.prompt_template}>
                  <Button
                    variant={'outlined'}
                    color={'primary'}
                    startIcon={<ContentCopyIcon fontSize={'inherit'} />}
                  >
                    {t('pages:prompt_detail_page__button__copy_prompt')}
                  </Button>
                </CopyTypography>
                <Button
                  variant={'outlined'}
                  color={'primary'}
                  startIcon={<IosShareOutlinedIcon fontSize={'inherit'} />}
                  onClick={(e) => setShareMenuAnchorEl(e.currentTarget)}
                >
                  {t('pages:prompt_detail_page__button__share_prompt')}
                </Button>
                <Menu
                  anchorEl={shareMenuAnchorEl}
                  open={Boolean(shareMenuAnchorEl)}
                  onClose={handleShareMenuClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {shareMenuList.map((item) => (
                    <MenuItem onClick={handleShareMenuClose} key={item.id}>
                      {item.content}
                    </MenuItem>
                  ))}
                </Menu>
              </Stack>
              <Typography
                component={'div'}
                id={RENDERED_TEMPLATE_PROMPT_DOM_ID}
                variant={'body1'}
                sx={{
                  whiteSpace: 'pre-line',
                  color: 'text.primary',
                  wordBreak: 'break-word',
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderedTemplatePromptMemo,
                  }}
                ></div>
              </Typography>
            </Stack>
          )}
        </AppContainer>
      </AppLoadingLayout>
    </Stack>
  );
};

export default PromptDetailPages;
