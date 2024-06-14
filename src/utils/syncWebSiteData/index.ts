import { APP_PROJECT_LINK, WWW_PROJECT_LINK } from '@/global_constants';
import { ILocalStorageKeyType, setLocalStorage } from '@/utils/localStorage';
import { isBot } from '@/utils/utils';

export const TARGET_ENV: IStorageTargetEnv = 'app';

export type IStorageTargetEnv = 'app' | 'www';

const iframePath = `/embed/sync-data-to-storage`;

interface ISyncWebSiteDataToStorageWithIframeOptions {
  onIframeLoaded?: () => void;
  // 传 -1 表示不设置超时
  timeout?: number;
}

export type INeedSyncWebSiteDataType = Record<string, string | number>;

export const setLocalStorageWebSiteData = (
  data: Record<string, string | number>,
): {
  isSuccess: boolean;
  invalidDataKey?: string[];
} => {
  // 只 保存 合法数据
  const validDataKey = [
    'INVITATION_CODE',
    'LANDING_PAGE_REF',
    'MAXAI_REWARDFUL_REFERRAL_ID',
  ];

  // 保存非法的 key，方便后续排查
  const invalidDataKey: string[] = [];

  Object.keys(data).forEach((key) => {
    if (validDataKey.includes(key)) {
      setLocalStorage(key as ILocalStorageKeyType, data[key]);
    } else {
      invalidDataKey.push(key);
    }
  });

  if (invalidDataKey.length <= 0) {
    return {
      isSuccess: true,
    };
  }

  return {
    isSuccess: false,
    invalidDataKey,
  };
};

const createTargetIframe = (targetEnv: IStorageTargetEnv) => {
  const iframe = document.createElement('iframe');
  if (targetEnv === 'app') {
    iframe.src = `${APP_PROJECT_LINK}${iframePath}`;
  } else if (targetEnv === 'www') {
    iframe.src = `${WWW_PROJECT_LINK}${iframePath}`;
  }
  iframe.setAttribute(
    'style',
    `position: absolute;opacity: 0;width: 1px;height: 1px;top: 0;left: 0;border: none;display: block;z-index: -1;pointer-events: none;
    `,
  );
  document.body.appendChild(iframe);
  return iframe;
};

export const syncWebSiteDataToStorageWithIframe = (
  needStorageData: INeedSyncWebSiteDataType,
  options?: ISyncWebSiteDataToStorageWithIframeOptions,
) => {
  if (isBot()) {
    return false;
  }
  return new Promise((resolve) => {
    const iframe = createTargetIframe(TARGET_ENV);

    // 延迟
    let timer: number | null = null;
    if (options?.timeout !== -1) {
      timer = window.setTimeout(() => {
        resolve(false);
      }, options?.timeout || 10000);
    }

    const listenerHandler = (event: MessageEvent) => {
      const eventData = event.data;
      switch (eventData.type) {
        case 'MAXAI__SYNC_DATA_TO_STORAGE__PAGE_LOADED': {
          if (options?.onIframeLoaded) {
            options.onIframeLoaded();
          }
          if (iframe.contentWindow) {
            iframe.contentWindow.postMessage(
              {
                type: 'MAXAI__SYNC_DATA_TO_STORAGE__SET_DATA',
                data: needStorageData,
              },
              '*',
            );
          }
          break;
        }
        case 'MAXAI__SYNC_DATA_TO_STORAGE__SET_DATA_DONE': {
          const { isSuccess, invalidDataKey } = eventData.data;
          timer && window.clearTimeout(timer);
          timer = null;
          iframe.remove();
          window.removeEventListener('message', listenerHandler);
          console.error(
            `[ERROR] Unable to synchronize illegal key values`,
            invalidDataKey,
          );
          resolve(isSuccess);
          break;
        }
        default:
          break;
      }
    };

    window.addEventListener('message', listenerHandler);
  });
};
