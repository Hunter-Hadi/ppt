const StaticPageTemplate = `import { makeStaticProps } from '@/i18n/utils/staticHelper';
import {{NAME}}Pages from '@/page_components/{{NAME}}Pages';

export default {{NAME}}Pages;

const getStaticProps = makeStaticProps();
export { getStaticProps };
`;
const StaticPageInLocaleTemplate = `import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import {{NAME}}Pages from '@/page_components/{{NAME}}Pages';

export default {{NAME}}Pages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
`;

const DynamicRoutingPageTemplate = `import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { makeI18nStaticPropsWithOriginalParams } from '@/i18n/utils/staticHelper';
import {{NAME}}Pages from '@/page_components/{{NAME}}Pages';
export default {{NAME}}Pages;

export const getStaticPaths: GetStaticPaths = async () => {
  // do something...
  // and get all your possible routing parameters
  const yourParams: string[] = [];
  return {
    paths: yourParams.map(({{PARAMETER_KEY}}) => ({
      params: {
        {{PARAMETER_KEY}},
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context?.params?.locale?.toString() || 'en';
  try {
    const params = context.params as ParsedUrlQuery;

    const {{PARAMETER_KEY}} = params?.{{PARAMETER_KEY}};
    if (!{{PARAMETER_KEY}}) {
      // jump to 404
      return {
        notFound: true,
      };
    }
    return makeI18nStaticPropsWithOriginalParams(locale, {
      props: {
        {{PARAMETER_KEY}},
        updatedAt: Date.now(),
      },
    });
  } catch (e) {
    console.log(e);
  }
  return makeI18nStaticPropsWithOriginalParams(locale, {
    props: {
      {{PARAMETER_KEY}}: context.params?.{{PARAMETER_KEY}},
      updatedAt: Date.now(),
    },
  });
};
`;

const DynamicRoutingPageInLocaleTemplate = `import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { makeI18nStaticPathsWithOriginalParams, makeI18nStaticPropsWithOriginalParams } from '@/i18n/utils/staticHelper';
import {{NAME}}Pages from '@/page_components/{{NAME}}Pages';
export default {{NAME}}Pages;

export const getStaticPaths: GetStaticPaths = async () => {
  // do something...
  // and get all your possible routing parameters
  const yourParams: string[] = [];
  return makeI18nStaticPathsWithOriginalParams({
    paths: yourParams.map(({{PARAMETER_KEY}}) => ({
      params: {
        {{PARAMETER_KEY}},
      },
    })),
    fallback: false,
  });
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context?.params?.locale?.toString() || 'en';
  try {
    const params = context.params as ParsedUrlQuery;

    const {{PARAMETER_KEY}} = params?.{{PARAMETER_KEY}};
    if (!{{PARAMETER_KEY}}) {
      // jump to 404
      return {
        notFound: true,
      };
    }
    return makeI18nStaticPropsWithOriginalParams(locale, {
      props: {
        {{PARAMETER_KEY}},
        updatedAt: Date.now(),
      },
    });
  } catch (e) {
    console.log(e);
  }
  return makeI18nStaticPropsWithOriginalParams(locale, {
    props: {
      {{PARAMETER_KEY}}: context.params?.{{PARAMETER_KEY}},
      updatedAt: Date.now(),
    },
  });
};
`;

const PageComponentsTemplate = `import React from 'react';

const {{NAME}}Pages = () => {
  return <h1>Hello {{NAME}} Pages</h1>;
};

export default {{NAME}}Pages;
`;
const DynamicRoutingPageComponentsTemplate = `import { useRouter } from 'next/router';
import React from 'react';

const {{NAME}}Pages = () => {
  const { query } = useRouter();
  return (
    <>
      <h1>Hello {{NAME}} Pages</h1>
      <h2>Your query: {JSON.stringify(query)}</h2>;
    </>
  );
};

export default {{NAME}}Pages;
`;

export {
  DynamicRoutingPageComponentsTemplate,
  DynamicRoutingPageInLocaleTemplate,
  DynamicRoutingPageTemplate,
  PageComponentsTemplate,
  StaticPageInLocaleTemplate,
  StaticPageTemplate,
};
