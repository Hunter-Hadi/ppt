import React from 'react'

import { makeStaticProps } from '@/i18n/utils/staticHelper'
import PdfToolsRedirectPages from '@/page_components/PdfToolsPages/pages/PdfToolsRedirectPages'

// @deprecated
const OcrPdf = () => {
  return <PdfToolsRedirectPages pdfToolKeys='pdf-ocr' />
}

export default OcrPdf

const getStaticProps = makeStaticProps()
export { getStaticProps }
