import { Box } from '@mui/material'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { pdfjs } from 'react-pdf'

import { IFunctionalityCommonVirtualScrollingPdfInfo } from '@/features/functionality_common/components/FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewVirtualScrollMain'
import { useFunctionalityCommonElementSize } from '@/features/functionality_common/hooks/useFunctionalityCommonElementSize'

import useFunctionalityCommonTextSelection from '../../../hooks/useFunctionalityCommonTextSelection'
import {
  ITextContentHighlighterPosition,
  ITextContentHighlighterViewportHighlight,
} from '../../../types/TextContentHighlighter'
import FunctionalityCommonTextContentPageHighlight from './FunctionalityCommonTextContentPageHighlight'
import FunctionalityCommonTextContentPageTip from './FunctionalityCommonTextContentPageTip'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()
interface IFunctionalityCommonTextContentPageProps {
  pdfInfo: IFunctionalityCommonVirtualScrollingPdfInfo
  index: number
}
const FunctionalityCommonTextContentPage: FC<
  IFunctionalityCommonTextContentPageProps
> = ({ pdfInfo, index }) => {
  const initRenderTextLayer = useRef(false)
  const textBoxRef = useRef<HTMLDivElement>(null)
  const textLayerRef = useRef<HTMLDivElement>(null)
  const [viewHighlights, setViewHighlights] = useState<
    ITextContentHighlighterViewportHighlight[]
  >([])
  const { highlighterPosition } = useFunctionalityCommonTextSelection({
    viewport: {
      width: pdfInfo.width,
      height: pdfInfo.height,
    },
    index,
  })
  const { width } = useFunctionalityCommonElementSize(textBoxRef)

  const widthScale = useMemo(
    () => (width || 100) / pdfInfo.width,
    [pdfInfo.width, width],
  )
  console.log('widthScale', widthScale, pdfInfo.pdfViewScale)
  useEffect(() => {
    if (textLayerRef.current && pdfInfo?.page && !initRenderTextLayer.current) {
      initRenderTextLayer.current = true
      const pageViewport = pdfInfo.page.getViewport({
        scale: 1,
      }) //获取页面视图信息
      pdfjs.renderTextLayer({
        textContentSource: pdfInfo.textContent,
        container: textLayerRef.current,
        viewport: pageViewport,
      })
    }
  }, [pdfInfo, textBoxRef.current?.clientWidth])
  const onAddHighlight = (scaledPosition: ITextContentHighlighterPosition) => {
    setViewHighlights((list) => [
      ...list,
      {
        position: scaledPosition,
        id: '',
      },
    ])
  }
  return (
    <Box
      ref={textBoxRef}
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 1500,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <Box
          ref={textLayerRef}
          className={`textLayer text-layer-${index}`}
          sx={{
            position: 'relative',
            '--scale-factor': widthScale,
            '::selection:': {
              backgroundColor: 'rgba(252, 232, 151, 1)',
              minBlendMode: 'multiply',
            },
          }}
        >
          {highlighterPosition && (
            <FunctionalityCommonTextContentPageTip
              selectPosition={highlighterPosition}
              onAdd={() => onAddHighlight(highlighterPosition)}
              pdfViewScale={widthScale}
            />
          )}
          <FunctionalityCommonTextContentPageHighlight
            viewHighlights={viewHighlights}
            pdfViewScale={widthScale}
          />
        </Box>
      </Box>
    </Box>
  )
}
export default FunctionalityCommonTextContentPage
