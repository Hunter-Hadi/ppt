export type ILandingVariantType =
  | 'content1__install_with_new_tab'
  | 'content2__install_with_new_tab'
  | 'content3__install_with_new_tab'
  | 'content1__install_with_new_window'
  | 'content2__install_with_new_window'
  | 'content3__install_with_new_window';

export const TESTER_LANDING_PATH_TARGET_PATHNAME = [
  '/',
  '/partners/updated',
  '/partners/installed',
  '/partners/uninstalled',
];

export const TEST_LANDING_COOKIE_NAME = 'maxai-lpv-v3';

export const LANDING_VARIANT: ILandingVariantType[] = [
  'content1__install_with_new_tab',
  'content2__install_with_new_tab',
  'content3__install_with_new_tab',
  'content1__install_with_new_window',
  'content2__install_with_new_window',
  'content3__install_with_new_window',
];

export const LANDING_VARIANT_TO_VERSION_MAP: Record<
  ILandingVariantType,
  string
> = {
  content1__install_with_new_tab: '3-1',
  content2__install_with_new_tab: '3-2',
  content3__install_with_new_tab: '3-3',
  content1__install_with_new_window: '3-4',
  content2__install_with_new_window: '3-5',
  content3__install_with_new_window: '3-6',
};
