import { PDFPage } from 'pdf-lib'

export const functionalityCommonGetPDFLibRealSize = (
  page: PDFPage,
  x: number,
  y: number,
) => {
  const {
    x: trimX,
    y: trimY,
    width: trimWidth,
    height: trimHeight,
  } = page.getCropBox()
  return {
    x: x - trimX,
    y: y - trimY,
  }
}
