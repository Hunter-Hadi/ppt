import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Breadcrumbs,
  Button,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import sanitizeHtml from 'sanitize-html';
import sanitize from 'sanitize-html';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import CopyTypography from '@/components/CopyTypography';
import ProLink from '@/components/ProLink';
import { PromptCardTag, useSharePromptLinks } from '@/features/prompt';
import LiveCrawlingFlag from '@/features/prompt/components/LiveCrawlingFlag';
import RunPromptSettingSelector from '@/features/prompt/components/RunPromptSettingSelector';
import { RENDERED_TEMPLATE_PROMPT_DOM_ID } from '@/features/prompt/constant';
import { RenderedTemplatePromptAtom } from '@/features/prompt/store/runPromptSettings';
import { IPromptCardData, IPromptDetailData } from '@/features/prompt/types';
import { isLiveCrawling } from '@/features/prompt/utils';
import { RESOURCES_URL } from '@/global_constants';
import Custom404 from '@/pages/404';
import { PROMPT_API } from '@/utils/api';
import { objectFilterEmpty } from '@/utils/dataHelper/objectHelper';
import { IResponseData, webappPost } from '@/utils/request';
import { PaginatedData } from '@/utils/usePaginatedQuery';

const sanitizeHtmlOptions = {
  allowedTags: [],
  allowedAttributes: false,
  nonBooleanAttributes: [],
  disallowedTagsMode: 'recursiveEscape',
} as sanitize.IOptions;

const PromptDetailPage: FC<{
  id?: string;
  seo: {
    title: string;
    description: string;
  };
  notFound?: boolean;
  defaultPromptDetail: IPromptDetailData | null;
}> = (props) => {
  const { seo, defaultPromptDetail, notFound, id } = props;
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
            sanitizeHtmlOptions,
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
  const renderedTemplatePrompt = useRecoilValue(RenderedTemplatePromptAtom);

  const copyRenderedTemplatePromptMemo = useMemo(() => {
    if (typeof window !== 'undefined') {
      const div = document.createElement('div');
      div.innerHTML = renderedTemplatePrompt;
      return div.innerText;
    } else {
      return '';
    }
  }, [renderedTemplatePrompt]);

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
              <Typography variant='body2'>Copy link</Typography>
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
  }, [shareLink, twitterShareLink, emailShareLink, facobookShareLink]);

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

            <Stack sx={{ height: '16px' }} />
            <RunPromptSettingSelector
              promptDetail={promptDetail}
              promptId={id as string}
            />
          </Stack>
          {/*<Stack>*/}
          {/*  <p>language: {language}</p>*/}
          {/*  <p>tone: {tone}</p>*/}
          {/*  <p>writingStyle: {writingStyle}</p>*/}
          {/*  <p>prompt: {prompt}</p>*/}
          {/*</Stack>*/}
        </AppContainer>
        <AppContainer>
          {renderedTemplatePrompt && (
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
                <CopyTypography
                  wrapperMode
                  text={copyRenderedTemplatePromptMemo}
                >
                  <Button
                    variant={'outlined'}
                    color={'primary'}
                    startIcon={<ContentCopyIcon fontSize={'inherit'} />}
                  >
                    Copy prompt
                  </Button>
                </CopyTypography>
                <Button
                  variant={'outlined'}
                  color={'primary'}
                  startIcon={<IosShareOutlinedIcon fontSize={'inherit'} />}
                  onClick={(e) => setShareMenuAnchorEl(e.currentTarget)}
                >
                  Share prompt
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
                    __html: renderedTemplatePrompt,
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

export default PromptDetailPage;

// HACK: 临时用的
export const listApiGetAllData = async (
  listApi: (page: number, page_size: number) => Promise<PaginatedData<any>>,
  startPage = 0,
  pageSize = 100,
) => {
  const totalData: any[] = [];
  let page = startPage;
  let data = await listApi(page, pageSize);
  console.log(data.total, data.data.length);
  while (data.data.length > 0) {
    totalData.push(...data.data);
    page++;
    data = await listApi(page, pageSize);
  }
  return totalData;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const list = await listApiGetAllData(
    (page, page_size) =>
      webappPost<PaginatedData<IPromptCardData>>(
        PROMPT_API.SEARCH_PROMPT,
        objectFilterEmpty({
          page,
          page_size,
        }),
      ),
    0,
  );
  const promptIds: string[] = list.map((item) => item.id);
  console.log('promptIds', promptIds.length, promptIds[0], promptIds[1]);
  return {
    paths: promptIds.map((id) => ({
      params: {
        id,
      },
    })),
    fallback: false,
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
    const result = await webappPost<IResponseData<IPromptDetailData>>(
      PROMPT_API.GET_PROMPT_DETAIL,
      { id },
    );
    if (result.data && result.data.prompt_title) {
      const promptDetail = result.data;
      promptDetail.prompt_template = sanitizeHtml(
        promptDetail.prompt_template,
        sanitizeHtmlOptions,
      );
      console.log(JSON.stringify(promptDetail));
      return {
        props: {
          seo: {
            title: `Prompt "${promptDetail.prompt_title}" | MaxAI.me`,
            description: promptDetail.teaser,
          },
          id,
          defaultPromptDetail: promptDetail,
          updatedAt: Date.now(),
        },
      };
    }
  } catch (e) {
    console.log(e);
  }
  console.log('not data found', context.params?.id);
  return {
    props: {
      id: context.params?.id,
      defaultPromptDetail: null,
      seo: {
        title: 'Prompt | MaxAI.me',
        description:
          'Complete your everyday tasks with Prompt Management and 1-Click Prompts in minutes that used to take hours.',
      },
      updatedAt: Date.now(),
    },
  };
};
