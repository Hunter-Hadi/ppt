import CheckIcon from '@mui/icons-material/Check';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import CustomIcon, { ICustomIconType } from '@/components/CustomIcon';
import { CustomImageBox } from '@/components/CustomImage';
import ProLink from '@/components/ProLink';
import ResponsiveImage from '@/components/ResponsiveImage';
import YoutubePlayerBox from '@/components/YoutubePlayerBox';
import {
  MAXAI_WWW_PROMPT_SHARE_TRACKER_LINK,
  PRIMARY_YOUTUBE_VIDEO_EMBED_URL,
} from '@/global_constants';
import useShareTrackerLink from '@/hooks/useShareTrackerLink';
import ProducthuntHonor from '@/page_components/LandingPage/ProducthuntHonor';
import { getBrowserAgent } from '@/utils/utils';

import CTAInstallButton from '../CTAInstallButton';
/**
 * NOTE:
 * 修改这个组件时需要注意渲染后的 body 高度 (获取高度的方式可以访问当前项目的路由 /embed/introduction)
 * 是否和 maxai_app LandingPageEmbedBox 组件中声明的 STATIC_LANDING_HEIGHT 是否一致
 * @links:
 *  1. https://github.com/simplyfuture/maxai_app/blob/prod/src/components/LandingPageEmbedBox.tsx
 *  2. https://github.com/simplyfuture/usechatgpt_www/blob/prod-zmo-tool/src/page_components/landing_page/LandingPageEmbedBox.tsx
 */

const SocialProof = () => {
  const count = 5;
  return (
    <Stack direction='row' alignItems='center'>
      {Array.from({ length: count }).map((_, index) => (
        <GradeRoundedIcon
          key={index}
          sx={{
            color: '#F5A523',
          }}
        />
      ))}

      <Typography variant={'body1'} fontSize={20} textAlign='center' pl={0.8}>
        Trusted by 400,000+ users
      </Typography>
    </Stack>
  );
};

