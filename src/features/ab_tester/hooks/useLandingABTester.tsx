import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useRef } from 'react';
import { atom, useRecoilState } from 'recoil';

import {
  ILandingVariantType,
  LANDING_VARIANT,
  TEST_LANDING_COOKIE_NAME,
} from '@/features/ab_tester/constant/landingVariant';
import { mixpanelTrack } from '@/features/mixpanel/utils';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

const LandingABTestVariantKeyAtom = atom({
  key: 'LandingABTestVariantKeyAtom',
  default: getLocalStorage(TEST_LANDING_COOKIE_NAME) as ILandingVariantType,
});

const useLandingABTester = () => {
  const { t } = useTranslation();
  const sendMixpanelOnce = useRef(false);

  const [variant, setVariant] = useRecoilState(LandingABTestVariantKeyAtom);

  useEffect(() => {
    if (sendMixpanelOnce.current) {
      return;
    }
    if (variant) {
      sendMixpanelOnce.current = true;
      mixpanelTrack('test_page_viewed', {
        testVersion: variant,
      });
    }
  }, [variant]);

  useEffect(() => {
    if (!variant) {
      const randomIndex = Date.now() % LANDING_VARIANT.length;
      const randomVariant = LANDING_VARIANT[randomIndex];

      setLocalStorage(TEST_LANDING_COOKIE_NAME, randomVariant.variant);
      setVariant(randomVariant.variant);
    }
  }, [variant]);

  const loaded = useMemo(() => !!variant, [variant]);

  const title = useMemo<React.ReactNode>(() => {
    if (variant) {
      if (variant.includes('title1')) {
        return null;
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
        return null;
      }

      if (variant.includes('desc2')) {
        return t('pages:home_page__hero_section__desc__variant2');
      }
    } else {
      return null;
    }
  }, [variant, t]);

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
