import RotateRightIcon from '@mui/icons-material/RotateRight'
import { SvgIconProps } from '@mui/material'
import React from 'react'
import { FC } from 'react'
/**
 * FunctionalityRotatePdfIcon图标组件
 * @param name 图标名称
 */
const FunctionalityRotatePdfIcon: FC<
  { name: 'RotateRight' } & SvgIconProps
> = ({ name, ...restProps }) => {
  const renderIcon = () => {
    switch (name) {
      case 'RotateRight': {
        return <RotateRightIcon {...restProps} />
      }
      default: {
        return null
      }
    }
  }

  return renderIcon()
}
export default FunctionalityRotatePdfIcon