const AIPowerPanel = () => {
  const providersList = [
    {
      icon: 'ClaudeLogo',
      text: 'Claude',
    },
    {
      icon: 'BardLogo',
      text: 'Bard',
    },
    {
      icon: 'BingLogo',
      text: 'Bing AI',
    },
    {
      icon: 'ChatGPTLogoOutLine',
      text: 'OpenAI API',
    },
  ];
  return (
    <Stack
      p={2}
      bgcolor='#F5F6F7'
      spacing={2}
      alignItems='center'
      width={'100%'}
      boxSizing='border-box'
      borderRadius={1}
    >
      <Typography variant={'h5'} flexShrink={0}>
        Powered by
      </Typography>
      <Box bgcolor='white' width='100%' boxSizing={'border-box'} p={2}>
        <Stack
          direction='row'
          spacing={1.5}
          alignItems='center'
          mb={3}
          justifyContent='center'
        >
          <CustomIcon
            icon='AILogo'
            sx={{
              fontSize: {
                xs: 40,
                sm: 64,
              },
            }}
          />
          <Typography
            variant={'custom'}
            fontSize={{
              xs: 32,
              sm: 48,
            }}
            fontWeight={700}
          >
            ChatGPT
          </Typography>
        </Stack>
        <Stack
          direction={'row'}
          justifyContent={'center'}
          flexWrap={'wrap'}
          spacing={{
            xs: null,
            sm: 4,
          }}
        >
          {providersList.map((provider, index) => (
            <Stack
              key={`provider${index}`}
              direction='row'
              spacing={1}
              alignItems='center'
              sx={{
                justifyContent: 'center',
                width: {
                  xs: '50%',
                  sm: 'auto',
                },
                mb: {
                  xs: index < 2 ? 2 : 0,
                  sm: 0,
                },
                // ml: {
                //   xs: 0,
                //   sm: 4,
                // },
              }}
            >
              <CustomIcon
                icon={provider.icon as ICustomIconType}
                sx={{
                  fontSize: {
                    xs: 24,
                    sm: 32,
                  },
                }}
              />
              <Typography
                variant={'caption'}
                fontSize={{
                  xs: 18,
                  sm: 20,
                }}
              >
                {provider.text}
              </Typography>
              {index !== providersList.length - 1 && (
                <Divider
                  orientation='vertical'
                  flexItem
                  sx={{
                    pl: 3,
                    display: {
                      xs: 'none',
                      sm: 'block',
                    },
                  }}
                />
              )}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

interface IProps {
  showLogo?: boolean;

  iniFrame?: boolean;

  // 临时的参数，主要是为了在 每个板块下面都有一个 cta button
  annoyingButton?: boolean;
}
const HomePageContent: FC<IProps> = ({
  showLogo = true,
  annoyingButton,
  iniFrame,
}) => {
  const { extensionLink, maxaiWebLink, ref } = useShareTrackerLink({
    queryRefEnable: true,
    pathnameRefEnable: false,
    defaultRef: 'homepage',
  });

  const agent = getBrowserAgent();

  const CtaBtn = () => (
    <Box textAlign='center' pt={2}>
      <CTAInstallButton
        trackerLinkProps={{
          queryRefEnable: true,
          pathnameRefEnable: false,
          defaultRef: 'homepage',
        }}
        variant={'contained'}
      />
    </Box>
  );

  return (
    <Stack spacing={2} mx={'auto'} maxWidth={800} my={{ xs: 4, sm: 7 }}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1201,
        }}
      >
        <ProducthuntHonor noDay sx={{ mb: { xs: 4, sm: 0 } }} />
      </Box>
      <Stack alignItems='center' spacing={4} pt={2} pb={14}>
        {showLogo && (
          <ProLink
            href={maxaiWebLink}
            target={iniFrame ? '_blank' : '_self'}
            muiLinkProps={{ title: 'MaxAI.me' }}
          >
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <CustomImageBox width={64} height={64} src={'/logo.svg'} />
              <Typography
                color='text.primary'
                variant='caption'
                component='h1'
                fontSize={48}
                fontWeight={700}
                pr={0.5}
              >
                MaxAI.me
              </Typography>
            </Stack>
          </ProLink>
        )}
        <Typography
          variant={'custom'}
          fontSize={64}
          fontWeight={900}
          textAlign='center'
        >
          Use AI Anywhere Online
        </Typography>
        <AIPowerPanel />
        <SocialProof />

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={2}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <CTAInstallButton
            showAgent='Chrome'
            variant={agent === 'Chrome' ? 'contained' : 'outlined'}
            trackerLinkProps={{
              defaultRef: 'homepage',
              queryRefEnable: true,
              pathnameRefEnable: false,
            }}
          />
          <CTAInstallButton
            showAgent='Edge'
            variant={agent === 'Edge' ? 'contained' : 'outlined'}
            trackerLinkProps={{
              defaultRef: 'homepage',
              queryRefEnable: true,
              pathnameRefEnable: false,
            }}
            sx={{
              width: {
                xs: '100%',
                sm: 'auto',
              },
            }}
          />
        </Stack>
      </Stack>

      <YoutubePlayerBox
        borderRadius={8}
        youtubeLink={PRIMARY_YOUTUBE_VIDEO_EMBED_URL}
      />

      <Typography variant={'h2'} pt={10} id={'how-to-use'} fontSize={22}>
        {`Ask AI anything in the sidebar`}
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        1. Press ⌘/Alt+J anywhere
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        2. The AI chat sidebar will show up on the right
      </Typography>
      <ResponsiveImage
        width={1600}
        height={1160}
        src={'/assets/chrome-extension/1.png'}
        alt={'Fastest access to ChatGPT'}
      />
      {annoyingButton && <CtaBtn />}

      <Typography variant={'h2'} pt={10} fontSize={22}>
        Compose with AI anywhere
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        1. Press ⌘/Alt+J in any doc or text box
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        2. Let AI handle the first draft
      </Typography>
      <ResponsiveImage
        width={1600}
        height={1020}
        src={'/assets/chrome-extension/2.png'}
        alt={'Compose with AI anywhere'}
      />
      {annoyingButton && <CtaBtn />}

      <Typography variant={'h2'} pt={10} fontSize={22}>
        {`Write better with confidence`}
      </Typography>

      <Typography variant={'body1'} fontSize={20}>
        1. Select any text on any website
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        2. Improve writing, fix spelling & grammar, or change tone in one click
      </Typography>
      <ResponsiveImage
        width={1600}
        height={784}
        src={'/assets/chrome-extension/3.png'}
        alt={'Write better with confidence'}
      />
      {annoyingButton && <CtaBtn />}

      <Typography variant={'h2'} pt={10} fontSize={22}>
        {`Read easier and faster`}
      </Typography>
      <Typography variant={'body1'}>
        1. Select any text on any website
      </Typography>
      <Typography variant={'body1'}>
        2. Summarize, explain, translate, or list key takeaways in seconds
      </Typography>
      <ResponsiveImage
        width={1600}
        height={836}
        src={'/assets/chrome-extension/4.png'}
        alt={'Read easier and faster'}
      />
      {annoyingButton && <CtaBtn />}

      <Typography variant={'h2'} pt={10} fontSize={22}>
        {`Reply to any text in seconds`}
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        1. Select any text on any website
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        2. Generate effective and personalized reply in one click
      </Typography>
      <ResponsiveImage
        width={1600}
        height={836}
        src={'/assets/chrome-extension/5.png'}
        alt={'Reply to any text in seconds'}
      />
      {annoyingButton && <CtaBtn />}

      <Typography variant={'h2'} pt={7} fontSize={22}>
        <span>{`Why is `}</span>
        <ProLink
          href={extensionLink}
          sx={{ color: 'inherit' }}
          target='_blank'
          underline={'always'}
        >
          {`MaxAI.me`}
        </ProLink>
        <span>{` Chrome extension the best?`}</span>
      </Typography>
      <Stack
        pt={2}
        spacing={1}
        sx={{
          '& .MuiTypography-root': {
            display: 'flex',
            alignItems: 'baseline',
            gap: 1,
            '& > span': {
              width: 0,
              flex: 1,
            },
            '& .MuiBox-root': {
              position: 'relative',
              top: 3,
              width: 20,
              height: 20,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'primary.main',
              flexShrink: 0,
              '& .MuiSvgIcon-root': {
                fontSize: 16,
                color: '#fff',
              },
            },
          },
        }}
      >
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>The fastest way to use AI anywhere online.</span>
        </Typography>
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>
            Works literally everywhere - ANY text on ANY website, even local PDF
            files.
          </span>
        </Typography>
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>
            One-click to insert or replace selected text with AI-generated
            content.
          </span>
        </Typography>
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>Chat to ask follow-up questions or refine results. </span>
        </Typography>
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>
            Supports all popular AI Providers: ChatGPT, Google Bard, New Bing
            Chat AI, Claude.
          </span>
        </Typography>
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>
            Supports GPT-4, Web Browsing, Code Interpreter, and Plugins through
            your ChatGPT Plus account.
          </span>
        </Typography>
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>
            Supports GPT-4, GPT-3.5-turbo-16k, GPT-4-32k using your OpenAI API
            key.
          </span>
        </Typography>
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>All languages are supported.</span>
        </Typography>
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>100% privacy friendly.</span>
        </Typography>
      </Stack>
      {annoyingButton && <CtaBtn />}

      <Box pt={10} />
      <Stack bgcolor='#f5f5f5' p={2} borderRadius={1} spacing={2}>
        <Typography variant={'h2'} fontSize={24}>
          🎁 Perk: One-Click ChatGPT Prompts
        </Typography>
        <Stack pl={3.4} spacing={2}>
          <Stack spacing={1}>
            <Typography variant={'body1'} fontSize={20}>
              Revolutionize your everyday tasks with One-Click ChatGPT Prompts.
            </Typography>
            <Typography variant={'body1'} fontSize={20}>
              Turn hours-long tasks into minutes using our expanding collection
              of prompts for marketing, sales, copywriting, operation,
              productivity, and customer support.
            </Typography>
          </Stack>
          <Button
            variant='outlined'
            href={`${MAXAI_WWW_PROMPT_SHARE_TRACKER_LINK}?ref=${ref}`}
            target={iniFrame ? '_blank' : '_self'}
            sx={{
              width: {
                sm: 'max-content',
                xs: '100%',
              },
              fontSize: {
                xs: 16,
                sm: 18,
              },
              fontWeight: 600,
            }}
          >
            Get it for free on MaxAI.me/prompts
          </Button>
        </Stack>
      </Stack>

      <Box textAlign='center' pt={10} pb={12}>
        <CTAInstallButton
          variant={'contained'}
          trackerLinkProps={{
            queryRefEnable: true,
            pathnameRefEnable: false,
            defaultRef: 'homepage',
          }}
          iconSize={80}
          sx={{
            width: { xs: '100%', sm: 800 },
            height: { xs: '100%', sm: 128 },
            flexWrap: 'wrap',

            fontSize: 48,
          }}
        />
      </Box>
    </Stack>
  );
};

export default HomePageContent;
