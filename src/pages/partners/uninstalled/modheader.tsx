import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import { makeStaticProps } from '@/i18n/utils/staticHelper'

const ModHeader = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      'https://www.maxai.me/partners/uninstalled?name=ModHeader&propRef=uninstalled-modheader',
    )
  }, [router])

  return <AppLoadingLayout loading />
}
export default ModHeader

const getStaticProps = makeStaticProps()
export { getStaticProps }
