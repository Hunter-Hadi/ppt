import { Box, Tooltip, TooltipProps, Typography } from '@mui/material'
import React from 'react'

import useFunctionalityCommonIsMobile from '../hooks/useFunctionalityCommonIsMobile'
/**
 * FunctionalityTooltip 做了统一的居上, 字体放大的tooltip
 * @param title tooltip的标题
 * @param children 子元素
 *
 *
 */
const FunctionalityCommonTooltip = ({
  title,
  children,
  ...props
}: { title: string } & TooltipProps) => {
  const isMobile = useFunctionalityCommonIsMobile()

  if (isMobile) {
    return <Box>{children}</Box> // 在移动端不显示 Tooltip
  }
  return (
    <Tooltip
      title={
        title ? <Typography variant='subtitle1'>{title}</Typography> : null
      }
      arrow
      placement='top'
      {...props}
    >
      <Box>{children}</Box>
    </Tooltip>
  )
}
export default FunctionalityCommonTooltip
