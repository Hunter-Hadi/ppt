/**
 *
 * 获取 浏览器 类型
 *
 * @returns {string} - Edge ｜ Firefox | Chrome
 */
export const getBrowserAgent = () => {
  if (typeof window === 'undefined') return 'Chrome'

  // edge
  const isEdge =
    window.navigator.userAgent.indexOf('Edge') > -1 ||
    window.navigator.userAgent.indexOf('Edg') !== -1

  if (isEdge) {
    return 'Edge'
  }

  // firefox
  const isFirefox = window.navigator.userAgent.indexOf('Firefox') > -1
  if (isFirefox) {
    return 'Firefox'
  }

  // default Chrome
  return 'Chrome'
}

/**
 *
 * 检查浏览器是否支持特定的目标语言
 *
 * @param targetLang
 * @returns {boolean}
 */
export const checkBrowserTargetLanguage = (targetLang: string) => {
  if (typeof window === 'undefined') return false

  try {
    return window.navigator.languages.some((lang) => lang.includes(targetLang))
  } catch (error) {
    return false
  }
}

/**
 *
 * 获取浏览器的首选语言设置
 *
 * @returns {string}
 */
export function getBrowserLanguage() {
  if (typeof window === 'undefined') return 'en'

  return navigator.language || navigator.languages[0]
}

/**
 *
 * 获取浏览器版本
 *
 * @returns {string} - 浏览器版本
 */
export const getBrowserVersion = () => {
  if (typeof window === 'undefined') return ''
  const userAgent = window.navigator.userAgent
  const version = userAgent.match(/(Chrome|Edge|Firefox)\/(\S+)/)?.[2]
  return version
}

/**
 * 判断是否是 测试工具、爬虫工具
 */
export const isLikelyBot = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  const knownBots = [
    'bot',
    'crawler',
    'spider',
    'crawling',
    'scraping',
    'headless',
  ]
  const isHeadless = /HeadlessChrome/.test(navigator.userAgent)

  return isHeadless || knownBots.some((bot) => userAgent.includes(bot))
}
