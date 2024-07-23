import StarIcon from '@mui/icons-material/Star'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import React from 'react'

import CustomIcon from '@/components/CustomIcon'
import A16zTop50AppsBadge from '@/features/landing/components/HeroSection/A16zTop50AppsBadge'
import IndicatorDecorator from '@/features/landing/components/IndicatorDecorator'
import { LOVED_BY_NUM, STAR_RATINGS_NUM } from '@/features/landing/constants'

const PricingTopBadge = () => {
  const { t } = useTranslation()
  return (
    <Stack py={2} pb={6} spacing={3} maxWidth={1250} mx='auto'>
      <Stack
        direction='row'
        alignItems={'center'}
        justifyContent='center'
        gap={{
          xs: 1,
          sm: 3,
        }}
        flexWrap={'wrap'}
      >
        <IndicatorDecorator>
          <Stack justifyContent={'center'} alignItems='center'>
            <Typography
              variant='custom'
              fontSize={{
                xs: 20,
                sm: 24,
              }}
              fontWeight={700}
              color='primary.main'
            >
              4.8/5
            </Typography>
            <Stack direction={'row'} alignItems='center'>
              {/* 5 个星星 */}
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  sx={{
                    fontSize: 18,
                    color: '#FBBC04',
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </IndicatorDecorator>
        <IndicatorDecorator>
          <Stack justifyContent={'center'} alignItems='center'>
            <Typography
              variant='custom'
              fontSize={{
                xs: 20,
                sm: 24,
              }}
              fontWeight={700}
              color='primary.main'
            >
              {STAR_RATINGS_NUM}
            </Typography>
            <Typography
              variant='custom'
              fontSize={{
                xs: 14,
                sm: 16,
              }}
            >
              {t('pages:home_page__hero_section__indicator3_label')}
            </Typography>
          </Stack>
        </IndicatorDecorator>
        <IndicatorDecorator>
          <Stack justifyContent={'center'} alignItems='center'>
            <Typography
              variant='custom'
              fontSize={{
                xs: 20,
                sm: 24,
              }}
              fontWeight={700}
              color='primary.main'
            >
              {LOVED_BY_NUM}
            </Typography>
            <Typography
              variant='custom'
              fontSize={{
                xs: 14,
                sm: 16,
              }}
            >
              {t('pages:home_page__hero_section__indicator2_label')}
            </Typography>
          </Stack>
        </IndicatorDecorator>

        <A16zTop50AppsBadge />
      </Stack>

      <Stack spacing={1} justifyContent='center' alignItems='center'>
        <Typography
          variant='custom'
          fontSize={48}
          lineHeight={1.5}
          fontWeight={700}
        >
          {t('pricing:ab_test_v5__top_banner__title')}
        </Typography>
        <Stack
          direction={'row'}
          spacing={1}
          alignItems='center'
          justifyContent={'center'}
          width={'100%'}
          fontSize={{
            xs: 12,
            md: 16,
          }}
          flexWrap={'wrap'}
        >
          <Typography
            variant='custom'
            fontSize={'inherit'}
            lineHeight={1.5}
            flexShrink={0}
          >
            Powered by
          </Typography>
          <Stack direction={'row'} spacing={0.5}>
            <CustomIcon
              icon='GPT4o'
              sx={{
                fontSize: {
                  xs: 20,
                  md: 24,
                },
              }}
            />
            <Typography
              variant='custom'
              fontSize={'inherit'}
              lineHeight={1.5}
              flexShrink={0}
            >
              GPT-4o
            </Typography>
          </Stack>

          <Stack direction={'row'} spacing={0.5}>
            <CustomIcon
              icon='Claude3-5Sonnet'
              sx={{
                fontSize: {
                  xs: 20,
                  md: 24,
                },
              }}
            />
            <Typography
              variant='custom'
              fontSize={'inherit'}
              lineHeight={1.5}
              flexShrink={0}
            >
              Claude 3.5 Sonnet
            </Typography>
          </Stack>

          <Stack direction={'row'} spacing={0.5}>
            <CustomIcon
              icon='GeminiPro'
              sx={{
                fontSize: {
                  xs: 20,
                  md: 24,
                },
              }}
            />
            <Typography
              variant='custom'
              fontSize={'inherit'}
              lineHeight={1.5}
              flexShrink={0}
            >
              Gemini 1.5 Pro
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default PricingTopBadge
