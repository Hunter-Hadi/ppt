import { removeLocaleInPathname } from '@/i18n/utils';

export const isLandingPagePathname = (pathname: string) => {
  return pathname === '/' || removeLocaleInPathname(pathname) === '/';
};
