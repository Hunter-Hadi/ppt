import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import { makeStaticProps } from '@/i18n/utils/staticHelper'

const LocPartners = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      'https://www.maxai.me/partners/installed?name=L.O.C&propRef=installed-loc',
    )
  }, [router])

  return <AppLoadingLayout loading />
}
export default LocPartners

const getStaticProps = makeStaticProps()
export { getStaticProps }
