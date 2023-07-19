import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import {
  EXTENSION_SHARE_TRACKER_LINK,
  MAXAI_WWW_SHARE_TRACKER_LINK,
} from '@/global_constants';

interface IProps {
  // 是否根据 pathname 生成 ref
  pathnameRefEnable?: boolean;
  // 是否根据 query.ref 生成 ref, 优先级比 pathname 高
  queryRefEnable?: boolean;
  defaultRef?: string;
}

// 返回所有需要被 tracker 的 link
// 支持根据url参数 (query.ref)，拼接 ref
const useShareTrackerLink = (props?: IProps) => {
  const {
    queryRefEnable = false,
    pathnameRefEnable = true,
    defaultRef,
  } = props || {};
  const { query, pathname, isReady } = useRouter();
  const [ref, setRef] = useState(defaultRef ?? '');

  // pathname ref
  useEffect(() => {
    if (pathnameRefEnable) {
      setRef(pathname.replace(/\//g, '_'));
    }
  }, [pathnameRefEnable, pathname]);

  // query ref
  useEffect(() => {
    if (queryRefEnable && query.ref) {
      setRef(query.ref as string);
    }
  }, [queryRefEnable, query]);

  const extensionLink = useMemo(
    () => `${EXTENSION_SHARE_TRACKER_LINK}?ref=${ref}`,
    [ref],
  );
  const maxaiWebLink = useMemo(
    () => `${MAXAI_WWW_SHARE_TRACKER_LINK}?ref=${ref}`,
    [ref],
  );

  return {
    ref,
    extensionLink,
    maxaiWebLink,
    loading: !isReady,
  };
};

export default useShareTrackerLink;
