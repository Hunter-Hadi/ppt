import { HTMLAttributeAnchorTarget } from 'react';

export const safeOpenUrl = (
  url: string,
  target: HTMLAttributeAnchorTarget = '_self',
) => {
  const WindowProxy = window.open();
  if (WindowProxy) {
    WindowProxy.location = url;
  } else {
    window.open(url, target);
  }
};
const forceBlankPageList = ['/salestracking'];

export const safeTarget = (
  target?: HTMLAttributeAnchorTarget,
): HTMLAttributeAnchorTarget => {
  let flag = false;
  if (
    typeof window !== 'undefined' &&
    forceBlankPageList.some((v) => location.pathname.includes(v))
  ) {
    flag = true;
  }
  if (flag) {
    return '_blank';
  } else {
    return target || '_self';
  }
};
