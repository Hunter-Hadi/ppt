import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone'
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone'
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined'
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone'
import { SvgIconProps } from '@mui/material'
import { FC } from 'react'
import React from 'react'

/**
 * Functionality公共图标
 * @param name 图标名称
 */
const FunctionalityCommonIcon: FC<{ name: string } & SvgIconProps> = ({
  name,
  ...restProps
}) => {
  const renderIcon = () => {
    switch (name) {
      case 'CloudUploadIcon': {
        return <PictureAsPdfOutlinedIcon {...restProps} />
      }
      case 'ControlPointTwoTone': {
        return <ControlPointTwoToneIcon {...restProps} />
      }
      case 'RemoveCircleTwoTone': {
        return <RemoveCircleTwoToneIcon {...restProps} />
      }
      case 'CloseTwoTone':
        return <CloseTwoToneIcon {...restProps} />
      case 'NoteAdd':
        return <NoteAddOutlinedIcon {...restProps} />
      default: {
        return null
      }
    }
  }

  return renderIcon()
}
export default FunctionalityCommonIcon
