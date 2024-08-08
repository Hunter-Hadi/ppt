import BackspaceIcon from '@mui/icons-material/Backspace'
import BrushIcon from '@mui/icons-material/Brush'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import DrawIcon from '@mui/icons-material/Draw'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import ImageIcon from '@mui/icons-material/Image'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import { SvgIconProps } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'
/**
 * Functionality公共图标
 * @param name 图标名称
 */
const FunctionalityPdfAnnotatorIcon: FC<{ name: string } & SvgIconProps> = ({
  name,
  ...restProps
}) => {
  const { t } = useTranslation()

  const renderIcon = () => {
    switch (name) {
      case 'DragIndicator': {
        return <DragIndicatorIcon {...restProps} />
      }

      case 'TextFields': {
        return <TextFieldsIcon {...restProps} />
      }

      case 'Image': {
        return <ImageIcon {...restProps} />
      }
      case 'Brush': {
        return <BrushIcon {...restProps} />
      }
      case 'BackspaceIcon': {
        return <BackspaceIcon {...restProps} />
      }

      case 'DriveFileRenameOutline': {
        return <DriveFileRenameOutlineIcon {...restProps} />
      }
      case 'Draw': {
        return <DrawIcon {...restProps} />
      }
      default: {
        return null
      }
    }
  }

  return renderIcon()
}
export default FunctionalityPdfAnnotatorIcon
