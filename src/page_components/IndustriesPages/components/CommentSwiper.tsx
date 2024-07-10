// Import Swiper React components
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { register } from 'swiper/element/bundle'
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import Stars from '@/features/landing/components/UserComment/Stars'
register()

const COMMENTS = [
  {
    avatar: '/assets/landing/user-comment/11.png',
    name: 'Justin Terry',
    content:
      'Integrated AI at its infancy and it has skipped walking and is on to running.  The uses of this extension are limitless, changed my web habits virtually overnight.',
  },
  {
    avatar: '/assets/landing/user-comment/21.png',
    name: 'Professor Escobar',
    content:
      'This is a must have app extension. I cant say enough on how convenient it is to use an extension that can go between different AI models. Great job in creating this extension.',
  },
  {
    avatar: '/assets/landing/user-comment/9.png',
    name: 'Kassidy Carswell',
    content:
      "Super helpful when my mom brain kicks in and I can't make words make sense. Allows me to speed up communications and decreases my work emails by 65% probably!!",
  },
  {
    avatar: '/assets/landing/user-comment/10.png',
    name: 'Richard Appleton',
    content:
      'Incredibly useful. AI from your browser using just one click. This extension helps me solve my problems one prompt at time. One of the best Plugins yet!',
  },
  {
    avatar: '/assets/landing/user-comment/2.png',
    name: 'Kaleigh Weaver',
    content:
      'Maxai .me has changed my productivity everyday for my conntent creation and has absololutley fasttracked my goals in so many ways. Its absoloty wonderful!!',
  },
]

const CommentSwiper = () => {
  return (
    <Box
      maxWidth={1312}
      margin='0 auto'
      sx={{
        width: '100%',
        py: {
          xs: 7,
          md: 10,
        },
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        loop
        autoplay={{ pauseOnMouseEnter: true, delay: 3000 }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        style={
          {
            '--swiper-pagination-color': '#000',
            '--swiper-pagination-bullet-inactive-color': '#8D8D8D',
            '--swiper-pagination-bullet-inactive-opacity': '1',
            '--swiper-pagination-bullet-size': '8px',
            '--swiper-pagination-bullet-horizontal-gap': '4px',
          } as any
        }
      >
        {COMMENTS.map((item) => (
          <SwiperSlide
            key={item.content}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxWidth='768px'
            >
              <Stars count={5} size={20} />
              <Typography
                mt='32px'
                variant='custom'
                sx={{
                  fontSize: {
                    xs: 16,
                    sm: 24,
                  },
                  fontWeight: 'bold',
                  width: 'calc(100% - 140px)',
                }}
              >
                {item.content}
              </Typography>

              <Box
                sx={{
                  mt: 4,
                  mb: 6,
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    sm: 'row',
                  },
                  alignItems: 'center',
                }}
              >
                <Image
                  src={item.avatar}
                  width={56}
                  height={56}
                  alt=''
                  style={{ borderRadius: 100 }}
                />

                <Box
                  sx={{
                    px: 2,
                    py: {
                      xs: 2,
                      sm: 0,
                    },
                  }}
                >
                  <Typography
                    component='p'
                    variant='custom'
                    sx={{ fontWeight: '700', fontSize: 16 }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}

        <Box
          className='swiper-button-prev'
          sx={{
            width: '48px !important',
            height: '48px !important',
            border: '1px solid #000',
            backgroundColor: '#FFF',
            borderRadius: 100,
            '&:after': {
              width: 0,
              height: 0,
              opacity: 0,
            },
          }}
        >
          <ArrowBackIcon
            fontSize='small'
            sx={{
              color: '#000',
              width: '26px !important',
              height: '26px !important',
            }}
          />
        </Box>
        <Box
          className='swiper-button-next'
          sx={{
            width: '48px !important',
            height: '48px !important',
            border: '1px solid #000',
            backgroundColor: '#FFF',
            borderRadius: 100,
            '&:after': {
              width: 0,
              height: 0,
              opacity: 0,
            },
          }}
        >
          <ArrowForwardIcon
            fontSize='small'
            sx={{
              color: '#000',
              width: '26px !important',
              height: '26px !important',
            }}
          />
        </Box>
      </Swiper>
    </Box>
  )
}

export default CommentSwiper
