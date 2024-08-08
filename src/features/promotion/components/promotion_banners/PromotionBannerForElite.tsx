import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { PricingPlanCategoryState } from '@/features/pricing/store'
import { getMonthlyPriceOfYearlyPriceDiscount } from '@/features/pricing/utils'
import PromotionCountdown from '@/features/promotion/components/PromotionCountdown'

const PromotionBannerForElite = () => {
  const { t } = useTranslation()
  const pricingPlanCategory = useRecoilValue(PricingPlanCategoryState)
  if (pricingPlanCategory === 'team') {
    // team plan 没有 promotion, 不显示 promotion banner
    return null
  }
  return (
    <>
      <Stack position={'relative'} overflow={'hidden'}>
        {/*background*/}
        <img
          alt={'promotion'}
          width={'100%'}
          src='/assets/promotion/banner-bg.png'
          style={{
            position: 'absolute',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 2,
          }}
        />
        <Stack
          sx={{
            zIndex: 2,
            pt: 5,
            pb: 4,
          }}
          spacing={4}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography
            variant={'custom'}
            fontSize={'48px'}
            fontWeight={700}
            lineHeight={1.2}
            textAlign={'center'}
          >
            <span>
              {`${t('modules:promotion__banner__elite__title__part1')} `}
            </span>
            <span style={{ position: 'relative', color: '#fff' }}>
              <Box
                component={'i'}
                sx={{
                  top: -4,
                  left: -4,
                  padding: '4px',
                  transform: 'rotate(-5deg)',
                  zIndex: -1,
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '22px',
                  bgcolor: 'promotionColor.backgroundMain',
                }}
              />
              {`${getMonthlyPriceOfYearlyPriceDiscount('elite')}%`}
            </span>
            <span>{` ${t(
              'modules:promotion__banner__elite__title__part2',
            )} 👇`}</span>
          </Typography>
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={3}
          >
            <Stack
              spacing={1}
              px={3}
              py={1.5}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              sx={{
                boxSizing: 'border-box',
                bgcolor: '#000',
                color: 'white',
                borderRadius: 100,
                height: 'max-content',
              }}
            >
              <TimeIcon />
              <Typography
                variant='custom'
                fontSize={20}
                lineHeight={1.5}
                fontWeight={600}
              >
                {t(
                  'modules:promotion__banner__elite__title__limited_time_offer',
                )}
              </Typography>
            </Stack>
            <PromotionCountdown
              sx={{
                zIndex: 2,
                width: 'max-content',
                mx: 'auto',
              }}
              CountdownTimeBoxSx={{
                bgcolor: 'promotionColor.backgroundMain',
                boxShadow:
                  '0px 2px 4px 0px #00000014, 0px 4px 4px 0px #FFFFFF40 inset',
              }}
              spacing={6}
              title={<></>}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
export default PromotionBannerForElite

const TimeIcon = () => (
  <svg
    width='33'
    height='32'
    viewBox='0 0 33 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <mask
      id='mask0_10656_149827'
      style={{
        maskType: 'alpha',
      }}
      maskUnits='userSpaceOnUse'
      x='0'
      y='0'
      width='33'
      height='32'
    >
      <rect x='0.5' width='32' height='32' fill='#D9D9D9' />
    </mask>
    <g mask='url(#mask0_10656_149827)'>
      <path
        d='M20.4997 26.6663C17.5219 26.6663 14.9997 25.633 12.933 23.5663C10.8663 21.4997 9.83301 18.9775 9.83301 15.9997C9.83301 13.0441 10.8663 10.5275 12.933 8.44967C14.9997 6.3719 17.5219 5.33301 20.4997 5.33301C23.4552 5.33301 25.9719 6.3719 28.0497 8.44967C30.1275 10.5275 31.1663 13.0441 31.1663 15.9997C31.1663 18.9775 30.1275 21.4997 28.0497 23.5663C25.9719 25.633 23.4552 26.6663 20.4997 26.6663ZM20.4997 23.9997C22.7219 23.9997 24.6108 23.2219 26.1663 21.6663C27.7219 20.1108 28.4997 18.2219 28.4997 15.9997C28.4997 13.7775 27.7219 11.8886 26.1663 10.333C24.6108 8.77745 22.7219 7.99967 20.4997 7.99967C18.2775 7.99967 16.3886 8.77745 14.833 10.333C13.2775 11.8886 12.4997 13.7775 12.4997 15.9997C12.4997 18.2219 13.2775 20.1108 14.833 21.6663C16.3886 23.2219 18.2775 23.9997 20.4997 23.9997ZM23.533 20.9663L25.433 19.0663L21.833 15.4663V10.6663H19.1663V16.5663L23.533 20.9663ZM3.16634 11.9997V9.33301H8.49967V11.9997H3.16634ZM1.83301 17.333V14.6663H8.49967V17.333H1.83301ZM3.16634 22.6663V19.9997H8.49967V22.6663H3.16634Z'
        fill='white'
      />
    </g>
  </svg>
)
