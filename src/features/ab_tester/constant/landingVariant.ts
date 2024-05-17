type ILandingVariantType =
  | 'title1__desc1__features_carousel'
  | 'title1__desc1__features_expand'
  | 'title1__desc2__features_carousel'
  | 'title1__desc2__features_expand'
  | 'title2__desc1__features_carousel'
  | 'title2__desc1__features_expand'
  | 'title2__desc2__features_carousel'
  | 'title2__desc2__features_expand';

export const TESTER_LANDING_PATH_TARGET_PATHNAME = '/';

export const TEST_LANDING_COOKIE_NAME = 'maxai-lpv';

export type ILandingVariantData = {
  variant: ILandingVariantType;
  pathname: string;
};

export const LANDING_VARIANT: ILandingVariantData[] = [
  {
    variant: 'title1__desc1__features_carousel',
    pathname: '/lp/v1',
  },
  {
    variant: 'title1__desc1__features_expand',
    pathname: '/lp/v2',
  },
  {
    variant: 'title1__desc2__features_carousel',
    pathname: '/lp/v3',
  },
  {
    variant: 'title1__desc2__features_expand',
    pathname: '/lp/v4',
  },
  {
    variant: 'title2__desc1__features_carousel',
    pathname: '/lp/v5',
  },
  {
    variant: 'title2__desc1__features_expand',
    pathname: '/lp/v6',
  },
  {
    variant: 'title2__desc2__features_carousel',
    pathname: '/lp/v7',
  },
  {
    variant: 'title2__desc2__features_expand',
    pathname: '/lp/v8',
  },
];
