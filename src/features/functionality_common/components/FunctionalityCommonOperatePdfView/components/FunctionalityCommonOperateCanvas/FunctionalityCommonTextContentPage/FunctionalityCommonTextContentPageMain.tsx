import { Box } from '@mui/material'
import { cloneDeep } from 'lodash-es'
import Head from 'next/head'
import React, { FC, useEffect, useMemo, useRef } from 'react'
import { pdfjs } from 'react-pdf'
import { useRecoilState } from 'recoil'
import { v4 as uuidV4 } from 'uuid'

import { IFunctionalityCommonVirtualScrollingPdfInfo } from '@/features/functionality_common/components/FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewVirtualScrollMain'
import { useFunctionalityCommonElementSize } from '@/features/functionality_common/hooks/useFunctionalityCommonElementSize'

import useFunctionalityCommonTextSelection from '../../../hooks/useFunctionalityCommonTextSelection'
import { textAnnotatorRecoilList } from '../../../store/setTextContentAnnotator'
import { ITextContentHighlighterAnnotationInfo } from '../../../types/TextContentHighlighter'
import FunctionalityCommonTextContentPageHighlight from './FunctionalityCommonTextContentPageHighlight'
import FunctionalityCommonTextContentPageTip from './FunctionalityCommonTextContentPageTip'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()
interface IFunctionalityCommonTextContentPageProps {
  pdfInfo: IFunctionalityCommonVirtualScrollingPdfInfo
  index: number
  isEdit: boolean
}
const FunctionalityCommonTextContentPage: FC<
  IFunctionalityCommonTextContentPageProps
> = ({ pdfInfo, index, isEdit }) => {
  const initRenderTextLayer = useRef(false)
  const textBoxRef = useRef<HTMLDivElement>(null)
  const textLayerRef = useRef<HTMLDivElement>(null)
  const [textAnnotatorList, setTextAnnotatorList] = useRecoilState(
    textAnnotatorRecoilList,
  )
  const currentTextAnnotatorList = textAnnotatorList[index] || []

  const { highlighterPosition, setHighlighterPosition } =
    useFunctionalityCommonTextSelection({
      viewport: {
        width: pdfInfo.width,
        height: pdfInfo.height,
      },
      index,
    })
  const removeAllRanges = () => {
    setHighlighterPosition(undefined)
    const selection = window.getSelection()
    // 清除用户的选择
    if (selection) {
      selection.removeAllRanges()
    }
  }
  useEffect(() => {
    removeAllRanges()
  }, [isEdit])
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
  const onAddHighlight = (
    selectPosition,
    annotationInfo: ITextContentHighlighterAnnotationInfo,
  ) => {
    const info = cloneDeep(annotationInfo)
    setTextAnnotatorList((list) => {
      const copyList = cloneDeep(list)
      copyList[index] = [
        ...(copyList[index] ? copyList[index] : []),
        {
          position: selectPosition,
          id: uuidV4(),
          annotation: [info],
        },
      ]
      return copyList
    })
    removeAllRanges()
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
      <Head>
        <style>
          {`
.textLayer {
  z-index: 2;
  opacity: 1;
  mix-blend-mode: multiply;
  display: flex;
}

.annotationLayer {
  position: absolute;
  top: 0;

  z-index: 3;
}

html
  body
  .textLayer
  > div:not(.PdfHighlighter__highlight-layer):not(.Highlight):not(.Highlight-emoji) {
  opacity: 1;
  mix-blend-mode: multiply;
}

.textLayer ::selection {
  background: rgb(100, 70, 123,1);
  mix-blend-mode: multiply;
}
.textLayer {opacity: 0.3;}
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .textLayer {opacity: 0.3;}
}

/* Internet Explorer support method */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .textLayer {opacity: 0.3 }
}

/* Microsoft Edge Browser 12+ (All) - @supports method */
@supports (-ms-ime-align:auto) {
  .textLayer {opacity: 0.3 }
}

        `}
        </style>
      </Head>
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
          }}
        ></Box>
        {highlighterPosition && (
          <FunctionalityCommonTextContentPageTip
            selectPosition={highlighterPosition}
            onChange={(info) => onAddHighlight(highlighterPosition, info)}
            pdfViewScale={widthScale}
          />
        )}
        {currentTextAnnotatorList.length > 0 && (
          <FunctionalityCommonTextContentPageHighlight
            viewHighlights={currentTextAnnotatorList}
            pdfViewScale={widthScale}
          />
        )}
      </Box>
    </Box>
  )
}
export default FunctionalityCommonTextContentPage
