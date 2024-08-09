import React from 'react'

import { makeStaticProps } from '@/i18n/utils/staticHelper'
import PdfToolsRedirectPages from '@/page_components/PdfToolsPages/pages/PdfToolsRedirectPages'

// @deprecated
const ExtractPagePdf = () => {
  return <PdfToolsRedirectPages pdfToolKeys='extract-pdf-pages' />
}

export default ExtractPagePdf

const getStaticProps = makeStaticProps()
export { getStaticProps }
