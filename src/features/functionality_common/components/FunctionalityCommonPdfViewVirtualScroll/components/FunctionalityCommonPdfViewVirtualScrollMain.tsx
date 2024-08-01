/* eslint-disable no-debugger */
// import 'pdfjs-dist/web/pdf_viewer.css'

import { Box, IconButton, Stack, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { VariableSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'

import AppLoadingLayout from '@/features/common/components/AppLoadingLayout'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'
import { useFunctionalitySignElementWidth } from '@/features/functionality_sign_pdf/hooks/useFunctionalitySignElementWidth'

import useChatPdfContainerGetInfo from '../hooks/usePdfViewContainerGetInfo'
import useChatPdfListZoom from '../hooks/usePdfViewListZoom'
import useChatPdfScrollPagination from '../hooks/usePdfViewScrollPagination'
import FunctionalityCommonPdfViewVirtualScrollIcon from './FunctionalityCommonPdfViewVirtualScrollIcon'

interface IPdfContainerMainProps {
  file: File
  viewWidth: number
  viewHeight: number
  children: (props: { pdfInfo: any; index: number }) => React.ReactNode
  isShowBottomOperation?: boolean
}
//PDF的显示视图
const FunctionalityCommonVirtualScrollingMain: FC<IPdfContainerMainProps> = ({
  file,
  viewWidth,
  viewHeight,
  children,
  isShowBottomOperation,
}) => {
  const [value, setValue] = useState<string>('')

  const { t } = useTranslation()
  const isMobile = useFunctionalityCommonIsMobile()
  const [currentScrollOffset, setCurrentScrollOffset] = useState<number>(0)

  const scrollListRef = useRef<any>(null)
  const pdfPageRefs = useRef<HTMLElement[]>([])
  const { scaleNumber, onChangeZoom, onSelfAdaption } = useChatPdfListZoom() //简单的缩放逻辑
  const isSelfAdaption = scaleNumber === 1
  const {
    pdfNumPages,
    pdfInfoList,
    pdfDocument,
    pdfTextContentList,
    pdfIsLoadingObj,
    onLoadRangeData,
    loadingProgress,
    chatPdfStatus,
    errorMessage,
  } = useChatPdfContainerGetInfo({
    pdfFile: file,
  })
  const actualSizeList = useMemo(() => {
    //计算缩放比例,适配分页逻辑
    return pdfInfoList.map((item) => {
      if (item) {
        const viewScale = (viewWidth / item.width) * scaleNumber
        return {
          actualWidth: item.width * viewScale,
          actualHeight: item.height * viewScale,
        }
      }
      return item
    })
  }, [pdfInfoList, viewWidth])
  const { currentPage } = useChatPdfScrollPagination(
    pdfNumPages || 0,
    currentScrollOffset,
    actualSizeList,
    '.pdf-list-scroll',
    viewHeight,
  ) //滚动分页
  const { ref: rollingRef, width: parentWidth } =
    useFunctionalitySignElementWidth() //获取父元素的宽度

  const isItemLoaded = (index) => {
    return !!pdfIsLoadingObj[index]
  }
  const newPdfInfoList = useMemo(() => {
    return pdfInfoList.map((pdfInfoItem) => {
      return pdfInfoItem
        ? {
            viewScale: scaleNumber,
            children: children,
            ...pdfInfoItem,
          }
        : undefined
    })
  }, [pdfInfoList, scaleNumber, children])
  const scrollItemHeight = useCallback(
    (index: number) => {
      //计算每个pdf的高度，给react-window使用
      const currentViewport = newPdfInfoList[index] //如数据没有加载就用第一个的viewport
      if (currentViewport) {
        const viewScale = (viewWidth / currentViewport.width) * scaleNumber //计算缩放比例
        return currentViewport.height * viewScale + 5
      } else {
        return newPdfInfoList?.[0]?.height || 200
      }
    },
    [newPdfInfoList, viewWidth, scaleNumber],
  )
  useEffect(() => {
    if (scrollListRef.current) {
      scrollListRef.current.resetAfterIndex(0) // 自动重置缓存
    }
  }, [scaleNumber, viewHeight, viewWidth, newPdfInfoList, value])
  const CurrentPage = useCallback(({ index, style, data }) => {
    const info = data[index]
    return (
      <div
        style={style}
        key={index}
        ref={(element) => element && (pdfPageRefs.current[index] = element)}
      >
        <Stack alignItems='center'>
          <Box
            sx={{
              height: '100%',
              width: `${100 * (info?.viewScale || 1)}%`,
            }}
          >
            {info?.children &&
              info.children({
                pdfInfo: info,
                index: index,
              })}
          </Box>
        </Stack>
      </div>
    )
  }, [])
  const VariableSizeListElement = useCallback(
    (onItemsRendered?: any, infiniteLoaderRef?: any) => {
      //虚拟滚动
      //可以传入onItemsRendered infiniteLoaderRef 开始滚动加载
      return (
        <VariableSizeList
          className='pdf-list-scroll'
          height={viewHeight} // 设置 List 高度为浏览器窗口高度
          itemCount={pdfNumPages} // 项目总数
          onScroll={(event) => {
            setCurrentScrollOffset(event.scrollOffset)
          }}
          ref={(listRef) => {
            scrollListRef.current = listRef
            if (infiniteLoaderRef) {
              infiniteLoaderRef(listRef)
            }
          }}
          itemSize={scrollItemHeight} // 每项的高度，根据你每个 PDF 页面的实际高度作调整
          width={viewWidth} //宽度
          itemData={newPdfInfoList}
          onItemsRendered={onItemsRendered}
          style={{ overflowX: 'auto' }}
        >
          {CurrentPage}
        </VariableSizeList>
      )
    },
    [
      viewHeight,
      pdfNumPages,
      scrollItemHeight,
      viewWidth,
      newPdfInfoList,
      CurrentPage,
    ],
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
      sx={{
        height: viewHeight,
        width: viewWidth,
        color: '#000',
        overflow: 'hidden',
        bgcolor: '#f2f2f2',
      }}
    >
      <AppLoadingLayout loading={!pdfDocument || !pdfNumPages}>
        <Box ref={rollingRef}>
          <Box
            sx={{
              height: viewHeight,
              position: 'relative',
              width: viewWidth,
              bgcolor: '#f2f2f2',
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
            </div>
          </Box>
          {/* 下面是底部分页工具 */}
          <Stack
            direction='row'
            className='functionality-sign-pdf-scroll-pagination'
            justifyContent='center'
            sx={{
              position: 'absolute',
              margin: '0 auto',
              padding: 1,
              bottom: 10,
              left: 0,
              right: 0,
              p: 1,
              zIndex: 99,
              width: '100%',
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
                display: isMobile && isShowBottomOperation ? 'flex' : 'none',
                p: 1,
                borderRadius: 2,
              }}
            >
              <IconButton
                size='small'
                onClick={() => {
                  scrollListRef.current.scrollToItem(currentPage - 1, 'start')
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

                    ...(isMobile
                      ? {
                          padding: '5px',
                        }
                      : {}),
                  },
                }}
                hiddenLabel
                key={currentPage}
                defaultValue={currentPage + 1}
                variant='filled'
                size='small'
              />
              <IconButton
                disabled={currentPage === (pdfNumPages || 0) - 1}
                size='small'
                onClick={() => {
                  scrollListRef.current.scrollToItem(currentPage + 1, 'start')
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
                    isSelfAdaption ? 'ZoomInMapOutlined' : 'ZoomOutMapOutlined'
                  }
                />
              </IconButton>

              <IconButton size='small' onClick={() => onChangeZoom('reduce')}>
                <FunctionalityCommonPdfViewVirtualScrollIcon name='RemoveCircleOutlineOutlined' />
              </IconButton>
              <IconButton size='small' onClick={() => onChangeZoom('add')}>
                <FunctionalityCommonPdfViewVirtualScrollIcon name='AddCircleOutlineOutlined' />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      </AppLoadingLayout>
    </Box>
  )
}
export default FunctionalityCommonVirtualScrollingMain
