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

  const { hasExtension } = useCheckExtension();

  useEffect(() => {
    if (sendMixpanelOnce.current || !isReady || !autoSendEvent) {
      return;
    }
    if (
      variant &&
      isTargetTestPathname(pathname, TESTER_LANDING_PATH_TARGET_PATHNAME)
    ) {
      if (pathname.startsWith('/partners')) {
        // 在 partners 页面时，需要判断 没有安装插件时，才发送 test_page_viewed
        if (!hasExtension) {
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
  }, [isReady, variant, pathname, hasExtension, autoSendEvent]);

  const title = useMemo<React.ReactNode>(() => {
    if (variant) {
      if (variant.includes('title1')) {
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

      if (variant.includes('title2')) {
        return (
          <>
            {t('pages:home_page__hero_section__title__variant2__part1')}
            <br />
            {t('pages:home_page__hero_section__title__variant2__part2')}
          </>
        );
      }
    } else {
      return null;
    }
  }, [variant, t]);

  const description = useMemo<React.ReactNode>(() => {
    if (variant) {
      if (variant.includes('desc1')) {
        return t('pages:home_page__hero_section__desc');
      }

      if (variant.includes('desc2')) {
        return t('pages:home_page__hero_section__desc__variant2');
      }
    } else {
      return null;
    }
  }, [variant, t]);

  useEffect(() => {
    if (!variant) {
      const randomIndex = Date.now() % LANDING_VARIANT.length;
      const randomVariant = LANDING_VARIANT[randomIndex];

      setLocalStorage(TEST_LANDING_COOKIE_NAME, randomVariant.variant);
      setVariant(randomVariant.variant);
    }
  }, [variant]);

  return {
    variant,
    setVariant,
    loaded,
    title,
    description,
    featuresCarousel: variant?.includes('features_carousel'),
    featuresExpand: variant?.includes('features_expand'),
  };
};

export default useLandingABTester;
