/* eslint-disable no-debugger */
import { useState } from 'react'

const useChatPdfListZoom = (
  props: {
    max: number
    min: number
    defaultZoom: number
  } = {
    max: 1.5,
    min: 0.5,
    defaultZoom: 1,
  },
) => {
  const [scaleNumber, setScaleNumber] = useState<number>(props.defaultZoom)
  const onChangeZoom = (type: 'reduce' | 'add') => {
    if (type === 'reduce') {
      setScaleNumber((scale) => Math.max(scale - 0.1, props.min))
    } else {
      setScaleNumber((scale) => Math.min(scale + 0.1, props.max))
    }
  }
  const onSelfAdaption = () => {
    if (scaleNumber === 1) {
      setScaleNumber(0.7)
    } else {
      setScaleNumber(1)
    }
  }
  return { onChangeZoom, onSelfAdaption, scaleNumber }
}
export default useChatPdfListZoom
