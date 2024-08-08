import { v4 as uuidV4 } from "uuid";

export const handleNewObjectContinuousMouse = async (
    newObject,
    fabricCanvas,
    isAutoObjectDragPosition,
    topWrapRef,
    isMobile
) => {
    if (!newObject) {
        return;
    }

    topWrapRef.current?.focus();
    if (topWrapRef.current) {
        // 直接添加object，会以object的top left添加上去
        newObject.id = uuidV4();
        newObject.setControlsVisibility({ mtr: false });
        await fabricCanvas.current?.add(newObject);
        await fabricCanvas.current?.requestRenderAll(); // 刷新画布以显示更改

        if (isAutoObjectDragPosition) {
            const canvasElement = fabricCanvas.current?.upperCanvasEl;
            if (canvasElement && fabricCanvas.current) {
                // 这是拖动过来，代表需要自动js触发鼠标事件
                const topWrapRefRect = topWrapRef.current?.getBoundingClientRect();

                const zoom = fabricCanvas.current.getZoom();
                const position = {
                    clientX:
                        topWrapRefRect.x +
                        newObject.left * zoom +
                        (newObject.width * zoom * newObject.scaleX) / 2,
                    clientY:
                        topWrapRefRect.y +
                        newObject.top * zoom +
                        (newObject.height * zoom * newObject.scaleY) / 2,
                    bubbles: true,
                };

                fabricCanvas.current?.setActiveObject(newObject); // 刷新画布以显示更改
                if (isMobile) {
                    // 手机端不知道怎么处理，先留着
                } else {
                    canvasElement?.dispatchEvent(new MouseEvent("mouseup", position));
                    canvasElement?.dispatchEvent(new MouseEvent("mousedown", position));
                }
            }
        }
    }
}


