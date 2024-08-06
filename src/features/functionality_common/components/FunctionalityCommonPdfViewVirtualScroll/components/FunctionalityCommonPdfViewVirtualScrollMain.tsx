import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { Box, IconButton, Stack, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { VariableSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'

import AppLoadingLayout from '@/features/common/components/AppLoadingLayout'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

import { FunctionalityCommonElementSize } from '../hooks/FunctionalityCommonElementSize'
import useChatPdfContainerGetInfo, {
  IChatPdfContainerPdfInfo,
} from '../hooks/usePdfViewContainerGetInfo'
import useChatPdfListZoom from '../hooks/usePdfViewListZoom'
import useChatPdfScrollPagination from '../hooks/usePdfViewScrollPagination'
import FunctionalityCommonPdfViewVirtualScrollIcon from './FunctionalityCommonPdfViewVirtualScrollIcon'
export interface IFunctionalityCommonVirtualScrollingMainHandles {
  scrollListRef: any
}
export type IFunctionalityCommonVirtualScrollingPdfInfo = {
  viewScale: number
  pdfViewScale: number //暂时废弃，并不准确后需优化
} & IChatPdfContainerPdfInfo
interface IFunctionalityCommonVirtualScrollingMainProps {
  file: File
  viewWidth: number //视图宽度
  viewHeight: number //视图高度
  isSelfAdaptionSize?: boolean //是否自适应父级高宽
  isShowBottomOperation?: boolean //废弃使用效果不佳
  onDocumentLoadSuccess?: (data: { numPages: number; document: any }) => void //pdf加载成功返回的数据
  onReadPDFState?: (
    state: 'error' | 'load' | 'success',
    message?: string,
  ) => void //pdf加载状态
  onViewInfo?: (data: {
    currentPage: number
    scaleNumber: number
    isSelfAdaption: boolean
    currentScrollOffset: number
  }) => void //pdf视图信息
  children: (props: {
    pdfInfo: IFunctionalityCommonVirtualScrollingPdfInfo
    index: number
  }) => React.ReactNode
  bgcolor?: string
  defaultZoom?: number //默认缩放比例
}
//PDF的显示视图
const FunctionalityCommonVirtualScrollingMain: ForwardRefRenderFunction<
  IFunctionalityCommonVirtualScrollingMainHandles,
  IFunctionalityCommonVirtualScrollingMainProps
> = (
  {
    file,
    viewWidth,
    viewHeight,
    children,
    isShowBottomOperation = true,
    onDocumentLoadSuccess,
    onViewInfo,
    isSelfAdaptionSize = false,
    onReadPDFState,
    bgcolor = '#f2f2f2',
    defaultZoom = 0.7,
  },
  handleRef,
) => {
  const { t } = useTranslation()
  const isMobile = useFunctionalityCommonIsMobile()
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [currentScrollOffset, setCurrentScrollOffset] = useState<number>(0)
  const [scrollTime, setScrollTime] = useState(0)
  const { elementWidth, elementHeight } = FunctionalityCommonElementSize(
    isSelfAdaptionSize,
    wrapRef,
  )
  const wrapBoxWidth = elementWidth || viewWidth || 500
  const wrapBoxHeight = elementHeight || viewHeight || 500
  const [isScrollShowButtonOperation, setIsScrollShowButtonOperation] =
    useState(false) //是否显示滚动显示底部操作
  const [isFocusInput, setIsFocusInput] = useState(false)
  const scrollListRef = useRef<any>(null)
  const pdfPageRefs = useRef<HTMLElement[]>([])
  const { scaleNumber, onChangeZoom, onSelfAdaption } = useChatPdfListZoom({
    max: 1.5,
    min: 0.5,
    defaultZoom: defaultZoom,
  }) //简单的缩放逻辑
  const isSelfAdaption = scaleNumber === 1
  const {
    pdfNumPages,
    pdfInfoList,
    pdfDocument,
    pdfIsLoadingObj,
    onLoadRangeData,
    isPdfLoading,
    errorMessage,
  } = useChatPdfContainerGetInfo({
    pdfFile: file,
    onDocumentLoadSuccess,
    onReadPDFState,
  })
  useImperativeHandle(
    handleRef,
    () => ({
      scrollListRef: scrollListRef,
    }),
    [],
  )
  useEffect(() => {
    let interval = -1
    const checkScrollTime = () => {
      setIsScrollShowButtonOperation(scrollTime + 3000 > new Date().valueOf())
    }
    checkScrollTime()
    interval = window.setInterval(checkScrollTime, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [scrollTime])
  const actualSizeList = useMemo(() => {
    //计算缩放比例,适配分页逻辑
    return pdfInfoList.map((item) => {
      if (item) {
        const viewScale = (wrapBoxWidth / item.width) * scaleNumber
        return {
          actualWidth: item.width * viewScale,
          actualHeight: item.height * viewScale,
        }
      }
      return item
    })
  }, [pdfInfoList, wrapBoxWidth])
  const { currentPage } = useChatPdfScrollPagination(
    pdfNumPages || 0,
    currentScrollOffset,
    actualSizeList,
    scrollListRef,
    wrapBoxHeight,
  ) //滚动分页
  useEffect(() => {
    setIsFocusInput(false)
  }, [currentPage])
  useEffect(() => {
    onViewInfo &&
      onViewInfo({
        currentPage,
        scaleNumber,
        isSelfAdaption,
        currentScrollOffset,
      })
  }, [
    currentPage,
    currentScrollOffset,
    isSelfAdaption,
    onViewInfo,
    scaleNumber,
  ])
  useEffect(() => {
    if (scrollListRef.current) {
      scrollListRef.current.resetAfterIndex(0) // 自动重置缓存
    }
  }, [scaleNumber, viewHeight, viewWidth])
  const isItemLoaded = useCallback(
    (index) => {
      return !!pdfIsLoadingObj[index]
    },
    [pdfIsLoadingObj],
  )
  const newPdfInfoList = useMemo(() => {
    return pdfInfoList.map((pdfInfoItem) => {
      const viewScale = pdfInfoItem.width / wrapBoxWidth //计算缩放比例
      return pdfInfoItem
        ? {
            viewScale: scaleNumber,
            pdfViewScale: viewScale,
            children: children,
            ...pdfInfoItem,
          }
        : undefined
    })
  }, [pdfInfoList, wrapBoxWidth, scaleNumber, children])
  const estimatedItemSize = useMemo(() => {
    return newPdfInfoList?.[1]?.height || 500
  }, [newPdfInfoList])
  const scrollItemHeight = useCallback(
    (index: number) => {
      //计算每个pdf的高度，给react-window使用
      const currentViewport = newPdfInfoList[index] //如数据没有加载就用第一个的viewport
      if (currentViewport) {
        const viewScale = (wrapBoxWidth / currentViewport.width) * scaleNumber //计算缩放比例
        return (
          currentViewport.height * viewScale +
          5 +
          (index === pdfNumPages - 1 ? (isMobile ? 30 : 60) : 0)
        )
      } else {
        return newPdfInfoList?.[0]?.height || 200
      }
    },
    [newPdfInfoList, wrapBoxWidth, scaleNumber, pdfNumPages, isMobile],
  )
  useEffect(() => {
    if (scrollListRef.current) {
      scrollListRef.current.resetAfterIndex(0) // 自动重置缓存
    }
  }, [scaleNumber, wrapBoxHeight, wrapBoxWidth, newPdfInfoList])

  const CurrentPage = useCallback(({ index, style, data }) => {
    const info = data[index]
    return (
      <div
        style={style}
        key={index}
        className='functionality-sign-pdf-scroll-pagination-page-item'
        data-index={index}
        ref={(element) => element && (pdfPageRefs.current[index] = element)}
      >
        <Box
          sx={{
            height: '100%',
            width: `${100 * (info?.viewScale || 1)}%`,
            margin: '0 auto',
          }}
        >
          {info?.children &&
            info.children({
              pdfInfo: info,
              index: index,
            })}
        </Box>
      </div>
    )
  }, [])

  const VariableSizeListElement = useCallback(
    (onItemsRendered?: any, infiniteLoaderRef?: any) => {
      //虚拟滚动
      //可以传入onItemsRendered infiniteLoaderRef 开始滚动加载
      return (
        <VariableSizeList
          className='pdf-list-scroll functionality-common-pdf-rolling-view'
          height={wrapBoxHeight} // 设置 List 高度为浏览器窗口高度
          itemCount={pdfNumPages} // 项目总数
          onScroll={(event) => {
            console.log('eventevent', event)
            setScrollTime(new Date().valueOf())
            setCurrentScrollOffset(event.scrollOffset)
          }}
          ref={(listRef) => {
            scrollListRef.current = listRef
            if (infiniteLoaderRef) {
              infiniteLoaderRef(listRef)
            }
          }}
          estimatedItemSize={estimatedItemSize} // 估计每项的高度
          itemSize={scrollItemHeight} // 每项的高度，根据你每个 PDF 页面的实际高度作调整
          width={wrapBoxWidth} //宽度
          itemData={newPdfInfoList}
          onItemsRendered={onItemsRendered}
          style={{ overflowX: 'auto' }}
        >
          {CurrentPage}
        </VariableSizeList>
      )
    },
    [
      wrapBoxHeight,
      pdfNumPages,
      estimatedItemSize,
      scrollItemHeight,
      wrapBoxWidth,
      newPdfInfoList,
      CurrentPage,
    ],
  )
  const InfiniteLoaderElement = useMemo(
    () => (
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={pdfNumPages} // 设置列表项目总数
        loadMoreItems={onLoadRangeData}
        minimumBatchSize={5} // 设置每次加载的数据量为5
        threshold={2} // 设置触发加载的临界值
      >
        {({ onItemsRendered, ref: infiniteLoaderRef }) =>
          VariableSizeListElement(onItemsRendered, infiniteLoaderRef)
        }
      </InfiniteLoader>
    ),
    [VariableSizeListElement, isItemLoaded, onLoadRangeData, pdfNumPages],
  )
  //输入页数跳转
  const onTextInputKeyDown = (event) => {
    if (event.key === 'Enter' || event.code === 'Enter') {
      const value = event.target.value
      if (value) {
        const num = Number(value)
        if (num > 0 && num <= (pdfNumPages || 0)) {
          scrollListRef.current.scrollToItem(num - 1, 'start')
        }
      }
    }
  }
  //下面的虚拟列表可以开始渲染要素
  //有当前的Conversation  有pdfDocument  有pdfNumPages
  //如果没有上面的开始渲染，抓取分页数据，就拿取不到，自然就空白页面了
  return (
    <Box
      ref={wrapRef}
      sx={{
        height: isSelfAdaptionSize ? '100%' : wrapBoxHeight,
        width: isSelfAdaptionSize ? '100%' : wrapBoxWidth,
        color: '#000',
        overflow: 'hidden',
        bgcolor: bgcolor,
        position: 'relative',
      }}
    >
      {errorMessage && (
        <Stack alignItems='center' justifyContent='center' mt={5}>
          {errorMessage}
        </Stack>
      )}
      {!errorMessage && (
        <AppLoadingLayout
          loading={!pdfDocument || !pdfNumPages || isPdfLoading}
        >
          <Box>
            <Box
              sx={{
                height: wrapBoxHeight,
                position: 'relative',
                width: wrapBoxWidth,
                bgcolor: bgcolor,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid #f2f2f2',
                }}
              >
                {InfiniteLoaderElement}
              </div>
            </Box>
            {/* 下面是底部分页工具 */}
            {isShowBottomOperation && (
              <Stack
                direction='row'
                className='functionality-sign-pdf-scroll-pagination'
                justifyContent='center'
                sx={{
                  position: 'absolute',
                  margin: '0 auto',
                  padding: 1,
                  bottom: 10,
                  left: '10%',
                  p: 1,
                  zIndex: 1000,
                  width: '80%',
                  height: isMobile ? 40 : 60,
                  '&:hover': {
                    '>div': {
                      display: 'flex',
                    },
                  },
                }}
              >
                <Stack
                  direction='row'
                  alignItems='center'
                  gap={1}
                  sx={{
                    bgcolor: '#ffffff',
                    display:
                      isMobile || isScrollShowButtonOperation || isFocusInput
                        ? 'flex'
                        : 'none',
                    p: 1,
                    borderRadius: 2,
                  }}
                >
                  <IconButton
                    size='small'
                    onClick={() => {
                      scrollListRef.current.scrollToItem(
                        currentPage - 1,
                        'start',
                      )
                    }}
                    disabled={currentPage === 0}
                  >
                    <FunctionalityCommonPdfViewVirtualScrollIcon name='ArrowBackIos' />
                  </IconButton>
                  <TextField
                    onKeyDown={onTextInputKeyDown}
                    sx={{
                      width: 50,
                      ' input': {
                        textAlign: 'center',
                        fontSize: '14px!important',
                        padding: '5px',
                      },
                    }}
                    hiddenLabel
                    key={currentPage}
                    onFocus={() => {
                      setIsFocusInput(true)
                    }}
                    onBlur={() => {
                      setIsFocusInput(false)
                    }}
                    defaultValue={currentPage + 1}
                    variant='filled'
                    size='small'
                  />
                  <IconButton
                    disabled={currentPage === (pdfNumPages || 0) - 1}
                    size='small'
                    onClick={() => {
                      scrollListRef.current.scrollToItem(
                        currentPage + 1,
                        'start',
                      )
                    }}
                  >
                    <FunctionalityCommonPdfViewVirtualScrollIcon name='ArrowForwardIos' />
                  </IconButton>
                  <Stack
                    sx={{
                      borderRight: '1px solid #e8e8e8',
                      height: '100%',
                      pr: 2,
                    }}
                    direction='row'
                    alignItems='center'
                  >
                    {t(
                      'functionality__sign_pdf:components__sign_pdf__operation_view__of',
                      {
                        NUMBER: pdfNumPages,
                      },
                    )}
                  </Stack>

                  <IconButton size='small' onClick={onSelfAdaption}>
                    <FunctionalityCommonPdfViewVirtualScrollIcon
                      name={
                        isSelfAdaption
                          ? 'ZoomInMapOutlined'
                          : 'ZoomOutMapOutlined'
                      }
                    />
                  </IconButton>

                  <IconButton
                    size='small'
                    onClick={() => onChangeZoom('reduce')}
                  >
                    <FunctionalityCommonPdfViewVirtualScrollIcon name='RemoveCircleOutlineOutlined' />
                  </IconButton>
                  <IconButton size='small' onClick={() => onChangeZoom('add')}>
                    <FunctionalityCommonPdfViewVirtualScrollIcon name='AddCircleOutlineOutlined' />
                  </IconButton>
                </Stack>
              </Stack>
            )}
          </Box>
        </AppLoadingLayout>
      )}
    </Box>
  )
}
export default forwardRef(FunctionalityCommonVirtualScrollingMain)
