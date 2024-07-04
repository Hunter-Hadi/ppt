import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useRef } from 'react';
import { atom, useRecoilState } from 'recoil';

import {
  ILandingVariantType,
  LANDING_VARIANT,
  LANDING_VARIANT_TO_VERSION_MAP,
  TEST_LANDING_COOKIE_NAME,
  TESTER_LANDING_PATH_TARGET_PATHNAME,
} from '@/features/ab_tester/constant/landingVariant';
import { isTargetTestPathname } from '@/features/ab_tester/utils';
import { getBrowserLanguage } from '@/features/common/utils/dataHelper/browserInfoHelper';
import useCheckExtension from '@/features/extension/hooks/useCheckExtension';
import { mixpanelTrack } from '@/features/mixpanel/utils';
import languageCodeMap from '@/i18n/types/languageCodeMap.json';
import { removeLocaleInPathname } from '@/i18n/utils';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

const LandingABTestVariantKeyAtom = atom({
  key: 'LandingABTestVariantKeyAtom',
  default: getLocalStorage(
    TEST_LANDING_COOKIE_NAME,
  ) as ILandingVariantType | null,
});

const useLandingABTester = (autoSendEvent = false) => {
  const { t } = useTranslation();

  const { pathname, isReady, query, push, reload } = useRouter();

  const sendMixpanelOnce = useRef(false);

  const [variant, setVariant] = useRecoilState(LandingABTestVariantKeyAtom);

  const loaded = useMemo(() => isReady || !!variant, [variant, isReady]);

  const { hasExtension, loaded: checkExtensionStatusLoaded } =
    useCheckExtension();

  const enabled = useMemo(() => {
    return isTargetTestPathname(pathname, TESTER_LANDING_PATH_TARGET_PATHNAME);
  }, [pathname]);

  const autoRedirectLanguage = useMemo(() => {
    return (
      variant?.includes('auto_redirect_language') &&
      !pathname.includes('[locale]')
    );
  }, [variant, pathname]);

  useEffect(() => {
    if (sendMixpanelOnce.current || !isReady || !autoSendEvent) {
      return;
    }

    if (variant && enabled) {
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
        autoRedirectLanguage &&
        isSupportLanguage &&
        // 如果当前语言不是英文，就跳转到对应语言的页面
        isSupportLanguage !== 'en' &&
        isSupportLanguage !== 'en-GB' &&
        isSupportLanguage !== 'en-US'
      ) {
        const targetPathname = removeLocaleInPathname(pathname);
        location.href = `/${isSupportLanguage}${targetPathname}${location.search}${location.hash}`;
      } else {
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
    autoRedirectLanguage,
    query,
  ]);

  const title = useMemo<React.ReactNode>(() => {
    if (!enabled || !variant) {
      return null;
    }
    if (variant.includes('content2')) {
      return (
        <>
          {t(
            'pages:home_page__hero_section__title__ab_test_v5__variant2__part1',
          )}
          <br />
          {t(
            'pages:home_page__hero_section__title__ab_test_v5__variant2__part2',
          )}
        </>
      );
    } else if (variant.includes('content1')) {
      return (
        <>
          {t(
            'pages:home_page__hero_section__title__ab_test_v4__variant2__part1',
          )}
          <br />
          {t(
            'pages:home_page__hero_section__title__ab_test_v4__variant2__part2',
          )}
        </>
      );
    }

    return null;
  }, [variant, t, enabled]);

  // const description = useMemo<React.ReactNode>(() => {
  //   if (!enabled || !variant) {
  //     return null;
  //   }

  //   if (variant.includes('content1')) {
  //     return t('pages:home_page__hero_section__desc__ab_test_v4__variant2');
  //   } else if (variant.includes('content2')) {
  //     return '123';
  //   }

  //   return null;
  // }, [variant, t, enabled]);

  useEffect(() => {
    if (!variant && enabled) {
      const randomIndex = Date.now() % LANDING_VARIANT.length;
      const randomVariant = LANDING_VARIANT[randomIndex];

      setLocalStorage(TEST_LANDING_COOKIE_NAME, randomVariant);
      setVariant(randomVariant);
    }
  }, [setVariant, variant, enabled]);

  return {
    variant,
    setVariant,
    loaded,
    title,
    description: null,
  };
};

export default useLandingABTester;
