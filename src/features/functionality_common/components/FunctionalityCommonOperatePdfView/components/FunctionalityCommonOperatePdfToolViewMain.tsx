import { Box } from '@mui/material'
import React, { FC, useEffect, useRef } from 'react'

import { useFunctionalitySignElementWidth } from '@/features/functionality_sign_pdf/hooks/useFunctionalitySignElementWidth'

import FunctionalityCommonPdfViewPage from '../../FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewPage'
import FunctionalityCommonPdfViewVirtualScrollMain from '../../FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewVirtualScrollMain'
import eventEmitter, {
  eventEmitterAddFabricCanvasKey,
  eventEmitterAddFabricIndexCanvas,
} from '../utils/eventEmitter'
import FunctionalityCommonOperateFabricCanvas, {
  IFunctionalityCommonOperateFabricCanvasHandles,
} from './FunctionalityCommonOperateCanvas/FunctionalityCommonOperateFabricCanvas'
import FunctionalityCommonOperateDroppable from './FunctionalityCommonOperateDroppable'
interface FunctionalityCommonOperatePdfToolViewMainProps {
  file: File
  isShowBottomOperation: boolean
}
const FunctionalityCommonOperatePdfToolViewMain: FC<
  FunctionalityCommonOperatePdfToolViewMainProps
> = ({ file, isShowBottomOperation }) => {
  const initEventEmitter = useRef(false)
  const [currentPage, setCurrentPage] = React.useState(0)
  const wrapRef = useRef<HTMLElement>(null)
  const canvasHandlesRefs = useRef<
    IFunctionalityCommonOperateFabricCanvasHandles[]
  >([])
  const { width: parentWidth, height: parentHeight } =
    useFunctionalitySignElementWidth(wrapRef) //获取父元素的宽度
  useEffect(() => {
    //事件转发
    if (initEventEmitter.current) return
    initEventEmitter.current = true
    const forwardData = (data) => {
      eventEmitterAddFabricIndexCanvas(currentPage, data)
    }
    eventEmitter.off(eventEmitterAddFabricCanvasKey, forwardData)
    eventEmitter.on(eventEmitterAddFabricCanvasKey, forwardData)
  }, [currentPage])
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
        onViewInfo={(info) => {
          if (info.currentPage !== currentPage) {
            initEventEmitter.current = false
            setCurrentPage(info.currentPage)
          }
        }}
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
              <FunctionalityCommonOperateDroppable pdfIndex={props.index}>
                <FunctionalityCommonPdfViewPage
                  pdfInfo={props.pdfInfo}
                  index={props.index}
                />
              </FunctionalityCommonOperateDroppable>

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
                  defaultWidth={props.pdfInfo.width * 2}
                  index={props.index}
                  pdfViewScale={props.pdfInfo.pdfViewScale}
                  canvasScale={props.pdfInfo.height / props.pdfInfo.width}
                  ref={(el) => {
                    if (el) {
                      canvasHandlesRefs.current[props.index] = el
                    }
                  }}
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
