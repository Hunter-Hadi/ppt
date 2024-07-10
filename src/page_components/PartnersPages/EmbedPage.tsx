import { Box, Container, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useMemo } from 'react'

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'
import ProLink from '@/components/ProLink'
import useCheckExtension from '@/features/extension/hooks/useCheckExtension'
import HomePageContent from '@/features/landing/components/HomePageContent'
import usePartnersInfo from '@/features/partners/hooks/usePartnersInfo'
import FunnelSurveyPopup from '@/features/survey/components/FunnelSurveyPopup'
import { useSendRefCount } from '@/hooks/useSendRefCount'
import FixedCtaButton from '@/page_components/PartnersPages/components/FixedCtaButton'
import TryExtensionButton from '@/page_components/PartnersPages/components/TryExtensionButton'
import ToolsHome from '@/page_components/PdfToolsPages/components/ToolsHome'

const EmbedPage = () => {
  // const router = useRouter()
  const { t } = useTranslation()

  const { propRef } = usePartnersInfo()

  useSendRefCount(propRef, 'partners-embed')

  const { hasExtension } = useCheckExtension()

  // const partnersName = useMemo(() => {
  //   if (!name) {
  //     return ''
  //   }
  //   if (Array.isArray(name)) {
  //     return name[0].split('-').join(' ')
  //   } else {
  //     return name.split('-').join(' ')
  //   }
  // }, [name])

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        position: 'relative',
        pb: 10,
      }}
    >
      <AppDefaultSeoLayout />

      <Box position='relative'>
        <TryExtensionButton
          propRef={propRef}
          text={hasExtension ? t('pages:partners__try_our_tools') : null}
          href={hasExtension ? '/pdf-tools' : null}
          target={hasExtension ? '_self' : undefined}
          sx={{
            // position: 'static',
            top: 16,
          }}
        />
        {hasExtension ? (
          <Container
            sx={{
              py: 4,
            }}
          >
            <ToolsHome />
          </Container>
        ) : (
          <HomePageContent
            propRef={propRef}
            sx={{
              '& #homepage-hero-section': {
                pt: {
                  xs: 10,
                  md: 10,
                },
              },
            }}
          />
        )}
      </Box>
      {!hasExtension && (
        <FixedCtaButton propRef={propRef} partnerPageType='installed' />
      )}
      <FunnelSurveyPopup sceneType='SURVEY_INSTALL_DROPPED' />
    </Box>
  )
}

export default EmbedPage
