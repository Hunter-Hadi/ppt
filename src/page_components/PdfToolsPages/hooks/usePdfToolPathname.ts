import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { I18nTypes } from '@/packages/common'
import toolsCodeMap from '@/page_components/PdfToolsPages/constant/pdfToolsCodeMap.json'
import { getPdfToolKeyWithLocale } from '@/page_components/PdfToolsPages/utils'

import { IToolUrkKeyType } from '../constant'

const usePdfToolPathname = () => {
  const router = useRouter()

  const locale = router.query.locale as I18nTypes

  // 根据传入的 en pdfToolKey 和 当前 router中的 locale 获取对应语言版本的 pdfToolKey 完整 pathname
  const getPdfToolPathnameWithLocale = useCallback(
    (enPdfToolKey: IToolUrkKeyType) => {
      if (locale) {
        const targetLangPdfToolKey = getPdfToolKeyWithLocale(
          enPdfToolKey,
          'en',
          locale,
        )

        if (targetLangPdfToolKey) {
          return `/${locale}/${toolsCodeMap.topUrlKey}/${targetLangPdfToolKey}/`
        }
      }

      return `/${toolsCodeMap.topUrlKey}/${enPdfToolKey}/`
    },
    [locale],
  )

  return { getPdfToolPathnameWithLocale }
}

export default usePdfToolPathname
