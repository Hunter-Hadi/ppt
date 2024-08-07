import { Box } from '@mui/material'
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { useFunctionalityCommonElementSize } from '@/features/functionality_common/hooks/useFunctionalityCommonElementSize'

import FunctionalityCommonPdfViewPage from '../../FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewPage'
import FunctionalityCommonPdfViewVirtualScrollMain from '../../FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewVirtualScrollMain'
import { currentScrollOffsetRecoil } from '../store'
import eventEmitter, {
  eventEmitterAddFabricCanvasKey,
  eventEmitterAddFabricIndexCanvas,
} from '../utils/FabricCanvas/eventEmitter'
import { getWrapElementCenterRelativeToRollingElement } from '../utils/FabricCanvas/getWrapElementCenterRelativeToRollingElement'
import FunctionalityCommonOperateFabricCanvas from './FunctionalityCommonOperateCanvas/FunctionalityCommonOperateFabricCanvas/FunctionalityCommonOperateFabricCanvasMain'
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
  const scrollPositionNumber = useRecoilValue(currentScrollOffsetRecoil)

  const setScrollPositionNumber = useSetRecoilState(currentScrollOffsetRecoil)
  const initEventEmitter = useRef(false)
  const [currentPage, setCurrentPage] = React.useState(0)
  const [numberPage, setNumberPage] = React.useState(0)

  const definedEnableEditTypes = useMemo(
    () => enableEditTypes || ['annotator', 'insert'],
    [enableEditTypes],
  )

  const wrapRef = useRef<HTMLElement>(null)

  const { width: parentWidth, height: parentHeight } =
    useFunctionalityCommonElementSize(wrapRef) //获取父元素的宽度
  useEffect(() => {
    //事件转发
    const forwardData = (...args) => {
      console.log('test args', args)
      if (args[0]) {
        const scrollDom = document.querySelector(
          '.pdf-list-scroll',
        ) as HTMLElement
        const wrapElement = document.querySelector(
          '.pdf-tool-page-view-' + currentPage,
        ) as HTMLElement
        if (scrollDom) {
          //添加用户看到的视图中间
          const { positionInRollingX, positionInRollingY } =
            getWrapElementCenterRelativeToRollingElement(
              scrollDom,
              wrapElement,
              scrollPositionNumber,
            )
          args[0].x = positionInRollingX
          args[0].y = positionInRollingY
        }
      }

      eventEmitterAddFabricIndexCanvas(currentPage, ...args)
    }
    eventEmitter.on(eventEmitterAddFabricCanvasKey, forwardData)
    return () => {
      eventEmitter.off(eventEmitterAddFabricCanvasKey, forwardData)
    }
  }, [currentPage, scrollPositionNumber])
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
          setScrollPositionNumber(info.currentScrollOffset)
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
              className={'pdf-tool-page-view-' + props.index}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                userSelect: currentEditType === 'annotator' ? 'auto' : 'none',
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
                    ' > div, >span': {
                      zIndex: currentEditType === 'annotator' ? 999 : 1,
                    },
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
