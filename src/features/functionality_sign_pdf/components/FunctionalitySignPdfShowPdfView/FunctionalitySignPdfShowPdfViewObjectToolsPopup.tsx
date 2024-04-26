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
import { FC, useMemo, useState } from 'react';

import {
  copyFabricSelectedObject,
  onChangeFabricColor,
  onChangeFabricFontStyle,
} from '@/features/functionality_sign_pdf/utils/fabricjsTools';

import FunctionalitySignPdfColorButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfColorButtonPopover';
import FunctionalitySignPdfCommonButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfCommonButtonPopover';
import FunctionalitySignPdfFontsButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfFontsButtonPopover';
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
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
  const [applicationKeys, setApplicationKeys] = useState<{
    [key in string]: boolean;
  }>({});
  const activeObject = useMemo(
    () => editor.canvas?.getActiveObject(),
    [editor.canvas],
  );
  const onChangeColor = (color) => {
    if (editor) {
      onChangeFabricColor(editor, color);
    }
  };
  const onCopySelectedObject = () => {
    if (editor) {
      copyFabricSelectedObject(editor);
    }
  };
  const onSelectedFonts = (fonts: string) => {
    console.log('simply activeObject', activeObject);
    if (activeObject) {
      activeObject.set('fontFamily', fonts);
      editor.canvas.renderAll(); // 更新画布以显示颜色变更
    }
  };
  const onChangeFontSize = (size: number) => {
    activeObject.set('fontSize', Math.max(15, size || 0));
    editor.canvas.renderAll(); // 更新画布以显示颜色变更
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
  const addApplicationButtonKey = (key) => {
    applicationKeys[key] = !applicationKeys[key];
    setApplicationKeys(cloneDeep(applicationKeys));
  };
  const checkIsSelect = (item) =>
    applicationKeys[item.key] !== undefined
      ? applicationKeys[item.key]
      : item.isSelect;
  console.log('simply applicationKeys', applicationKeys);
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
        {!isImage && (
          <Button>
            <Input
              sx={{
                width: 50,
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
          </Button>
        )}
        {!isImage && (
          <FunctionalitySignPdfCommonButtonPopover
            popoverView={
              <Stack direction='row' gap={1}>
                {fontStyleList.map((item) => (
                  <Button
                    key={item.key}
                    sx={{
                      backgroundColor: checkIsSelect(item)
                        ? '#64467b52'
                        : '#fafafa',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChangeFabricFontStyle(editor, item.key);
                      addApplicationButtonKey(item.key);
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: 20,
                          lg: 20,
                        },
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
                fontSize: {
                  xs: 20,
                  lg: 20,
                },
                textDecoration: 'underline',
              }}
            >
              B
            </Typography>
          </FunctionalitySignPdfCommonButtonPopover>
        )}
        <FunctionalitySignPdfColorButtonPopover
          onSelectedColor={onChangeColor}
          currentColor={isImage ? activeObject.imgColor : activeObject.fill}
        />
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
