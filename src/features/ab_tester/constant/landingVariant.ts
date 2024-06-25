export type ILandingVariantType =
  | 'content1__features_has_cta_btn'
  | 'content2__features_has_cta_btn'
  | 'content1__features_no_cta_btn'
  | 'content2__features_no_cta_btn';

export const TESTER_LANDING_PATH_TARGET_PATHNAME = [
  '/',
  '/partners/updated',
  '/partners/installed',
  '/partners/uninstalled',
];

export const TEST_LANDING_COOKIE_NAME = 'maxai-lpv-v4';

export const LANDING_VARIANT: ILandingVariantType[] = [
  'content1__features_has_cta_btn',
  'content2__features_has_cta_btn',
  'content1__features_no_cta_btn',
  'content2__features_no_cta_btn',
];

export const LANDING_VARIANT_TO_VERSION_MAP: Record<
  ILandingVariantType,
  string
> = {
  content1__features_has_cta_btn: '4-1',
  content2__features_has_cta_btn: '4-2',
  content1__features_no_cta_btn: '4-3',
  content2__features_no_cta_btn: '4-4',
};
