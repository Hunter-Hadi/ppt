import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { MAXAI_WWW_SHARE_TRACKER_LINK } from '@/global_constants';

import useExtensionLink from './useExtensionLink';

export interface IUseShareTrackerLinkProps {
  // 是否根据 pathname 生成 ref
  pathnameRefEnable?: boolean;
  // 是否根据 query.ref 生成 ref, 优先级比 pathname 高
  queryRefEnable?: boolean;

  pathnameRefPrefix?: string;
  defaultRef?: string;

  agent?: string;
}

// 返回所有需要被 tracker 的 link
// 支持根据url参数 (query.ref)，拼接 ref
const useShareTrackerLink = (props?: IUseShareTrackerLinkProps) => {
  const {
    queryRefEnable = false,
    pathnameRefEnable = true,
    pathnameRefPrefix = '',
    defaultRef,
    agent: propsAgent,
  } = props || {};
  const { query, pathname, isReady } = useRouter();
  const [ref, setRef] = useState(defaultRef ?? '');
  const {
    extensionLink: installLink,
    agent: currentAgent,
    links,
  } = useExtensionLink();

  const agent = propsAgent ?? currentAgent;

  // pathname ref
  useEffect(() => {
    if (pathnameRefEnable) {
      setRef(pathnameRefPrefix + pathname.replace(/\//g, '_'));
    }
  }, [pathnameRefEnable, pathname, pathnameRefPrefix]);

  // query ref
  useEffect(() => {
    if (queryRefEnable && query.ref) {
      setRef(query.ref as string);
    }
  }, [queryRefEnable, query]);

  const extensionLink = useMemo(() => {
    if (agent && links[agent]) {
      return `${links[agent]}?ref=${ref}`;
    }

    return `${installLink}?ref=${ref}`;
  }, [ref, installLink, agent, links]);

  const maxaiWebLink = useMemo(
    () => `${MAXAI_WWW_SHARE_TRACKER_LINK}?ref=${ref}`,
    [ref],
  );

  return {
    ref,
    extensionLink,
    maxaiWebLink,
    links,
    loading: !isReady,
  };
};

export default useShareTrackerLink;
