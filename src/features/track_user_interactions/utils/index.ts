import AES from 'crypto-js/aes';
import { i18n } from 'i18next';
import { debounce } from 'lodash-es';
import React, { useCallback, useEffect } from 'react';
import { UAParser } from 'ua-parser-js';

import { FINGER_PRINT_LOCAL_STORAGE_SAVE_KEY } from '@/utils/fingerPrint';
import { getLocalStorage } from '@/utils/localStorage';

const { getBrowser, getOS } = new UAParser();

const API_HOST = process.env.NEXT_PUBLIC_BASE_URL;
const APP_NAME = 'maxai_www' as TrackUserInteractionAPPType;
/**
 * 因为每个项目的FingerPrint不一样，所以需要在项目中实现这个方法
 */
const getTrackUserFingerPrint = () => {
  return getLocalStorage(FINGER_PRINT_LOCAL_STORAGE_SAVE_KEY) || '';
};
/**
 * 因为每个项目的FingerPrint不一样，所以需要在项目中实现这个方法
 */
const getHttpRequestHeader = (): {
  Authorization?: string;
} => {
  // const accessToken = getAccessToken();
  return {
    // Authorization: '',
  };
};

export type TrackUserInteractionActionType = 'btn_click' | 'page_load';

export type TrackUserInteractionAPPType = 'maxai_www' | 'maxai_app';

export type TrackUserInteractionRequestType = {
  page: string;
  action: {
    type: TrackUserInteractionActionType;
    id: string;
    log_version: number;
    [key: string]: string | number | boolean;
  };
  app: TrackUserInteractionAPPType;
  url: string;
  app_version: string;
  browser: string;
  browser_version: string;
  platform: string;
  language: string[];
  fp: string;
  client_uuid: string;
  meta: Record<string, any>;
};

/**
 * 记录用户行为
 * @param actionType - 行为类型
 * @param actionData - 行为数据
 */
export const trackUserInteraction = debounce(
  async (
    actionType: TrackUserInteractionActionType,
    actionData: Record<string, string | number | boolean>,
  ) => {
    try {
      if (!actionData.id) {
        return;
      }
      const requestHeader = getHttpRequestHeader();
      if (APP_NAME === 'maxai_app' && !requestHeader.Authorization) {
        return;
      }
      const browser = getBrowser();
      const os = getOS();
      const originalData: TrackUserInteractionRequestType = {
        page: window.location.pathname,
        action: {
          type: actionType,
          id: '',
          log_version: 1,
          ...actionData,
        },
        app: APP_NAME,
        url: window.location.href,
        app_version: '1.0.0',
        browser: browser.name || '',
        browser_version: browser.version || '',
        platform: os.name || '',
        language: Array.from(navigator.languages) || ['en'],
        fp: getTrackUserFingerPrint(),
        client_uuid: getLocalStorage('CLIENT_USER_ID') || '',
        meta: {
          ref: getLocalStorage('LANDING_PAGE_REF') ?? '',
        },
      };
      const info = AES.encrypt(
        JSON.stringify(originalData),
        'MaxAI',
      ).toString();

      await fetch(`${API_HOST}/app/uplog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...requestHeader,
        },
        body: JSON.stringify({
          info,
        }),
      })
        .then()
        .catch();
    } catch (e) {
      // do nothing
    }
  },
  100,
);

/**
 * 寻找父级元素是selector元素
 * @param selector
 * @param startElement
 * @param maxDeep
 */
const findParentEqualSelector = (
  selector: string,
  startElement: HTMLElement,
  maxDeep = 20,
) => {
  try {
    let parent: HTMLElement = startElement;
    let deep = 0;
    while (deep < maxDeep && !parent?.matches(selector)) {
      parent = parent?.parentElement as HTMLElement;
      deep++;
    }
    return parent?.matches(selector) ? parent : null;
  } catch (e) {
    return null;
  }
};

export const useTrackUserInteractions = (i18nInstance: i18n) => {
  const handleUserInteraction: any = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      const targetElement = event.target as HTMLElement;
      const muiTrackElement =
        findParentEqualSelector('.MuiButton-root', targetElement, 10) ||
        findParentEqualSelector('.MuiLink-root', targetElement, 10);
      if (muiTrackElement) {
        let isTrackSuccess = false;
        let buttonText = muiTrackElement?.innerText || '';
        if (!buttonText) {
          // 可能是Icon button
          const muiSvgIcon = muiTrackElement.querySelector(
            '.MuiSvgIcon-root[data-testid]',
          );
          if (muiSvgIcon) {
            buttonText = muiSvgIcon.getAttribute('data-testid') || '';
            if (['CloseIcon'].includes(buttonText)) {
              buttonText = 'Close';
            } else {
              // 其他情况不记录
              buttonText = '';
            }
          }
        }
        const buttonLink = muiTrackElement?.getAttribute?.('href') || '';
        try {
          // 通过按钮文案去找到对应的i18n key
          let currentLanguageResource =
            i18nInstance.options.resources[i18nInstance.language];

          if (APP_NAME === 'maxai_www') {
            // 由于 www 使用的 next-i18next，命名空间 需要多一层
            currentLanguageResource = currentLanguageResource['index'];
          }
          const namespaces = Object.keys(currentLanguageResource);
          let currentI18nKey = '';
          for (const namespace of namespaces) {
            const namespaceResource = currentLanguageResource[namespace];
            for (const key in namespaceResource) {
              if (namespaceResource[key] === buttonText) {
                currentI18nKey = namespace + ':' + key;
                break;
              }
            }
          }
          if (currentI18nKey) {
            // 找到英语版本的value
            const enButtonText = i18nInstance.t(currentI18nKey, { lng: 'en' });
            if (enButtonText) {
              // 获取所有的data-xxx
              const dataAttributeMap = Array.from(
                muiTrackElement.attributes,
              ).reduce(
                (dataAttributeMap: Record<string, string>, attribute) => {
                  if (attribute.name.startsWith('data-')) {
                    dataAttributeMap[attribute.name] = attribute.value;
                  }
                  return dataAttributeMap;
                },
                {},
              );
              // 记录用户点击行为
              await trackUserInteraction('btn_click', {
                id: enButtonText,
                buttonLink: buttonLink || '',
                ...dataAttributeMap,
              });
              isTrackSuccess = true;
            }
          }
        } catch (e) {
          // do nothing
        } finally {
          if (!isTrackSuccess) {
            // do something
            await trackUserInteraction('btn_click', {
              id: `${buttonText}[noI18n]`,
              buttonLink: buttonLink,
              buttonText: muiTrackElement.innerText.trim(),
            });
          }
        }
      }
    },
    [],
  );

  useEffect(() => {
    document.addEventListener('click', handleUserInteraction, true);
    return () => {
      document.removeEventListener('click', handleUserInteraction, true);
    };
  }, [handleUserInteraction]);
};
