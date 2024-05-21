import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import {
  LANDING_VARIANT_TO_VERSION_MAP,
  TESTER_LANDING_PATH_TARGET_PATHNAME,
} from '@/features/ab_tester/constant/landingVariant';
import useLandingABTester from '@/features/ab_tester/hooks/useLandingABTester';
import useCheckExtension from '@/features/extension/hooks/useCheckExtension';
import { mixpanelTrack } from '@/features/mixpanel/utils';

import { isTargetTestPathname } from '../utils';

const useABTestPageViewedSender = () => {
  const { pathname, isReady } = useRouter();
  const sendMixpanelOnce = useRef(false);
  const { variant } = useLandingABTester();

  const { hasExtension, loaded: checkExtensionLoaded } = useCheckExtension();

  useEffect(() => {
    if (sendMixpanelOnce.current || !isReady) {
      return;
    }
    if (
      variant &&
      isTargetTestPathname(pathname, TESTER_LANDING_PATH_TARGET_PATHNAME)
    ) {
      if (pathname.startsWith('/partners')) {
        // 在 partners 页面时，需要判断 没有安装插件时，才发送 test_page_viewed
        if (checkExtensionLoaded && !hasExtension) {
          sendMixpanelOnce.current = true;
          mixpanelTrack('test_page_viewed', {
            testVersion: LANDING_VARIANT_TO_VERSION_MAP[variant],
            testFeature: 'homePage',
          });
        }
      } else {
        sendMixpanelOnce.current = true;
        mixpanelTrack('test_page_viewed', {
          testVersion: LANDING_VARIANT_TO_VERSION_MAP[variant],
          testFeature: 'homePage',
        });
      }
    }
  }, [isReady, variant, pathname, checkExtensionLoaded, hasExtension]);

  return null;
};

export default useABTestPageViewedSender;
