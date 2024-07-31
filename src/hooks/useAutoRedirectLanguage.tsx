import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { getBrowserLanguage } from '@/features/common/utils/dataHelper/browserInfoHelper'
import languageCodeMap from '@/packages/common/constants/languageCodeMap.json'

// 需要自动跳转的页面 白名单
const AUTO_REDIRECT_WHITE_LIST = [
  '/',
  (pathname: string) => pathname.startsWith('/use-cases'),
  (pathname: string) => pathname.startsWith('/features'),
  (pathname: string) => pathname.startsWith('/industries'),
]

// 判断当前页面是否需要自动跳转到 对应语言的页面
export function checkNeedAutoRedirect(pathname: string) {
  if (pathname.includes('embed') || pathname.includes('/[locale]')) {
    return false
  }

  if (
    AUTO_REDIRECT_WHITE_LIST.some((whitePath) => {
      if (typeof whitePath === 'function') {
        return whitePath(pathname)
      } else {
        return whitePath === pathname
      }
    })
  ) {
    return true
  }

  return false
}
const useAutoRedirectLanguage = () => {
  const [autoRedirectDone, setAutoRedirectDone] = useState(false)
  const { pathname, isReady, asPath } = useRouter()

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !checkNeedAutoRedirect(pathname) ||
      !isReady
    ) {
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
