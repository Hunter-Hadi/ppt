import { useRouter } from 'next/router';
import { DefaultSeo, DefaultSeoProps } from 'next-seo';
import React, { FC, useMemo } from 'react';

interface IAppDefaultSeoProps extends DefaultSeoProps {
  socialImage?: string;
}

const DEFAULT_TITLE =
  'MaxAI.me: Free AI Copilot for the Web (ChatGPT, Bard, Bing, Claude)';
const DEFAULT_DESCRIPTION =
  'Use ChatGPT (Plugins & GPT-4), Bard, Bing Chat, and Claude on any website without copy-pasting. Write, rewrite, summarize, translate, explain, or reply to any text everywhere with one click.';

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
          href: 'https://www.maxai.me/usechatgpt.png',
        },
        {
          rel: 'apple-touch-icon',
          href: 'https://www.maxai.me/usechatgpt_152.png',
          sizes: '152x152',
        },
        {
          rel: 'apple-touch-icon',
          href: 'https://www.maxai.me/usechatgpt_60.png',
          sizes: '60x60',
        },
        {
          rel: 'apple-touch-icon',
          href: 'https://www.maxai.me/usechatgpt_76.png',
          sizes: '76x76',
        },
        {
          rel: 'apple-touch-icon',
          href: 'https://www.maxai.me/usechatgpt_120.png',
          sizes: '120x120',
        },
        {
          rel: 'mask-icon',
          href: 'https://www.maxai.me/usechatgpt_500.png',
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
