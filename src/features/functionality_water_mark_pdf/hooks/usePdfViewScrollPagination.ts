import { useCallback, useEffect, useState } from 'react';

const useChatPdfScrollPagination = (
  pageCount: number,
  currentScrollOffset: number, // 当前滚动条的位置
  pageSizes: { actualHeight: number }[], // 每页的高度
  scrollClass: string, // 滚动的class '.pdf-view-scroll'
  overallViewHeight: number, // 滚动div的高度
) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollTime, setScrollTime] = useState(0);
  const [isScrollShow, setIsScrollShow] = useState(false);

  useEffect(() => {
    const checkScrollTime = () => {
      setIsScrollShow(scrollTime + 3000 > new Date().valueOf());
    };

    checkScrollTime();
    const interval = setInterval(checkScrollTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [scrollTime]);

  const handleScroll = useCallback(() => {
    try {
      setScrollTime(new Date().valueOf());
      let offsetSum = 0;
      let currentPageIndex = 0;

      const viewportCenter = currentScrollOffset + overallViewHeight / 2;
      // 根据当前视口中心位置计算当前页面的索引
      for (let i = 0; i < pageSizes.length; i++) {
        offsetSum += pageSizes[i].actualHeight + 5;
        if (viewportCenter < offsetSum) {
          currentPageIndex = i;
          break;
        }
      }

      // 设置当前页面（如果在有效范围内）
      if (currentPageIndex >= 0 && currentPageIndex < pageCount) {
        setCurrentPage(currentPageIndex);
      }
    } catch (e) {
      console.log(e);
    }
  }, [currentScrollOffset, pageSizes, pageCount, overallViewHeight]);

  const scrollToPage = useCallback(
    (pageNum: number) => {
      const container = document.querySelector(
        scrollClass,
      ) as HTMLElement | null;
      if (pageNum >= 0 && pageNum < pageCount && container) {
        // 计算目标页面的顶部位置
        const pageTop = pageSizes
          .slice(0, pageNum)
          .reduce((a, b) => a + b.actualHeight, 0);
        container.scrollTo({
          top: pageTop,
        });
        setCurrentPage(pageNum);
      }
    },
    [pageCount, scrollClass, pageSizes],
  );

  const goToNextPage = useCallback(() => {
    scrollToPage(currentPage + 1);
  }, [currentPage, scrollToPage]);

  const goToPreviousPage = useCallback(() => {
    scrollToPage(currentPage - 1);
  }, [currentPage, scrollToPage]);

  useEffect(() => {
    handleScroll(); // 初始时计算当前页码
  }, [currentScrollOffset, handleScroll]);

  return {
    isScrollShow,
    scrollTime,
    currentPage,
    scrollToPage,
    goToNextPage,
    goToPreviousPage,
  };
};
export default useChatPdfScrollPagination;
