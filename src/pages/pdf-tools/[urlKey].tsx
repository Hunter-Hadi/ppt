import { GetStaticPaths, GetStaticProps } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'querystring'

import ToolsDetail from '@/page_components/PdfToolsPages/components/ToolsDetail'
import { toolsObjectData } from '@/page_components/PdfToolsPages/constant'

export const getStaticPaths: GetStaticPaths = async () => {
  const toolList = Object.keys(toolsObjectData).map((key) => key)
  return {
    paths: toolList.map((toolUrlKey) => ({
      params: { urlKey: toolUrlKey },
    })),
    fallback: false,
  }
}

const UrlKeyToolsDetail = ({ urlKey }) => {
  return <ToolsDetail urlKey={urlKey} />
}
export default UrlKeyToolsDetail

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context?.params?.locale?.toString() || 'en'
  const translationData = await serverSideTranslations(locale)
  const { urlKey } = context?.params as ParsedUrlQuery

  try {
    console.log('simply context 1', context)
    if (!urlKey) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        urlKey,
        updatedAt: Date.now(),
        ...translationData,
      },
    }
  } catch (e) {
    console.log(e)
    return {
      props: {
        urlKey,
        updatedAt: Date.now(),
        ...translationData,
      },
    }
  }
}
