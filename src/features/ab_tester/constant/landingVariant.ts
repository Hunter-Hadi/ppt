export type ILandingVariantType =
  | 'title1__desc1__features_carousel'
  | 'title1__desc1__features_expand'
  | 'title1__desc2__features_carousel'
  | 'title1__desc2__features_expand'
  | 'title2__desc1__features_carousel'
  | 'title2__desc1__features_expand'
  | 'title2__desc2__features_carousel'
  | 'title2__desc2__features_expand';

export const TESTER_LANDING_PATH_TARGET_PATHNAME = [
  '/',
  '/partners/updated',
  '/partners/installed',
  '/partners/uninstalled',
];

export const TEST_LANDING_COOKIE_NAME = 'maxai-lpv';

export type ILandingVariantData = {
  variant: ILandingVariantType;
};

export const LANDING_VARIANT: ILandingVariantData[] = [
  {
    variant: 'title1__desc1__features_carousel',
  },
  {
    variant: 'title1__desc1__features_expand',
  },
  {
    variant: 'title1__desc2__features_carousel',
  },
  {
    variant: 'title1__desc2__features_expand',
  },
  {
    variant: 'title2__desc1__features_carousel',
  },
  {
    variant: 'title2__desc1__features_expand',
  },
  {
    variant: 'title2__desc2__features_carousel',
  },
  {
    variant: 'title2__desc2__features_expand',
  },
];

export const LANDING_VARIANT_TO_VERSION_MAP: Record<
  ILandingVariantType,
  string
> = {
  title1__desc1__features_carousel: '1-1',
  title1__desc1__features_expand: '1-2',
  title1__desc2__features_carousel: '1-3',
  title1__desc2__features_expand: '1-4',
  title2__desc1__features_carousel: '1-5',
  title2__desc1__features_expand: '1-6',
  title2__desc2__features_carousel: '1-7',
  title2__desc2__features_expand: '1-8',
};
