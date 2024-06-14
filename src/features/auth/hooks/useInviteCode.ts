import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { syncWebSiteDataToStorageWithIframe } from '@/utils/syncWebSiteData';

export const INVITATION_CODE_STORAGE_KEY = 'INVITATION_CODE';

const useInviteCode = () => {
  const { query, isReady } = useRouter();

  useEffect(() => {
    if (isReady && query.invite) {
      syncWebSiteDataToStorageWithIframe({
        INVITATION_CODE: query.invite.toString(),
      });
    }
  }, [isReady, query.invite]);

  return null;
};

export { useInviteCode };
