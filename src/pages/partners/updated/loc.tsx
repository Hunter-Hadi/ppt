import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import { makeStaticProps } from '@/i18n/utils/staticHelper'

const J2teamCookiesUpdated = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      'https://www.maxai.me/partners/updated/?name=L.O.C&propRef=loc',
    )
  }, [router])

  return <AppLoadingLayout loading />
}
export default J2teamCookiesUpdated

const getStaticProps = makeStaticProps()
export { getStaticProps }
