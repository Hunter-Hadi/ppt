import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import { makeStaticProps } from '@/i18n/utils/staticHelper'

const J2teamSecurityUpdated = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      'https://www.maxai.me/partners/updated/?name=J2TEAM+Security&propRef=updated-j2team-security',
    )
  }, [router])

  return <AppLoadingLayout loading />
}
export default J2teamSecurityUpdated

const getStaticProps = makeStaticProps()
export { getStaticProps }
