import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { getBrowserLanguage } from '@/features/common/utils/dataHelper/browserInfoHelper'
import languageCodeMap from '@/packages/common/constants/languageCodeMap.json'
const useAutoRedirectLanguage = () => {
  const { pathname, isReady, query, asPath } = useRouter()
  useEffect(() => {
    if (
      !isReady ||
      pathname.includes('/[locale]') ||
      pathname.includes('embed')
    ) {
      return
    }

    // 用当前浏览器的首选语言去 找对应的支持的 locale
    const currentBrowserLanguage = getBrowserLanguage()
    const languageCodes = Object.keys(languageCodeMap)
    const isSupportLanguage = languageCodes.find((languageCode) => {
      return languageCode.includes(currentBrowserLanguage)
    })

    if (
      isSupportLanguage &&
      // 如果当前语言不是英文，就跳转到对应语言的页面
      isSupportLanguage !== 'en' &&
      isSupportLanguage !== 'en-GB' &&
      isSupportLanguage !== 'en-US'
    ) {
      const targetPathname = asPath
      location.href = `/${isSupportLanguage}${targetPathname}${location.search}${location.hash}`
    }
  }, [isReady, pathname, query, asPath])
}
export default useAutoRedirectLanguage
