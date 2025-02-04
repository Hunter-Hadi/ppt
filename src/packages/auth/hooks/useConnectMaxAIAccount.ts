import { useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { SSO_LOGIN_URL } from '@/packages/auth/constants';
import {
  ConnectMaxAIAccountState,
  UserProfileState,
} from '@/packages/auth/store';
import {
  MaxAIAuthTokensType,
  MaxAIConnectAccountType,
} from '@/packages/auth/types';
import {
  authLogout,
  getAccessToken,
  parseJwt,
  saveCurrentUserTokens,
} from '@/packages/auth/utils';

const popupWindow = (
  url: string,
  windowName: string,
  win: Window,
  w: number,
  h: number,
) => {
  const y =
    (win.top?.outerHeight || win.outerHeight) / 2 +
    (win.top?.screenY || win.screenY) -
    h / 2;
  const x =
    (win.top?.outerWidth || win.outerWidth) / 2 +
    (win.top?.screenX || win.screenX) -
    w / 2;
  return win.open(
    url,
    windowName,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`,
  ) as Window;
};

type iframeListenerType = (messageEvent: MessageEvent) => void;

const checkSession = () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return false;
  }
  const { exp } = parseJwt(accessToken);
  // 如果 token 过期，则退出登录
  const isExpired = Date.now() > exp * 1000 - 1000 * 60 * 60;
  if (isExpired) {
    authLogout();
  }
  return !isExpired;
};

export const useConnectMaxAIAccount = (debug = true) => {
  const [accountState, setConnectMaxAIAccountState] = useRecoilState(
    ConnectMaxAIAccountState,
  );
  const { isLogin, loading, error, tokens } = accountState;
  const setIsLogin = (newIsLoginState: boolean) => {
    setConnectMaxAIAccountState((prev) => ({
      ...prev,
      isLogin: newIsLoginState,
    }));
  };
  const setLoading = (newLoadingState: boolean) => {
    setConnectMaxAIAccountState((prev) => ({
      ...prev,
      loading: newLoadingState,
    }));
  };
  const setError = (newErrorState: string | null) => {
    setConnectMaxAIAccountState((prev) => ({
      ...prev,
      error: newErrorState,
    }));
  };
  const setTokens = (newTokensState: MaxAIAuthTokensType | null) => {
    setConnectMaxAIAccountState((prev) => ({
      ...prev,
      tokens: newTokensState,
    }));
  };
  const setUserProfile = useSetRecoilState(UserProfileState);
  const iframeListenerRef = useRef<iframeListenerType | null>(null);
  const iframeWatchCloseRef = useRef<ReturnType<typeof setInterval>>(-1 as any);
  const popupListenerRef = useRef<iframeListenerType | null>(null);
  const popupWatchCloseRef = useRef<ReturnType<typeof setInterval>>(-1 as any);
  const debugLog = (data: any) => {
    if (debug) {
      console.debug(`useConnectMaxAIAccount: \n`, data);
    }
  };
  useEffect(() => {
    const checkSessionLogin = checkSession();
    setIsLogin(checkSessionLogin);
  }, []);
  const popupLogin = () => {
    let popup: Window | null = null;
    if (popupListenerRef.current) {
      window.removeEventListener('message', popupListenerRef.current);
    }
    let isEnd = false;
    popupListenerRef.current = (messageEvent: MessageEvent) => {
      const { event, type, data } =
        messageEvent.data as MaxAIConnectAccountType;
      if (
        messageEvent.origin === new URL(SSO_LOGIN_URL).origin &&
        event === 'MAXAI_LISTEN_CONNECT_ACCOUNT'
      ) {
        if (!popup) {
          debugLog('popup is null');
          setError('popup is null');
          return;
        }
        if (type === 'loaded') {
          debugLog('popup loaded');
          popup.postMessage(
            {
              event: 'MAXAI_LISTEN_CONNECT_ACCOUNT',
              type: 'requestTokens',
              data: {},
            },
            messageEvent.origin,
          );
        } else if (type === 'userTokens') {
          isEnd = true;
          if (!data) {
            // need popup login
            debugLog('need wait popup login');
          } else {
            // do something
            if (saveCurrentUserTokens(data)) {
              debugLog('saveCurrentUserTokens success');
              debugLog(data);
              setTokens(data);
              setIsLogin(checkSession());
              setLoading(false);
            } else {
              setError('login error');
            }
            popup?.close();
          }
        }
      }
    };
    window.addEventListener('message', popupListenerRef.current);
    popup = popupWindow(SSO_LOGIN_URL, '', window, 448, 552);
    popupWatchCloseRef.current = setInterval(() => {
      if (popup?.closed) {
        setLoading(false);
        debugLog('popup removed');
        console.log('popup removed', isEnd);
        if (!isEnd) {
          setError('popup removed');
        }
        clearInterval(popupWatchCloseRef.current);
      }
    }, 1000);
  };
  const iframeLogin = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (iframeListenerRef.current) {
      window.removeEventListener('message', iframeListenerRef.current);
    }
    // 创建iframe
    let iframe: HTMLIFrameElement | null = null;
    // 移除旧的iframe
    document.getElementById('maxai-connect-account-iframe')?.remove();
    // 清除定时器
    if (iframeWatchCloseRef.current) {
      clearInterval(iframeWatchCloseRef.current);
    }
    let isEnd = false;
    // 注册事件监听
    iframeListenerRef.current = (messageEvent: MessageEvent) => {
      const { event, type, data } =
        messageEvent.data as MaxAIConnectAccountType;
      if (
        messageEvent.origin === new URL(SSO_LOGIN_URL).origin &&
        event === 'MAXAI_LISTEN_CONNECT_ACCOUNT'
      ) {
        if (type === 'loaded') {
          debugLog('iframe loaded');
          if (iframe?.contentWindow) {
            iframe?.contentWindow?.postMessage(
              {
                event: 'MAXAI_LISTEN_CONNECT_ACCOUNT',
                type: 'requestTokens',
                data: {},
              },
              messageEvent.origin,
            );
          } else {
            debugLog('iframe contentWindow is null');
            setError('iframe contentWindow is null');
          }
        } else if (type === 'userTokens') {
          isEnd = true;
          if (!data) {
            // need popup login
            if (iframeListenerRef.current) {
              window.removeEventListener('message', iframeListenerRef.current);
              iframeListenerRef.current = null;
            }
            popupLogin();
            debugLog('need popup login');
          } else {
            // do something
            if (saveCurrentUserTokens(data)) {
              debugLog('saveCurrentUserTokens success');
              debugLog(data);
              setTokens(data);
              setIsLogin(checkSession());
              setLoading(false);
            }
          }
          iframe?.remove();
        }
      }
    };

    window.addEventListener('message', iframeListenerRef.current);
    // 创建iframe, 并且监听是否被移除
    iframe = document.createElement('iframe');
    iframe.src = SSO_LOGIN_URL;
    iframe.id = 'maxai-connect-account-iframe';
    iframe.style.display = 'none';

    document.body.appendChild(iframe);
    iframeWatchCloseRef.current = setInterval(() => {
      // 判断是否存在或者被移除
      if (!iframe || !document.body.contains(iframe)) {
        debugLog('iframe removed');
        if (!isEnd) {
          setLoading(false);
          setError('iframe removed');
        }
        clearInterval(iframeWatchCloseRef.current);
      }
    }, 1000);
    debugLog('iframe created');
  };
  const connectMaxAIAccount = () => {
    iframeLogin();
  };
  const sigOutMaxAIAccount = (redirect?: string) => {
    setUserProfile({
      user: null,
      loading: false,
    });
    setIsLogin(false);
    setTokens(null);
    authLogout(redirect);
  };

  return {
    isLogin,
    error,
    connectMaxAIAccount,
    loading,
    tokens,
    sigOutMaxAIAccount,
  };
};
