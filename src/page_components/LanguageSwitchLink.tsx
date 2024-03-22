import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { cloneDeep } from 'lodash-es';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';

import { objectToQueryString } from '@/features/common/utils/dataHelper/objectHelper';
import { fixLocalePathname } from '@/i18n/utils';

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

    const fixedHref = href ? href : fixLocalePathname(router.pathname);

    const fixedQueryString = queryString.length > 0 ? `?${queryString}` : '';

    return `/${locale}${fixedHref}${fixedQueryString}`;
  }, [router, locale, href]);

  return (
    <MuiLink href={coverHref} {...resetProps}>
      {children}
    </MuiLink>
  );
};

export default LanguageSwitchLink;
