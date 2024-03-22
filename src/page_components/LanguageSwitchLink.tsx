import { cloneDeep } from 'lodash-es';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';

import ProLink, { IProLinkProps } from '@/components/ProLink';
import { fixLocalePathname } from '@/i18n/utils';

interface IProps extends Omit<IProLinkProps, 'href'> {
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

    return {
      pathname: `/${locale}${href ? href : fixLocalePathname(router.pathname)}`,
      query: queryClone,
    };
  }, [router, locale, href]);

  return (
    <ProLink href={coverHref} {...resetProps}>
      {children}
    </ProLink>
  );
};

export default LanguageSwitchLink;
