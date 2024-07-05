import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useRef } from 'react';
import { atom, useRecoilState } from 'recoil';

import {
  ILandingVariantType,
  LANDING_VARIANT_CONFIG,
  LANDING_VARIANT_TO_VERSION_MAP,
  TEST_LANDING_COOKIE_NAME,
  TESTER_LANDING_PATH_TARGET_PATHNAME,
} from '@/features/ab_tester/constant/landingVariant';
import { isTargetTestPathname } from '@/features/ab_tester/utils';
import { getBrowserLanguage } from '@/features/common/utils/dataHelper/browserInfoHelper';
import useCheckExtension from '@/features/extension/hooks/useCheckExtension';
import { mixpanelTrack } from '@/features/mixpanel/utils';
import languageCodeMap from '@/i18n/types/languageCodeMap.json';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

const LandingABTestVariantKeyAtom = atom({
  key: 'LandingABTestVariantKeyAtom',
  default: getLocalStorage(
    TEST_LANDING_COOKIE_NAME,
  ) as ILandingVariantType | null,
});

const useLandingABTester = (autoSendEvent = false) => {
  const { t } = useTranslation();

  const { pathname, isReady, query } = useRouter();

  const sendMixpanelOnce = useRef(false);

  const [variant, setVariant] = useRecoilState(LandingABTestVariantKeyAtom);

  const loaded = useMemo(() => isReady || !!variant, [variant, isReady]);

  const { hasExtension, loaded: checkExtensionStatusLoaded } =
    useCheckExtension();

  const enabled = useMemo(() => {
    return isTargetTestPathname(pathname, TESTER_LANDING_PATH_TARGET_PATHNAME);
  }, [pathname]);

  useEffect(() => {
    if (sendMixpanelOnce.current || !isReady || !autoSendEvent) {
      return;
    }
    if (variant && enabled) {
      // 发送 test_page_viewed 事件
      //通知后端用户进入了测试页面
      const sendEvent = () => {
        sendMixpanelOnce.current = true;
        mixpanelTrack('test_page_viewed', {
          testVersion: LANDING_VARIANT_TO_VERSION_MAP[variant],
          testFeature: 'homePage',
        });
      };

      // 用当前浏览器的首选语言去 找对应的支持的 locale
      const currentBrowserLanguage = getBrowserLanguage();
      const languageCodes = Object.keys(languageCodeMap);
      const isSupportLanguage = languageCodes.find((languageCode) => {
        return languageCode.includes(currentBrowserLanguage);
      });

      if (
        !(
          !pathname.includes('[locale]') &&
          isSupportLanguage &&
          isSupportLanguage !== 'en' &&
          isSupportLanguage !== 'en-GB' &&
          isSupportLanguage !== 'en-US'
        )
      ) {
        // 如果是当前语言，则不需要跳转了，触发sendEvent
        if (pathname.startsWith('/partners')) {
          // 在 partners 页面时，需要判断 没有安装插件时，才发送 test_page_viewed
          if (checkExtensionStatusLoaded && !hasExtension) {
            sendEvent();
          }
        } else {
          sendEvent();
        }
      }
    }
  }, [
    enabled,
    isReady,
    variant,
    pathname,
    hasExtension,
    autoSendEvent,
    checkExtensionStatusLoaded,
    query,
  ]);

  const title = useMemo<React.ReactNode>(() => {
    if (!enabled || !variant) {
      return null;
    }
    if (
      LANDING_VARIANT_CONFIG[variant] &&
      LANDING_VARIANT_CONFIG[variant].titleMain &&
      LANDING_VARIANT_CONFIG[variant].titleSecondary
    ) {
      return (
        <>
          {t(LANDING_VARIANT_CONFIG[variant].titleMain as string)}
          <br />
          {t(LANDING_VARIANT_CONFIG[variant].titleSecondary as string)}
        </>
      );
    }

    return null;
  }, [variant, t, enabled]);

  useEffect(() => {
    if (!variant && enabled) {
      const keys = Object.keys(LANDING_VARIANT_CONFIG) as ILandingVariantType[];
      const randomIndex = Date.now() % keys.length; //随机选择一个variant
      const randomVariant = keys[randomIndex];
      setLocalStorage(TEST_LANDING_COOKIE_NAME, randomVariant);
      setVariant(randomVariant); //设置当前的abtest的variant
    }
  }, [setVariant, variant, enabled]);
  const featuresContentSort = useMemo(() => {
    return variant
      ? LANDING_VARIANT_CONFIG[variant]?.featuresContentSort
      : undefined;
  }, [variant]);
  const isIndicatorContentTop = useMemo(() => {
    return variant
      ? LANDING_VARIANT_CONFIG[variant]?.isIndicatorContentTop
      : false;
  }, [variant]);
  return {
    variant,
    setVariant,
    loaded,
    title,
    description: null,
    featuresContentSort,
    isIndicatorContentTop,
  };
};

export default useLandingABTester;
