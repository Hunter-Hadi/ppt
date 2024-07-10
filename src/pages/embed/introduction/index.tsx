import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import React from 'react'

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'
import AppFooter from '@/app_layout/AppFooter'
import AppHeader from '@/app_layout/AppHeader'
import HomePageContent from '@/features/landing/components/HomePageContent'
import useEffectOnce from '@/hooks/useEffectOnce'
import { makeStaticProps } from '@/i18n/utils/staticHelper'

const EmbedIntroduction = () => {
  const router = useRouter()
  const { query, isReady } = router
  const [loaded, setLoaded] = useState(false)
  const contentRef = useRef<any>(null)

  // const showLogo = useMemo(() => {
  //   if (query.logo) {
  //     return query.logo === '0' ? false : true;
  //   }
  //   return true;
  // }, [query.logo]);

  const showHeader = useMemo(() => query.header === '1', [query])

  const showFooter = useMemo(() => query.footer === '1', [query])

  useEffectOnce(() => setLoaded(true))

  useEffect(() => {
    const isEmbed = window !== window.parent
    if (loaded && isReady && isEmbed) {
      const msgHeight = contentRef.current?.offsetHeight
      console.log(`message height`, msgHeight)
      window.parent.postMessage(
        {
          type: 'embed',
          height: msgHeight,
        },
        '*',
      )
    }
  }, [loaded, isReady])

  return (
    <Box ref={contentRef}>
      <AppDefaultSeoLayout />
      {showHeader && <AppHeader />}
      <HomePageContent />
      {showFooter && <AppFooter />}
    </Box>
  )
}

export default EmbedIntroduction

const getStaticProps = makeStaticProps()
export { getStaticProps }
