import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import {
  Box,
  Button,
  ButtonProps,
  Dialog,
  Input,
  Paper,
  Popover,
  Slider,
  Stack,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { FC, useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

import FunctionalitySignPdfIcon from '@/features/functionality_sign_pdf/components/FunctionalitySignPdfIcon'

import useFunctionalityCommonIsMobile from '../../hooks/useFunctionalityCommonIsMobile'
import FunctionalityCommonIcon from './FunctionalitySignPdfIcon'
interface IFunctionalitySignPdfColorButtonPopoverProps {
  colorList?: string[]
  onSelectedColor: (color: string) => void
  currentColor?: string
  currentTransparency?: number
  onChangeTransparency?: (transparency: number) => void
  buttonProps?: ButtonProps
  isShowRightIcon?: boolean
  titleText?: string
  showColorPicker?: boolean
  isClickClose?: boolean // 点击弹窗内部是否关闭
  children?: (props: { color: string }) => React.ReactNode
}
/**
 * 签名颜色选择按钮
 */
const FunctionalitySignPdfColorButtonPopover: FC<
  IFunctionalitySignPdfColorButtonPopoverProps
> = ({
  colorList,
  onSelectedColor,
  currentColor,
  currentTransparency,
  onChangeTransparency,
  buttonProps,
  isShowRightIcon = true,
  titleText,
  showColorPicker = false,
  isClickClose = true, // 点击弹窗内部是否关闭
  children,
}) => {
  const [currentShowColor, setShowCurrentColor] = useState('black')
  const [transparencyNumber, setTransparencyNumber] = useState(100)
  const [openSelector, setOpenSelector] = React.useState(false) // 颜色选择器
  const [curColorList, setCurColorList] = useState<string[]>([
    'black',
    'blue',
    'red',
  ]) // 组件内部的颜色选择器，用来添加自定义颜色
  const [customColor, setCustomColor] = useState('#000000')

  const isMobile = useFunctionalityCommonIsMobile()

  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(
    null,
  )
  const { t } = useTranslation()

  const openPopover = Boolean(popoverAnchorEl)
  const id = openPopover ? 'color-popper' : undefined

  const colorSelectorId = openSelector ? 'color-picker-popper' : undefined

  useEffect(() => {
    if (currentTransparency) {
      setTransparencyNumber(currentTransparency)
    }
  }, [currentTransparency])
  useEffect(() => {
    if (currentColor) {
      setShowCurrentColor(currentColor)
    }
  }, [currentColor])
  const handleColorSelect = (color) => {
    onSelectedColor(color)
    setShowCurrentColor(color)
  }
  const handleSliderChange = (event, number) => {
    setTransparencyNumber(number)
    onChangeTransparency && onChangeTransparency(number)
  }

  const handleClickPopover = (event: React.MouseEvent<HTMLElement>) => {
    // debugger
    if (isClickClose) {
      setPopoverAnchorEl(popoverAnchorEl ? null : event.currentTarget)
    } else setPopoverAnchorEl(event.currentTarget)

    // setPopoverAnchorEl(event.currentTarget)
  }

  const handleClickClosePopover = () => {
    setPopoverAnchorEl(null)
  }

  const handleClickOpenDialog = (e) => {
    e.stopPropagation()
    setOpenSelector(true)
  }

  const handleDialogClose = () => {
    setOpenSelector(false)
  }

  // 添加自定义颜色 自动选择 关闭弹窗 关闭popover
  const addCustomColor = () => {
    setCurColorList([...curColorList, customColor])
    handleColorSelect(customColor)
    handleDialogClose()
    handleClickClosePopover()
  }

  useEffect(() => {
    console.log(`重新加载了`)
    setCurColorList(colorList || ['black', 'blue', 'red'])
  }, [])

  return (
    <Button
      onClick={(e) => {
        handleClickPopover(e)
      }}
      variant='text'
      size='small'
      aria-describedby={id}
      sx={{
        p: 1,
        '.MuiButton-endIcon': {
          ml: isMobile ? 0 : 1,
        },
      }}
      endIcon={
        isShowRightIcon && <FunctionalitySignPdfIcon name='ArrowDropDown' />
      }
      {...buttonProps}
    >
      {children && children({ color: currentShowColor })}

      {!children && titleText && (
        <Stack
          sx={{
            width: '100%',
          }}
          direction='column'
          alignItems='center'
        >
          <Typography
            sx={{
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            {titleText}
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: 3,
              border: '1px solid #e8e8e8',
              bgcolor: currentShowColor,
              borderRadius: 1,
            }}
          />
        </Stack>
      )}
      {!children && !titleText && (
        <Box
          sx={{
            width: 20,
            height: 20,
            border: '1px solid #e8e8e8',
            bgcolor: currentShowColor,
            borderRadius: '50%',
          }}
        />
      )}
      {/* 弹窗 */}
      <Popover
        id={id}
        open={openPopover}
        anchorEl={popoverAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Paper
          sx={{
            p: 1,
            display: 'flex',
            justifyContent: 'space-around',
            ' button': {
              border: '1px solid transparent!important',
            },
          }}
        >
          <Box sx={{ maxWidth: 260 }}>
            {currentTransparency !== undefined && (
              <Stack
                direction='row'
                alignItems='center'
                gap={1}
                paddingBottom={1}
                marginBottom={2}
                borderBottom='1px solid #e8e8e8'
              >
                <FunctionalityCommonIcon name='OpacityRounded' />
                <Slider
                  aria-label='Temperature'
                  value={transparencyNumber}
                  defaultValue={currentTransparency || 100}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  onChange={handleSliderChange}
                />
                <Box width={80} ml={1}>
                  <Typography
                    sx={{
                      fontSize: {
                        lg: 14,
                      },
                    }}
                  >
                    {transparencyNumber || '0'}%
                  </Typography>
                </Box>
              </Stack>
            )}
            {curColorList.map((color) => (
              <Button
                onClick={() => {
                  handleColorSelect(color)
                }}
                key={color}
                sx={{
                  bgcolor: color === currentShowColor ? '#64467b52' : '',
                  '&:hover': {
                    bgcolor: color === currentShowColor ? '#64467b52' : '',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: '1px solid #e8e8e8',
                    position: 'relative',
                    backgroundColor: color,
                    '&:hover': {
                      backgroundColor: color,
                    },
                    '&:before':
                      color === 'transparent'
                        ? {
                            content: '" "',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform:
                              'translateX(-90%) translateY(-50%) rotate(45deg)',
                            width: '1px',
                            height: 20,
                            backgroundColor: 'red',
                          }
                        : '',
                  }}
                ></Box>
              </Button>
            ))}

            {showColorPicker && (
              <Button
                onClick={(e) => {
                  handleClickOpenDialog(e)
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    position: 'relative',
                  }}
                >
                  <AddCircleOutlineOutlinedIcon
                    sx={{ fontSize: 20 }}
                  ></AddCircleOutlineOutlinedIcon>
                </Box>
              </Button>
            )}
          </Box>
        </Paper>
      </Popover>

      <Dialog
        id={colorSelectorId}
        open={openSelector}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        onClose={(event: any, reason) => {
          console.log(`close外部`)
          if (reason === 'backdropClick') {
            console.log(`close背景外部`)
            // 这里处理点击背景的逻辑 关闭颜色选择器。 不关闭popover
            event?.stopPropagation()
            handleDialogClose()
          } else {
            console.log(`close内部`)
            handleDialogClose()
          }
        }}
      >
        <Box
          onClick={(e) => {
            e.stopPropagation()
          }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 4,
            '.react-colorful': {
              '.react-colorful__saturation': {
                borderRadius: '8px',
                width: '200px',
                height: '155px',
              },
              '.react-colorful__hue': {
                mt: '20px',
                borderRadius: '8px',
                height: '10px',
                mb: '15px',
                '.react-colorful__pointer': {
                  height: '20px',
                  width: '20px',
                },
              },
            },
          }}
          className='background-dialog'
        >
          <HexColorPicker color={customColor} onChange={setCustomColor} />

          <Input
            sx={{
              height: '40px',
              width: '100%',
              color: 'rgb(117, 117, 117)',
              borderRadius: '4px',
              // padding: '8px 12px',
              boxSizing: 'border-box',
            }}
            value={customColor}
            onChange={(e) => {
              let inputValue = e.target.value
              // 如果用户试图删除 '#', 自动添加回去并截取前7个字符
              if (!inputValue.startsWith('#')) {
                inputValue = '#' + inputValue.replace('#', '').slice(0, 6)
              } else {
                // 限制输入长度为最多7个字符
                inputValue = inputValue.slice(0, 7)
              }
              setCustomColor(inputValue)
            }}
          ></Input>
          <Stack
            direction={'row'}
            gap={'8px'}
            justifyContent={'flex-end'}
            sx={{ pt: 3, width: '100%' }}
          >
            <Button onClick={handleDialogClose}>{t('common:cancel')}</Button>
            <Button
              variant='contained'
              onClick={() => {
                addCustomColor()
              }}
              autoFocus
            >
              {t('common:add')}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </Button>
  )
}
export default FunctionalitySignPdfColorButtonPopover
