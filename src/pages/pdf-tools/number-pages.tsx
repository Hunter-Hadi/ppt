import React from 'react'

import { makeStaticProps } from '@/i18n/utils/staticHelper'
import PdfToolsRedirectPages from '@/page_components/PdfToolsPages/pages/PdfToolsRedirectPages'

// @deprecated
const NumberPages = () => {
  return <PdfToolsRedirectPages pdfToolKeys='add-page-numbers-to-pdf' />
}

export default NumberPages

const getStaticProps = makeStaticProps()
export { getStaticProps }
