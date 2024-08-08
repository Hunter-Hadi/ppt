import AbcIcon from '@mui/icons-material/Abc'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CheckIcon from '@mui/icons-material/Check'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import TitleIcon from '@mui/icons-material/Title'
import { SvgIconProps } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'
/**
 * Functionality公共图标
 * @param name 图标名称
 */
const FunctionalitySignPdfIcon: FC<{ name: string } & SvgIconProps> = ({
  name,
  ...restProps
}) => {
  const { t } = useTranslation()

  const renderIcon = () => {
    switch (name) {
      case 'DragIndicator': {
        return <DragIndicatorIcon {...restProps} />
      }

      case 'KeyboardArrowDown': {
        return <KeyboardArrowDownIcon {...restProps} />
      }
      case 'DeleteForeverOutlined': {
        return <DeleteForeverOutlinedIcon {...restProps} />
      }
      case 'Abc': {
        return <AbcIcon {...restProps} />
      }
      case 'TextFields': {
        return <TextFieldsIcon {...restProps} />
      }

      case 'Title': {
        return <TitleIcon {...restProps} />
      }
      case 'CalendarMonthOutlined': {
        return <CalendarMonthOutlinedIcon {...restProps} />
      }
      case 'Check': {
        return <CheckIcon {...restProps} />
      }

      case 'CheckCircle': {
        return <CheckCircleIcon {...restProps} />
      }

      default: {
        return null
      }
    }
  }

  return renderIcon()
}
export default FunctionalitySignPdfIcon
