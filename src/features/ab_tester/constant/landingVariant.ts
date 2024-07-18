import { RESOURCES_URL } from '@/global_constants'

export type ILandingVariantType = //当前abtest的landing variant
  '7-1' | '7-2' | '7-3' | '7-4' | '7-5'

export const TESTER_LANDING_PATH_TARGET_PATHNAME = [
  '/',
  '/partners/updated',
  '/partners/installed',
  '/partners/uninstalled',
] //开启路径，进入页面触发abtest进入通知，和语言跳转

export const TEST_LANDING_COOKIE_NAME = 'maxai-lpv-v7' //abtest的版本名称

export const COMMON_LANDING_CONFIG = {
  isIndicatorContentTop: false,
} //公共LANDING的配置

interface LANDING_VARIANT_CONFIG {
  featuresType: 'image' | 'video'
  titleDirection: 'supersede' | 'left' | 'rightRegular' | 'top'
} //都是临时的，因为下一版可能会有不同变化，所以这里是临时的配置，不需要太规范
export const LANDING_VARIANT_CONFIG: {
  [key in ILandingVariantType]: LANDING_VARIANT_CONFIG
} = {
  '7-1': {
    featuresType: 'image',
    titleDirection: 'supersede', //左右交替
  },
  '7-2': {
    featuresType: 'video',
    titleDirection: 'supersede', //左右交替
  },
  '7-3': {
    featuresType: 'video',
    titleDirection: 'rightRegular', //右边固定
  },
  '7-4': {
    featuresType: 'video',
    titleDirection: 'top', //上面固定
  },
  '7-5': {
    featuresType: 'video',
    titleDirection: 'left', //左边固定
  },
} //abtest的版本

export const LANDING_VARIANT_TO_VERSION_MAP: Record<
  ILandingVariantType,
  string
> = {
  '7-1': '7-1',
  '7-2': '7-2',
  '7-3': '7-3',
  '7-4': '7-4',
  '7-5': '7-5',
} //abtest的版本对应的后端版本号,通知后端，以及开发时选择的版本号
export const abTestVideoUrlObject = {
  draftingAssistant: `${RESOURCES_URL}/video/features/drafting-assistant.mp4`,
  emailAssistant: `${RESOURCES_URL}/video/features/email-assistant.mp4`,
  readingAssistant: `${RESOURCES_URL}/video/features/reading-assistant.mp4`,
  searchAssistant: `${RESOURCES_URL}/video/features/search-assistant.mp4`,
  summaryAssistant: `${RESOURCES_URL}/video/features/summary-assistant.mp4`,
  translationAssistant: `${RESOURCES_URL}/video/features/translation-assistant.mp4`,
  writingAssistant: `${RESOURCES_URL}/video/features/writing-assistant.mp4`,
}
