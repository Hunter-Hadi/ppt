import { NextRequest, NextResponse, userAgent } from 'next/server';

import {
  LANDING_VARIANT,
  TEST_LANDING_COOKIE_NAME,
  TESTER_LANDING_PATH_TARGET_PATHNAME,
} from '@/features/ab_tester/constant/landingVariant';
import { isTargetTestPathname } from '@/features/ab_tester/utils';

// import { isLandingPagePathname } from '@/features/ab_tester/utils';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const { isBot } = userAgent(req);
  if (isBot) {
    return NextResponse.next();
  }

  // 目前只有 landing page 需要 variant （A/B test）
  if (isTargetTestPathname(url.pathname, TESTER_LANDING_PATH_TARGET_PATHNAME)) {
    const variantCookie = req.cookies.get(TEST_LANDING_COOKIE_NAME)?.value;

    let cacheVariant = variantCookie;

    let newLandingVariantData = LANDING_VARIANT.find(
      (v) => v.variant === cacheVariant,
    );
    if (!newLandingVariantData) {
      const landingVariantMap = LANDING_VARIANT;
      // 随机选择一个 variant
      const randomIndex = Date.now() % landingVariantMap.length;
      const randomVariant = landingVariantMap[randomIndex];
      newLandingVariantData = randomVariant;
      req.cookies.set(TEST_LANDING_COOKIE_NAME, newLandingVariantData.variant);
    }

    const response =
      newLandingVariantData && newLandingVariantData.pathname
        ? NextResponse.redirect(new URL(newLandingVariantData.pathname, url))
        : NextResponse.next();

    if (newLandingVariantData) {
      response.cookies.set(
        TEST_LANDING_COOKIE_NAME,
        newLandingVariantData.variant,
      );
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  // match all request paths except for public, api, assets and _next
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
