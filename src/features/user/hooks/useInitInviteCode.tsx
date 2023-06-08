import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { userInviteState } from '@/features/user';

const useInitInviteCode = () => {
  const router = useRouter();
  const setUserInvite = useSetRecoilState(userInviteState);
  useEffect(() => {
    if (router.query.invite) {
      setUserInvite((prevState) => {
        return {
          ...prevState,
          inviteCode: router.query.invite as string,
        };
      });
    }
  }, [router.query.invite]);
};
export { useInitInviteCode };
