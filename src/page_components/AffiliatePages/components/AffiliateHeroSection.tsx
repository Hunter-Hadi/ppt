import CallMadeOutlinedIcon from '@mui/icons-material/CallMadeOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import React from 'react'

import MaxAIIndicatorBadge from '@/features/landing/components/MaxAIIndicatorBadge'
import { AFFILIATE_PROGRAM_SIGN_UP_LINK } from '@/page_components/AffiliatePages/constant'

const AffiliateHeroSection = () => {
  const { t } = useTranslation()
  return (
    <Box pt={4} pb={9}>
      <Box maxWidth={1312} mx='auto' px={2}>
        <MaxAIIndicatorBadge
          sx={{
            mb: 3,
          }}
        />

        <Box
          pt={9}
          pb={12}
          sx={{
            bgcolor: '#7e3bc1',
            color: '#fff',
            borderRadius: 4,
            backgroundImage: 'url(/assets/affiliate/hero-section-bg.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <Stack>
            <Typography
              variant='custom'
              component='h1'
              fontSize={{
                xs: 48,
                sm: 56,
                md: 72,
              }}
              fontWeight={600}
              lineHeight={1.4}
              textAlign={'center'}
            >
              {t('affiliate:hero_section__title')} <br />{' '}
              {t('affiliate:main_keywords')}
            </Typography>
            <Typography
              variant='custom'
              fontSize={{
                xs: 16,
                sm: 20,
              }}
              textAlign={'center'}
              color='#F1E4FF'
              mt={3}
            >
              {t('affiliate:hero_section__description__part1')}{' '}
              <Typography
                variant='custom'
                fontSize={{ xs: 20, sm: 24 }}
                fontWeight={700}
                sx={{
                  px: 0.8,
                  borderRadius: 2,
                  bgcolor: '#FACE1C',
                  color: 'text.primary',
                  lineHeight: 1.5,
                }}
              >
                25%
              </Typography>
              <br />
              {t('affiliate:hero_section__description__part2')}
            </Typography>

            <Button
              href={AFFILIATE_PROGRAM_SIGN_UP_LINK}
              target='_blank'
              variant='contained'
              sx={{
                width: 260,
                height: 64,
                bgcolor: '#000',
                color: '#fff',
                mt: 6,
                fontSize: 18,
                mx: 'auto',
                '&:hover': {
                  bgcolor: '#000',
                },
              }}
              endIcon={<CallMadeOutlinedIcon />}
            >
              {t('affiliate:call_to_action__text')}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default AffiliateHeroSection
