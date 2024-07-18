import { I18nTypes } from '@/packages/common/constants/i18n'
import {
  IToolUrkKeyType,
  PDF_TOOLS_KEY_WITH_LOCALE,
} from '@/page_components/PdfToolsPages/constant'

/**
 * 传入 任意语言 pdfToolKey 和 currentLocale 获取 指定语言版本的 pdfToolKey
 * @param enPdfToolKey
 * @param locale
 * @returns string
 */
export const getPdfToolKeyWithLocale = (
  anyLangPdfToolKey: string,
  currentLocale: I18nTypes | string = 'en',
  targetLocale: I18nTypes | string = 'en',
) => {
  const enPdfToolKey = findEnPdfToolKeyWithLocale(
    anyLangPdfToolKey,
    currentLocale,
  )
  if (enPdfToolKey) {
    return PDF_TOOLS_KEY_WITH_LOCALE[enPdfToolKey][targetLocale] as string
  }

  return null
}

/**
 * 传入 翻译后的 pdfToolKey 和 currentLocale 获取对应的 en pdfToolKey
 * @param anyLangPdfToolKey
 * @param locale
 * @returns string | null
 */
export const findEnPdfToolKeyWithLocale = (
  anyLangPdfToolKey: string,
  currentLocale: I18nTypes | string,
) => {
  const pdfToolKeys = Object.keys(PDF_TOOLS_KEY_WITH_LOCALE)

  for (let i = 0; i < pdfToolKeys.length; i++) {
    const enPdfToolKey = pdfToolKeys[i]
    if (
      PDF_TOOLS_KEY_WITH_LOCALE[enPdfToolKey][currentLocale] ===
      anyLangPdfToolKey
    ) {
      return enPdfToolKey as IToolUrkKeyType
    }
  }

  return null
}
