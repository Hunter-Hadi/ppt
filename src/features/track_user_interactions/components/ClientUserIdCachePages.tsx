import React, { FC, useEffect, useState } from 'react'

import {
  getClientUserId,
  setClientUserId,
} from '@/features/track_user_interactions/utils'

interface IProps {
  targetHost: string
}

const ClientUserIdCachePages: FC<IProps> = ({ targetHost }) => {
  const [willCacheClientUserId, setWillCacheClientUserId] = useState<
    string | null
  >(null)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.parent &&
      window.parent.postMessage &&
      window.parent !== window
    ) {
      window.parent.postMessage(
        {
          type: 'MAXAI_CLIENT_USER_ID_PAGE_LOADED',
        },
        targetHost,
      )
    }
  }, [])

  useEffect(() => {
    const messageListener = (event: any) => {
      if (event.origin === targetHost) {
        const data = event.data

        switch (data.type) {
          // 接受父页面传递过来的 clientUserId
          case 'MAXAI_CLIENT_USER_ID_CACHE': {
            if (data.data.clientUserId) {
              const clientUserId = data.data.clientUserId
              setClientUserId(clientUserId)

              setWillCacheClientUserId(clientUserId)
              event.source.postMessage(
                {
                  type: 'MAXAI_CLIENT_USER_ID_CACHE_SUCCESS',
                },
                event.origin,
              )
            }
            break
          }

          // 告诉父页面当前的 clientUserId
          case 'MAXAI_GET_CLIENT_USER_ID': {
            const clientUserId = getClientUserId()
            setWillCacheClientUserId(clientUserId)
            event.source.postMessage(
              {
                type: 'MAXAI_GET_CLIENT_USER_ID_SUCCESS',
                data: {
                  clientUserId,
                },
              },
              event.origin,
            )
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
  }, [])

  return <span>clientUserId: {willCacheClientUserId}</span>
}

export default ClientUserIdCachePages
