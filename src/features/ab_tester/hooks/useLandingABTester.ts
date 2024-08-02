import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef } from 'react'
import { atom, useRecoilState } from 'recoil'

import {
  ILandingVariantType,
  LANDING_VARIANT_TO_VERSION_MAP,
  LANDING_VARIANTS,
  TEST_LANDING_COOKIE_NAME,
  TESTER_LANDING_PATH_TARGET_PATHNAME,
} from '@/features/ab_tester/constant/landingVariant'
import { isTargetTestPathname } from '@/features/ab_tester/utils'
import useCheckExtension from '@/features/extension/hooks/useCheckExtension'
import { mixpanelTrack } from '@/features/mixpanel/utils'
import useAutoRedirectLanguage from '@/hooks/useAutoRedirectLanguage'
import usePageLoaded from '@/hooks/usePageLoaded'
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage'

const LandingABTestVariantKeyAtom = atom<ILandingVariantType | null>({
  key: 'LandingABTestVariantKeyAtom',
  default: null,
})

const useLandingABTester = (autoSendEvent = false) => {
  const { pathname } = useRouter()

  const { isLoaded: pageLoaded } = usePageLoaded()

  const sendMixpanelOnce = useRef(false)

  const { autoRedirectDone } = useAutoRedirectLanguage()

  const [variant, setVariant] = useRecoilState(LandingABTestVariantKeyAtom)

  const loaded = useMemo(() => pageLoaded && !!variant, [variant, pageLoaded])

  const { hasExtension, loaded: checkExtensionStatusLoaded } =
    useCheckExtension()

  const enabled = useMemo(() => {
    return isTargetTestPathname(pathname, TESTER_LANDING_PATH_TARGET_PATHNAME)
  }, [pathname])

  useEffect(() => {
    if (sendMixpanelOnce.current || !pageLoaded || !autoSendEvent) {
      return
    }

    if (variant && enabled) {
      // 发送 test_page_viewed 事件
      //通知后端用户进入了测试页面
      const sendEvent = () => {
        sendMixpanelOnce.current = true
        mixpanelTrack('test_page_viewed', {
          testVersion: LANDING_VARIANT_TO_VERSION_MAP[variant],
          testFeature: 'homePage',
        })
      }

      if (!autoRedirectDone) {
        return
      }

      if (pathname.startsWith('/partners')) {
        // 在 partners 页面时，需要判断 没有安装插件时，才发送 test_page_viewed
        if (checkExtensionStatusLoaded && !hasExtension) {
          sendEvent()
        }
      } else {
        sendEvent()
      }
    }
  }, [
    enabled,
    pageLoaded,
    variant,
    pathname,
    hasExtension,
    autoSendEvent,
    checkExtensionStatusLoaded,
    autoRedirectDone,
  ])

  useEffect(() => {
    if (!variant && enabled && pageLoaded) {
      const cacheVariant = getLocalStorage(TEST_LANDING_COOKIE_NAME)
      if (cacheVariant) {
        // startTransition(() => {
        setVariant(cacheVariant as ILandingVariantType)
        // })
        return
      }

      const keys = LANDING_VARIANTS
      const randomIndex = Math.floor(Math.random() * keys.length) //随机选择一个variant
      const randomVariant = keys[randomIndex]
      setLocalStorage(TEST_LANDING_COOKIE_NAME, randomVariant)
      // startTransition(() => {
      setVariant(randomVariant) //设置当前的abtest的variant
      // })
    }
  }, [setVariant, variant, enabled, pageLoaded])

  return {
    enabled,
    variant: enabled ? variant : null,
    setVariant,
    loaded,
  }
}

export default useLandingABTester
