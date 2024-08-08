import { Box } from '@mui/material'
import Head from 'next/head'
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { useFunctionalityCommonElementSize } from '@/features/functionality_common/hooks/useFunctionalityCommonElementSize'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

import FunctionalityCommonPdfViewPage from '../../FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewPage'
import FunctionalityCommonPdfViewVirtualScrollMain from '../../FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewVirtualScrollMain'
import { currentScrollOffsetRecoil } from '../store'
import {
  fabricCanvasJsonStringListRecoil,
  fabricCanvasSignObjectListRecoil,
} from '../store/setOperateFabricCanvas'
import { textAnnotatorRecoilList } from '../store/setTextContentAnnotator'
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
  const isMobile = useFunctionalityCommonIsMobile()

  const scrollPositionNumber = useRecoilValue(currentScrollOffsetRecoil)
  const [, setTextAnnotatorList] = useRecoilState(textAnnotatorRecoilList)
  const [, setFabricCanvasSignObjectList] = useRecoilState(
    fabricCanvasSignObjectListRecoil,
  )
  const [, setFabricCanvasJsonStringList] = useRecoilState(
    fabricCanvasJsonStringListRecoil,
  )
  const setScrollPositionNumber = useSetRecoilState(currentScrollOffsetRecoil)
  const initEventEmitter = useRef(false)
  const [currentPage, setCurrentPage] = React.useState(0)
  const [numberPage, setNumberPage] = React.useState(0)
  useEffect(() => {
    setTextAnnotatorList([])
    setFabricCanvasJsonStringList([])
    setFabricCanvasSignObjectList([])
    if (isMobile) {
      document.addEventListener('contextmenu', function (e) {
        e.preventDefault() // 禁用右键菜单
      })

      document.addEventListener('touchstart', function (e) {
        // 处理触摸事件，防止长按
        if (e.touches.length > 1) return // 只处理单指触摸
        let touchTimer
        const longPressTime = 300 // 长按阈值时间

        const startTouch = () => {
          touchTimer = setTimeout(() => {
            e.preventDefault() // 清除长按默认事件
          }, longPressTime)
        }

        const endTouch = () => {
          clearTimeout(touchTimer) // 清除定时器
        }

        document.addEventListener('touchstart', startTouch)
        document.addEventListener('touchend', endTouch)

        // 移除事件监听
        document.addEventListener('touchcancel', endTouch)
      })
    }
  }, [])
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
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Concert+One&family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Dancing+Script:wght@400..700&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=La+Belle+Aurore&family=Lobster&family=Ma+Shan+Zheng&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Orbitron:wght@400..900&family=Oswald:wght@200..700&family=Pacifico&family=Permanent+Marker&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Teko:wght@300..700&family=Zeyada&display=swap'
          rel='stylesheet'
        />
        {/* 下面是为了 手机端不让下拉刷新跟事件冲突 */}
        {isMobile && (
          <style>{`
       html, body {
    overscroll-behavior-y: none; /* 保持内容不滚动 */
     overscroll-behavior: contain;
    -webkit-overflow-scrolling: auto;
    -webkit-user-select: none; /* Prevents text selection */
  -webkit-touch-callout: none; /* Prevents callout menu to appear */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* Prevents tap highlight color */
}
      `}</style>
        )}
      </Head>
      <FunctionalityCommonPdfViewVirtualScrollMain
        file={file}
        viewWidth={parentWidth - 10}
        viewHeight={parentHeight - 5}
        isShowBottomOperation={isShowBottomOperation}
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
