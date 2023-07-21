import { useRouter } from 'next/router';
import { DefaultSeo, DefaultSeoProps } from 'next-seo';
import React, { FC, useMemo } from 'react';

interface IAppDefaultSeoProps extends DefaultSeoProps {
  socialImage?: string;
}

const DEFAULT_TITLE = 'MaxAI.me: Use AI Anywhere (ChatGPT, Claude, Bard, Bing)';
const DEFAULT_DESCRIPTION =
  'The fastest way to use AI anywhere online. One click to compose, improve writing, summarize, explain, fix spelling & grammar, change tone, translate, or reply to any text.';

const AppDefaultSeoLayout: FC<Partial<IAppDefaultSeoProps>> = (props) => {
  const router = useRouter();
  const { title, description, openGraph, socialImage, ...rest } = props;
  /**
   * SEO默认值
   */
  const defaultSeoConfig: DefaultSeoProps = useMemo(() => {
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
  }, [title, description]);
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
