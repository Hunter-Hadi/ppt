import React from 'react'

import { makeStaticProps } from '@/i18n/utils/staticHelper'
import PdfToolsRedirectPages from '@/page_components/PdfToolsPages/pages/PdfToolsRedirectPages'

// @deprecated
const DeletePagePdf = () => {
  return <PdfToolsRedirectPages pdfToolKeys='delete-pages-from-pdf' />
}

export default DeletePagePdf

const getStaticProps = makeStaticProps()
export { getStaticProps }
