import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { TimelineConnector } from '@mui/lab';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ContactUsPanel from '@/components/ContactUsPanel';
import CustomIcon from '@/components/CustomIcon';
import ProLink from '@/components/ProLink';
import ResponsiveImage from '@/components/ResponsiveImage';
import VideoPlayer from '@/components/VideoPlayer';
import { INSTALL_LINK } from '@/global_constants';
import ProducthuntHonor from '@/page_components/landing_page/ProducthuntHonor';
import { routerToShortcutsPage } from '@/utils/utils';

import UseChatGPTShortcutsDetectAlert from '../components/UseChatGPTShortcutsDetectAlert';

const TimeLineDotOverride: FC<{ num: number }> = ({ num }) => (
  <TimelineDot
    sx={{
      bgcolor: 'primary.main',
      fontSize: { xs: 16, sm: 20 },
      fontWeight: 800,
      width: { xs: 20, sm: 28 },
      height: { xs: 20, sm: 28 },
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {num}
  </TimelineDot>
);

const ExtensionInstalled = () => {
  // const isSmScreen = useMediaQuery('(min-width:600px)');
  return (
    <AppContainer sx={{ bgcolor: '#fff' }}>
      <AppDefaultSeoLayout title='Install | MaxAI.me' />
      <Box
        sx={{
          maxWidth: 800,
          mx: 'auto',
          py: {
            xs: 2,
            md: 4,
            lg: 5,
          },
          // px: {
          //   xs: 0,
          //   sm: 6,
          // },
        }}
      >
        <ProducthuntHonor
          sx={{
            mb: 4,
            gap: { xs: 2, sm: 4 },
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
          }}
        />
        <Typography
          fontSize={24}
          fontWeight={800}
          component={'h2'}
          variant={'custom'}
          mb={{
            xs: 4,
            sm: 4,
          }}
        >
          <ProLink
            href={`${INSTALL_LINK}?ref=extension-installed`}
            underline='always'
            target={'_target'}
          >
            MaxAI.me
          </ProLink>{' '}
          extension has been installed
          <CustomIcon icon='CheckedBox' sx={{ ml: 1 }} />
        </Typography>

        <Typography
          variant='h2'
          component={'p'}
          sx={{ fontSize: '40px !important' }}
        >
          Complete these steps to get started
        </Typography>

        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
            mb: 6,
          }}
        >
          <TimelineItem>
            <TimelineSeparator>
              <TimeLineDotOverride num={1} />
              <TimelineConnector />
            </TimelineSeparator>
            <Stack
              spacing={2}
              sx={{
                width: '100%',
                pl: 1,
                py: 2,
              }}
            >
              <Typography variant='h5' component='p' fontWeight={800}>
                Refresh all tabs - Refresh all websites to activate the
                Cmd/Alt+J shortcut on them.
              </Typography>
              <ResponsiveImage
                width={764}
                height={200}
                src={'/assets/installed/refresh.png'}
                alt={
                  'Refresh all tabs - Refresh all websites to activate the Cmd/Alt+J shortcut on them.'
                }
              />
            </Stack>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimeLineDotOverride num={2} />
              <TimelineConnector />
            </TimelineSeparator>
            <Stack
              spacing={2}
              sx={{
                width: '100%',
                pl: 1,
                py: 2,
              }}
            >
              <Typography variant='h5' component='p' fontWeight={800}>
                Press{' '}
                <Typography
                  component={'span'}
                  border='1px solid rgba(0,0,0,0.16)'
                  bgcolor='rgba(0, 0, 0, 0.08)'
                  borderRadius={1}
                  px={1}
                  py={0.5}
                >
                  ⌘ / Alt
                </Typography>
                {' + '}
                <Typography
                  component={'span'}
                  border='1px solid rgba(0,0,0,0.16)'
                  bgcolor='rgba(0, 0, 0, 0.08)'
                  borderRadius={1}
                  px={1.5}
                  py={0.5}
                >
                  J
                </Typography>{' '}
                to access or hide the ChatGPT sidebar.
              </Typography>
              <UseChatGPTShortcutsDetectAlert />
              <ResponsiveImage
                width={764}
                height={466}
                src={'/assets/installed/1.gif'}
                alt={'Press ⌘ / Alt + J to access or hide the ChatGPT sidebar.'}
              />
            </Stack>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimeLineDotOverride num={3} />
              <TimelineConnector />
            </TimelineSeparator>
            <Stack
              spacing={2}
              sx={{
                width: '100%',
                pl: 1,
                py: 2,
              }}
            >
              <Typography variant='h5' component='p' fontWeight={800}>
                Log in to your ChatGPT account and pass the Cloudflare check if
                needed. Keep the ChatGPT tab open for uninterrupted service.
              </Typography>

              <ResponsiveImage
                width={764}
                height={466}
                src={'/assets/installed/2.gif'}
                alt={
                  'Log in to your ChatGPT account and pass the Cloudflare check if needed. Keep the ChatGPT tab open for uninterrupted service.'
                }
              />
            </Stack>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimeLineDotOverride num={4} />
            </TimelineSeparator>
            <Stack
              spacing={2}
              sx={{
                width: '100%',
                pl: 1,
                py: 2,
              }}
            >
              <Typography variant='h5' component='p' fontWeight={800}>
                Select any text, and click the “Use ChatGPT” popup.
              </Typography>

              <Box
                sx={{
                  width: { xs: '98%', sm: 720 },
                  height: { xs: '65vw', sm: 439 },
                }}
              >
                <VideoPlayer
                  muted
                  loop
                  autoPlay
                  width={'100%'}
                  height={'100%'}
                  src={'/assets/installed/3.mp4'}
                />
              </Box>

              <Box bgcolor='#F5F6F7' p={2}>
                <Typography
                  fontSize={22}
                  component='p'
                  color='primary.main'
                  fontWeight={700}
                  mb={1}
                >
                  Try it yourself 👇
                </Typography>
                <Box
                  bgcolor='#fff'
                  borderLeft='2px solid'
                  borderColor='primary.main'
                  lineHeight={1.5}
                  p={2}
                  minHeight={240}
                  contentEditable
                  suppressContentEditableWarning={true}
                  sx={{
                    outline: 'none',
                  }}
                >
                  {`Join me on MaxAI.me, this extension is a true Chrome copilot that lets you write, rephrase, summarize, translate, explain, or reply to any text on any website without copy-pasting!`}
                </Box>
              </Box>
            </Stack>
          </TimelineItem>
        </Timeline>

        <Alert
          severity='info'
          sx={{ mb: 5, border: '1px solid #30B0F5' }}
          icon={<TipsAndUpdatesIcon />}
        >
          <AlertTitle>
            <Typography variant='body1' fontWeight={700}>
              Open via keyboard shortcut
            </Typography>
          </AlertTitle>
          <Stack direction='row' spacing={6} mb={2}>
            <Stack spacing={1}>
              <Typography variant='body2' component='p'>
                Mac OS
              </Typography>
              <Stack direction='row' alignItems='center' spacing={1}>
                <ShortcutKeyBlock text='⌘' />
                <Box textAlign='center'>+</Box>
                <ShortcutKeyBlock text='J' />
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <Typography variant='body2' component='p'>
                Windows
              </Typography>
              <Stack direction='row' alignItems='center' spacing={1}>
                <ShortcutKeyBlock text='Alt' />
                <Box textAlign='center'>+</Box>
                <ShortcutKeyBlock text='J' />
              </Stack>
            </Stack>
          </Stack>
          <Button
            variant='contained'
            onClick={routerToShortcutsPage}
            sx={{
              height: 40,
            }}
          >
            Change shortcut
          </Button>
        </Alert>

        <ContactUsPanel />
      </Box>
    </AppContainer>
  );
};

const ShortcutKeyBlock: FC<{ text: string }> = ({ text }) => {
  return (
    <Box
      width={40}
      height={40}
      lineHeight={'40px'}
      bgcolor='rgba(0, 0, 0, 0.87)'
      borderRadius={2}
      color='#fff'
      textAlign='center'
    >
      {text}
    </Box>
  );
};

export default ExtensionInstalled;
