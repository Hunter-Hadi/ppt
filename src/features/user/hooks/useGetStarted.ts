import dayjs from 'dayjs';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { userInviteState } from '@/features/user';
import { USER_API } from '@/utils/api';
import { sendNotification } from '@/utils/larkBot';
import { webappPost } from '@/utils/request';

const useGetStarted = (email: string) => {
  const userInvite = useRecoilValue(userInviteState);
  const [loading, setLoading] = useState(false);
  const [wasInWaitlist, setWasInWaitlist] = useState(false);
  const sendEmail = async () => {
    setLoading(true);
    try {
      const response = await webappPost<{
        status: string;
        was_in_waitlist: boolean;
      }>(USER_API.JOIN_WAITING_LIST, {
        email,
        invite: userInvite.inviteCode || '',
      });
      if (response.status !== 'OK') {
        return false;
      }
      await sendNotification('Get Started Survey', {
        message: `user: [${
          email || ''
        }] click [Get Started] button.\ninvite code: [${
          userInvite.inviteCode || ''
        }]\ndate: [${dayjs().format('YYYY-MM-DD HH:mm:ss')}]`,
      });
      setWasInWaitlist(response.was_in_waitlist || false);
      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendEmail, wasInWaitlist };
};

export { useGetStarted };
