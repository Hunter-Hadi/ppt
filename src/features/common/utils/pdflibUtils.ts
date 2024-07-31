import { PDFDocument } from '@cantoo/pdf-lib'

// 复制PDF文档的所有页面到新的PDF文档
//请使用 @cantoo/pdf-lib 包的 PDFDocument 类来处理 PDF COPY
export async function copyPdfAllPagesToNewPDF(
  pdfDocument: PDFDocument,
  password?: string,
) {
  // // 创建新的PDF文档
  const newPDFDocument = await PDFDocument.create()

  // 复制所有页面
  const pages = pdfDocument.getPages()
  const pageIndexes = Array.from({ length: pages.length }, (_, i) => i)
  const copiedPages = await newPDFDocument.copyPages(pdfDocument, pageIndexes)
  copiedPages.forEach((copiedPage) => newPDFDocument.addPage(copiedPage))
  // 保存新PDF文档为Uint8Array
  if (password) {
    newPDFDocument.encrypt({ userPassword: password })
  }
  const pdfBytes = await newPDFDocument.save()

  // 返回保存的新PDF文档
  return pdfBytes
}
