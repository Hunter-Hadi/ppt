import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { DefaultSeo, DefaultSeoProps } from 'next-seo';
import React, { FC, useMemo } from 'react';

interface IAppDefaultSeoProps extends DefaultSeoProps {
  socialImage?: string;
}

const AppDefaultSeoLayout: FC<Partial<IAppDefaultSeoProps>> = (props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { title, description, openGraph, socialImage, ...rest } = props;
  /**
   * SEO默认值
   */
  const defaultSeoConfig: DefaultSeoProps = useMemo(() => {
    const DEFAULT_TITLE = t('seo:default__title');
    const DEFAULT_DESCRIPTION = t('seo:default__description');
    return {
      title: title ?? DEFAULT_TITLE,
      description: description ?? DEFAULT_DESCRIPTION,
      canonical: rest.canonical || 'https://www.maxai.me',
      openGraph: {
        site_name: 'MaxAI.me',
        title: title ?? DEFAULT_TITLE,
        description: description ?? DEFAULT_DESCRIPTION,
        type: 'article',
        images: [{ url: socialImage ?? 'https://www.maxai.me/social.png' }],
      },
      twitter: {
        handle: '@MaxAI_HQ',
        site: '@MaxAI_HQ',
        cardType: 'summary_large_image',
      },
      additionalLinkTags: [
        {
          rel: 'icon',
          href: 'https://www.maxai.me/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          href: 'https://www.maxai.me/maxai_152.png',
          sizes: '152x152',
        },
        {
          rel: 'apple-touch-icon',
          href: 'https://www.maxai.me/maxai_60.png',
          sizes: '60x60',
        },
        {
          rel: 'apple-touch-icon',
          href: 'https://www.maxai.me/maxai_76.png',
          sizes: '76x76',
        },
        {
          rel: 'apple-touch-icon',
          href: 'https://www.maxai.me/maxai_120.png',
          sizes: '120x120',
        },
        {
          rel: 'mask-icon',
          href: 'https://www.maxai.me/maxai_500.png',
          color: '#1D56D7',
        },
      ],
    };
  }, [title, description, socialImage, rest.canonical, t]);
  const canonicalUrl = rest.canonical
    ? rest.canonical
    : `${defaultSeoConfig.canonical}${
        router?.asPath === '/' ? '/' : router?.asPath
      }`.split(/[?#]/)[0];
  if (defaultSeoConfig.openGraph) {
    if (openGraph) {
      defaultSeoConfig.openGraph = {
        ...defaultSeoConfig.openGraph,
        ...openGraph,
      };
    }
    if (!defaultSeoConfig.openGraph.url) {
      defaultSeoConfig.openGraph.url = canonicalUrl;
    }
  }
  return (
    <DefaultSeo {...defaultSeoConfig} {...rest} canonical={canonicalUrl} />
  );
};
export default AppDefaultSeoLayout;
