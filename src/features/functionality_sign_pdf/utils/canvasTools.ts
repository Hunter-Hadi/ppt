// 辅助函数：得到文字的实际边界
export const getCanvasBounds = (imageData) => {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    let minX = width, minY = height, maxX = 0, maxY = 0;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const alpha = data[(width * y + x) * 4 + 3];
            if (alpha > 0) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    return { minX, maxX, minY, maxY };
};
const getElementGlobalOffset = (el: HTMLElement) => {
    return { offsetX: el.offsetLeft, offsetY: el.offsetTop };
}
export const getGlobalCenterRelativeToWrapperPosition = (
    rollingElement: HTMLElement,
    wrapElement: HTMLElement,
) => {
    // 获取滚动视图中心的全局位置
    if (!rollingElement) return { positionInPageX: 0, positionInPageY: 0 };

    // 滚动视图中心的全局位置
    const rollingGlobalOffset = getElementGlobalOffset(rollingElement);
    const centerGlobalX =
        rollingGlobalOffset.offsetX +
        rollingElement.clientWidth / 2 +
        rollingElement.scrollLeft;
    const centerGlobalY =
        rollingGlobalOffset.offsetY +
        rollingElement.clientHeight / 2 +
        rollingElement.scrollTop;

    // 目标页面元素的全局位置
    const pageGlobalOffset = getElementGlobalOffset(wrapElement);
    const pageGlobalX = pageGlobalOffset.offsetX;
    const pageGlobalY = pageGlobalOffset.offsetY;

    // 滚动视图中心点在pageRefs.current[currentPage]的相对位置
    const positionInPageX = centerGlobalX - pageGlobalX;
    const positionInPageY = centerGlobalY - pageGlobalY;
    return {
        positionInPageX,
        positionInPageY,
    };
};