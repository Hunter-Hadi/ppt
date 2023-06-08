import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef } from 'react';

import { APP_API } from '@/utils/api';
import { botUuid, sendLarkBotMessage } from '@/utils/larkBot';
import { post } from '@/utils/request';

export const useSendRef = (
  options: {
    featureName?: string;
    uuid?: botUuid;
  } = {},
) => {
  const router = useRouter();
  const once = useRef(false);
  const sendMessage = useCallback(async () => {
    const { featureName, uuid } = options || {};
    const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const formatPrefix = featureName ? `[${featureName}]-` : '';
    const ref = router.query.ref
      ? `${formatPrefix}${router.query.ref}`
      : `${formatPrefix}default`;
    post(APP_API.REF_COUNT, {
      data: {
        ref,
        date,
      },
    });
    if (featureName) {
      sendLarkBotMessage(
        `[${featureName}]`,
        `ref: ${ref || 'default'}\ndate: ${date}\n`,
        {
          uuid: uuid || '0d862c50-2985-48ca-91cf-d325c596e1f9',
        },
      );
    }
  }, [router.query.ref, options]);
  useEffect(() => {
    if (!router.isReady) return;
    if (once.current) return;
    once.current = true;
    sendMessage().then().catch();
  }, [router.isReady, sendMessage]);
};
