import {
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  SxProps,
} from '@mui/material';
import NextLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, HTMLAttributeAnchorTarget, useMemo } from 'react';

import { safeTarget } from '@/utils/location';

export interface IProLinkProps {
  href: LinkProps['href'];
  passHref?: boolean;
  forceTarget?: HTMLAttributeAnchorTarget;
  target?: HTMLAttributeAnchorTarget;
  underline?: 'none' | 'hover' | 'always';
  linkProps?: Partial<Omit<LinkProps, 'href' | 'passHref'>>;
  muiLinkProps?: Partial<
    Omit<MuiLinkProps, 'target' | 'underline' | 'onClick'>
  >;
  onClick?: MuiLinkProps['onClick'];
  children?: React.ReactNode;
  sx?: SxProps;
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
  } = props;
  const router = useRouter();
  const targetMixin = useMemo(
    () => forceTarget ?? safeTarget(target),
    [forceTarget, target],
  );
  if (!router && typeof href === 'string') {
    return (
      <MyMuiLink
        href={href as string}
        target={targetMixin}
        underline={underline}
        onClick={onClick}
        sx={sx}
        {...muiLinkProps}
      >
        {children}
      </MyMuiLink>
    );
  }
  return (
    <NextLink href={href} passHref={passHref} {...linkProps} legacyBehavior>
      <MyMuiLink
        target={targetMixin}
        underline={underline}
        onClick={onClick}
        sx={sx}
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
