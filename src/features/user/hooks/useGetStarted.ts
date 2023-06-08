import dayjs from 'dayjs';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { userInviteState } from '@/features/user';
import { USER_API } from '@/utils/api';
import { sendLarkBotMessage } from '@/utils/larkBot';
import { post } from '@/utils/request';

const useGetStarted = (email: string) => {
  const userInvite = useRecoilValue(userInviteState);
  const [loading, setLoading] = useState(false);
  const [wasInWaitlist, setWasInWaitlist] = useState(false);
  const sendEmail = async () => {
    setLoading(true);
    try {
      const response = await post<{
        status: string;
        was_in_waitlist: boolean;
      }>(USER_API.JOIN_WAITING_LIST, {
        email,
        invite: userInvite.inviteCode || '',
      });
      if (response.status !== 'OK') {
        return false;
      }
      await sendLarkBotMessage(
        '[Get Started] Survey',
        `user: [${email || ''}] click [Get Started] button.\ninvite code: [${
          userInvite.inviteCode || ''
        }]\ndate: [${dayjs().format('YYYY-MM-DD HH:mm:ss')}]`,
        {
          uuid: '956022cb-e2e9-42b4-aff2-03bd3edaa8f5',
        },
      );
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
