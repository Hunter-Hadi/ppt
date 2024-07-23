import { GetStaticPaths, GetStaticProps } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'

import ToolsDetail from '@/page_components/PdfToolsPages/components/ToolsDetail'
import { toolsObjectData } from '@/page_components/PdfToolsPages/constant'

const UrlKeyToolsDetail = () => {
  return <ToolsDetail urlKey={'pdf-to-png'} />
  // return <ToolsDetail urlKey={testKey} />
}
export default UrlKeyToolsDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const enPdfToolKeys = Object.keys(toolsObjectData).map((key) => key)
  return {
    paths: enPdfToolKeys.map((toolUrlKey) => ({
      params: { urlKey: toolUrlKey },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context?.params?.locale?.toString() || 'en'
  const translationData = await serverSideTranslations(locale)
  const { urlKey } = context?.params as ParsedUrlQuery

  try {
    if (!urlKey) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        urlKey: urlKey,
        updatedAt: Date.now(),
        ...translationData,
      },
    }
  } catch (e) {
    console.log(e)
    return {
      props: {
        urlKey: urlKey,
        updatedAt: Date.now(),
        ...translationData,
      },
    }
  }
}
