import { useRouter } from 'next/router';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

interface IClientUserIdGeneratorProps {
  targetHost: string;
}

const ClientUserIdGenerator: FC<IClientUserIdGeneratorProps> = ({
  targetHost,
}) => {
  const { pathname } = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 当前的 clientUserId
  const [currentClientUserId, setCurrentClientUserId] = useState(
    getLocalStorage('CLIENT_USER_ID'),
  );

  // iframe 是否加载完成
  const [iframeReady, setIframeReady] = useState(false);

  // clientUserId 是否保存成功
  const [cacheClientUserIdSuccess, setCacheClientUserIdSuccess] =
    useState(false);

  const hasClientUserId = useMemo(
    () => !!currentClientUserId,
    [currentClientUserId],
  );

  const sendClientUserIdToIFrame = (clientUserId: string) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      setLocalStorage('CLIENT_USER_ID', clientUserId);
      setCurrentClientUserId(clientUserId);
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'MAXAI_CLIENT_USER_ID_CACHE',
          data: {
            clientUserId,
          },
        },
        targetHost,
      );
    }
  };

  // 检查 iframe 是否有 clientUserId
  const checkIframeHasClientUserId = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'MAXAI_GET_CLIENT_USER_ID',
        },
        targetHost,
      );
    }
  };

  // 当 iframe 加载完成后的处理函数
  // 只需要执行一次
  const iframeReadyHandler = () => {
    if (!hasClientUserId) {
      // 如果没有 clientUserId，
      // 生成 clientUserId 并发送 message 到 iframe
      const clientUserId = uuidV4();
      sendClientUserIdToIFrame(clientUserId);
    } else {
      // 如果有 clientUserId，发送 message 到 iframe
      // 确认 iframe 中是否有 clientUserId，没有的话需要传入
      checkIframeHasClientUserId();
    }
  };

  useEffect(() => {
    if (cacheClientUserIdSuccess) {
      return;
    }

    const messageListener = (event: any) => {
      if (event.origin === targetHost) {
        const data = event.data;
        switch (data.type) {
          // iframe 页面加载完完成的 message
          case 'MAXAI_CLIENT_USER_ID_PAGE_LOADED': {
            setIframeReady(true);
            break;
          }
          // clientUserId 保存成功的 message
          case 'MAXAI_CLIENT_USER_ID_CACHE_SUCCESS': {
            setCacheClientUserIdSuccess(true);
            break;
          }
          // 获取 clientUserId 成功的 message
          case 'MAXAI_GET_CLIENT_USER_ID_SUCCESS': {
            if (!data.data.clientUserId && currentClientUserId) {
              // 如果 iframe 没有 clientUserId，并且当前有 clientUserId
              // 发送 message 通知 iframe 更新 clientUserId
              sendClientUserIdToIFrame(currentClientUserId);
            }
            break;
          }
          default:
            break;
        }
      }
    };
    window.addEventListener('message', messageListener);

    return () => {
      window.removeEventListener('message', messageListener);
    };
  }, [targetHost, currentClientUserId, cacheClientUserIdSuccess]);

  useEffect(() => {
    if (iframeReady && iframeRef.current && iframeRef.current.contentWindow) {
      iframeReadyHandler();
    }
  }, [iframeReady, targetHost]);

  if (pathname.startsWith('/embed')) {
    return null;
  }

  if (cacheClientUserIdSuccess) {
    // 保存 clientUserId 成功后，组件生命周期完成，直接返回 null
    return null;
  }

  return (
    <>
      <iframe
        ref={iframeRef}
        src={`${targetHost}/embed/client-user-id-cache`}
        id='maxai-client-user-id-generator'
        title='client-user-id-generator'
        style={{
          position: 'absolute',
          opacity: 0,
          width: '1px',
          height: '1px',
          top: 0,
          left: 0,
          border: 'none',
          display: 'block',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
    </>
  );
};

export default ClientUserIdGenerator;
