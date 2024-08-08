//控制边界，不超过画布
export const constrainWithinCanvas = (targetObject, padding = 0) => {
  if (!targetObject.canvas) return
  const zoom = targetObject.canvas.getZoom()
  const viewScale = 1 / zoom
  const canvasHeight = targetObject.canvas.height * viewScale
  const canvasWidth = targetObject.canvas.width * viewScale

  if (
    targetObject.currentHeight > canvasHeight - padding * 2 ||
    targetObject.currentWidth > canvasWidth - padding * 2
  ) {
    return
  }
  if (
    targetObject.getBoundingRect().top < padding ||
    targetObject.getBoundingRect().left < padding
  ) {
    targetObject.top = Math.max(
      targetObject.top,
      targetObject.top - targetObject.getBoundingRect().top + padding,
    )
    targetObject.left = Math.max(
      targetObject.left,
      targetObject.left - targetObject.getBoundingRect().left + padding,
    )
  }
  if (
    targetObject.getBoundingRect().top + targetObject.getBoundingRect().height >
    canvasHeight - padding ||
    targetObject.getBoundingRect().left + targetObject.getBoundingRect().width >
    canvasWidth - padding
  ) {
    targetObject.top = Math.min(
      targetObject.top,
      canvasHeight -
      targetObject.getBoundingRect().height +
      targetObject.top -
      targetObject.getBoundingRect().top -
      padding,
    )
    targetObject.left = Math.min(
      targetObject.left,
      canvasWidth -
      targetObject.getBoundingRect().width +
      targetObject.left -
      targetObject.getBoundingRect().left -
      padding,
    )
  }
}
