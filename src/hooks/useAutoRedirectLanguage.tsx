import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { getBrowserLanguage } from '@/features/common/utils/dataHelper/browserInfoHelper'
import languageCodeMap from '@/packages/common/constants/languageCodeMap.json'
const useAutoRedirectLanguage = () => {
  const [autoRedirectDone, setAutoRedirectDone] = useState(false)
  const { pathname, isReady, asPath } = useRouter()

  const checkNeedToRedirect = () => {
    const blacklist = ['/prompt', '/prompts', '/404']

    if (blacklist.some((backPath) => pathname.includes(backPath))) {
      return false
    }

    return !pathname.includes('/[locale]') && !pathname.includes('embed')
  }

  useEffect(() => {
    if (!isReady || !checkNeedToRedirect()) {
      setAutoRedirectDone(true)
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
      // setAutoRedirectDone(true)
      location.href = `/${isSupportLanguage}${asPath}`
    } else {
      setAutoRedirectDone(true)
    }
  }, [isReady, pathname, asPath])

  return {
    autoRedirectDone,
  }
}
export default useAutoRedirectLanguage
