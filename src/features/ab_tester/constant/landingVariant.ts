import { getFeaturesContentSearchPosition } from '../utils';

export type ILandingVariantType = //当前abtest的landing variant
  '6-1' | '6-2' | '6-3' | '6-4' | '6-5' | '6-6' | '6-7' | '6-8';

export const TESTER_LANDING_PATH_TARGET_PATHNAME = [
  '/',
  '/partners/updated',
  '/partners/installed',
  '/partners/uninstalled',
]; //开启路径，进入页面触发abtest进入通知，和语言跳转

export const TEST_LANDING_COOKIE_NAME = 'maxai-lpv-v6'; //abtest的版本名称

export const COMMON_LANDING_CONFIG = {
  isIndicatorContentTop: false,
}; //公共LANDING的配置

interface LANDING_VARIANT_CONFIG {
  titleMain?: string; //标题
  titleSecondary?: string; //副标题
  featuresContentSort: string[]; //特性内容排序
  isIndicatorContentTop: boolean; //是否指示器(徽章)内容在顶部
} //都是临时的，因为下一版可能会有不同变化，所以这里是临时的配置，不需要太规范
export const LANDING_VARIANT_CONFIG: {
  [key in ILandingVariantType]: LANDING_VARIANT_CONFIG;
} = {
  '6-1': {
    ...COMMON_LANDING_CONFIG,
    featuresContentSort: getFeaturesContentSearchPosition(3),
  },
  '6-2': {
    ...COMMON_LANDING_CONFIG,
    featuresContentSort: getFeaturesContentSearchPosition(1),
  },
  '6-3': {
    ...COMMON_LANDING_CONFIG,
    featuresContentSort: getFeaturesContentSearchPosition(6),
  },
  '6-4': {
    ...COMMON_LANDING_CONFIG,
    featuresContentSort: getFeaturesContentSearchPosition(7),
  },
  '6-5': {
    ...COMMON_LANDING_CONFIG,
    featuresContentSort: getFeaturesContentSearchPosition(3),
    isIndicatorContentTop: true,
  },
  '6-6': {
    ...COMMON_LANDING_CONFIG,
    featuresContentSort: getFeaturesContentSearchPosition(1),
    isIndicatorContentTop: true,
  },
  '6-7': {
    ...COMMON_LANDING_CONFIG,
    featuresContentSort: getFeaturesContentSearchPosition(6),
    isIndicatorContentTop: true,
  },
  '6-8': {
    ...COMMON_LANDING_CONFIG,
    featuresContentSort: getFeaturesContentSearchPosition(7),
    isIndicatorContentTop: true,
  },
}; //abtest的版本

export const LANDING_VARIANT_TO_VERSION_MAP: Record<
  ILandingVariantType,
  string
> = {
  '6-1': '6-1',
  '6-2': '6-2',
  '6-3': '6-3',
  '6-4': '6-4',
  '6-5': '6-5',
  '6-6': '6-6',
  '6-7': '6-7',
  '6-8': '6-8',
}; //abtest的版本对应的后端版本号,通知后端，以及开发时选择的版本号
