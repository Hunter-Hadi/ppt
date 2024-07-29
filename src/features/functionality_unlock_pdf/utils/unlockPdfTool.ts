import { PDFDocument } from '@cantoo/pdf-lib'

// 读取Uint8Array为PDF文档
export async function uintArrayGetPdfDocument(
  buff: ArrayBuffer,
  password?: string,
) {
  const pdfDocument = await PDFDocument.load(buff, {
    ignoreEncryption: true,
    password,
  })
  return { pdfDocument, buff }
}
// 读取文件为PDF文档
export async function fileGetPdfDocument(file: File, password?: string) {
  // 读取文件为 ArrayBuffer
  const buff: ArrayBuffer = await file.arrayBuffer() // Uint8Array
  // 加载PDF文档
  if (buff) {
    return uintArrayGetPdfDocument(buff, password)
  } else {
    return false
  }
}
// 复制PDF文档的所有页面到新的PDF文档
export async function copyPdfAllPagesToNewPDF(pdfDocument: PDFDocument) {
  // // 创建新的PDF文档
  const newPDFDocument = await PDFDocument.create()

  // 复制所有页面
  const pages = pdfDocument.getPages()
  const pageIndexes = Array.from({ length: pages.length }, (_, i) => i)
  const copiedPages = await newPDFDocument.copyPages(pdfDocument, pageIndexes)
  copiedPages.forEach((copiedPage) => newPDFDocument.addPage(copiedPage))
  // 保存新PDF文档为Uint8Array
  const pdfBytes = await newPDFDocument.save()

  // 返回保存的新PDF文档
  return pdfBytes
}
