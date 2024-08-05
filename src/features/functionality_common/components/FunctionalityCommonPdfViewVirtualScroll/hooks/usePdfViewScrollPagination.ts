import { throttle } from 'lodash-es'
import { useCallback, useEffect, useState } from 'react'

const useChatPdfScrollPagination = (
  pageCount: number,
  currentScrollOffset: number, // 当前滚动条的位置
  pageSizes: { actualHeight: number }[], // 每页的高度
  scrollListRef: React.MutableRefObject<any>, // 滚动的class '.pdf-view-scroll'
  overallViewHeight: number, // 滚动div的高度
) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [scrollTime, setScrollTime] = useState(0)
  const [isScrollShow, setIsScrollShow] = useState(false)

  useEffect(() => {
    const checkScrollTime = () => {
      setIsScrollShow(scrollTime + 3000 > new Date().valueOf())
    }

    checkScrollTime()
    const interval = setInterval(checkScrollTime, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [scrollTime])

  const handleScroll = useCallback(
    throttle(() => {
      try {
        setScrollTime(new Date().valueOf())
        const allPageDomList = document.querySelectorAll(
          '.functionality-sign-pdf-scroll-pagination-page-item',
        ) as unknown as HTMLElement[]
        const viewportCenter = currentScrollOffset + overallViewHeight / 2
        for (let i = 0; i < allPageDomList.length; i++) {
          const domInfo = allPageDomList[i]
          const domStyleTop =
            Number(domInfo.style.top.replace('px', '')) + domInfo.clientHeight
          if (viewportCenter <= domStyleTop) {
            const index = domInfo.getAttribute('data-index')
            if (index) {
              setCurrentPage(parseInt(index))
            }
            break
          }
        }
      } catch (e) {
        console.log(e)
      }
    }, 1000),
    [currentScrollOffset, pageSizes, pageCount, overallViewHeight],
  )

  const scrollToPage = useCallback(
    (pageNum: number) => {
      scrollListRef.current.scrollToItem(pageNum - 1, 'start')
      scrollListRef.current.resetAfterIndex(0) // 自动重置缓存
    },
    [scrollListRef],
  )

  const goToNextPage = useCallback(() => {
    scrollToPage(currentPage + 1)
  }, [currentPage, scrollToPage])

  const goToPreviousPage = useCallback(() => {
    scrollToPage(currentPage - 1)
  }, [currentPage, scrollToPage])

  useEffect(() => {
    handleScroll() // 初始时计算当前页码
  }, [currentScrollOffset, handleScroll])

  return {
    isScrollShow,
    scrollTime,
    currentPage,
    scrollToPage,
    goToNextPage,
    goToPreviousPage,
  }
}
export default useChatPdfScrollPagination
