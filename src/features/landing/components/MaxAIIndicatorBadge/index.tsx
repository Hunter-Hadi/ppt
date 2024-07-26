import StarIcon from '@mui/icons-material/Star'
import { Stack, SxProps, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'

import A16zTop50AppsBadge from '@/features/landing/components/HeroSection/A16zTop50AppsBadge'
import IndicatorDecorator from '@/features/landing/components/IndicatorDecorator'
import { LOVED_BY_NUM, STAR_RATINGS_NUM } from '@/features/landing/constants'

interface IMaxAIIndicatorBadgeProps {
  sx?: SxProps
}
const MaxAIIndicatorBadge: FC<IMaxAIIndicatorBadgeProps> = ({ sx }) => {
  const { t } = useTranslation()
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent='center'
      gap={{
        xs: 1,
        sm: 3,
      }}
      flexWrap={'wrap'}
      sx={sx}
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
          <Stack flexDirection='row'>
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                sx={{
                  fontSize: 16,
                  color: '#ffb000',
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
            color={'text.secondary'}
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
            color={'text.secondary'}
          >
            {t('pages:home_page__hero_section__indicator2_label')}
          </Typography>
        </Stack>
      </IndicatorDecorator>
      <A16zTop50AppsBadge
        sx={{
          color: 'text.secondary',
        }}
      />
    </Stack>
  )
}

export default MaxAIIndicatorBadge
