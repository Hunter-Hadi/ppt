import { PDFDocument, rgb } from 'pdf-lib'

import { ITextContentHighlighterViewportHighlight } from '../../types/TextContentHighlighter'
// // 类型定义
// export interface ITextContentHighlighterViewportHighlight {
//   left: number; // 矩形左边距
//   top: number; // 矩形上边距
//   width: number; // 矩形宽度
//   height: number; // 矩形高度
//   type: 'highlight' | 'underline' | 'strikethrough';
//   color: string; // 颜色（如 '#FF0000'）
//   transparency?: number; // 透明度（0-1）
// }

export const textContentHighlighterPdfLibEmbedSave = async (
  pdfDoc: PDFDocument,
  textAnnotatorList: ITextContentHighlighterViewportHighlight[][],
) => {
  const pages = pdfDoc.getPages()

  textAnnotatorList.forEach((textAnnotator, pageIndex) => {
    const page = pages[pageIndex]
    if (!textAnnotator) return
    textAnnotator.forEach((highlight) => {
      const annotationInfo = highlight.annotation?.[0]
      if (annotationInfo) {
        highlight.position.rects.forEach((rect) => {
          const { left, top, width, height, type, color, transparency } = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
            type: annotationInfo.type,
            color: annotationInfo.color,
            transparency: annotationInfo.transparency,
          }
          // 将透明度转换为255的范围
          const fillOpacity = transparency !== undefined ? 1 - transparency : 1
          const rgbaColor = rgb(0.75, 0.2, 0.2)

          if (type === 'highlight') {
            // 绘制高亮
            page.drawRectangle({
              x: left,
              y: page.getHeight() - top - height, // PDF坐标系统与普通坐标不同
              width: width,
              height: height,
              color: rgbaColor,
              opacity: fillOpacity,
            })
          } else if (type === 'underline') {
            const fontSize = 12
            // 绘制下划线
            page.drawLine({
              start: { x: left, y: page.getHeight() - top - fontSize },
              end: { x: left + width, y: page.getHeight() - top - fontSize },
              color: rgbaColor,
              thickness: 2, // 可以调整线的厚度
            })
          } else if (type === 'strikethrough') {
            // 绘制删除线
            page.drawLine({
              start: { x: left, y: page.getHeight() - (top + height / 2) },
              end: {
                x: left + width,
                y: page.getHeight() - (top + height / 2),
              },
              color: rgbaColor,
              thickness: 2, // 可以调整线的厚度
            })
          }
        })
      }
    })
  })
}
