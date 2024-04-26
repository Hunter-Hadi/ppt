/**
 * Mix Panel tracking 相关 code
 *
 * docs: https://docs.mixpanel.com/docs/quickstart/connect-your-data?sdk=javascript
 */
import mixpanel from 'mixpanel-browser';

import useEffectOnce from '@/features/common/hooks/useEffectOnce';
import { getClientUserId } from '@/features/track_user_interactions/utils';
import { APP_IS_PROD } from '@/global_constants';

export const MIXPANEL_PROJECT_ID = process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_ID;

export const useInitMixPanel = () => {
  useEffectOnce(() => {
    mixpanel.init(MIXPANEL_PROJECT_ID, {
      debug: APP_IS_PROD ? false : true,
      track_pageview: true,
      persistence: 'localStorage',
    });

    const clientUserId = getClientUserId();
    if (clientUserId) {
      // Set this to a unique identifier for the user performing the event.
      mixpanelIdentify('identify', clientUserId);
    }
  });

  return null;
};

export const mixpanelTrack = (
  eventName: string,
  params?: Record<string, any>,
) => {
  mixpanel.track(eventName, params);
};

export const mixpanelIdentify = (
  type: 'identify' | 'reset',
  userId: string,
) => {
  try {
    if (type === 'identify') {
      mixpanel.identify(userId);
    }
    if (type === 'reset') {
      mixpanel.reset();
    }
  } catch (e) {

  }
};
