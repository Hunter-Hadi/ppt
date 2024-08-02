import { PDFDocument } from '@cantoo/pdf-lib'

// 读取Uint8Array为PDF文档
export async function uintArrayGetPdfDocument(
  buff: ArrayBuffer,
  password?: string,
) {
  const pdfDocument = await PDFDocument.load(buff, {
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
