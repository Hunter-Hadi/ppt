import { useState } from 'react';

import { SSO_WHITE_LIST_HOSTS } from '@/packages/auth/constants';
import {
  MaxAIListenConnectAccountDataType,
  MaxAIListenConnectAccountType,
} from '@/packages/auth/types';
import { getCurrentUserTokens } from '@/packages/auth/utils';

const isInIframe = () => {
  try {
    return window.self !== window.top && !window.opener;
  } catch (e) {
    // 如果跨域访问iframe，则会抛出异常
    return false;
  }
};

export const useListenMaxAIConnectAccount = (
  onMessage: (event: MaxAIListenConnectAccountDataType) => void,
) => {
  const [loaded, setLoaded] = useState(false);
  const [isIframeOrPopup, setIsIframeOrPopup] = useState(true);
  const listenMaxAIConnectAccount = () => {
    // 判断是不是iframe或者popup
    if (!window.opener && !isInIframe()) {
      setLoaded(true);
      setIsIframeOrPopup(false);
      return () => {
        // do nothing
      };
    }
    const win = window.opener || window.parent;
    // 第一步：监听消息
    const eventListener = (messageEvent: MessageEvent) => {
      if (!SSO_WHITE_LIST_HOSTS.includes(messageEvent.origin)) {
        return;
      }
      const { event, type, data } =
        messageEvent.data as MaxAIListenConnectAccountType;
      if (event === 'MAXAI_LISTEN_CONNECT_ACCOUNT') {
        switch (type) {
          case 'requestTokens':
          {
            // do something
            const tokens = getCurrentUserTokens();
            if (!tokens?.accessToken) {
              onMessage({
                event: 'requestTokensFailure',
                data: {},
              });
              messageEvent.source?.postMessage(
                {
                  event: 'MAXAI_LISTEN_CONNECT_ACCOUNT',
                  type: 'userTokens',
                  data: null,
                },
                {
                  targetOrigin: messageEvent.origin,
                },
              );
              return;
            } else {
              messageEvent.source?.postMessage(
                {
                  event: 'MAXAI_LISTEN_CONNECT_ACCOUNT',
                  type: 'userTokens',
                  data: tokens,
                },
                {
                  targetOrigin: messageEvent.origin,
                },
              );
              onMessage({
                event: 'requestTokensSuccess',
                data: {},
              });
            }
          }
            break;
          default:
            break;
        }
      }
    };
    window.addEventListener('message', eventListener);
    // 第二步：发送消息，通知父窗口已经加载完成
    win.postMessage(
      {
        event: 'MAXAI_LISTEN_CONNECT_ACCOUNT',
        type: 'loaded',
        data: {},
      },
      '*',
    );
    return () => {
      window.removeEventListener('message', eventListener);
    };
  };
  return {
    loaded,
    isIframeOrPopup,
    listenMaxAIConnectAccount,
  };
};
