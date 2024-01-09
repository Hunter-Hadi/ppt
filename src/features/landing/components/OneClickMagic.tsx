import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined';
import {
  Box,
  Fade,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

import ResponsiveImage from '@/components/ResponsiveImage';
import useVideoPopupController from '@/features/videoPopup/hooks/useVideoPopupController';

const MAGIC_FEATURES = [
  {
    title: 'Use 1-click AI anywhere',
    desc: "Enhance your browsing with '1-click AI': Highlight text to access a context-sensitive AI menu with various tools. Set up custom prompts to streamline repetitive tasks and boost your efficiency.",
    // videoLink: 'https://www.youtube.com/embed/dXIdHNdxPdw',
    videoLink: '',
    imageLink: '/assets/landing/one-click-magic1.png',
  },
  {
    title: 'AI-Powered Search Optimization',
    desc: 'Revolutionize your online searches with our AI-powered search optimization.Query like you would on Google, and our AI refines it, delivering concise, combined answers from various sources. This enhances your searches with clear insights, eliminating the need to individually browse each link.',
    videoLink: '',
    imageLink: '/assets/landing/one-click-magic2.png',
  },
  {
    title: 'All the Best AI Models',
    desc: "Explore AI's forefront with our diverse suite of models: Enjoy unlimited access to GPT-4-turbo, ChatGPT-16k, Claude variants, Gemini beta and more. Our platform includes a broad array of AI providers, keeping you at the technological forefront.",
    videoLink: '',
    imageLink: '/assets/landing/one-click-magic3.png',
  },
  {
    title: 'Help Me Write Everywhere',
    desc: 'Enhance your digital writing on Gmail, LinkedIn, Twitter, and many other platforms with our AI assistants. Effortlessly draft emails, create social media posts, and engage professionally, as our AI generates and refines content to perfectly resonate with your audience.',
    videoLink: '',
    imageLink: '/assets/landing/one-click-magic4.png',
  },
  {
    title: 'AI-Infused Content Interaction',
    desc: 'Seamlessly engage with content through our AI tools: Chat about PDFs, YouTube videos, or webpages for contextual insights and detailed summaries. Enhance your digital media interaction and consumption experience.',
    videoLink: '',
    imageLink: '/assets/landing/one-click-magic5.png',
  },
  {
    title: 'Enhanced AI Capabilities',
    desc: 'Streamline your AI experience with 1-click prompts for faster task execution, customizable language settings, and adjustable ChatGPT responses. Our web copilot offers deep insights for complex queries, enhancing each interaction.',
    videoLink: '',
    imageLink: '/assets/landing/one-click-magic6.png',
  },
];

const OneClickMagic = () => {
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down('md')); // 屏幕宽度小于 1024 时为 true

  const [currentHoverIndex, setCurrentHoverIndex] = React.useState<
    null | number
  >(null);

  const { openVideoPopup } = useVideoPopupController();

  return (
    <Box
      id='homepage-one-click-magic'
      py={{
        xs: 7,
        md: 14,
      }}
      px={2}
      bgcolor='white'
    >
      <Box maxWidth={1312} mx='auto'>
        <Typography
          variant='custom'
          component='h2'
          textAlign={'center'}
          fontSize={{
            xs: 24,
            sm: 32,
            lg: 48,
          }}
          mb={6}
        >
          1-Click AI, 1-Click Magic
        </Typography>

        <Grid container columnSpacing={4} rowSpacing={6}>
          {MAGIC_FEATURES.map((featureItem, index) => {
            return (
              <Grid item key={featureItem.title} xs={12} sm={6} lg={4}>
                <Stack
                  spacing={3}
                  // 大屏幕时通过 hover 触发
                  onMouseEnter={() => !isDownMd && setCurrentHoverIndex(index)}
                  onMouseLeave={() => !isDownMd && setCurrentHoverIndex(null)}
                >
                  <Typography
                    variant='custom'
                    fontSize={{
                      xs: 18,
                      sm: 20,
                      md: 24,
                    }}
                    fontWeight={700}
                    lineHeight={1.4}
                    textAlign={'center'}
                  >
                    {featureItem.title}
                  </Typography>
                  <Box
                    position={'relative'}
                    borderRadius={1}
                    overflow='hidden'
                    onClick={() => {
                      // 小屏幕时通过 onclick 触发
                      if (isDownMd) {
                        setCurrentHoverIndex((pre) => {
                          console.log(`pre`, pre, index);
                          if (pre === index) {
                            return null;
                          }
                          return index;
                        });
                      }
                    }}
                  >
                    <ResponsiveImage
                      alt={featureItem.title}
                      src={featureItem.imageLink}
                      width={832}
                      height={468}
                    />
                    <Fade in={currentHoverIndex === index}>
                      <Stack
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          p: 2,
                          bgcolor: 'rgba(0, 0, 0, 0.9)',
                          color: '#fff',
                          boxSizing: 'border-box',
                        }}
                      >
                        <Typography
                          variant='custom'
                          fontSize={16}
                          lineHeight={1.5}
                        >
                          {featureItem.desc}
                        </Typography>
                        {featureItem.videoLink && (
                          <IconButton
                            size='small'
                            sx={{
                              position: 'absolute',
                              right: 16,
                              bottom: 16,
                              color: 'white',
                              bgcolor: 'rgba(255, 255, 255, 0.16)',
                              '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.16)',
                              },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openVideoPopup(featureItem.videoLink);
                            }}
                          >
                            <PlaylistPlayOutlinedIcon />
                          </IconButton>
                        )}
                      </Stack>
                    </Fade>
                  </Box>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default OneClickMagic;
