export type ILandingVariantType =
  | 'content1__not_redirect_language'
  | 'content2__not_redirect_language'
  | 'content1__auto_redirect_language'
  | 'content2__auto_redirect_language';

export const TESTER_LANDING_PATH_TARGET_PATHNAME = [
  '/',
  '/partners/updated',
  '/partners/installed',
  '/partners/uninstalled',
];

export const TEST_LANDING_COOKIE_NAME = 'maxai-lpv-v5';

export const LANDING_VARIANT: ILandingVariantType[] = [
  'content1__not_redirect_language',
  'content2__not_redirect_language',
  'content1__auto_redirect_language',
  'content2__auto_redirect_language',
];

export const LANDING_VARIANT_TO_VERSION_MAP: Record<
  ILandingVariantType,
  string
> = {
  content1__not_redirect_language: '5-1',
  content2__not_redirect_language: '5-2',
  content1__auto_redirect_language: '5-3',
  content2__auto_redirect_language: '5-4',
};
