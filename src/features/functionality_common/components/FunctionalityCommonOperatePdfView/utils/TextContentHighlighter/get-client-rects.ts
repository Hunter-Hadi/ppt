import {
  ITextContentHighlighterPage,
  ITextContentHighlighterPageRectangle,
} from '../../types/TextContentHighlighter'
import optimizeClientRects from './optimize-client-rects'

const isClientRectInsidePageRect = (clientRect: DOMRect, pageRect: DOMRect) => {
  if (clientRect.top < pageRect.top) {
    return false
  }
  if (clientRect.bottom > pageRect.bottom) {
    return false
  }
  if (clientRect.right > pageRect.right) {
    return false
  }
  if (clientRect.left < pageRect.left) {
    return false
  }

  return true
}

const getClientRects = (
  range: Range,
  pages: ITextContentHighlighterPage[],
  shouldOptimize = true,
): Array<ITextContentHighlighterPageRectangle> => {
  const clientRects = Array.from(range.getClientRects())

  const rects: ITextContentHighlighterPageRectangle[] = []

  for (const clientRect of clientRects) {
    for (const page of pages) {
      const pageRect = page.node?.getBoundingClientRect()

      if (
        isClientRectInsidePageRect(clientRect, pageRect) &&
        clientRect.width > 0 &&
        clientRect.height > 0 &&
        clientRect.width < pageRect.width &&
        clientRect.height < pageRect.height
      ) {
        const highlightedRect = {
          top: clientRect.top + page.node.scrollTop - pageRect.top,
          left: clientRect.left + page.node.scrollLeft - pageRect.left,
          width: clientRect.width,
          height: clientRect.height,
          pageNumber: page.number,
        } as ITextContentHighlighterPageRectangle

        rects.push(highlightedRect)
      }
    }
  }

  return shouldOptimize ? optimizeClientRects(rects) : rects
}

export default getClientRects
