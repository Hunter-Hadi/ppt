import { useEffect, useMemo, useState } from 'react';

import {
  APP_EXTERNAL_LINKS,
  EXTENSION_EDGE_SHARE_TRACKER_LINK,
  EXTENSION_SHARE_TRACKER_LINK,
} from '@/global_constants';

import useBrowserAgent from './useBrowserAgent';

const useExtensionLink = (isTrackLink = true) => {
  const chromeLink = isTrackLink
    ? EXTENSION_SHARE_TRACKER_LINK
    : APP_EXTERNAL_LINKS.CHROME_EXTENSION;
  const edgeLInk = isTrackLink
    ? EXTENSION_EDGE_SHARE_TRACKER_LINK
    : APP_EXTERNAL_LINKS.EDGE_EXTENSION;
  const [extensionLink, setExtensionLink] = useState(chromeLink);
  const { browserAgent: agent } = useBrowserAgent();

  const links = useMemo(
    () => ({
      Edge: edgeLInk,
      Chrome: chromeLink,
    }),
    [edgeLInk, chromeLink],
  );

  useEffect(() => {
    switch (agent) {
      case 'Edge': {
        setExtensionLink(edgeLInk);
        break;
      }
      default: {
        setExtensionLink(chromeLink);
      }
    }
  }, [agent, edgeLInk, chromeLink]);

  return {
    extensionLink,
    agent,
    links,
  };
};

export default useExtensionLink;
