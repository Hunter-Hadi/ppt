import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import { makeStaticProps } from '@/i18n/utils/staticHelper'

const EyedropperUpdated = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      'https://www.maxai.me/partners/updated/?name=Eye+Dropper&propRef=eyedropper',
    )
  }, [router])

  return <AppLoadingLayout loading />
}
export default EyedropperUpdated

const getStaticProps = makeStaticProps()
export { getStaticProps }
