import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import { makeStaticProps } from '@/i18n/utils/staticHelper'

const J2teamSecurity = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      'https://www.maxai.me/partners/installed?name=J2TEAM+Security&propRef=installed-j2team-security',
    )
  }, [router])

  return <AppLoadingLayout loading />
}
export default J2teamSecurity

const getStaticProps = makeStaticProps()
export { getStaticProps }
