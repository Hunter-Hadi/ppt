import React, { FC, useEffect, useMemo, useState } from 'react'

import DevContent from '@/components/DevContent'
import { APP_PROJECT_LINK, WWW_PROJECT_LINK } from '@/global_constants'
import {
  INeedSyncWebSiteDataType,
  setLocalStorageWebSiteData,
  TARGET_ENV,
} from '@/utils/syncWebSiteData'

interface IProps {}

const SyncDataToStoragePage: FC<IProps> = () => {
  const targetEnv = TARGET_ENV
  const [needStorageData, setNeedStorageData] =
    useState<INeedSyncWebSiteDataType>({})
  const targetHost = useMemo(() => {
    if (targetEnv === 'app') {
      return APP_PROJECT_LINK
    }

    if (targetEnv === 'www') {
      return WWW_PROJECT_LINK
    }

    return ''
  }, [targetEnv])

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.parent &&
      window.parent.postMessage &&
      window.parent !== window
    ) {
      window.parent.postMessage(
        {
          type: 'MAXAI__SYNC_DATA_TO_STORAGE__PAGE_LOADED',
        },
        targetHost,
      )
    }
  }, [])

  useEffect(() => {
    const messageListener = (event: MessageEvent) => {
      if (event.origin === targetHost) {
        const data = event.data
        switch (data.type) {
          // 接受父页面传递过来的数据
          case 'MAXAI__SYNC_DATA_TO_STORAGE__SET_DATA': {
            const needStorageData = data.data
            setNeedStorageData(needStorageData)
            const { isSuccess, invalidDataKey } =
              setLocalStorageWebSiteData(needStorageData)
            event.source?.postMessage(
              {
                type: 'MAXAI__SYNC_DATA_TO_STORAGE__SET_DATA_DONE',
                data: {
                  isSuccess,
                  invalidDataKey,
                },
              },
              targetHost as any,
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
  }, [targetHost])

  return (
    <>
      <DevContent>
        <code>{JSON.stringify(needStorageData)}</code>
      </DevContent>
    </>
  )
}

export default SyncDataToStoragePage
