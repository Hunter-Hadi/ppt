import {
  Button,
  ButtonGroup,
  Input,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material'
// import * as fabric from 'fabric'
import { cloneDeep } from 'lodash-es'
import React from 'react'
import { FC, useEffect, useMemo, useState } from 'react'

import FunctionalityCommonButtonPopover from '@/features/functionality_common/components/FunctionalityCommonPopover/FunctionalityCommonButtonPopover'
import FunctionalityCommonColorButtonPopover from '@/features/functionality_common/components/FunctionalityCommonPopover/FunctionalityCommonColorButtonPopover'
import FunctionalityCommonFontsButtonPopover from '@/features/functionality_common/components/FunctionalityCommonPopover/FunctionalityCommonFontsButtonPopover'
import { FunctionalityCommonSliderView } from '@/features/functionality_common/components/FunctionalityCommonSliderView'
import { SIGN_TEXT_FONT_FAMILY_LIST } from '@/features/functionality_common/constants'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

import {
  copyFabricSelectedObject,
  onChangeFabricColor,
  onChangeFabricFontStyle,
} from '../../../utils/FabricCanvas/fabricCanvasNewAdd'
import FunctionalityCommonOperateIcon from '../../FunctionalityCommonOperateIcon'
import FunctionalitySignPdfShowPdfDateFormatsPopover from './FunctionalityCommonOperateDateFormatsPopover'
import { IControlDiv } from './FunctionalityCommonOperateFabricCanvasMain'
export interface IFFunctionalityCommonOperateFabricToolsPopupProps {
  controlDiv: IControlDiv
  scaleFactor: number
  editor: React.MutableRefObject<any | null>
  isMobileFollow?: boolean // 移动端是否跟随，主要是redact
}
/**
 * PDF的点击的  签名对象变更样式 全局弹窗视图
 */
const FunctionalityCommonOperateFabricToolsPopup: FC<
  IFFunctionalityCommonOperateFabricToolsPopupProps
> = ({ controlDiv, editor, scaleFactor, isMobileFollow = false }) => {
  const isMobile = useFunctionalityCommonIsMobile()

  const [textAlignSelectIcon, setTextAlignSelectIcon] =
    useState<string>('FormatAlignLeft')
  const [transparencyNumber, setTransparencyNumber] = useState<
    undefined | number
  >(undefined)
  const [applicationKeys, setApplicationKeys] = useState<{
    [key in string]: boolean
  }>({})
  const activeObject: any | undefined = useMemo(
    () => editor.current?.getActiveObject(),
    [editor.current],
  )
  const onChangeColor = (color) => {
    if (editor.current) {
      onChangeFabricColor(editor.current, color)
    }
  }
  const onCopySelectedObject = () => {
    copyFabricSelectedObject(editor.current)
  }
  const onSelectedFonts = (fonts: string) => {
    onChangeFabricFontStyle(editor.current, 'fontFamily', fonts)
  }
  const onChangeFontSize = (size: number) => {
    onChangeFabricFontStyle(editor.current, 'fontSize', size)
  }

  const fontStyleList: {
    key: string
    sx?: SxProps<Theme>
    name: string
    isSelect: boolean
  }[] = [
    {
      key: 'fontWeightBold',
      sx: {
        fontWeight: 'bold',
      },
      name: 'B',
      isSelect: activeObject?.fontWeight === 'bold',
    },
    {
      key: 'italic',
      name: '/',
      isSelect: activeObject?.fontStyle === 'italic',
    },
    {
      key: 'line_through',
      sx: {
        textDecoration: 'line-through',
      },
      name: 'S',
      isSelect: activeObject?.linethrough,
    },
    {
      key: 'underline',
      sx: {
        textDecoration: 'underline',
      },
      name: 'U',
      isSelect: activeObject?.underline,
    },
  ]
  const fontBoxPositionList: {
    iconName: string
    key: string
    isSelect: boolean
    fabricKey: string
  }[] = [
    {
      iconName: 'FormatAlignLeft',
      key: 'left',
      fabricKey: 'left',
      isSelect: false,
    },
    {
      iconName: 'FormatAlignCenter',
      key: 'center',
      fabricKey: 'center',
      isSelect: false,
    },
    {
      iconName: 'FormatAlignRight',
      key: 'right',
      fabricKey: 'right',
      isSelect: false,
    },
  ]
  useEffect(() => {
    if (activeObject) {
      const currentTextPosition = fontBoxPositionList.find(
        (fontBoxPosition) =>
          fontBoxPosition.fabricKey === activeObject.textAlign,
      )
      if (currentTextPosition) {
        setTextAlignSelectIcon(currentTextPosition.iconName)
      }
    }
  }, [activeObject])
  const addApplicationButtonKey = (key) => {
    applicationKeys[key] = !applicationKeys[key]
    setApplicationKeys(cloneDeep(applicationKeys))
  }
  const checkIsSelect = (item) =>
    applicationKeys[item.key] !== undefined
      ? applicationKeys[item.key]
      : item.isSelect
  const onChangeTransparency = (value: number) => {
    const convertedValue = (value - 1) / 99 // 转换为 0-1 的范围
    const roundedValue = convertedValue.toFixed(1) // 保留小数点后一位
    onChangeFabricFontStyle(editor.current, 'opacity', roundedValue)
    setTransparencyNumber(value)
  }
  const onChangeBgColor = (color: string) => {
    onChangeFabricFontStyle(editor.current, 'backgroundColor', color)
  }
  const onHandleDateFormatsValue = (value: string) => {
    console.log('onHandleDateFormatsValue', value)
    onChangeFabricFontStyle(editor.current, 'text', value)
  }
  const deleteSelectedObjects = () => {
    const activeGroup = editor.current?.getActiveObjects()
    if (activeGroup && activeGroup.length) {
      activeGroup.forEach((obj) => {
        editor.current?.remove(obj)
      })
      editor.current?.discardActiveObject() // 取消选中活动对象（必要）
      editor.current?.renderAll() // 重新渲染画布
    }
  }
  const isImage = activeObject?.type === 'image' // 图片
  const isEditingText =
    activeObject?.type === 'textbox' || activeObject?.type === 'i-text' // 可以编辑文字的文本
  const isText = activeObject?.type === 'text' || isEditingText //文本
  const isDateValid = activeObject?.isDateValid // 日期

  const styles = useMemo(() => {
    const computedStyles: any = {
      position: 'fixed',
      mb: 0,
      left: undefined,
      top: undefined,
    };

    if (isMobile) {
      computedStyles.mb = 1;
      if (isMobileFollow) {
        computedStyles.position = 'fixed';
        computedStyles.left = controlDiv.left * scaleFactor + controlDiv.windowLeft;
        computedStyles.top = controlDiv.top * scaleFactor + controlDiv.windowTop - 65;
      } else {
        computedStyles.position = 'unset';
      }
    } else {
      computedStyles.left = controlDiv.left * scaleFactor + controlDiv.windowLeft;
      computedStyles.top = controlDiv.top * scaleFactor + controlDiv.windowTop - 50;
    }

    return computedStyles;
  }, [isMobile, isMobileFollow, controlDiv, scaleFactor]);

  //在弹窗内部阻止点击事件冒泡
  return (
    <Stack
      className='functionality-sign-pdf-object-tools-popup'
      sx={{
        // position: isMobile ? 'unset' : 'fixed',
        // mb: isMobile ? 1 : 0,
        // left: isMobile
        //   ? undefined
        //   : controlDiv.left * scaleFactor + controlDiv.windowLeft,
        // top: isMobile
        //   ? undefined
        //   : controlDiv.top * scaleFactor + controlDiv.windowTop - 50,
        ...styles,
        button: {
          padding: isMobile ? '5px 3px!important' : '5px 8px!important',
          minWidth: isMobile ? '35px!important' : 40,
        },
        zIndex: 9,
      }}
    >
      <ButtonGroup
        variant='outlined'
        sx={{
          borderRadius: 2,
          bgcolor: isMobile ? '#fff' : '#fafafa',
          height: isMobile ? 60 : 40,
        }}
      >
        {isEditingText && (
          <FunctionalityCommonFontsButtonPopover
            currentFont={activeObject?.fontFamily}
            isShowFontsName={true}
            title={
              isMobile ? (
                <Stack>
                  <FunctionalityCommonOperateIcon
                    color='primary'
                    name='FontDownload'
                  />
                </Stack>
              ) : undefined
            }
            fontSize={18}
            onSelectedFont={onSelectedFonts}
            fontsList={SIGN_TEXT_FONT_FAMILY_LIST}
          />
        )}
        {(isText || isDateValid) && (
          <Button>
            {isDateValid && (
              <FunctionalitySignPdfShowPdfDateFormatsPopover
                value={activeObject?.text}
                onHandleValue={onHandleDateFormatsValue}
                title={
                  isMobile ? (
                    <Stack>
                      <FunctionalityCommonOperateIcon
                        color='primary'
                        name='DateRangeOutlined'
                      />
                    </Stack>
                  ) : undefined
                }
              />
            )}
            {isText && (
              <Input
                sx={{
                  width: 40,
                  ' input': {
                    color: '#9065B0',
                  },
                }}
                defaultValue={activeObject?.fontSize || 16}
                aria-describedby='outlined-weight-helper-text'
                inputProps={{
                  'aria-label': 'weight',
                }}
                type='number'
                onChange={(e) => {
                  onChangeFontSize(Number(e.target.value))
                }}
              />
            )}
          </Button>
        )}

        {isText && (
          <Button>
            {/* 这个是文字的风格按钮 */}
            <FunctionalityCommonButtonPopover
              popoverView={
                <Stack direction='row' gap={1}>
                  {fontStyleList.map((item) => (
                    <Button
                      key={item.key}
                      sx={{
                        bgcolor: checkIsSelect(item) ? '#64467b52' : '',
                        '&:hover': {
                          bgcolor: checkIsSelect(item) ? '#64467b52' : '',
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onChangeFabricFontStyle(editor.current, item.key)
                        addApplicationButtonKey(item.key)
                      }}
                    >
                      <Typography
                        sx={{
                          ...item.sx,
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Button>
                  ))}
                </Stack>
              }
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                }}
              >
                B
              </Typography>
            </FunctionalityCommonButtonPopover>
            {/* 下面的是文字位置的按钮 */}
            <FunctionalityCommonButtonPopover
              isShowRightIcon={false}
              popoverView={
                <Stack direction='row' gap={1}>
                  {fontBoxPositionList.map((item) => (
                    <Button
                      key={item.key}
                      sx={{
                        bgcolor:
                          textAlignSelectIcon === item.iconName
                            ? '#64467b52'
                            : '',
                        '&:hover': {
                          bgcolor:
                            textAlignSelectIcon === item.iconName
                              ? '#64467b52'
                              : '',
                        },
                      }}
                      onClick={(e) => {
                        onChangeFabricFontStyle(
                          editor.current,
                          'textAlign',
                          item.key,
                        )
                        setTextAlignSelectIcon(item.iconName)
                      }}
                    >
                      <FunctionalityCommonOperateIcon name={item.iconName} />
                    </Button>
                  ))}
                </Stack>
              }
            >
              <FunctionalityCommonOperateIcon name={textAlignSelectIcon} />
            </FunctionalityCommonButtonPopover>
          </Button>
        )}
        {isImage && activeObject.imageType === 'insertImage' && (
          <Button>
            <FunctionalityCommonSliderView
              onChangeTransparency={onChangeTransparency}
            />
          </Button>
        )}
        {(isText || (isImage && activeObject.imageType !== 'insertImage')) && (
          <Button>
            <FunctionalityCommonColorButtonPopover
              titleText={isText ? 'A' : ''}
              isShowRightIcon={false}
              buttonProps={{
                variant: 'text',
              }}
              onSelectedColor={onChangeColor}
              onChangeTransparency={onChangeTransparency}
              currentTransparency={
                transparencyNumber || activeObject.opacity * 100
              }
              currentColor={isImage ? activeObject.imgColor : activeObject.fill}
            />
            {isText && (
              <FunctionalityCommonColorButtonPopover
                isShowRightIcon={false}
                colorList={[
                  'transparent',
                  'black',
                  'white',
                  'blue',
                  'red',
                  'green',
                  'yellow',
                  'orange',
                  'purple',
                  'pink',
                  'brown',
                  'gray',
                ]}
                buttonProps={{
                  variant: 'text',
                }}
                onSelectedColor={onChangeBgColor}
                onChangeTransparency={onChangeTransparency}
                currentTransparency={
                  transparencyNumber || activeObject.opacity * 100
                }
                currentColor={activeObject.backgroundColor}
              />
            )}
          </Button>
        )}

        <Button onClick={onCopySelectedObject}>
          <FunctionalityCommonOperateIcon name='ContentCopy' />
        </Button>
        <Button onClick={() => deleteSelectedObjects()}>
          <FunctionalityCommonOperateIcon name='DeleteForeverOutlined' />
        </Button>
      </ButtonGroup>
    </Stack>
  )
}
export default FunctionalityCommonOperateFabricToolsPopup
