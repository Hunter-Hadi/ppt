import { debounce } from 'lodash-es'
import { useEffect, useState } from 'react'

import {
  ITextContentHighlighterPosition,
  ITextContentHighlighterScaledPosition,
} from '../types/TextContentHighlighter'
import {
  scaledToViewport,
  viewportToScaled,
} from '../utils/TextContentHighlighter/coordinates'
import getBoundingRect from '../utils/TextContentHighlighter/getBoundingRect'
import getClientRects from '../utils/TextContentHighlighter/getClientRects'
const useFunctionalityCommonTextSelection = (props: {
  viewport: {
    width: number
    height: number
  }
  index: number
  clickOther: () => void
}) => {
  const [highlighterPosition, setHighlighterPosition] = useState<
    ITextContentHighlighterPosition | undefined
  >(undefined)
  const viewportPositionToScaled = (
    { pageNumber, boundingRect, rects }: ITextContentHighlighterPosition,
    showViewport: {
      width: number
      height: number
    },
  ) => {
    //当前页面的信息
    console.log('showViewport', showViewport)
    return {
      boundingRect: viewportToScaled(boundingRect, showViewport),
      rects: (rects || []).map((rect) => viewportToScaled(rect, showViewport)),
      pageNumber,
    }
  }
  const scaledPositionToViewport = ({
    pageNumber,
    boundingRect,
    rects,
    usePdfCoordinates,
  }: ITextContentHighlighterScaledPosition) => {
    //PDFView的信息
    return {
      boundingRect: scaledToViewport(
        boundingRect,
        props.viewport,
        usePdfCoordinates,
      ),
      rects: (rects || []).map((rect) =>
        scaledToViewport(rect, props.viewport, usePdfCoordinates),
      ),
      pageNumber,
    }
  }
  const onSelectionChange = debounce(() => {
    const selection = window.getSelection()
    if (selection) {
      const selectedText = selection.toString() // 获取选中的文本

      if (selectedText) {
        const range = selection.getRangeAt(0) // 获取选区的范围
        const wrapContainer = document.querySelector(
          '.text-layer-' + props.index,
        ) as HTMLDivElement
        if (!wrapContainer) {
          setHighlighterPosition(undefined)
          return
        }
        const page = [
          {
            node: wrapContainer,
            number: 1,
          },
        ]
        const rects = getClientRects(range, page) // 调用 getClientRects 方法获取矩形区域
        if (!rects.length) {
          setHighlighterPosition(undefined)
          return
        }
        const boundingRect = getBoundingRect(rects)
        const viewportPosition: ITextContentHighlighterPosition = {
          boundingRect,
          rects,
          pageNumber: page[0].number,
        }
        const scaledPosition = viewportPositionToScaled(viewportPosition, {
          width: wrapContainer.clientWidth,
          height: wrapContainer.clientHeight,
        })
        console.log('scaledPosition', scaledPosition)
        const viewPosition = scaledPositionToViewport(scaledPosition)
        console.log('viewPosition', viewPosition)

        setHighlighterPosition(viewPosition)
      } else {
        setHighlighterPosition(undefined)
      }
    } else {
      setHighlighterPosition(undefined)
    }
  }, 200)

  useEffect(() => {
    document.addEventListener('selectionchange', onSelectionChange)
    return () => {
      document.removeEventListener('selectionchange', onSelectionChange)
    }
  }, [])
  return {
    highlighterPosition,
    setHighlighterPosition,
  }
}
export default useFunctionalityCommonTextSelection
