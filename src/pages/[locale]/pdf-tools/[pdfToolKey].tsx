import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import { i18nLocales } from '@/i18n/utils'
import { I18nTypes } from '@/packages/common'
import Custom404 from '@/page_components/Custom404'
import ToolsDetail from '@/page_components/PdfToolsPages/components/ToolsDetail'
import { toolsObjectData } from '@/page_components/PdfToolsPages/constant'
import usePdfToolsAutoRedirectI18nPathname from '@/page_components/PdfToolsPages/hooks/usePdfToolsAutoRedirectI18nPathname'
import {
  findEnPdfToolKeyWithLocale,
  getPdfToolKeyWithLocale,
} from '@/page_components/PdfToolsPages/utils'

const UrlKeyToolsDetail = ({ pdfToolKey: anyLangPdfToolKey }) => {
  const { query } = useRouter()
  const locale = query.locale as I18nTypes

  const { isNotFound } = usePdfToolsAutoRedirectI18nPathname(anyLangPdfToolKey)
  const enPdfToolKey = findEnPdfToolKeyWithLocale(
    anyLangPdfToolKey as string,
    locale as I18nTypes,
  )

  if (enPdfToolKey) {
    return <ToolsDetail urlKey={enPdfToolKey} />
  }

  if (isNotFound) {
    return <Custom404 />
  }

  return (
    <AppLoadingLayout
      loading
      sx={{
        height: '40vh',
      }}
    />
  )
}
export default UrlKeyToolsDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const enPdfToolKeys = Object.keys(toolsObjectData).map((key) => key)

  const paths = i18nLocales
    .map((lang) => {
      return enPdfToolKeys.map((toolUrlKey) => ({
        params: {
          locale: lang,
          pdfToolKey:
            getPdfToolKeyWithLocale(toolUrlKey, 'en', lang) ?? toolUrlKey,
        },
      }))
    })
    .flat()

  // 为了兼容旧的 url， 这里需要加上所有 `/{所有语言}/pdf-tools/{enPdfToolKey}` 的路径
  // 例如 `/zh-CN/pdf-tools/png-to-pdf`
  for (let i = 0; i < i18nLocales.length; i++) {
    const lang = i18nLocales[i]
    enPdfToolKeys.forEach((enPdfToolKey) => {
      paths.push({
        params: {
          locale: lang,
          pdfToolKey: enPdfToolKey,
        },
      })
    })
  }

  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = (context?.params?.locale?.toString() || 'en') as I18nTypes
  const translationData = await serverSideTranslations(locale)
  const { pdfToolKey: anyLangPdfToolKey } = context?.params as ParsedUrlQuery

  try {
    return {
      props: {
        ...translationData,
        pdfToolKey: anyLangPdfToolKey,
        updatedAt: Date.now(),
      },
    }
  } catch (e) {
    console.log('error', e)
    return {
      notFound: true,
    }
  }
}
