import { Box } from '@mui/material'
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react'

import { useFunctionalitySignElementWidth } from '@/features/functionality_sign_pdf/hooks/useFunctionalitySignElementWidth'

import FunctionalityCommonPdfViewPage from '../../FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewPage'
import FunctionalityCommonPdfViewVirtualScrollMain from '../../FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewVirtualScrollMain'
import eventEmitter, {
  eventEmitterAddFabricCanvasKey,
  eventEmitterAddFabricIndexCanvas,
} from '../utils/eventEmitter'
import FunctionalityCommonOperateFabricCanvas, {
  IFunctionalityCommonOperateFabricCanvasHandles,
} from './FunctionalityCommonOperateCanvas/FunctionalityCommonOperateFabricCanvas/FunctionalityCommonOperateFabricCanvasMain'
import FunctionalityCommonTextContentPage from './FunctionalityCommonOperateCanvas/FunctionalityCommonTextContentPage/FunctionalityCommonTextContentPageMain'
import FunctionalityCommonOperateDroppable from './FunctionalityCommonOperateDroppable'
interface FunctionalityCommonOperatePdfToolViewMainProps {
  file: File
  isShowBottomOperation: boolean
  enableEditTypes?: ('annotator' | 'insert')[]
  currentEditType?: 'annotator' | 'insert' //一次之内操作一种类型
}
const FunctionalityCommonOperatePdfToolViewMain: FC<
  FunctionalityCommonOperatePdfToolViewMainProps
> = ({ file, isShowBottomOperation, enableEditTypes, currentEditType }) => {
  const initEventEmitter = useRef(false)
  const [currentPage, setCurrentPage] = React.useState(0)
  const [numberPage, setNumberPage] = React.useState(0)

  const definedEnableEditTypes = useMemo(
    () => enableEditTypes || ['annotator', 'insert'],
    [enableEditTypes],
  )

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
    eventEmitter.on(eventEmitterAddFabricCanvasKey, forwardData)
    return () => {
      eventEmitter.off(eventEmitterAddFabricCanvasKey, forwardData)
    }
  }, [currentPage])
  const isEnableType = useCallback(
    (type: 'annotator' | 'insert') => definedEnableEditTypes?.includes(type),
    [definedEnableEditTypes],
  )
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
        onDocumentLoadSuccess={(info) => {
          setNumberPage(info.numPages)
        }}
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
              {isEnableType('annotator') && (
                <Box
                  className='pdf-annotator-view'
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: currentEditType === 'annotator' ? 999 : 1,
                  }}
                >
                  <FunctionalityCommonTextContentPage
                    pdfInfo={props.pdfInfo}
                    index={props.index}
                    isEdit={currentEditType === 'annotator'}
                  ></FunctionalityCommonTextContentPage>
                </Box>
              )}
              {isEnableType('insert') && (
                <div
                  className='pdf-insert-view'
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: currentEditType === 'insert' ? 999 : 1,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <FunctionalityCommonOperateFabricCanvas
                    defaultWidth={props.pdfInfo.width * 2}
                    index={props.index}
                    canvasNumber={numberPage}
                    canvasScale={props.pdfInfo.height / props.pdfInfo.width}
                    ref={(el) => {
                      if (el) {
                        canvasHandlesRefs.current[props.index] = el
                      }
                    }}
                  />
                </div>
              )}
            </Box>
          )
        }}
      </FunctionalityCommonPdfViewVirtualScrollMain>
    </Box>
  )
}
export default FunctionalityCommonOperatePdfToolViewMain
