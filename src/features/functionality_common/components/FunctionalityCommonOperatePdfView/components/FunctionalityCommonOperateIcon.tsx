import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS'
import { SvgIconProps } from '@mui/material'
import { FC } from 'react'
import React from 'react'

/**
 * Functionality公共图标
 * @param name 图标名称
 */
const FunctionalityCommonOperateIcon: FC<{ name: string } & SvgIconProps> = ({
  name,
  ...restProps
}) => {
  const renderIcon = () => {
    switch (name) {
      case 'ModeEditIcon': {
        return <ModeEditIcon {...restProps} />
      }
      case 'ArrowDropDown': {
        return <ArrowDropDownIcon {...restProps} />
      }
      case 'FormatUnderlinedIcon': {
        return <FormatUnderlinedIcon {...restProps} />
      }
      case 'StrikethroughSIcon': {
        return <StrikethroughSIcon {...restProps} />
      }
      default: {
        return null
      }
    }
  }

  return renderIcon()
}
export default FunctionalityCommonOperateIcon
