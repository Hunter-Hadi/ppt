import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import { makeStaticProps } from '@/i18n/utils/staticHelper'

const ModHeader = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      'https://www.maxai.me/partners/installed?name=ModHeader&propRef=installed-modheader&changelogText=To+get+started%2Cclick+here.&changelogLink=https%3A%2F%2Fmodheader.com%2F',
    )
  }, [router])

  return <AppLoadingLayout loading />
}
export default ModHeader

const getStaticProps = makeStaticProps()
export { getStaticProps }
