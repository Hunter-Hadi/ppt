import { useEffect } from 'react';

import { useCommonUserProfile } from '@/features/common-auth/hooks/useCommonUserProfile';
import { useConnectMaxAIAccount } from '@/features/common-auth/hooks/useConnectMaxAIAccount';

const useInitCommonUserProfile = () => {
  const { isLogin } = useConnectMaxAIAccount();
  const { syncUserInfo } = useCommonUserProfile();

  useEffect(() => {
    if (isLogin) {
      syncUserInfo();
    }
  }, [isLogin]);
  return null;
};

export { useInitCommonUserProfile };
