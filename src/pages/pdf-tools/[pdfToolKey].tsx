import { GetStaticPaths, GetStaticProps } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'

import ToolsDetail from '@/page_components/PdfToolsPages/components/ToolsDetail'
import { toolsObjectData } from '@/page_components/PdfToolsPages/constant'

const UrlKeyToolsDetail = ({ pdfToolKey }) => {
  return <ToolsDetail urlKey={pdfToolKey} />
}
export default UrlKeyToolsDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const enPdfToolKeys = Object.keys(toolsObjectData).map((key) => key)
  return {
    paths: enPdfToolKeys.map((toolUrlKey) => ({
      params: { pdfToolKey: toolUrlKey },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context?.params?.locale?.toString() || 'en'
  const translationData = await serverSideTranslations(locale)
  const { pdfToolKey } = context?.params as ParsedUrlQuery

  try {
    if (!pdfToolKey) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        pdfToolKey,
        updatedAt: Date.now(),
        ...translationData,
      },
    }
  } catch (e) {
    console.log(e)
    return {
      props: {
        pdfToolKey,
        updatedAt: Date.now(),
        ...translationData,
      },
    }
  }
}
