// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

import {
  Avatar,
  Box,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
// import required modules
import { Autoplay, FreeMode } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { USER_COMMENTS } from '../constants/userComment';
import Stars from './Stars';

const UserComment = () => {
  const { t } = useTranslation('pages');
  const commentPart1 = USER_COMMENTS.slice(0, USER_COMMENTS.length / 2);
  const commentPart2 = USER_COMMENTS.slice(USER_COMMENTS.length / 2);

  const theme = useTheme();
  const isDownLg = useMediaQuery(theme.breakpoints.down('lg')); // 屏幕宽度小于 1024 时为 true
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm')); // 屏幕宽度小于 768 时为 true

  const slidesPerView = useMemo(() => {
    if (isDownSm) {
      return 1;
    }
    if (isDownLg) {
      return 2;
    }
    return 3;
  }, [isDownLg, isDownSm]);

  return (
    <Box
      id='homepage-user-comment'
      py={{
        xs: 7,
        md: 14,
      }}
      px={2}
      bgcolor='white'
    >
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
        {t('home_page__user_comment__title')}
      </Typography>

      <Box
        sx={{
          '.swiper': {
            width: '100%',
            height: '100%',
          },
          '.swiper-free-mode > .swiper-wrapper': {
            transitionTimingFunction: 'linear',
          },

          '.swiper-wrapper': {
            alignItems: 'center',
          },
        }}
      >
        {/* comment part 1 */}
        <Swiper
          speed={10000}
          slidesPerView={slidesPerView}
          spaceBetween={isDownSm ? 16 : 32}
          freeMode={true}
          navigation={false}
          loop={true}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            // pauseOnMouseEnter: true,
          }}
          modules={[FreeMode, Autoplay]}
        >
          {commentPart1.map((commentItem) => (
            <SwiperSlide key={commentItem.name}>
              <Stack
                p={{
                  xs: 2,
                  md: 4,
                }}
                spacing={{
                  xs: 2,
                  md: 4,
                }}
                sx={{
                  bgcolor: '#F8FAFC',
                  borderRadius: 1,
                }}
              >
                <Stars count={5} size={20} />
                <Typography
                  variant='custom'
                  fontSize={{
                    xs: 16,
                    md: 18,
                  }}
                  lineHeight={1.5}
                >
                  {`"`}
                  {commentItem.content}
                  {`"`}
                </Typography>
                <Stack direction={'row'} alignItems='center' spacing={1.5}>
                  <Avatar alt={commentItem.name} src={commentItem.avatar} />
                  <Typography
                    variant='custom'
                    fontSize={{
                      xs: 14,
                      md: 16,
                    }}
                    fontWeight={600}
                    lineHeight={1.5}
                  >
                    {commentItem.name}
                  </Typography>
                </Stack>
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Divider */}
        <Box
          height={{
            xs: 16,
            md: 32,
          }}
        />

        {/* comment part 2 */}
        <Swiper
          speed={10000}
          slidesPerView={slidesPerView}
          spaceBetween={isDownSm ? 16 : 32}
          freeMode={true}
          loop={true}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            // pauseOnMouseEnter: true,
            reverseDirection: true,
          }}
          modules={[FreeMode, Autoplay]}
        >
          {commentPart2.map((commentItem) => (
            <SwiperSlide key={commentItem.name}>
              <Stack
                p={{
                  xs: 2,
                  md: 4,
                }}
                spacing={{
                  xs: 2,
                  md: 4,
                }}
                sx={{
                  bgcolor: '#F8FAFC',
                  borderRadius: 1,
                }}
              >
                <Stars count={5} size={20} />
                <Typography
                  variant='custom'
                  fontSize={{
                    xs: 16,
                    md: 18,
                  }}
                  lineHeight={1.5}
                >
                  {`"`}
                  {commentItem.content}
                  {`"`}
                </Typography>
                <Stack direction={'row'} alignItems='center' spacing={1.5}>
                  <Avatar alt={commentItem.name} src={commentItem.avatar} />
                  <Typography
                    variant='custom'
                    fontSize={{
                      xs: 14,
                      md: 16,
                    }}
                    fontWeight={600}
                    lineHeight={1.5}
                  >
                    {commentItem.name}
                  </Typography>
                </Stack>
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default UserComment;
