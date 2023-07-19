import { TimelineConnector } from '@mui/lab';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Container, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import ResponsiveImage from '@/components/ResponsiveImage';

interface IHowItWorksContent {
  title: string;
  description: string;
  image: string;
  width: number;
  height: number;
}

const HOWITWORK_CONTENT: IHowItWorksContent[] = [
  {
    title: 'Ingest all your emails',
    description: 'Sign in with your Gmail account.',
    image: '/assets/landing-page/howitwork1.png',
    width: 611,
    height: 406,
  },
  {
    title: 'Train Al models with your emails',
    description: 'AI does all the hard work automatically.',
    image: '/assets/landing-page/howitwork2.png',

    width: 721,
    height: 406,
  },
  {
    title: 'Use Al to reply to emails as "you"',
    description: 'Drafts magically appear in your inbox ready to go.',
    image: '/assets/landing-page/howitwork3.png',

    width: 733,
    height: 1077,
  },
];

const TimeLineDotOverride: FC<{ num: number }> = ({ num }) => (
  <TimelineDot
    sx={{
      bgcolor: '#1D56D7',
      fontSize: {
        xs: 20,
        md: 32,
      },
      fontWeight: 800,
      width: {
        xs: 18,
        sm: 24,
        md: 48,
      },
      height: {
        xs: 18,
        sm: 24,
        md: 48,
      },
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {num}
  </TimelineDot>
);

const TImeLineContentInner: FC<IHowItWorksContent> = (props) => {
  const { title, description, image, width, height } = props;
  // const isXsScreen = useMediaQuery('(max-width:768px)');
  return (
    <Stack
      spacing={2}
      sx={{
        width: '100%',
        pl: {
          xs: 2,
          md: 8,
        },
        py: {
          xs: 1,
          md: 3,
        },
      }}
    >
      <Typography variant='h5' component='p' fontWeight={800}>
        {title}
      </Typography>
      <Typography variant='body1' component='p'>
        {description}
      </Typography>
      <ResponsiveImage width={width} height={height} src={image} alt={title} />
    </Stack>
  );
};

const HowItWorks = () => {
  // const isSmScreen = useMediaQuery('(min-width:600px)');
  return (
    <Container
      maxWidth={'sm'}
      sx={{
        py: {
          xs: 2,
          md: 4,
          lg: 6,
          xl: 8,
        },
        px: {
          xs: 0,
          sm: 6,
        },
      }}
    >
      <Typography
        textAlign={'center'}
        fontSize={32}
        fontWeight={700}
        component={'h2'}
        variant={'custom'}
        mb={{
          xs: 4,
          sm: 4,
        }}
      >
        {`How it works`}
      </Typography>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {HOWITWORK_CONTENT.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimeLineDotOverride num={index + 1} />
              {index !== HOWITWORK_CONTENT.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TImeLineContentInner {...item} />
          </TimelineItem>
        ))}
      </Timeline>

      {/* <Grid container>
        <Grid item xs={12} md={6}>
          <Stack justifyContent={'center'} height={'100%'}>
            <Typography
              fontSize={32}
              fontWeight={700}
              component={'h2'}
              variant={'custom'}
              mb={{
                xs: 2,
                sm: 4,
              }}
            >
              How it works
            </Typography>
            <Stack mb={2} direction={'row'} alignItems={'baseline'} spacing={2}>
              <Box
                flexShrink={0}
                width={20}
                height={20}
                alignItems={'center'}
                justifyContent={'center'}
                display={'flex'}
                bgcolor={'primary.main'}
                borderRadius={'50%'}
                color={'#fff'}
                fontSize={14}
              >
                1
              </Box>
              <Typography
                variant={'body1'}
                color={'text.secondary'}
                display={'flex'}
              >
                Sign in with your Gmail account.
              </Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'baseline'} spacing={2}>
              <Box
                flexShrink={0}
                width={20}
                height={20}
                alignItems={'center'}
                justifyContent={'center'}
                display={'flex'}
                bgcolor={'primary.main'}
                borderRadius={'50%'}
                color={'#fff'}
                fontSize={14}
              >
                2
              </Box>
              <Typography
                variant={'body1'}
                color={'text.secondary'}
                display={'flex'}
              >
                Drafts will automatically appear in your inbox ready to go.
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          {isSmScreen ? (
            <CustomImageBox
              width={596}
              height={345}
              src={'/assets/landing-page/1.png'}
              alt={'landing page image 1'}
            />
          ) : (
            <CustomImageBox
              boxSx={{ mx: 'auto' }}
              width={345}
              height={345}
              src={'/assets/landing-page/1_mobile.png'}
              alt={'landing page image 1'}
            />
          )}
        </Grid>
      </Grid> */}
    </Container>
  );
};
export default HowItWorks;
