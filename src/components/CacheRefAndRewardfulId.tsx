import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'

import { useSendRefCount } from '@/hooks/useSendRefCount'
import { syncWebSiteDataToStorageWithIframe } from '@/utils/syncWebSiteData'

const CacheRefAndRewardfulId = () => {
  const router = useRouter()

  const [ref, setRef] = useState('')

  const [_, setRewardfulId] = useState('')

  useSendRefCount(ref, 'ref')

  useEffect(() => {
    const query = router.query
    if (query.ref) {
      setRef(query.ref as string)
      syncWebSiteDataToStorageWithIframe({
        LANDING_PAGE_REF: query.ref.toString(),
      })
    }
    if (query.rewardfulId) {
      setRewardfulId(query.rewardfulId as string)
      syncWebSiteDataToStorageWithIframe({
        MAXAI_REWARDFUL_REFERRAL_ID: query.rewardfulId.toString(),
      })
    }
  }, [router.query])

  useEffect(() => {
    const windowClone = window as any
    windowClone.rewardful('ready', function () {
      if (windowClone.Rewardful.referral) {
        setRewardfulId(windowClone.Rewardful.referral)
      }
    })
  }, [])

  return <></>

  // 被 syncWebSiteDataToStorageWithIframe 替代
  // return (
  //   <>
  //     {/* 如果有 ref 传入，通过加载 iframe 来保存 ref 到 app */}
  //     {ref || rewardfulId ? (
  //       <iframe
  //         id='app-landing-page-iframe'
  //         style={{
  //           position: 'absolute',
  //           opacity: 0,
  //           width: '1px',
  //           height: '1px',
  //           top: 0,
  //           left: 0,
  //           border: 'none',
  //           display: 'block',
  //           zIndex: -1,
  //           pointerEvents: 'none',
  //         }}
  //         src={`${APP_PROJECT_LINK}/embed/ref-cache?ref=${ref}&rewardfulId=${rewardfulId}`}
  //         // src={`http://localhost:3000/landing?ref=${ref}&rewardfulId=${rewardfulId}`}
  //       />
  //     ) : null}
  //   </>
  // );
}

export default CacheRefAndRewardfulId
