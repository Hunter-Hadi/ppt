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
    if (variant && enabled) {
      if (variant.includes('features_with_point')) {
        return (
          <>
            {t('pages:home_page__hero_section__title__part1')}
            <br />
            {t('pages:home_page__hero_section__title__part2')}
            <br />
            {t('pages:home_page__hero_section__title__part3')}
          </>
        );
      }

      if (variant.includes('features_with_scene')) {
        return <>{t('pages:home_page__hero_section__title__variant2')}</>;
      }
    } else {
      return null;
    }
  }, [variant, t, enabled]);

  const description = useMemo<React.ReactNode>(() => {
    if (variant && enabled) {
      if (variant.includes('features_with_point')) {
        return t('pages:home_page__hero_section__desc');
      }

      if (variant.includes('features_with_scene')) {
        return t('pages:home_page__hero_section__desc__variant2');
      }
    } else {
      return null;
    }
  }, [variant, t, enabled]);

  const heroVideoVariant = useMemo<'autoplay' | 'embed'>(() => {
    if (variant && enabled) {
      if (variant.includes('autoplay_video')) {
        return 'autoplay';
      } else {
        return 'embed';
      }
    } else {
      return 'embed';
    }
  }, [variant, enabled]);

  const heroSectionLayout = useMemo(() => {
    if (variant && enabled) {
      if (variant.includes('video_on_bottom')) {
        return 'ttb-layout';
      } else {
        return 'ltr-layout';
      }
    } else {
      return 'ltr-layout';
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
    featuresWithScene: variant?.includes('features_with_scene'),
    heroVideoVariant,
    heroSectionLayout,
  };
};

export default useLandingABTester;
