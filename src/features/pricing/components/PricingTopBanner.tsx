import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'

import CustomIcon from '@/components/CustomIcon'
import MaxAIIndicatorBadge from '@/features/landing/components/MaxAIIndicatorBadge'

interface IPricingTopBanner {
  titleComponent?: React.ElementType
}

const PricingTopBanner: FC<IPricingTopBanner> = ({
  titleComponent = 'span',
}) => {
  const { t } = useTranslation()
  return (
    <Stack py={2} pb={6} spacing={3} maxWidth={1250} mx='auto'>
      <MaxAIIndicatorBadge />

      <Stack spacing={1} justifyContent='center' alignItems='center'>
        <Typography
          variant='custom'
          fontSize={48}
          lineHeight={1.5}
          fontWeight={700}
          component={titleComponent}
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

export default PricingTopBanner
