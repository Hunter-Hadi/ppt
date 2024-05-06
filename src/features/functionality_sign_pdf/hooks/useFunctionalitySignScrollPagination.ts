import { MutableRefObject, useCallback, useEffect, useState } from 'react';
/**
 * 根据div的滚动位置，计算当前页码，与跳转页码对应位置，以及上一页/下一页翻页功能
 */
export const useFunctionalitySignScrollPagination = (pageCount: number, scrollContainerRef: MutableRefObject<HTMLElement | null>, pageRefs: MutableRefObject<HTMLElement[]>) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [scrollTime, setScrollTime] = useState(0);


    // 动态计算当前页码
    const handleScroll = useCallback(() => {
        try {
            if (!scrollContainerRef.current) return;
            setScrollTime(new Date().valueOf())
            const container = scrollContainerRef.current;
            if (container.scrollTop < 10) {
                setCurrentPage(0);
                return
            }
            const scrollPosition = container.scrollTop + container.clientHeight / 2; // 以容器视口中央为准

            // 查找当前位于容器视口中心的页面
            const currentPageIndex = pageRefs.current.findIndex((page) => {
                const pageTop = page?.offsetTop || 0;
                const pageBottom = pageTop + (page?.clientHeight || 0);
                return scrollPosition >= pageTop && scrollPosition <= pageBottom;
            });

            // 设置当前页面（如果找到了）
            if (currentPageIndex >= 0) {
                setCurrentPage(currentPageIndex);
            }
        } catch (e) {
            console.log(e)
        }
    }, [scrollContainerRef]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);

            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll, scrollContainerRef]);

    const scrollToPage = useCallback((pageNum) => {
        const container = scrollContainerRef.current;
        if (pageNum >= 0 && pageNum < pageCount && pageRefs.current[pageNum] && container) {
            const pageTop = pageRefs.current[pageNum].offsetTop;
            container.scrollTo({
                top: pageTop,
            });
            setCurrentPage(pageNum);
        }
    }, [pageCount, scrollContainerRef]);


    const goToNextPage = useCallback(() => { scrollToPage(currentPage + 1); }, [currentPage, scrollToPage]);
    const goToPreviousPage = useCallback(() => { scrollToPage(currentPage - 1); }, [currentPage, scrollToPage]);

    return {
        scrollTime,
        currentPage,
        scrollToPage,
        goToNextPage,
        goToPreviousPage,
    };
}
