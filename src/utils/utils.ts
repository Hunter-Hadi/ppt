import CryptoJS from 'crypto-js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { sum } from 'lodash-es';
import size from 'lodash-es/size';
import { useEffect, useId, useRef } from 'react';
import { sm3 } from 'sm-crypto';

import { MAXAI_EXTENSION_ROOT_ID } from '@/features/extension/constant';
import { USER_AGENT } from '@/global_constants';
import { COUNTRIES_MAP } from '@/utils/staticData';

dayjs.extend(relativeTime);

const isrToken = process.env.NEXT_PUBLIC_ISR_TOKEN;

// 签名
const api_params_signature = (params: {
  api_path: string;
  authorization: string;
  userAgent: string;
  data: unknown;
  json_data: unknown;
  apiTime: string;
}) => {
  const {
    api_path = '',
    authorization = '',
    userAgent = '',
    data = {},
    json_data = {},
    apiTime = '',
  } = params;
  // 这个是签名加的一个固定的盐
  const hash_slat =
    'ea188e6e0b5dc2b589966f8b4c7697b3d22c5f47d5c7be8bc8258ace6f6695c4dd028cb188d56e0e51505ae7b7eb45ee77b2f1b7cb65e2362a1e363137c6378875fa408ca0cbf5ebd4e10e526b8e3b8c31484683e5a4dd315ba3e09a4d557ff48ef746b31ff50f2ec650882c508b8dcb9136558c7a831d3bc0423493b166f218';

  // 开始进行签名处理
  const json_str = JSON.stringify(json_data);
  const data_str = JSON.stringify(data);
  const hash_str = `${json_str}${data_str}${api_path}${userAgent}${authorization}${apiTime}${hash_slat}`;
  const hash_key = CryptoJS.SHA224(hash_str).toString();
  const sm3_hash_str = `${apiTime}${hash_key}`;
  const sign = sm3(sm3_hash_str);
  // console.log(
  //   `sign: ${sign}\n`,
  //   `apiTime: ${apiTime}\n`,
  //   `hash_key: ${hash_key}\n`,
  //   `sm3_hash_str: ${sm3_hash_str}\n`,
  //   `hash_str: ${hash_str}\n`,
  // );
  // 这里名字越短越好，增加逆向搜索难度
  const headers = {
    b: '',
    t: '',
  };
  headers['b'] = sign; //将最终的签名传递到后端
  headers['t'] = apiTime; //将签名用的时间戳传递到后端
  // headers['User-Agent'] = userAgent; //node环境中必写，浏览器中应该可以删除此行代码
  return headers;
};

/**
 * 检查是否是在浏览器中运行，如nodejs等一切非浏览器环境中应该终止签名函数的执行
 */
const verify_run_browser = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  if (window.navigator.webdriver) {
    // 如果存在这个属性表现非正常用户浏览
    return false;
  }
  if (/HeadlessChrome/.test(window.navigator.userAgent)) {
    return false;
  }
  // 这里还需要添加其它检测逻辑，最佳效果是能够识别 在node中使用JSDOM来伪装真实浏览器的情况
  return true;
};

// 获取请求的签名
export const api_signature_manager = (
  params: {
    api_path: string;
    authorization: string;
    userAgent: string;
    data: unknown;
    json_data: unknown;
    apiTime: string;
  },
  ssr?: boolean,
) => {
  let sign_headers = {};
  if (ssr) {
    sign_headers = api_params_signature(params);
  } else {
    // 如果是浏览器中执行的API，则需要校验是否是真实的浏览器环境
    const is_run_browser = verify_run_browser();
    if (is_run_browser) {
      // 只有是在浏览器中运行的情况下，才执行对api进行签名
      sign_headers = api_params_signature(params);
      // 以后添加多个签名函数，将依次添加到下面
    }
  }
  return sign_headers;
};

export const ssr_api_params_signature = (
  api_path: string,
  data: unknown,
  json_data: unknown,
  UserAgent?: string,
) => {
  return api_signature_manager(
    {
      api_path: api_path,
      authorization: `Bearer ${isrToken}`,
      userAgent: UserAgent ?? USER_AGENT,
      data: data,
      json_data: json_data,
      apiTime: (+dayjs()).toString(),
    },
    true,
  );
};

/**
 *
 * @param wordCount 文章总字数
 * @param speed 阅读速度 （x/分钟）
 * @returns {number} 阅读时间（分钟）
 */

export const readTime = (wordCount: number, speed?: number): number => {
  const readSpeed = speed ?? 150;
  return +((wordCount ?? 0) / readSpeed).toFixed();
};

/**
 * useUnmounted
 * @returns boolean
 * whether the component is unmounted
 */
export const useUnmounted = () => {
  const unmountedRef = useRef(false);
  useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef.current;
};

/**
 * 获取 markdown 的 descriptions
 */

