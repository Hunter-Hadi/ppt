/**
 * maxai 运行的环境: dev, test, prod
 */
export const COMMON_MAXAI_ENV =
  /* @ts-ignore */
  (typeof process !== 'undefined'
    ? /* @ts-ignore */
      process?.env?.NEXT_PUBLIC_ENV
    : '') ||
  /* @ts-ignore */
  (typeof ENV_DEFINE__ENV !== 'undefined'
    ? /* @ts-ignore */
      ENV_DEFINE__ENV
    : '') ||
  'prod';

/**
 * maxai www 项目地址
 */
export const COMMON_MAXAI_WWW_PROJECT_HOST =
  /* @ts-ignore */
  (typeof process !== 'undefined'
    ? /* @ts-ignore */
      process?.env?.NEXT_PUBLIC_WWW_PROJECT_HOST
    : '') /* @ts-ignore */ ||
  (typeof ENV_DEFINE__LINKS__WWW_PROJECT_LINK !== 'undefined'
    ? /* @ts-ignore */
      ENV_DEFINE__LINKS__WWW_PROJECT_LINK
    : '') ||
  'https://www.maxai.me';

/**
 * maxai app 项目地址
 */
export const COMMON_MAXAI_APP_PROJECT_HOST =
  /* @ts-ignore */
  (typeof process !== 'undefined'
    ? /* @ts-ignore */
      process?.env?.NEXT_PUBLIC_APP_PROJECT_HOST
    : '') ||
  /* @ts-ignore */
  (typeof ENV_DEFINE__LINKS__APP_PROJECT_LINK !== 'undefined'
    ? /* @ts-ignore */
      ENV_DEFINE__LINKS__APP_PROJECT_LINK
    : '') ||
  'https://app.maxai.me';

/**
 * maxai api 项目地址
 */
export const COMMON_MAXAI_API_HOST =
  /* @ts-ignore */
  (typeof process !== 'undefined'
    ? /* @ts-ignore */
      process?.env?.NEXT_PUBLIC_API_PROJECT_HOST
    : '') ||
  /* @ts-ignore */
  (typeof ENV_DEFINE__LINKS__API_HOST !== 'undefined'
    ? /* @ts-ignore */
      ENV_DEFINE__LINKS__API_HOST
    : '') ||
  'https://api.maxai.me';

export const COMMON_PROJECT_BASE_PATH =
  /* @ts-ignore */
  (typeof process !== 'undefined' ? process?.env?.NEXT_PUBLIC_BASE_PATH : '') ||
  '';
