import * as fabric from 'fabric'
import Hammer from 'hammerjs'

export const fabricMobileMove = (canvas: fabric.Canvas) => {
  const outerDiv = document.getElementById(
    'functionality-sign-pdf-rolling-view',
  )
  const hammerCanvas = new Hammer(canvas.getSelectionElement())

  hammerCanvas.get('pinch').set({ enable: true })
  hammerCanvas.get('pan').set({ direction: Hammer.DIRECTION_ALL })

  const SCROLL_SPEED = 10 // 滚动速度系数

  let panActive = false
  let lastPanX = 0
  let lastPanY = 0

  // 请求动画帧来平滑滚动
  // eslint-disable-next-line no-inner-declarations
  const smoothScroll = () => {
    if (!panActive || !outerDiv) return
    outerDiv.scrollTop -= lastPanY * SCROLL_SPEED
    outerDiv.scrollLeft -= lastPanX * SCROLL_SPEED
    requestAnimationFrame(smoothScroll)
  }

  hammerCanvas.on('panstart', (ev) => {
    if (canvas.getActiveObjects().length > 0) return
    panActive = true
    lastPanX = ev.velocityX
    lastPanY = ev.velocityY
    requestAnimationFrame(smoothScroll)
  })

  hammerCanvas.on('panmove', (ev) => {
    if (canvas.getActiveObjects().length > 0) return
    lastPanX = ev.velocityX
    lastPanY = ev.velocityY
  })

  hammerCanvas.on('panend', () => {
    panActive = false
  })

  hammerCanvas.on('pinchstart', (ev) => {})

  hammerCanvas.on('pinch', (ev) => {})
}
