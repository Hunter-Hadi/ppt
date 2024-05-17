import Cookies from 'js-cookie';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';

import {
  ILandingVariantType,
  LANDING_VARIANT,
  TEST_LANDING_COOKIE_NAME,
} from '@/features/ab_tester/constant/landingVariant';

const useLandingABTester = () => {
  const { t } = useTranslation();

  const [variant, setVariant] = useState<ILandingVariantType | null>(
    Cookies.get(TEST_LANDING_COOKIE_NAME) as ILandingVariantType,
  );

  useEffect(() => {
    if (!variant) {
      const randomIndex = Date.now() % LANDING_VARIANT.length;
      const randomVariant = LANDING_VARIANT[randomIndex];

      Cookies.set(TEST_LANDING_COOKIE_NAME, randomVariant.variant);
      setVariant(randomVariant.variant);
    }
  }, [variant]);

  const loaded = useMemo(() => !!variant, [variant]);

  const title = useMemo<React.ReactNode | null>(() => {
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

  const description = useMemo<React.ReactNode | null>(() => {
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
    loaded,
    title,
    description,
    featuresCarousel: variant?.includes('features_carousel'),
    featuresExpand: variant?.includes('features_expand'),
  };
};

export default useLandingABTester;