export function getMdDescription(md: string) {
  const regex = {
    title: /^#\s+.+/,
    heading: /^#+\s+.+/,
    custom: /\$\$\s*\w+/,
    ol: /\d+\.\s+.*/,
    ul: /\*\s+.*/,
    task: /\*\s+\[.]\s+.*/,
    blockQuote: /\>.*/,
    table: /\|.*/,
    image: /\!\[.+\]\(.+\).*/,
    url: /\[.+\]\(.+\).*/,
    codeBlock: /\`{3}\w+.*/,
    // blod: /^\*{2}\w+\*{2}$/,
  };

  // const isTitle = (str: string) => regex.title.test(str);
  const isHeading = (str: string) => regex.heading.test(str);
  const isCustom = (str: string) => regex.custom.test(str);
  const isOl = (str: string) => regex.ol.test(str);
  const isUl = (str: string) => regex.ul.test(str);
  const isTask = (str: string) => regex.task.test(str);
  const isBlockQuote = (str: string) => regex.blockQuote.test(str);
  const isImage = (str: string) => regex.image.test(str);
  const isUrl = (str: string) => regex.url.test(str);
  const isCodeBlock = (str: string) => regex.codeBlock.test(str);
  // const isBlod = (str: string) => regex.blod.test(str);
  if (!md) return '';
  const tokens = md.split('\n').filter((item) => item.trim());
  for (let i = 0; i < tokens.length; i++) {
    if (
      isHeading(tokens[i]) ||
      isCustom(tokens[i]) ||
      isOl(tokens[i]) ||
      isUl(tokens[i]) ||
      isTask(tokens[i]) ||
      isBlockQuote(tokens[i]) ||
      isImage(tokens[i]) ||
      isUrl(tokens[i]) ||
      isCodeBlock(tokens[i])
    )
      continue;

    return tokens[i];
  }
  return '';
}

export const useSsr = () => {
  const isBrowser = typeof window !== 'undefined';
  const isServer = !isBrowser;
  return {
    isBrowser,
    isServer,
  };
};

/**
 * 字符串获取国家代码
 * @param string - 字符串
 * @param strictMode - 是否为严格模式
 */
export const getContainCountryCode = (
  string?: string,
  strictMode = false,
): string => {
  if (!string) {
    return '';
  }
  if (strictMode) {
    return (
      COUNTRIES_MAP.get(string) ||
      COUNTRIES_MAP.get(string.toLocaleLowerCase()) ||
      string.toLocaleLowerCase() ||
      ''
    );
  }
  return (
    COUNTRIES_MAP.get(string) ||
    COUNTRIES_MAP.get(string.toLocaleLowerCase()) ||
    string.toLocaleLowerCase()
  );
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

/**
 * 生成唯一的 id - 避免nextjs client render 和 server render 不一致
 * https://reactjs.org/docs/hooks-reference.html#useid
 */
export const useSsrUniqueId = () => {
  const id = useId();
  const uniqueId = Math.abs(
    sum(id.split('').map((str) => str.charCodeAt(0) - 97)),
  );
  return uniqueId;
};

export const renderTemplate = (
  template: string,
  params: any,
): {
  data: string;
  error: string;
} => {
  try {
    const data = template.replace(
      /\{\{(.+?)\}\}/g,
      (match: string, p1: string) => {
        const parts: string[] = p1.trim().split('.');
        let val: any = params;
        while (parts.length) {
          const prop: string = parts.shift()!;
          if (Object.prototype.hasOwnProperty.call(val, prop)) {
            val = val[prop];
          } else {
            val = '';
            break;
          }
        }
        return val;
      },
    );
    return {
      data,
      error: '',
    };
  } catch (e) {
    return {
      data: '',
      error: 'parse template error',
    };
  }
};

export const routerToShortcutsPage = () => {
  const appRoot = document.getElementById(MAXAI_EXTENSION_ROOT_ID)?.shadowRoot;
  if (appRoot) {
    const jumpLink = appRoot.querySelector(
      'a[href="chrome://extensions/shortcuts"]',
    ) as HTMLAnchorElement;
    if (jumpLink) {
      jumpLink.click();
    } else {
      const jumpButton = document
        .getElementById(MAXAI_EXTENSION_ROOT_ID)
        ?.shadowRoot?.querySelector(
          '#usechatgpt-www-to-shortcuts',
        ) as HTMLButtonElement;
      jumpButton?.click();
    }
  }
};

export const isInIframe = () => {
  if (typeof window === 'undefined') return false;
  try {
    return window.self !== window.top;
  } catch (e) {
    return false;
  }
};

export const openWindow = (
  url: string,
  title = 'MaxAI.me',
  sizeRatio = 0.75,
) => {
  if (window === undefined) return;

  if (navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
    window.open(url, title);
    return;
  }

  const winObject = window.top ?? window;

  const width = winObject.outerWidth * sizeRatio;
  const height = winObject.outerHeight * sizeRatio;
  const top = winObject.outerHeight / 2 + winObject.screenY - height / 2;
  const left = winObject.outerWidth / 2 + winObject.screenX - width / 2;

  debugger;
  const openResponse = winObject.open(
    url,
    title,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`,
  );

  if (document.getElementById('overlay') == null) {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.cssText = `position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index: 9999;background: #000;opacity: 0;pointer-events: none;transition: opacity ease-in-out .5s;`;
    document.body.appendChild(overlay);
  }

  const overlay = document.getElementById('overlay');
  const showOverlay = () => {
    if (overlay) {
      overlay.style.opacity = '0.75';
      overlay.style.pointerEvents = 'all';
    }
  };

  const hideOverlay = () => {
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    }
  };

  if (overlay) {
    showOverlay();
    overlay.addEventListener('click', function () {
      hideOverlay();
    });
    const timer = setInterval(() => {
      if (openResponse && openResponse.closed) {
        clearInterval(timer);
        hideOverlay();
      }
    }, 250);
  }
};
