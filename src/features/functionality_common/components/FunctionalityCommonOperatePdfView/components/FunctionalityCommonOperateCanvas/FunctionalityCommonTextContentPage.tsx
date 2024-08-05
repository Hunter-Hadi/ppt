import { Box } from '@mui/material'
import React, { FC, useEffect, useMemo, useRef } from 'react'
import { pdfjs } from 'react-pdf'

import { useFunctionalityCommonElementSize } from '@/features/functionality_common/hooks/useFunctionalityCommonElementSize'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()
interface IFunctionalityCommonTextContentPageProps {
  pdfInfo: any
  index: number
}
const FunctionalityCommonTextContentPage: FC<
  IFunctionalityCommonTextContentPageProps
> = ({ pdfInfo, index }) => {
  const initRenderTextLayer = useRef(false)
  const textBoxRef = useRef<HTMLDivElement>(null)
  const textLayerRef = useRef<HTMLDivElement>(null)
  const { width } = useFunctionalityCommonElementSize(textBoxRef)
  const widthScale = useMemo(
    () => (width || 100) / pdfInfo.width,
    [pdfInfo.width, width],
  )
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
        ref={textLayerRef}
        className='textLayer'
        sx={{
          position: 'relative',
          '--scale-factor': widthScale,
          '::selection:': {
            backgroundColor: 'rgba(252, 232, 151, 1)',
            minBlendMode: 'multiply',
          },
        }}
      ></Box>
    </Box>
  )
}
export default FunctionalityCommonTextContentPage
