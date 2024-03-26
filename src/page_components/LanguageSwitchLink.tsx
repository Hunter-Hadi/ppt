import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { cloneDeep } from 'lodash-es';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';

import { objectToQueryString } from '@/features/common/utils/dataHelper/objectHelper';
import { SUPPORT_PROXY_BASE_PATHS } from '@/global_constants';
import { removeLocaleInPathname } from '@/i18n/utils';

interface IProps extends Omit<MuiLinkProps, 'href'> {
  locale: string;
  children: React.ReactNode;
  href?: string;
}

const LanguageSwitchLink: FC<IProps> = (props) => {
  const { locale, children, href, ...resetProps } = props;

  const router = useRouter();

  const coverHref = useMemo(() => {
    const queryClone = cloneDeep(router.query);

    if (queryClone.redirect) {
      delete queryClone.redirect;
    }
    if (queryClone.locale) {
      delete queryClone.locale;
    }

    const queryString = objectToQueryString(queryClone);

    let fixedHref = href ? href : removeLocaleInPathname(router.pathname);

    const fixedQueryString = queryString.length > 0 ? `?${queryString}` : '';

    // 针对 basePath 进行处理
    // 如果检测到是被代理的 basePath，则需要将 basePath 放在 locale 之前
    const hitBasePath = SUPPORT_PROXY_BASE_PATHS.find((basePath) =>
      fixedHref.startsWith(basePath),
    );
    let basePath = '';
    if (hitBasePath) {
      fixedHref = fixedHref.replace(hitBasePath, '');
      basePath = hitBasePath;
    }

    return `${basePath}/${locale}${fixedHref}${fixedQueryString}`;
  }, [router, locale, href]);

  return (
    <MuiLink href={coverHref} {...resetProps}>
      {children}
    </MuiLink>
  );
};

export default LanguageSwitchLink;
