import { useEffect } from 'react';

import { useCommonUserProfile } from '@/packages/auth/hooks/useCommonUserProfile';
import { useConnectMaxAIAccount } from '@/packages/auth/hooks/useConnectMaxAIAccount';

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
