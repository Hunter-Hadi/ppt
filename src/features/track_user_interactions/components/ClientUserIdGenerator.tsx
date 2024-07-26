import { useRouter } from 'next/router'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'

import { isLikelyBot } from '@/features/common/utils/dataHelper/browserInfoHelper'
import { mixpanelIdentify } from '@/features/mixpanel/utils'
import { CACHE_CLIENT_USER_ID_PAGE_PATHNAME } from '@/features/track_user_interactions/constant'
import {
  generateClientUserId,
  getClientUserId,
  setClientUserId,
} from '@/features/track_user_interactions/utils'
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage'

interface IClientUserIdGeneratorProps {
  targetHost: string
}

const ClientUserIdGenerator: FC<IClientUserIdGeneratorProps> = ({
  targetHost,
}) => {
  const { pathname } = useRouter()
  const [loaded, setLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const clientUserIdAlreadySaved =
    getLocalStorage('IFRAME_CLIENT_USER_ID_ALREADY_SAVED') === 'true'

  // 当前的 clientUserId
  const [currentClientUserId, setCurrentClientUserId] = useState(
    getClientUserId(),
  )

  // iframe 是否加载完成
  const [iframeReady, setIframeReady] = useState(false)

  // clientUserId 是否保存成功
  const [cacheClientUserIdSuccess, setCacheClientUserIdSuccess] =
    useState(false)

  useEffect(() => {
    if (isLikelyBot()) {
      return
    }
    setLoaded(true)
  }, [])

  const hasClientUserId = useMemo(
    () => !!currentClientUserId,
    [currentClientUserId],
  )

  const sendClientUserIdToIFrame = (clientUserId: string) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      setClientUserId(clientUserId)
      setCurrentClientUserId(clientUserId)
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'MAXAI_CLIENT_USER_ID_CACHE',
          data: {
            clientUserId,
          },
        },
        targetHost,
      )
    }
  }

  // 检查 iframe 是否有 clientUserId
  const checkIframeHasClientUserId = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'MAXAI_GET_CLIENT_USER_ID',
        },
        targetHost,
      )
    }
  }

  // 当 iframe 加载完成后的处理函数
  // 只需要执行一次
  const iframeReadyHandler = () => {
    if (!hasClientUserId) {
      // 如果没有 clientUserId，
      // 生成 clientUserId 并发送 message 到 iframe
      const clientUserId = generateClientUserId()
      // mixpanel 需要 需要记录 clientUserId
      mixpanelIdentify('identify', clientUserId)
      sendClientUserIdToIFrame(clientUserId)
    } else {
      // 如果有 clientUserId，发送 message 到 iframe
      // 确认 iframe 中是否有 clientUserId，没有的话需要传入
      checkIframeHasClientUserId()
    }
  }

  useEffect(() => {
    if (cacheClientUserIdSuccess) {
      return
    }

    const messageListener = (event: any) => {
      if (event.origin === targetHost) {
        const data = event.data
        switch (data.type) {
          // iframe 页面加载完完成的 message
          case 'MAXAI_CLIENT_USER_ID_PAGE_LOADED': {
            setIframeReady(true)
            break
          }
          // clientUserId 保存成功的 message
          case 'MAXAI_CLIENT_USER_ID_CACHE_SUCCESS': {
            setCacheClientUserIdSuccess(true)
            setLocalStorage('IFRAME_CLIENT_USER_ID_ALREADY_SAVED', 'true', true)
            break
          }
          // 获取 clientUserId 成功的 message
          case 'MAXAI_GET_CLIENT_USER_ID_SUCCESS': {
            if (data.data.clientUserId && currentClientUserId) {
              // 如果 iframe 有 clientUserId，需要和当前的 clientUserId 对比
              if (currentClientUserId === data.data.clientUserId) {
                // 如果是相等的，则完成生命周期
                setCacheClientUserIdSuccess(true)
              } else {
                // 不相等，需要发送 message 通知 iframe 更新 clientUserId
                sendClientUserIdToIFrame(currentClientUserId)
              }
            } else {
              // 如果 iframe 没有 clientUserId，并且当前有 clientUserId
              // 发送 message 通知 iframe 更新 clientUserId
              currentClientUserId &&
                sendClientUserIdToIFrame(currentClientUserId)
            }
            break
          }
          default:
            break
        }
      }
    }
    window.addEventListener('message', messageListener)

    return () => {
      window.removeEventListener('message', messageListener)
    }
  }, [targetHost, currentClientUserId, cacheClientUserIdSuccess])

  useEffect(() => {
    if (iframeReady && iframeRef.current && iframeRef.current.contentWindow) {
      iframeReadyHandler()
    }
  }, [iframeReady, targetHost])

  if (pathname.startsWith('/embed')) {
    return null
  }

  // 当前有 clientUserId，并且往 iframe 中保存过 clientUserId 了
  if (currentClientUserId && clientUserIdAlreadySaved) {
    return null
  }

  if (cacheClientUserIdSuccess) {
    // 保存 clientUserId 成功后，组件生命周期完成，直接返回 null
    return null
  }

  if (!loaded) {
    return null
  }

  return (
    <>
      <iframe
        ref={iframeRef}
        src={`${targetHost}${CACHE_CLIENT_USER_ID_PAGE_PATHNAME}`}
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
  )
}

export default ClientUserIdGenerator
