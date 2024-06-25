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
import useCheckExtension from '@/features/extension/hooks/useCheckExtension';
import { mixpanelTrack } from '@/features/mixpanel/utils';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

const LandingABTestVariantKeyAtom = atom({
  key: 'LandingABTestVariantKeyAtom',
  default: getLocalStorage(
    TEST_LANDING_COOKIE_NAME,
  ) as ILandingVariantType | null,
});

const useLandingABTester = (autoSendEvent = false) => {
  const { t } = useTranslation();

  const { pathname, isReady } = useRouter();

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
      if (pathname.startsWith('/partners')) {
        // 在 partners 页面时，需要判断 没有安装插件时，才发送 test_page_viewed
        if (checkExtensionStatusLoaded && !hasExtension) {
          sendMixpanelOnce.current = true;
          mixpanelTrack('test_page_viewed', {
            testVersion: LANDING_VARIANT_TO_VERSION_MAP[variant],
            testFeature: 'homePage',
          });
        }
      } else {
        sendMixpanelOnce.current = true;
        mixpanelTrack('test_page_viewed', {
          testVersion: LANDING_VARIANT_TO_VERSION_MAP[variant],
          testFeature: 'homePage',
        });
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
  ]);

  const title = useMemo<React.ReactNode>(() => {
    if (!enabled || !variant) {
      return null;
    }
    if (variant.includes('content2')) {
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
    } else if (variant.includes('content1')) {
      return <>{t('pages:home_page__hero_section__title')}</>;
    }

    return null;
  }, [variant, t, enabled]);

  const description = useMemo<React.ReactNode>(() => {
    if (!enabled || !variant) {
      return null;
    }

    if (variant.includes('content1')) {
      return t('pages:home_page__hero_section__desc');
    } else if (variant.includes('content2')) {
      return t('pages:home_page__hero_section__desc__ab_test_v4__variant2');
    }

    return null;
  }, [variant, t, enabled]);

  const featuresContentVariant = useMemo(() => {
    if (!enabled || !variant) {
      return null;
    }

    if (variant.includes('content1')) {
      return 'content1';
    } else if (variant.includes('content2')) {
      return 'content2';
    }

    return null;
  }, [variant, enabled]);

  const featuresContentHasCtaBtn = useMemo(() => {
    if (!enabled || !variant) {
      return true;
    } else {
      return variant.includes('features_has_cta_btn');
    }
  }, [variant, enabled]);

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
    description,
    featuresContentVariant,
    featuresContentHasCtaBtn,
  };
};

export default useLandingABTester;
