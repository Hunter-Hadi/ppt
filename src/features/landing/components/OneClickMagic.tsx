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
import { useTranslation } from 'react-i18next';

import ResponsiveImage from '@/components/ResponsiveImage';
import useVideoPopupController from '@/features/videoPopup/hooks/useVideoPopupController';

const MAGIC_FEATURES = [
  {
    title: 'home_page__one_click_magic__item1__title',
    desc: 'home_page__one_click_magic__item1__desc',
    // videoLink: 'https://www.youtube.com/embed/dXIdHNdxPdw',
    videoLink: '',
    imageLink: '/assets/landing/one-click-magic1.png',
  },
  {
    title: 'home_page__one_click_magic__item2__title',
    desc: 'home_page__one_click_magic__item2__desc',
    videoLink: '',
    imageLink: '/assets/landing/one-click-magic2.png',
  },
  {
    title: 'home_page__one_click_magic__item3__title',
    desc: 'home_page__one_click_magic__item3__desc',
    videoLink: '',
    imageLink: '/assets/landing/one-click-magic3.png',
  },
  {
    title: 'home_page__one_click_magic__item4__title',
    desc: 'home_page__one_click_magic__item4__desc',
    videoLink: '',
    imageLink: '/assets/landing/one-click-magic4.png',
  },
  {
    title: 'home_page__one_click_magic__item5__title',
    desc: 'home_page__one_click_magic__item5__desc',
    videoLink: '',
    imageLink: '/assets/landing/one-click-magic5.png',
  },
  {
    title: 'home_page__one_click_magic__item6__title',
    desc: 'home_page__one_click_magic__item6__desc',
    videoLink: '',
    imageLink: '/assets/landing/one-click-magic6.png',
  },
];

const OneClickMagic = () => {
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down('md')); // 屏幕宽度小于 1024 时为 true

  const { t } = useTranslation('pages');

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
          {t('home_page__one_click_magic__title')}
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
                    {t(featureItem.title)}
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
                          {t(featureItem.desc)}
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
