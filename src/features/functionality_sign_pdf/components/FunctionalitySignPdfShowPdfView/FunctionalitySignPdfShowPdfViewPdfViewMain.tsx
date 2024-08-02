import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { Box, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import FunctionalityCommonPdfViewPage from '@/features/functionality_common/components/FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewPage'
import FunctionalityCommonVirtualScrollingMain, {
  IFunctionalityCommonVirtualScrollingMainHandles,
} from '@/features/functionality_common/components/FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewVirtualScrollMain'
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool'

import { useFunctionalitySignElementWidth } from '../../hooks/useFunctionalitySignElementWidth'
import { getWrapElementCenterRelativeToRollingElement } from '../../utils/canvasTools'
import FunctionalitySignPdfShowPdfViewDroppable from './FunctionalitySignPdfDroppable'
import FunctionalitySignPdfShowPdfViewRenderCanvas, {
  ICanvasObjectData,
  IFunctionalitySignPdfShowPdfCanvasHandles,
} from './FunctionalitySignPdfShowPdfViewRenderCanvas'

export interface IFunctionalitySignPdfShowPdfViewHandles {
  discardAllActiveObject: () => void
  getNumPages: () => number
  saveCanvasBase64List: () => void
  onAddObject?: (
    canvasObject: ICanvasObjectData & { pdfIndex?: number },
  ) => void
}

interface IFunctionalitySignPdfShowPdfViewProps {
  file: File
  isShowBottomOperation: boolean
  onClearReturn: () => void
}
/**
 * 签名PDF处的视图
 */
export const FunctionalitySignPdfShowPdfViewPdfViewMain: ForwardRefRenderFunction<
  IFunctionalitySignPdfShowPdfViewHandles,
  IFunctionalitySignPdfShowPdfViewProps
> = ({ file, isShowBottomOperation, onClearReturn }, handleRef) => {
  const { t } = useTranslation()

  const pdfPageRefs = useRef<HTMLElement[]>([])
  const wrapRef = useRef<HTMLElement>(null)

  const scrollRef =
    useRef<IFunctionalityCommonVirtualScrollingMainHandles | null>(null)
  const scrollListRef = useMemo(
    () => scrollRef?.current?.scrollListRef.current._outerRef,
    [scrollRef],
  )

  const canvasHandlesRefs = useRef<IFunctionalitySignPdfShowPdfCanvasHandles[]>(
    [],
  )
  const [currentPage, setCurrentPage] = useState<number>(0) //当前页数
  const [scaleNumber, setScaleNumber] = useState<number>(0) //当前页数
  const [currentScrollOffset, setCurrentScrollOffset] = useState<number>(0)
  const [numPages, setNumPages] = useState<number>(0) //PDF的总页数

  const { width: parentWidth, height: parentHeight } =
    useFunctionalitySignElementWidth(wrapRef) //获取父元素的宽度

  useImperativeHandle(
    handleRef,
    () => ({
      discardAllActiveObject: () => {
        if (canvasHandlesRefs.current) {
          canvasHandlesRefs.current.forEach((canvasHandlesRef) => {
            canvasHandlesRef.discardActiveObject()
          })
        }
      },
      saveCanvasBase64List: () => {
        if (canvasHandlesRefs.current) {
          canvasHandlesRefs.current.forEach((canvasHandlesRef) => {
            canvasHandlesRef.saveCanvasBase64()
          })
        }
      },
      getNumPages: () => numPages,
      onAddObject: (value) => {
        //添加对象
        let isAutoObjectSizePosition = false
        if ((!value.x || !value.y) && scrollRef.current) {
          // 如果没有指定位置，则添加到滚动视图中心
          const scrollDom = document.querySelector(
            '.functionality-common-pdf-rolling-view',
          ) as HTMLElement
          if (scrollDom) {
            const { positionInRollingX, positionInRollingY } =
              getWrapElementCenterRelativeToRollingElement(
                scrollDom,
                pdfPageRefs.current[currentPage],
                currentScrollOffset,
              )
            value.x = positionInRollingX
            value.y = positionInRollingY
            isAutoObjectSizePosition = true
          }
        }

        const currentNumber =
          value.pdfIndex !== undefined ? value.pdfIndex : currentPage
        if (currentNumber !== undefined) {
          //添加对象
          const onAddObject =
            canvasHandlesRefs.current[currentNumber]?.onAddObject
          if (onAddObject) {
            onAddObject(value, undefined, isAutoObjectSizePosition)
          }
        }
      },
    }),
    [numPages, currentPage, scrollListRef, currentScrollOffset],
  )
  return (
    <Stack
      ref={wrapRef}
      sx={{
        width: '100%',
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
      }}
      className='functionality-sign-pdf-show-pdf-view-main'
    >
      <Box
        sx={{
          width: parentWidth - 15, //-15是因为滚动条导致的横向滚动条出现
          margin: '0 auto',
          ' .functionality-common-pdf-rolling-view': {
            willChange: 'unset!important', //影响了选中工具的位置显示逻辑
          },
        }}
      >
        <FunctionalityCommonVirtualScrollingMain
          file={file}
          ref={scrollRef}
          viewWidth={parentWidth - 10}
          viewHeight={parentHeight - 5}
          isShowBottomOperation={isShowBottomOperation}
          onViewInfo={(info) => {
            setCurrentPage(info.currentPage)
            setScaleNumber(info.scaleNumber)
            setCurrentScrollOffset(info.currentScrollOffset)
          }}
          onReadPDFState={(state) => {
            if (state === 'error') {
              //TODO: 读取PDF失败
              onClearReturn()
              functionalityCommonSnackNotifications(
                `${t(
                  'functionality__common:components__common__pdf_encryption_tip',
                )}`,
              )
            }
          }}
          onDocumentLoadSuccess={(info) => {
            setNumPages(info.numPages)
          }}
        >
          {(props) => {
            // const proportion = (parentWidth - 10) / props.pdfInfo?.width
            // console.log('proportion', proportion)
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
                  key={props.index}
                  ref={(element) =>
                    element && (pdfPageRefs.current[props.index] = element)
                  }
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
                  <FunctionalitySignPdfShowPdfViewDroppable index={props.index}>
                    <Box
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        marginBottom: 3,
                        '.react-pdf__Page__canvas': {
                          width: `100%!important`,
                          height: 'auto!important',
                        },
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          zIndex: 9,
                        }}
                      >
                        <FunctionalitySignPdfShowPdfViewRenderCanvas
                          canvasIndex={props.index}
                          scaleNumber={scaleNumber}
                          topScrollKey={currentScrollOffset}
                          canvasNumber={numPages}
                          ref={(el) => {
                            if (el) {
                              canvasHandlesRefs.current[props.index] = el
                            }
                          }}
                          addIndexObject={(object, index) => {
                            if (!canvasHandlesRefs.current[index]) return
                            const addObjectFunction =
                              canvasHandlesRefs.current[index].onAddObject
                            if (addObjectFunction) {
                              addObjectFunction(undefined, object)
                            }
                          }}
                          sizeInfo={{
                            width: props.pdfInfo?.width * 3,
                            height: props.pdfInfo?.height * 3,
                          }}
                        />
                      </Box>
                    </Box>
                  </FunctionalitySignPdfShowPdfViewDroppable>
                </div>
              </Box>
            )
          }}
        </FunctionalityCommonVirtualScrollingMain>
      </Box>
    </Stack>
  )
}
export default forwardRef(FunctionalitySignPdfShowPdfViewPdfViewMain)
