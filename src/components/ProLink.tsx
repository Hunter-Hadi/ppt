import {
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  SxProps,
} from '@mui/material';
import NextLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, HTMLAttributeAnchorTarget, useMemo } from 'react';

import { PROMPT_LIBRARY_PROXY_BASE_PATH_TEST } from '@/global_constants';
import { safeTarget } from '@/utils/location';

export interface IProLinkProps {
  href: LinkProps['href'];
  passHref?: boolean;
  forceTarget?: HTMLAttributeAnchorTarget;
  target?: HTMLAttributeAnchorTarget;
  underline?: 'none' | 'hover' | 'always';
  linkProps?: Partial<Omit<LinkProps, 'href' | 'passHref'>>;
  muiLinkProps?: Partial<
    Omit<MuiLinkProps, 'target' | 'underline' | 'onClick' | 'href'>
  >;
  onClick?: MuiLinkProps['onClick'];
  children?: React.ReactNode;
  sx?: SxProps;
  color?: string;
  locale?: string;

  // 在路由跳转时是否强制刷新页面
  hardRefresh?: boolean;

  // 默认开启 locale 的自适应（会为 href 添加 locale 环境）
  adaptiveLocale?: boolean;
}
// TODO - add current url to white list
const WHITE_LIST_DOMAINS: string[] = [
  'https://www.simplytrends.co',
  'https://www.simplyshop.co',
  'https://www.maxai.me',
  'https://app.simplytrends.co',
];

const checkDomain = (url: string) => {
  if (url.indexOf('//') === 0) {
    url = location.protocol + url;
  }
  return url
    .toLowerCase()
    .replace(/([a-z])?:\/\//, '$1')
    .split('/')[0];
};

const isExternalUrl = (url: string) => {
  const copyUrl = url;
  const isContainsWhiteList =
    WHITE_LIST_DOMAINS.find((whiteListUrl) =>
      copyUrl.startsWith(whiteListUrl),
    ) || copyUrl.startsWith('/');
  if (typeof window === 'undefined') {
    return !isContainsWhiteList;
  } else {
    const isDifferenceDomain =
      (copyUrl.indexOf(':') > -1 || copyUrl.indexOf('//') > -1) &&
      checkDomain(location.href) !== checkDomain(copyUrl);
    return isDifferenceDomain && !isContainsWhiteList;
  }
};

// eslint-disable-next-line react/display-name
const MyMuiLink = React.forwardRef<any, MuiLinkProps>(
  (
    // eslint-disable-next-line react/prop-types
    { rel, href, underline, children, target, onClick, sx, ...props },
    ref,
  ) => {
    const relCache = useMemo(() => {
      if (rel !== undefined) {
        return rel;
      }
      const isExternal = isExternalUrl(href as string);
      return isExternal ? 'nofollow noopener noreferrer' : '';
    }, [href, rel]);
    return (
      <MuiLink
        href={href}
        ref={ref}
        target={target}
        underline={underline}
        onClick={onClick}
        sx={sx}
        {...props}
        rel={relCache}
      >
        {children}
      </MuiLink>
    );
  },
);

const ProLinkInstance: FC<IProLinkProps> = (props) => {
  const {
    href,
    passHref = true,
    target = '_self',
    forceTarget,
    underline = 'none',
    onClick,
    linkProps,
    muiLinkProps,
    sx,
    children,
    color,
    locale: propLocale,
    hardRefresh = false,
    adaptiveLocale = true,
  } = props;
  const router = useRouter();
  const targetMixin = useMemo(
    () => forceTarget ?? safeTarget(target),
    [forceTarget, target],
  );

  const cacheSx = useMemo(
    () => ({
      color,
      ...sx,
    }),
    [color, sx],
  );

  const coverHref = useMemo(() => {
    if (!adaptiveLocale) {
      return href;
    }

    const fixHrefLocale = (originalHref: string) => {
      // 只有在href是相对路径的时候才需要加上 locale 的 fix
      let fixedHref = originalHref;
      const newLocale = propLocale ?? router.query.locale;

      if (fixedHref.startsWith('/')) {
        if (newLocale) {
          if (fixedHref.startsWith(PROMPT_LIBRARY_PROXY_BASE_PATH_TEST)) {
            fixedHref = fixedHref.replace(
              PROMPT_LIBRARY_PROXY_BASE_PATH_TEST,
              `${PROMPT_LIBRARY_PROXY_BASE_PATH_TEST}/${newLocale}`,
            );
          } else {
            fixedHref = `/${newLocale}${fixedHref}`;
          }
        }
      }
      if (fixedHref.endsWith('/') && fixedHref !== '/') {
        fixedHref = fixedHref.slice(0, -1);
      }

      return fixedHref;
    };

    if (typeof href === 'string') {
      return fixHrefLocale(href);
    } else if (href.pathname) {
      return fixHrefLocale(href.pathname);
    }

    // default return
    return href;
  }, [href, router.query.locale, propLocale, adaptiveLocale]);

  if (!router && typeof href === 'string') {
    return (
      <MyMuiLink
        href={href as string}
        target={targetMixin}
        underline={underline}
        onClick={onClick}
        sx={cacheSx}
        {...muiLinkProps}
      >
        {children}
      </MyMuiLink>
    );
  }

  // 当需要强制刷新页面时，且 href 是相对路径时，直接使用 mui link 的 a 标签
  if (
    hardRefresh &&
    typeof coverHref === 'string' &&
    coverHref.startsWith('/')
  ) {
    return (
      <MyMuiLink
        target={targetMixin}
        underline={underline}
        onClick={onClick}
        sx={cacheSx}
        {...muiLinkProps}
        href={coverHref}
      >
        {children}
      </MyMuiLink>
    );
  }

  return (
    <NextLink
      href={coverHref}
      passHref={passHref}
      {...linkProps}
      legacyBehavior
    >
      <MyMuiLink
        target={targetMixin}
        underline={underline}
        onClick={onClick}
        sx={cacheSx}
        {...muiLinkProps}
      >
        {children}
      </MyMuiLink>
    </NextLink>
  );
};
const ProLink: FC<IProLinkProps> = (props) => {
  const { href, ...rest } = props;
  if (!href) {
    return null;
  }
  return <ProLinkInstance href={href} {...rest} />;
};

export default ProLink;
