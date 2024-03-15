import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef } from 'react';

import { APP_API } from '@/utils/api';
import { webappPost } from '@/utils/request';

export const useSendRefCount = (ref: string, prefix = 'partners') => {
  const router = useRouter();

  // 是否发送过 ref count 一次
  const sendRefCountOnce = useRef(false);

  const sendRefCount = useCallback(async () => {
    const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const formatPrefix = prefix ? `[${prefix}]-` : '';

    const lastSendRef = `${formatPrefix}${ref}`;

    webappPost(APP_API.REF_COUNT, {
      data: {
        ref: lastSendRef,
        date,
      },
    });
  }, [ref, prefix]);

  useEffect(() => {
    if (!sendRefCountOnce.current && ref && router.isReady) {
      sendRefCount();
      sendRefCountOnce.current = true;
    }
  }, [ref, router, sendRefCount]);
};
