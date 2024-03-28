import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { APP_PROJECT_LINK } from '@/global_constants';

const CacheRefAndRewardfulId = () => {
  const router = useRouter();

  const [ref, setRef] = useState('');

  const [rewardfulId, setRewardfulId] = useState('');

  useEffect(() => {
    const query = router.query;
    if (query.ref) {
      setRef(query.ref as string);
    }
    if (query.rewardfulId) {
      setRewardfulId(query.rewardfulId as string);
    }
  }, [router.query]);

  useEffect(() => {
    const windowClone = window as any;
    windowClone.rewardful('ready', function () {
      if (windowClone.Rewardful.referral) {
        setRewardfulId(windowClone.Rewardful.referral);
      }
    });
  }, []);

  return (
    <>
      {/* 如果有 ref 传入，通过加载 iframe 来保存 ref 到 app */}
      {ref || rewardfulId ? (
        <iframe
          id='app-landing-page-iframe'
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
          src={`${APP_PROJECT_LINK}/embed/ref-cache?ref=${ref}&rewardfulId=${rewardfulId}`}
          // src={`http://localhost:3000/landing?ref=${ref}&rewardfulId=${rewardfulId}`}
        />
      ) : null}
    </>
  );
};

export default CacheRefAndRewardfulId;
