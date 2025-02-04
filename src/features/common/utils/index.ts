import size from 'lodash-es/size';

import {
  MAXAI_SIDEBAR_ID,
  MAXAI_SIDEBAR_WRAPPER_ID,
} from '@/features/common/constants';

export const getMaxAISidebarRootElement = (): HTMLElement | undefined => {
  return document
    .querySelector(`#${MAXAI_SIDEBAR_ID}`)
    ?.shadowRoot?.querySelector(`#${MAXAI_SIDEBAR_WRAPPER_ID}`) as HTMLElement;
};

/**
 * 判断是否有数据
 *
 * `(data: any)`
 *
 * `return` => ({}) => `false`
 *
 */
export const hasData = (data: any): boolean => {
  const dataType = typeof data;
  switch (dataType) {
    case 'object':
      if (size(data) > 0) {
        return true;
      }
      return false;
    case 'string':
      if (size(data) > 0 && data !== 'N/A') {
        return true;
      }
      return false;
    case 'number':
      if (data === 0) {
        return true;
      }
      if (isNaN(data)) {
        return false;
      }
      return true;
    case 'undefined':
      return false;
    default:
      return false;
  }
};

export const getCurrentDomainHost = (fromUrl?: string) => {
  try {
    const urlObj = fromUrl ? new URL(fromUrl) : window?.location || location;
    const host = urlObj.host.replace(/^www\./, '').replace(/:\d+$/, '');
    // lark doc的子域名是动态的，所以需要特殊处理
    if (host.includes('larksuite.com')) {
      return 'larksuite.com';
    }
    if (host === 'x.com') {
      return 'twitter.com';
    }
    return host;
  } catch (e) {
    return '';
  }
};
