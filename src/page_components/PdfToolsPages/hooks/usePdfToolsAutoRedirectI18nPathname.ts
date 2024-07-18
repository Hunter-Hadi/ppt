import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { I18nTypes } from '@/packages/common'
import {
  findEnPdfToolKeyWithLocale,
  getPdfToolKeyWithLocale,
} from '@/page_components/PdfToolsPages/utils'

const usePdfToolsAutoRedirectI18nPathname = (anyLangPdfToolKey: string) => {
  const { query } = useRouter()
  const locale = query.locale as I18nTypes
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const enPdfToolKey = findEnPdfToolKeyWithLocale(anyLangPdfToolKey, 'en')

    if (
      locale &&
      locale !== 'en' &&
      enPdfToolKey &&
      enPdfToolKey === anyLangPdfToolKey
    ) {
      const targetLangPdfToolKey = getPdfToolKeyWithLocale(
        enPdfToolKey,
        'en',
        locale,
      )
      if (targetLangPdfToolKey && targetLangPdfToolKey !== enPdfToolKey) {
        // 可能存在 目标语言的 pdfToolKey 就是和 en pdfToolKey 一样的情况
        // 那就不进行跳转
        location.href = `/${locale}/pdf-tools/${targetLangPdfToolKey}`
      }
      return
    }
    setIsNotFound(true)
  }, [anyLangPdfToolKey, locale])

  return {
    isNotFound,
  }
}

export default usePdfToolsAutoRedirectI18nPathname
