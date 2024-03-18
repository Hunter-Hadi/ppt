// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const TRUSTED_BY_COMPANY = [
  { name: 'Airbnb', src: '/assets/landing/trusted-by/company/Airbnb.svg' },
  { name: 'Disney', src: '/assets/landing/trusted-by/company/Disney.svg' },
  { name: 'Frame', src: '/assets/landing/trusted-by/company/Frame.svg' },
  { name: 'Intuit', src: '/assets/landing/trusted-by/company/Intuit.svg' },
  { name: 'Nike', src: '/assets/landing/trusted-by/company/Nike.svg' },
  { name: 'Uber', src: '/assets/landing/trusted-by/company/Uber.svg' },
  { name: 'Amazon', src: '/assets/landing/trusted-by/company/Amazon.svg' },
  { name: 'DoorDash', src: '/assets/landing/trusted-by/company/DoorDash.svg' },
  { name: 'Google', src: '/assets/landing/trusted-by/company/Google.svg' },
  { name: 'Meta', src: '/assets/landing/trusted-by/company/Meta.svg' },
  { name: 'Paypal', src: '/assets/landing/trusted-by/company/Paypal.svg' },
  { name: 'Walmart', src: '/assets/landing/trusted-by/company/Walmart.svg' },
  { name: 'Apple', src: '/assets/landing/trusted-by/company/Apple.svg' },
  { name: 'Ebay', src: '/assets/landing/trusted-by/company/Ebay.svg' },
  { name: 'Hubspot', src: '/assets/landing/trusted-by/company/Hubspot.svg' },
  {
    name: 'Microsoft',
    src: '/assets/landing/trusted-by/company/Microsoft.svg',
  },
  {
    name: 'Pinterest',
    src: '/assets/landing/trusted-by/company/Pinterest.svg',
  },
  { name: 'Wix', src: '/assets/landing/trusted-by/company/Wix.svg' },
  {
    name: 'Databricks',
    src: '/assets/landing/trusted-by/company/Databricks.svg',
  },
  { name: 'Figma', src: '/assets/landing/trusted-by/company/Figma.svg' },
  { name: 'Intel', src: '/assets/landing/trusted-by/company/Intel.svg' },
  { name: 'Netflix', src: '/assets/landing/trusted-by/company/Netflix.svg' },
  {
    name: 'Salesforce',
    src: '/assets/landing/trusted-by/company/Salesforce.svg',
  },
  { name: 'Zoom', src: '/assets/landing/trusted-by/company/Zoom.svg' },
];
const TRUSTED_BY_UNIVERSITY = [
  { name: 'Caltech', src: '/assets/landing/trusted-by/university/Caltech.svg' },
  {
    name: 'Princeton-University',
    src: '/assets/landing/trusted-by/university/Princeton-University.svg',
  },
  {
    name: 'University-of-Melbourne',
    src: '/assets/landing/trusted-by/university/University-of-Melbourne.svg',
  },
  {
    name: 'Cornell-University',
    src: '/assets/landing/trusted-by/university/Cornell-University.svg',
  },
  {
    name: 'Stanford-University',
    src: '/assets/landing/trusted-by/university/Stanford-University.svg',
  },
  {
    name: 'University-of-Pennsylvania',
    src: '/assets/landing/trusted-by/university/University-of-Pennsylvania.svg',
  },
  { name: 'Frame', src: '/assets/landing/trusted-by/university/Frame.svg' },
  {
    name: 'The-University-of-Chicago',
    src: '/assets/landing/trusted-by/university/The-University-of-Chicago.svg',
  },
  {
    name: 'Yale-University',
    src: '/assets/landing/trusted-by/university/Yale-University.svg',
  },
  {
    name: 'Harvard-University',
    src: '/assets/landing/trusted-by/university/Harvard-University.svg',
  },
  {
    name: 'University-of-California-Berkeley',
    src: '/assets/landing/trusted-by/university/University-of-California-Berkeley.svg',
  },
  {
    name: 'University-of-oxford',
    src: '/assets/landing/trusted-by/university/University-of-oxford.svg',
  },
  { name: 'MIT', src: '/assets/landing/trusted-by/university/MIT.svg' },
  {
    name: 'University-of-Cambridge',
    src: '/assets/landing/trusted-by/university/University-of-Cambridge.svg',
  },
];

const TrustedBy = () => {
  const { t } = useTranslation();

  return (
    <Box
      bgcolor='white'
      py={{
        xs: 7,
        md: 12,
      }}
      px={2}
      id='homepage-trusted-by'
    >
      <Box maxWidth={1312} mx='auto'>
        <Typography
          variant='custom'
          component='h2'
          textAlign={'center'}
          fontSize={{
            xs: 36,
            sm: 48,
          }}
          mb={6}
        >
          {t('pages:home_page__trusted_by__title')}
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
            '.swiper-wrapper > .swiper-slide': {
              width: 'max-content !important',
            },
          }}
        >
          {/* company */}
          <Swiper
            speed={8000}
            slidesPerView={'auto'}
            spaceBetween={16}
            freeMode={true}
            navigation={false}
            loop={true}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
              reverseDirection: true,
            }}
            modules={[FreeMode, Autoplay]}
          >
            {TRUSTED_BY_COMPANY.map((companyData) => (
              <SwiperSlide key={companyData.name}>
                <Stack
                  justifyContent={'center'}
                  alignItems='center'
                  height={60}
                  p={1}
                >
                  <img
                    alt={companyData.name}
                    src={companyData.src}
                    width='100%'
                    height='100%'
                  />
                </Stack>
              </SwiperSlide>
            ))}
          </Swiper>

          <Box height={16} />

          {/* university */}
          <Swiper
            speed={8000}
            slidesPerView={'auto'}
            spaceBetween={16}
            freeMode={true}
            navigation={false}
            loop={true}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
              reverseDirection: false,
            }}
            modules={[FreeMode, Autoplay]}
          >
            {TRUSTED_BY_UNIVERSITY.map((universityData) => (
              <SwiperSlide key={universityData.name}>
                <Stack
                  justifyContent={'center'}
                  alignItems='center'
                  height={60}
                  p={1}
                >
                  <img
                    alt={universityData.name}
                    src={universityData.src}
                    width='100%'
                    height='100%'
                  />
                </Stack>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
};

export default TrustedBy;
