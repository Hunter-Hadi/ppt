export type ILandingVariantType =
  | 'title1'
  | 'title2'
  | 'title3'
  | 'title4'
  | 'title5'

export const LANDING_VARIANTS = [
  'title1',
  'title2',
  'title3',
  'title4',
  'title5',
] as ILandingVariantType[]

export const TESTER_LANDING_PATH_TARGET_PATHNAME = [
  '/',
  '/partners/updated',
  '/partners/installed',
  '/partners/uninstalled',
] //开启路径，进入页面触发abtest进入通知，和语言跳转

export const TEST_LANDING_COOKIE_NAME = 'maxai-lpv-v9' //abtest的版本名称

export const LANDING_VARIANT_TO_VERSION_MAP: Record<
  ILandingVariantType,
  string
> = {
  title1: '9-1',
  title2: '9-2',
  title3: '9-3',
  title4: '9-4',
  title5: '9-5',
} //abtest的版本对应的后端版本号,通知后端，以及开发时选择的版本号
