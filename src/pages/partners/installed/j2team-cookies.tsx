import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import { makeStaticProps } from '@/i18n/utils/staticHelper'

const J2teamCookies = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      'https://www.maxai.me/partners/installed?name=J2TEAM+Cookies&propRef=installed-j2team-cookies',
    )
  }, [router])

  return <AppLoadingLayout loading />
}
export default J2teamCookies

const getStaticProps = makeStaticProps()
export { getStaticProps }
