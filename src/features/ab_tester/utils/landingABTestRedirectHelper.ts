import { parse, serialize } from 'cookie';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { fixHrefWithLocale } from '@/i18n/utils';

import {
  LANDING_VARIANT,
  TEST_LANDING_COOKIE_NAME,
  TESTER_LANDING_PATH_TARGET_PATHNAME,
} from '../constant/landingVariant';
import { isTargetTestPathname } from '.';

const landingABTestRedirectHelper = (
  context: GetServerSidePropsContext,
): GetServerSidePropsResult<any> | null => {
  const { resolvedUrl, res, req } = context;

  const locale = context.query?.locale as string;

  if (isTargetTestPathname(resolvedUrl, TESTER_LANDING_PATH_TARGET_PATHNAME)) {
    const cookies = parse(req.headers.cookie || '');

    const landingVariantCookies = cookies[TEST_LANDING_COOKIE_NAME];
    const landingVariantDataCache = LANDING_VARIANT.find(
      (v) => v.variant === landingVariantCookies,
    );

    if (landingVariantDataCache && landingVariantDataCache.pathname) {
      return {
        redirect: {
          permanent: false,
          destination: fixHrefWithLocale(
            landingVariantDataCache.pathname,
            locale,
          ),
        },
      };
    } else {
      const randomIndex = Date.now() % LANDING_VARIANT.length;
      const randomVariant = LANDING_VARIANT[randomIndex];
      res.setHeader(
        'Set-Cookie',
        serialize(TEST_LANDING_COOKIE_NAME, randomVariant.variant, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/',
        }),
      );
      return {
        redirect: {
          permanent: false,
          destination: fixHrefWithLocale(randomVariant.pathname, locale),
        },
      };
    }
  }

  return null;
};

export { landingABTestRedirectHelper };
