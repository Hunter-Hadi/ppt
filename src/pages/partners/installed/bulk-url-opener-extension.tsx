import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import { makeStaticProps } from '@/i18n/utils/staticHelper'

const BulkUrlOpenerExtensionInstall = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      `https://www.maxai.me/partners/installed?name=Bulk+URL+Opener+Extension&propRef=installed-bulk-url-opener-extension`,
    )
  }, [router])

  return <AppLoadingLayout loading />
}
export default BulkUrlOpenerExtensionInstall

const getStaticProps = makeStaticProps()
export { getStaticProps }
