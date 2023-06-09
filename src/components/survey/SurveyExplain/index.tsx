import { Box, Button, Stack, SxProps, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';

import CopyTypography from '@/components/CopyTypography';
import CustomIcon from '@/components/CustomIcon';
import { CustomImageBox } from '@/components/CustomImage';
import ProLink from '@/components/ProLink';
import ResponsiveImage from '@/components/ResponsiveImage';
import YoutubePlayerBox from '@/components/YoutubePlayerBox';
import { PRIMARY_YOUTUBE_VIDEO_EMBED_URL } from '@/global_constants';
import { useInstallChromeExtensionLink } from '@/hooks';
import AIProviderDescription from '@/page_components/AIProviderDescription';

interface IProps {
  surveyName?: string;
  sx?: SxProps;
}

const SurveyExplain: FC<IProps> = (props) => {
  const { sx, surveyName } = props;
  const { installChromeExtensionLink } = useInstallChromeExtensionLink();

  const sxCache = useMemo<SxProps>(() => {
    return {
      alignItems: 'center',
      px: 4,
      ...sx,
    };
  }, [sx]);

  const content = useMemo(() => {
    if (surveyName === `I don't have a ChatGPT account`) {
      return (
        <>
          <Typography
            color='text.primary'
            variant='custom'
            component='h1'
            fontSize={24}
            fontWeight={800}
            sx={{
              display: {
                xs: 'none',
                sm: 'inline',
              },
            }}
          >
            {surveyName}
          </Typography>
          <Typography variant={'body2'} textAlign='center'>
            {`You don't need a ChatGPT account to use our extension. We also
            provide Free AI to power the extension, with no country
            restrictions. All you need to do is select "Free AI" as the AI
            Provider at the top of the sidebar.`}
          </Typography>
          <ResponsiveImage
            width={656}
            height={382}
            alt={surveyName}
            src='/assets/survey/1.png'
          />
        </>
      );
    }
    if (surveyName === `I have privacy concerns`) {
      return (
        <>
          <Typography
            color='text.primary'
            variant='custom'
            component='h1'
            fontSize={24}
            fontWeight={800}
            sx={{
              display: {
                xs: 'none',
                sm: 'inline',
              },
            }}
          >
            {surveyName}
          </Typography>
          <Typography variant={'body2'} textAlign='center'>
            Your privacy is our top priority. We only collect your name and
            email for login and settings sync, keeping it confidential and not
            sharing it with anyone else. Please refer to our{' '}
            <ProLink href='/privacy' target='_blank'>
              Privacy Policy
            </ProLink>{' '}
            for more details.
          </Typography>
          <ResponsiveImage
            width={656}
            height={204}
            alt={surveyName}
            src='/assets/survey/2.png'
          />
        </>
      );
    }
    if (surveyName === `It wasn't useful for me`) {
      return (
        <>
          <Typography
            color='text.primary'
            variant='custom'
            component='h1'
            fontSize={24}
            fontWeight={800}
            sx={{
              display: {
                xs: 'none',
                sm: 'inline',
              },
            }}
          >
            {surveyName}
          </Typography>
          <Typography variant={'body2'} textAlign='center'>
            We believe our extension can always benefit you in some way, you
            just need to discover it. Kindly check out our short video to get
            inspiration for how it can be useful for you.
          </Typography>
          <YoutubePlayerBox
            borderRadius={8}
            youtubeLink={PRIMARY_YOUTUBE_VIDEO_EMBED_URL}
          />
        </>
      );
    }
    if (surveyName === `I don't know how to use it`) {
      return (
        <>
          <Typography
            color='text.primary'
            variant='custom'
            component='h1'
            fontSize={24}
            fontWeight={800}
            sx={{
              display: {
                xs: 'none',
                sm: 'inline',
              },
            }}
          >
            {surveyName}
          </Typography>
          <Typography variant={'body2'} textAlign='center'>
            Our extension is actually extremely easy and intuitive to use.
            Kindly check out our short video to quickly learn how to use the
            extension.
          </Typography>
          <YoutubePlayerBox
            borderRadius={8}
            youtubeLink={PRIMARY_YOUTUBE_VIDEO_EMBED_URL}
          />
        </>
      );
    }
    if (surveyName === `Text-select-popup shows too often`) {
      return (
        <>
          <Typography
            color='text.primary'
            variant='custom'
            component='h1'
            fontSize={24}
            fontWeight={800}
            sx={{
              display: {
                xs: 'none',
                sm: 'inline',
              },
            }}
          >
            {surveyName}
          </Typography>
          <Typography variant={'body2'} textAlign='center'>
            You can easily hide the text-select-popup with a few clicks.
          </Typography>
          <ResponsiveImage
            width={656}
            height={268}
            alt={surveyName}
            src='/assets/survey/3.png'
          />
        </>
      );
    }
    if (surveyName === `Too many ChatGPT interruptions/re-logins`) {
      return (
        <>
          <Typography
            color='text.primary'
            variant='custom'
            component='h1'
            fontSize={24}
            fontWeight={800}
            sx={{
              display: {
                xs: 'none',
                sm: 'inline',
              },
            }}
          >
            {surveyName}
          </Typography>
          <Typography variant={'body2'} textAlign='center'>
            {`ChatGPT itself is sometimes unstable, which results in frequent
            interruptions or re-logins. However, you can easily resolve this by
            enabling our "ChatGPT stable mode", which stabilizes both our
            extension and ChatGPT web page experiences!`}
          </Typography>
          <ResponsiveImage
            width={656}
            height={280}
            alt={surveyName}
            src='/assets/survey/4.png'
          />
        </>
      );
    }
    if (surveyName === `Cmd/Alt+J or Text-select-popup isn't working`) {
      return (
        <>
          <Typography
            color='text.primary'
            variant='custom'
            component='h1'
            fontSize={24}
            fontWeight={800}
            sx={{
              display: {
                xs: 'none',
                sm: 'inline',
              },
            }}
          >
            {surveyName}
          </Typography>
          <Typography variant={'body2'} textAlign='center' sx={{ px: 0 }}>
            Usually you just need to refresh the page once to resolve this
            issue. If Cmd/Alt+J is still not working after the page refresh, you
            simply need to visit{' '}
            <CopyTypography wrapperMode text='chrome://extensions/shortcuts'>
              <Typography
                variant={'custom'}
                textAlign='center'
                color='primary.main'
                component='span'
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                chrome://extensions/shortcuts
              </Typography>
            </CopyTypography>{' '}
            and manually remove and set the shortcut again, which only takes 10
            seconds!
          </Typography>
          <ResponsiveImage
            width={656}
            height={350}
            alt={surveyName}
            src='/assets/survey/5.png'
          />
        </>
      );
    }
    if (surveyName === `It's not free`) {
      return (
        <>
          <Typography
            color='text.primary'
            variant='custom'
            component='h1'
            fontSize={24}
            fontWeight={800}
            sx={{
              display: {
                xs: 'none',
                sm: 'inline',
              },
            }}
          >
            {surveyName}
          </Typography>
          <Typography variant={'body2'} textAlign='center'>
            {`Our extension is completely free of charge. You are encouraged to use your own ChatGPT, OpenAI API key, Bard, Bing Chat, or Claude to power the extension. If you don't have access to any of those, we also provide Free AI to power the extension, with no country restrictions, and it's also free of charge!`}
          </Typography>
          <AIProviderDescription />
        </>
      );
    }

    return (
      <>
        <Box>
          <ProLink
            href={{
              pathname: '/',
            }}
            target={'_self'}
            muiLinkProps={{ title: 'EzMail' }}
          >
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <CustomImageBox width={28} height={28} src={'/logo.svg'} />
              <Typography
                color='text.primary'
                variant='custom'
                component='h1'
                fontSize={24}
                fontWeight={800}
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'inline',
                  },
                }}
              >
                MaxAI.me
              </Typography>
            </Stack>
          </ProLink>
        </Box>
        <Typography variant={'body2'} textAlign='center'>
          Free AI Copilot for the Web.
          <br />
          Use ChatGPT (Plugins & GPT-4), Bard, Bing Chat, and Claude on any
          website without copy-pasting. Write, rewrite, summarize, translate,
          explain, or reply to any text everywhere with one click.
          <br />
          Write, rewrite, summarize, translate, explain, or reply to any text
          everywhere with one click.
        </Typography>
      </>
    );
  }, [surveyName]);

  return (
    <Stack sx={sxCache} spacing={2}>
      {content}
      <ProLink target={'_blank'} href={installChromeExtensionLink}>
        <Button
          startIcon={<CustomIcon icon={'Chrome'} />}
          variant={'contained'}
          sx={{
            width: 330,
            height: { xs: 48, sm: 56 },
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          {`Reinstall extension — It's free`}
        </Button>
      </ProLink>
    </Stack>
  );
};

export default SurveyExplain;
