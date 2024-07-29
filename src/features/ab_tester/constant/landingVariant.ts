export type ILandingVariantType =
  | 'cloudflare_video' // cloudflare video
  | 'youtube_video' // youtube video

export const LANDING_VARIANTS = [
  'cloudflare_video',
  'youtube_video',
] as ILandingVariantType[]

export const TESTER_LANDING_PATH_TARGET_PATHNAME = [
  '/',
  '/partners/updated',
  '/partners/installed',
  '/partners/uninstalled',
  (pathname: string) => pathname.startsWith('/features'),
] //开启路径，进入页面触发abtest进入通知，和语言跳转

export const TEST_LANDING_COOKIE_NAME = 'maxai-lpv-v8' //abtest的版本名称

export const LANDING_VARIANT_TO_VERSION_MAP: Record<
  ILandingVariantType,
  string
> = {
  cloudflare_video: '8-1',
  youtube_video: '8-2',
} //abtest的版本对应的后端版本号,通知后端，以及开发时选择的版本号
