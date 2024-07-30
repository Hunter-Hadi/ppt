import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import { makeStaticProps } from '@/i18n/utils/staticHelper'

const UpdatedPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      'https://www.maxai.me/partners/updated/?name=M3U8+Downloader&propRef=m3u8downloader&changelogLink=https%3A%2F%2Fhellohelloworld.notion.site%2FHow-to-use-M3U8-Downloader-aeee55c1c4cd4914bcad82c6036642b7%2383e34b74071f4ca2913525ddac9019d5',
    )
  }, [router])

  return <AppLoadingLayout loading />
}
export default UpdatedPage

const getStaticProps = makeStaticProps()
export { getStaticProps }
