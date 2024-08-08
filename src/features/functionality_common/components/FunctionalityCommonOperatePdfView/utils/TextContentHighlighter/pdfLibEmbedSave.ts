import Color from 'color'
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
  try {
    textAnnotatorList.forEach((textAnnotator, pageIndex) => {
      const page = pdfDoc.getPage(pageIndex)
      // 获取修整框
      const { x: trimX, y: trimY, height: trimHeight } = page.getCropBox()
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
            const rgbColor = Color(color).rgb().string() // 转换为RGB
            // 使用正则表达式提取 RGB 值
            const rgbValues = rgbColor.match(/\d+/g)?.map(Number) || [0, 0, 0]
            // 将 RGB 值转换为 pdf-lib 支持的 rgb 格式
            const pdfRgbColor = rgb(
              rgbValues[0] / 255,
              rgbValues[1] / 255,
              rgbValues[2] / 255,
            )
            // 将透明度转换为255的范围
            const fillOpacity = transparency !== undefined ? transparency : 0.5
            const rgbaColor = pdfRgbColor || rgb(0.75, 0.2, 0.2)
            if (type === 'highlight') {
              // 绘制高亮
              page.drawRectangle({
                x: trimX + left,
                y: trimHeight - top - height + trimY, // PDF坐标系统与普通坐标不同
                width: width,
                height: height,
                color: rgbaColor,
                opacity: fillOpacity,
              })
            } else if (type === 'underline') {
              const fontSize = height
              // 绘制下划线
              page.drawLine({
                start: {
                  x: trimX + left,
                  y: trimHeight - top - fontSize + trimX,
                },
                end: {
                  x: trimX + left + width,
                  y: trimHeight - top - fontSize + trimY,
                },
                color: rgbaColor,
                thickness: 1.5, // 可以调整线的厚度
              })
            } else if (type === 'strikethrough') {
              // 绘制删除线
              page.drawLine({
                start: {
                  x: trimX + left,
                  y: trimHeight - (top + height / 2) + trimY,
                },
                end: {
                  x: trimX + left + width,
                  y: trimHeight - (top + height / 2) + trimY,
                },
                color: rgbaColor,
                thickness: 1.5, // 可以调整线的厚度
              })
            }
          })
        }
      })
    })
  } catch (e) {
    console.log('textContentHighlighterPdfLibEmbedSave', e)
  }
}
