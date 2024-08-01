import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import ZoomInMapOutlinedIcon from '@mui/icons-material/ZoomInMapOutlined'
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined'
import { SvgIconProps } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'
/**
 * Functionality公共图标
 * @param name 图标名称
 */
const FunctionalityCommonPdfViewVirtualScrollIcon: FC<
  { name: string } & SvgIconProps
> = ({ name, ...restProps }) => {
  const { t } = useTranslation()

  const renderIcon = () => {
    switch (name) {
      case 'ArrowBackIos': {
        return <ArrowBackIosIcon {...restProps} />
      }
      case 'ArrowForwardIos': {
        return <ArrowForwardIosIcon {...restProps} />
      }
      case 'ZoomInMapOutlined': {
        return <ZoomInMapOutlinedIcon {...restProps} />
      }
      case 'ZoomOutMapOutlined': {
        return <ZoomOutMapOutlinedIcon {...restProps} />
      }
      case 'AddCircleOutlineOutlined': {
        return <AddCircleOutlineOutlinedIcon {...restProps} />
      }
      case 'RemoveCircleOutlineOutlined': {
        return <RemoveCircleOutlineOutlinedIcon {...restProps} />
      }
      default: {
        return null
      }
    }
  }

  return renderIcon()
}
export default FunctionalityCommonPdfViewVirtualScrollIcon
