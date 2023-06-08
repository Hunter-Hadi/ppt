import CheckIcon from '@mui/icons-material/Check';
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { FC, useEffect } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import CustomIcon from '@/components/CustomIcon';
import { CustomImageBox } from '@/components/CustomImage';
import ProLink from '@/components/ProLink';
import ResponsiveImage from '@/components/ResponsiveImage';
import YoutubePlayerBox from '@/components/YoutubePlayerBox';
import {
  APP_EXTERNAL_LINKS,
  INSTALL_LINK,
  PRIMARY_YOUTUBE_VIDEO_EMBED_URL,
} from '@/global_constants';
import ProducthuntHonor from '@/page_components/landing_page/ProducthuntHonor';

export const HomePageContent: FC<{ installLink?: string }> = ({
  installLink,
}) => (
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
    <Stack alignItems='center' spacing={4} pb={2}>
      <ProLink
        href={{
          pathname: '/',
        }}
        target={'_self'}
        muiLinkProps={{ title: 'MaxAI.me' }}
      >
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <CustomImageBox width={64} height={64} src={'/logo.svg'} />
          <Typography
            color='text.primary'
            variant='caption'
            component='h1'
            fontSize={40}
            fontWeight={800}
          >
            MaxAI.me
          </Typography>
        </Stack>
      </ProLink>
      <Typography variant={'h1'} fontSize={32}>
        Free AI Copilot for the Web <br />
      </Typography>
      <Typography
        component='h1'
        variant='h1'
        fontSize={42}
        mt={'8px !important'}
      >
        Supports{` `}
        <CustomIcon icon='ChatGPTLogo' sx={{ fontSize: 28 }} /> ChatGPT ,{' '}
        <CustomIcon icon='BardLogo' sx={{ fontSize: 28 }} /> Bard ,{' '}
        <CustomIcon icon='BingLogo' sx={{ fontSize: 28 }} /> Bing ,{' '}
        <CustomIcon icon='ClaudeLogo' sx={{ fontSize: 28 }} /> Claude
      </Typography>
      <Typography variant={'body1'} fontSize={20} textAlign='center'>
        MaxAI.me (Plugins & GPT-4), Bard, Bing Chat, and Claude on any website
        without copy-pasting. Write, rewrite, summarize, translate, explain, or
        reply to any text everywhere with one click.
      </Typography>

      <ProLink
        target={'_blank'}
        href={installLink ?? `${INSTALL_LINK}?ref=homepage`}
      >
        <Button
          startIcon={<CustomIcon icon={'Chrome'} />}
          variant={'contained'}
          sx={{
            width: { xs: '100%', sm: 300 },
            height: 56,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          {`Add to Chrome — It's free`}
        </Button>
      </ProLink>
    </Stack>

    <YoutubePlayerBox
      borderRadius={8}
      youtubeLink={PRIMARY_YOUTUBE_VIDEO_EMBED_URL}
    />

    <Typography variant={'h2'} pt={10} id={'how-to-use'} fontSize={22}>
      {`Fastest way to access ChatGPT, Bard, Bing Chat, and Claude`}
    </Typography>
    <Typography variant={'body1'} fontSize={20}>
      1. Simply press Cmd/Alt + J
    </Typography>
    <Typography variant={'body1'} fontSize={20}>
      2. The AI chat sidebar will show up on the right
    </Typography>

    <ResponsiveImage
      width={800}
      height={418}
      src={'/assets/chrome-extension/4.png'}
      alt={'Fastest access to ChatGPT'}
    />

    <Typography variant={'h2'} pt={10} fontSize={22}>
      {`Write better with confidence`}
    </Typography>

    <Typography variant={'body1'} fontSize={20}>
      1. Select any text on any website
    </Typography>
    <Typography variant={'body1'} fontSize={20}>
      2. Rewrite in one click
    </Typography>
    <ResponsiveImage
      width={800}
      height={392}
      src={'/assets/chrome-extension/2.png'}
      alt={'Write better with confidence'}
    />
    <Typography variant={'h2'} pt={10} fontSize={22}>
      {`Read easier and faster`}
    </Typography>

    <Typography variant={'body1'}>1. Select any text on any website</Typography>
    <Typography variant={'body1'}>
      2. Summarize, translate, or explain in one click
    </Typography>
    <ResponsiveImage
      width={800}
      height={418}
      src={'/assets/chrome-extension/3.png'}
      alt={'Read easier and faster'}
    />

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
      width={800}
      height={418}
      src={'/assets/chrome-extension/7.png'}
      alt={'Reply to any text in seconds'}
    />

    <Typography variant={'h2'} pt={7} fontSize={22}>
      <span>{`Why is `}</span>
      <ProLink
        href={installLink ?? APP_EXTERNAL_LINKS.CHROME_EXTENSION}
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
        <span>Works literally everywhere - ANY text on ANY website.</span>
      </Typography>
      <Typography variant={'body1'} component={'div'} fontSize={20}>
        <Box>
          <CheckIcon />
        </Box>
        <span style={{ whiteSpace: 'nowrap' }}>
          Supports all popular AI Providers: ChatGPT, OpenAI API key, Google
          Bard, Bing Chat, Claude.
        </span>
      </Typography>
      <Typography variant={'body1'} component={'div'} fontSize={20}>
        <Box>
          <CheckIcon />
        </Box>
        <span>Supports ChatGPT Plus: Plugins & GPT-4.</span>
      </Typography>
      <Typography variant={'body1'} component={'div'} fontSize={20}>
        <Box>
          <CheckIcon />
        </Box>
        <span>Robust connection to your ChatGPT account.</span>
      </Typography>
      <Typography variant={'body1'} component={'div'} fontSize={20}>
        <Box>
          <CheckIcon />
        </Box>
        <span style={{ whiteSpace: 'nowrap' }}>
          Ask questions. Chat to refine results. Get comprehensive answers and
          creative inspiration.
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
        <span>Absolutely free.</span>
      </Typography>
      <Typography variant={'body1'} component={'div'} fontSize={20}>
        <Box>
          <CheckIcon />
        </Box>
        <span>100% privacy friendly.</span>
      </Typography>
    </Stack>
    <Typography variant={'h2'} pt={10} fontSize={22}>
      {`How to use on any website`}
    </Typography>
    <Typography variant={'body1'} fontSize={20}>
      <span>{`1. Install `}</span>
      <ProLink
        href={installLink ?? APP_EXTERNAL_LINKS.CHROME_EXTENSION}
        sx={{ color: 'inherit' }}
        underline={'always'}
        target='_blank'
      >
        {`MaxAI.me`}
      </ProLink>
      <span>{` Chrome extension.`}</span>
    </Typography>
    <Typography variant={'body1'} fontSize={20}>
      {`2. Select any text on any page.`}
    </Typography>
    <Typography variant={'body1'} fontSize={20}>
      3. One-click rewrite, summarize, translate, explain, or reply to the
      selected text.
    </Typography>
    <ResponsiveImage
      width={800}
      height={450}
      src={'/assets/chrome-extension/5.png'}
      alt={'MaxAI.me chrome-extension all site useage 1'}
    />
    <Typography variant={'body1'} fontSize={20}>
      {`4. Chat to ask further questions or refine results if you'd like.`}
    </Typography>
    <ResponsiveImage
      width={800}
      height={630}
      src={'/assets/chrome-extension/6.png'}
      alt={'MaxAI.me chrome-extension all site useage 2'}
    />
  </Stack>
);

const ChromeExtensionPage = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, []);
  return (
    <AppContainer sx={{ bgcolor: '#fff' }}>
      <AppDefaultSeoLayout />
      <HomePageContent />
    </AppContainer>
  );
};
export default ChromeExtensionPage;
