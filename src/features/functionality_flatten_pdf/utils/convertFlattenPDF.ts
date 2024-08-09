import { PDFDocument } from 'pdf-lib'
//https://github.com/Hopding/pdf-lib/issues/1205
//遇到的问题 通过 pdf-lib 的PDF都不支持flatten方法
export const convertFlattenPDF = async (
  file: File,
): Promise<Uint8Array | false> => {
  try {
    // 将文件转换为 ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    // 加载 PDF 文档
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      updateMetadata: true,
    })
    const form = pdfDoc.getForm()
    form.flatten()
    // 保存并返回最终合并的 PDF 文档
    return await pdfDoc.save()
  } catch (e) {
    return false // 捕获错误，返回 false
  }
}
