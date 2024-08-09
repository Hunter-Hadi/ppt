import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import { I18nTypes } from '@/packages/common'

import { IToolUrkKeyType } from '../constant'
import { getPdfToolKeyWithLocale } from '../utils'

interface IRedirectPagesProps {
  pdfToolKeys: IToolUrkKeyType
}

// 由于 pdf tools url 更新，需要保留原本的页面路径，重定向到新的页面路径
const PdfToolsRedirectPages: FC<IRedirectPagesProps> = ({
  pdfToolKeys: enPdfToolKey,
}) => {
  const { isReady, query } = useRouter()
  const locale = query.locale as I18nTypes

  useEffect(() => {
    if (enPdfToolKey && isReady && typeof window !== 'undefined') {
      const targetLangPdfToolKey = getPdfToolKeyWithLocale(
        enPdfToolKey,
        'en',
        locale,
      )

      if (targetLangPdfToolKey) {
        location.href = `${
          locale ? `/${locale}` : ''
        }/pdf-tools/${targetLangPdfToolKey}/${location.search}`
      }
    }
  }, [enPdfToolKey, locale, isReady])

  return (
    <AppLoadingLayout
      loading
      sx={{
        height: '80vh',
      }}
    />
  )
}

export default PdfToolsRedirectPages
