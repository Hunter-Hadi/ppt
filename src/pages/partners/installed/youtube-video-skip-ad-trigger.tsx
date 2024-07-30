import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import { makeStaticProps } from '@/i18n/utils/staticHelper'

const AIPromptGenius = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      'https://www.maxai.me/partners/installed?name=Youtube+Video+Skip+Ad+Trigger&propRef=installed-youtube-video-skip-ad-trigger',
    )
  }, [router])

  return <AppLoadingLayout loading />
}
export default AIPromptGenius

const getStaticProps = makeStaticProps()
export { getStaticProps }
