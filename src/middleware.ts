import { NextRequest, NextResponse, userAgent } from 'next/server';
import requestIp from 'request-ip';

// import { LANDING_VARIANT } from '@/features/ab_tester/constant/landingVariant';

// import { isLandingPagePathname } from '@/features/ab_tester/utils';

export function middleware(req: NextRequest) {
  const ip =
    req.headers['x-real-ip'] ??
    req.headers['x-forwarded-for'] ??
    requestIp.getClientIp(req as any);

  console.log('zztest ip', ip);

  const ua = userAgent(req);

  console.log(`zztest device`, ua);
  // const url = req.nextUrl;

  // 目前只有 landing page 需要 variant （A/B test）

  // if (isLandingPagePathname(url.pathname)) {
  //   const variantParam = url.searchParams.get('variant');
  //   const variantCookie = req.cookies.get('variant')?.value;

  //   let cacheVariant = variantParam ?? variantCookie;

  //   let newLandingVariantData = LANDING_VARIANT.find(
  //     (v) => v.variant === cacheVariant,
  //   );
  //   if (!newLandingVariantData) {
  //     const landingVariantMap = LANDING_VARIANT;
  //     // 随机选择一个 variant
  //     const randomIndex = Math.floor(Math.random() * landingVariantMap.length);
  //     const randomVariant = landingVariantMap[randomIndex];
  //     newLandingVariantData = randomVariant;
  //     req.cookies.set('variant', newLandingVariantData.variant);
  //   }

  //   const response =
  //     newLandingVariantData && newLandingVariantData.pathname
  //       ? NextResponse.redirect(new URL(newLandingVariantData.pathname, url))
  //       : NextResponse.next();

  //   console.log(`zztest variantParam`, variantParam);
  //   console.log(`zztest variantCookie`, variantCookie);
  //   console.log(
  //     `zztest newLandingVariantData`,
  //     newLandingVariantData,
  //     response,
  //   );

  //   if (newLandingVariantData) {
  //     response.cookies.set('variant', newLandingVariantData.variant);
  //   }

  //   return response;
  // }

  const url = req.nextUrl;
  if (ip && !url.searchParams.get('ip')) {
    const response = NextResponse.redirect(`${req.nextUrl}?ip=${ip}`);
    response.cookies.set('testingIp', ip);

    return response;
  } else {
    return NextResponse.next();
  }
}

export const config = {
  // match all request paths except for public, api, assets and _next
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
