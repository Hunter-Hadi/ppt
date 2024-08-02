import { Box } from '@mui/material'
import React, { FC, useRef } from 'react'

import { useFunctionalitySignElementWidth } from '@/features/functionality_sign_pdf/hooks/useFunctionalitySignElementWidth'

import FunctionalityCommonPdfViewPage from '../../FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewPage'
import FunctionalityCommonPdfViewVirtualScrollMain from '../../FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewVirtualScrollMain'
import FunctionalityCommonOperateFabricCanvas from './FunctionalityCommonOperateCanvas/FunctionalityCommonOperateFabricCanvas'
interface FunctionalityCommonOperatePdfToolViewMainProps {
  file: File
  isShowBottomOperation: boolean
}
const FunctionalityCommonOperatePdfToolViewMain: FC<
  FunctionalityCommonOperatePdfToolViewMainProps
> = ({ file, isShowBottomOperation }) => {
  const wrapRef = useRef<HTMLElement>(null)

  const { width: parentWidth, height: parentHeight } =
    useFunctionalitySignElementWidth(wrapRef) //获取父元素的宽度
  return (
    <Box
      ref={wrapRef}
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <FunctionalityCommonPdfViewVirtualScrollMain
        file={file}
        viewWidth={parentWidth - 10}
        viewHeight={parentHeight - 5}
        isShowBottomOperation={true}
        onViewInfo={(info) => {}}
        onReadPDFState={(state) => {
          if (state === 'error') {
            //TODO: 读取PDF失败
          }
        }}
        onDocumentLoadSuccess={(info) => {}}
      >
        {(props) => {
          return (
            <Box
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <FunctionalityCommonPdfViewPage
                pdfInfo={props.pdfInfo}
                index={props.index}
              />

              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  zIndex: 999,
                  width: '100%',
                  height: '100%',
                }}
              >
                <FunctionalityCommonOperateFabricCanvas
                  defaultWidth={parentWidth}
                  canvasScale={props.pdfInfo.height / props.pdfInfo.width}
                />
              </div>
            </Box>
          )
        }}
      </FunctionalityCommonPdfViewVirtualScrollMain>
    </Box>
  )
}
export default FunctionalityCommonOperatePdfToolViewMain
