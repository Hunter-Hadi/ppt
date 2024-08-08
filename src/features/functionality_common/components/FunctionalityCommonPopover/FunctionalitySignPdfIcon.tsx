import AbcIcon from '@mui/icons-material/Abc'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CheckIcon from '@mui/icons-material/Check'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import FontDownloadOutlinedIcon from '@mui/icons-material/FontDownloadOutlined'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import OpacityRoundedIcon from '@mui/icons-material/OpacityRounded'
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import TitleIcon from '@mui/icons-material/Title'
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined'
import ZoomInMapOutlinedIcon from '@mui/icons-material/ZoomInMapOutlined'
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined'
import { Box, SvgIconProps } from '@mui/material'
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
      case 'ArrowDropDown': {
        return <ArrowDropDownIcon {...restProps} />
      }
      case 'UndoOutlined': {
        return <UndoOutlinedIcon {...restProps} />
      }
      case 'RedoOutlined': {
        return <RedoOutlinedIcon {...restProps} />
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
      case 'ContentCopy': {
        return <ContentCopyIcon {...restProps} />
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
      case 'FormatAlignLeft': {
        return <FormatAlignLeftIcon {...restProps} />
      }
      case 'FormatAlignCenter': {
        return <FormatAlignCenterIcon {...restProps} />
      }
      case 'FormatAlignRight': {
        return <FormatAlignRightIcon {...restProps} />
      }
      case 'OpacityRounded': {
        return <OpacityRoundedIcon {...restProps} />
      }
      case 'CheckCircle': {
        return <CheckCircleIcon {...restProps} />
      }
      case 'FontDownload': {
        return <FontDownloadOutlinedIcon {...restProps} />
      }
      case 'DateRangeOutlined': {
        return <DateRangeOutlinedIcon {...restProps} />
      }
      case 'CloseIcon': {
        return <CloseIcon {...restProps} />
      }
      case 'SignArrowIndicate': {
        return (
          <Box
            sx={{
              position: 'relative',
              paddingLeft: '15px',
              transformOrigin: 'left center;',
              transform: 'rotate(-90deg) translate(-10px,30px)',
              overflow: 'hidden',
              width: 66,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 3,
                height: 2,
              }}
            >
              <svg height='36' width='16'>
                <polygon
                  fill='#9065B0'
                  points='0,18 14,0 16,0 16,36 14,36'
                ></polygon>
              </svg>
            </Box>
            <Box
              sx={{
                fontFamily: '"Source Sans Pro", Helvetica, Arial, sans-serif',
                WebkitFontSmoothing: 'antialiased',
                fontWeight: 700,
                fontSize: 16,
                lineHeight: 16,
                color: 'rgb(255, 255, 255)',
                backgroundColor: 'primary.main',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: 37,
                minWidth: 50,
                padding: '0px 16px 0px 8px',
              }}
            >
              {t('functionality__sign_pdf:components__sign_pdf__icon__sign')}
            </Box>
          </Box>
        )
      }
      default: {
        return null
      }
    }
  }

  return renderIcon()
}
export default FunctionalitySignPdfIcon
