/* eslint-disable no-debugger */
import { Box } from '@mui/material'
import React, { forwardRef, useMemo } from 'react'

import { useFunctionalitySignElementWidth } from '@/features/functionality_common/hooks/useFunctionalitySignElementWidth'

/**
 * canvas渲染组件用的fabric_js
 */
const FunctionalityWateMarkPdfShowPdfWaterMarkRender = (
  { sizeInfo, waterMarkInfo },
) => {
  const { ref, width } = useFunctionalitySignElementWidth()
  const proportion = width / sizeInfo.width

  const getAngleForDiagonal = useMemo(() => {
    // 计算反正切值，得到的结果是弧度
    const radian = Math.atan(sizeInfo.height / sizeInfo.width)

    // 将弧度转换为度
    const degree = radian * (180 / Math.PI)

    // 因为问题要求的是从左下到右上的倾斜角度，所以使用负值
    return -degree
  }, [sizeInfo])

  return (
    <Box
      ref={ref}
      sx={{
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        id='chat-test-canvas'
        sx={{
          width: sizeInfo.width * proportion,
          height: sizeInfo.height * proportion,
          // height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            fontSize: `${waterMarkInfo.fontSize * proportion}px`,
            fontFamily: `${waterMarkInfo.fontFamily}`,
            color: `${waterMarkInfo.color}`,
            opacity: `${waterMarkInfo.opciaty}`,
            transformOrigin: 'center',
            transform: `rotate(${getAngleForDiagonal}deg)`,
          }}
        >
          {waterMarkInfo.textValue}
        </Box>
      </Box>
    </Box>
  )
}
export default forwardRef(FunctionalityWateMarkPdfShowPdfWaterMarkRender)
