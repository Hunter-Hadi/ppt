// "viewport" rectangle is { top, left, width, height }

import {
  ITextContentHighlighterPageRectangle,
  ITextContentHighlighterScaled,
  // ITextContentHighlighterViewport,
} from '../../types/TextContentHighlighter'

// "scaled" means that data structure stores (0, 1) coordinates.
// for clarity reasons I decided not to store actual (0, 1) coordinates, but
// provide width and height, so user can compute ratio himself if needed

interface WIDTH_HEIGHT {
  width: number
  height: number
}

export const viewportToScaled = (
  rect: ITextContentHighlighterPageRectangle,
  { width, height }: WIDTH_HEIGHT,
): ITextContentHighlighterScaled => {
  return {
    x1: rect.left,
    y1: rect.top,

    x2: rect.left + rect.width,
    y2: rect.top + rect.height,

    width,
    height,

    pageNumber: rect.pageNumber,
  }
}

const pdfToViewport = (
  pdf: ITextContentHighlighterScaled,
  // viewport: ITextContentHighlighterViewport,
): ITextContentHighlighterPageRectangle => {
  const [x1, y1, x2, y2] = [pdf.x1, pdf.y1, pdf.x2, pdf.y2]

  return {
    left: Math.min(x1, x2),
    top: Math.min(y1, y2),

    width: Math.abs(x2 - x1),
    height: Math.abs(y1 - y2),

    pageNumber: pdf.pageNumber,
  }
}

export const scaledToViewport = (
  scaled: ITextContentHighlighterScaled,
  viewport: { width; height },
  usePdfCoordinates = false,
): ITextContentHighlighterPageRectangle => {
  const { width, height } = viewport
  const originalPDFRatio = viewport.width / scaled.width
  console.log('originalPDFRatio', originalPDFRatio)
  if (usePdfCoordinates) {
    return pdfToViewport(scaled)
  }

  if (scaled.x1 === undefined) {
    throw new Error('You are using old position format, please update')
  }

  const x1 = (width * scaled.x1) / scaled.width
  const y1 = (height * scaled.y1) / scaled.height

  const x2 = (width * scaled.x2) / scaled.width
  const y2 = (height * scaled.y2) / scaled.height

  return {
    left: x1,
    top: y1,
    width: x2 - x1,
    height: y2 - y1,
    pageNumber: scaled.pageNumber,
  }
}
