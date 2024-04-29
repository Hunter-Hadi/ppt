import {
  Button,
  ButtonGroup,
  Input,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { cloneDeep } from 'lodash-es';
import { FC, useEffect, useMemo, useState } from 'react';

import {
  copyFabricSelectedObject,
  onChangeFabricColor,
  onChangeFabricFontStyle,
} from '@/features/functionality_sign_pdf/utils/fabricjsTools';

import FunctionalitySignPdfColorButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfColorButtonPopover';
import FunctionalitySignPdfCommonButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfCommonButtonPopover';
import FunctionalitySignPdfFontsButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfFontsButtonPopover';
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
import FunctionalitySignPdfShowPdfDateFormatsPopover from './FunctionalitySignPdfShowPdfDateFormatsPopover';
import { IControlDiv } from './FunctionalitySignPdfShowPdfViewRenderCanvas';
interface IFunctionalitySignPdfShowPdfViewObjectToolsPopupProps {
  controlDiv: IControlDiv;
  scaleFactor: number;
  editor: any;
}

/**
 * PDF的点击的  签名对象变更样式 全局弹窗视图
 */
const FunctionalitySignPdfShowPdfViewObjectToolsPopup: FC<
  IFunctionalitySignPdfShowPdfViewObjectToolsPopupProps
> = ({ controlDiv, editor, scaleFactor }) => {
  const [textAlignSelectIcon, setTextAlignSelectIcon] =
    useState<string>('FormatAlignLeft');
  const [transparencyNumber, setTransparencyNumber] = useState<
    undefined | number
  >(undefined);
  const [applicationKeys, setApplicationKeys] = useState<{
    [key in string]: boolean;
  }>({});

  const activeObject = useMemo(
    () => editor.canvas?.getActiveObject(),
    [editor.canvas],
  );

  const onChangeColor = (color) => {
    onChangeFabricColor(editor, color);
  };
  const onCopySelectedObject = () => {
    copyFabricSelectedObject(editor);
  };
  const onSelectedFonts = (fonts: string) => {
    onChangeFabricFontStyle(editor, 'fontFamily', fonts);
  };
  const onChangeFontSize = (size: number) => {
    onChangeFabricFontStyle(editor, 'fontSize', size);
  };

  const isImage = activeObject.type === 'image';
  const isText = activeObject.type === 'text';
  const fontStyleList: {
    key: string;
    sx?: SxProps<Theme>;
    name: string;
    isSelect: boolean;
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
  ];
  const fontBoxPositionList: {
    iconName: string;
    key: string;
    isSelect: boolean;
    fabricKey: string;
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
  ];
  useEffect(() => {
    if (activeObject) {
      const currentTextPosition = fontBoxPositionList.find(
        (fontBoxPosition) =>
          fontBoxPosition.fabricKey === activeObject.textAlign,
      );
      if (currentTextPosition) {
        setTextAlignSelectIcon(currentTextPosition.iconName);
      }
    }
  }, [activeObject]);
  const addApplicationButtonKey = (key) => {
    applicationKeys[key] = !applicationKeys[key];
    setApplicationKeys(cloneDeep(applicationKeys));
  };
  const checkIsSelect = (item) =>
    applicationKeys[item.key] !== undefined
      ? applicationKeys[item.key]
      : item.isSelect;
  const onChangeTransparency = (value: number) => {
    const convertedValue = (value - 1) / 99; // 转换为 0-1 的范围
    const roundedValue = convertedValue.toFixed(1); // 保留小数点后一位
    onChangeFabricFontStyle(editor, 'opacity', roundedValue);
    setTransparencyNumber(value);
  };
  const onChangeBgColor = (color: string) => {
    onChangeFabricFontStyle(editor, 'backgroundColor', color);
  };
  const onHandleDateFormatsValue = (value: string) => {
    console.log('onHandleDateFormatsValue', value);
    onChangeFabricFontStyle(editor, 'text', value);
  };
  return (
    <Stack
      sx={{
        position: 'fixed',
        left: controlDiv.left * scaleFactor + controlDiv.windowLeft,
        top: controlDiv.top * scaleFactor + controlDiv.windowTop - 50,
      }}
    >
      <ButtonGroup
        variant='outlined'
        sx={{
          borderRadius: 2,
          bgcolor: '#fafafa',
          height: 40,
        }}
      >
        {!isImage && !isText && (
          <FunctionalitySignPdfFontsButtonPopover
            currentFonts={activeObject?.fontFamily}
            isShowFontsName={true}
            fontSize={18}
            onSelectedFonts={onSelectedFonts}
            fontsList={[
              'Concert One',
              'Roboto',
              'Courier Prime',
              'Noto Serif',
              'EB Garamond',
              'Ma Shan Zheng',
              'Oswald',
              'Playfair Display',
              'Roboto Slab',
              'Embed code',
              'Teko',
              'Pacifico',
              'Lobster',
              'Permanent Marker',
              'Zeyada',
              'Orbitron',
            ]}
          />
        )}
        <Button>
          {activeObject.isDateValid && (
            <FunctionalitySignPdfShowPdfDateFormatsPopover
              value={activeObject?.text}
              onHandleValue={onHandleDateFormatsValue}
            />
          )}
          {!isImage && (
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
                onChangeFontSize(Number(e.target.value));
              }}
            />
          )}
        </Button>

        {!isImage && (
          <Button>
            {/* 这个是文字的风格按钮 */}
            <FunctionalitySignPdfCommonButtonPopover
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
                        e.stopPropagation();
                        onChangeFabricFontStyle(editor, item.key);
                        addApplicationButtonKey(item.key);
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
            </FunctionalitySignPdfCommonButtonPopover>
            {/* 下面的是文字位置的按钮 */}
            <FunctionalitySignPdfCommonButtonPopover
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
                        e.stopPropagation();
                        onChangeFabricFontStyle(editor, 'textAlign', item.key);
                        setTextAlignSelectIcon(item.iconName);
                      }}
                    >
                      <FunctionalitySignPdfIcon name={item.iconName} />
                    </Button>
                  ))}
                </Stack>
              }
            >
              <FunctionalitySignPdfIcon name={textAlignSelectIcon} />
            </FunctionalitySignPdfCommonButtonPopover>
          </Button>
        )}
        <Button>
          <FunctionalitySignPdfColorButtonPopover
            titleText={!isImage ? 'A' : ''}
            isShowRightIcon={false}
            btnProps={{
              variant: 'text',
            }}
            onSelectedColor={onChangeColor}
            onChangeTransparency={onChangeTransparency}
            currentTransparency={
              transparencyNumber || activeObject.opacity * 100
            }
            currentColor={isImage ? activeObject.imgColor : activeObject.fill}
          />
          {!isImage && (
            <FunctionalitySignPdfColorButtonPopover
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
              btnProps={{
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

        <Button onClick={onCopySelectedObject}>
          <FunctionalitySignPdfIcon name='ContentCopy' />
        </Button>
        <Button onClick={() => editor?.deleteSelected()}>
          <FunctionalitySignPdfIcon name='DeleteForeverOutlined' />
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
export default FunctionalitySignPdfShowPdfViewObjectToolsPopup;
