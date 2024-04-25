import { Button, ButtonGroup, OutlinedInput, Stack } from '@mui/material';
import { FC, useMemo } from 'react';

import {
  copyFabricSelectedObject,
  onChangeFabricColor,
} from '@/features/functionality_sign_pdf/utils/fabricjsTools';

import FunctionalitySignPdfColorButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfColorButtonPopover';
import FunctionalitySignPdfFontsButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfFontsButtonPopover';
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
import { IControlDiv } from './FunctionalitySignPdfRenderCanvas';
interface IFunctionalitySignTextTools {
  controlDiv: IControlDiv;
  scaleFactor: number;
  editor: any;
}
export const FunctionalitySignTextTools: FC<IFunctionalitySignTextTools> = ({
  controlDiv,
  editor,
  scaleFactor,
}) => {
  const activeObject = useMemo(() => editor.canvas?.getActiveObject(), []);

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
              // 'Helvetica',
              // 'Times New Roman',
              'Courier Prime',
              // 'Georgia',
              'Noto Serif',
              // 'Verdana',
              // 'Sans-serif',
              // 'Lucida Console',
              // 'Monospace',
              // 'Tahoma',
              // 'Trebuchet MS',
              'EB Garamond',
              // 'Brush Script MT',
            ]}
          />
        )}
        {!isImage && (
          <OutlinedInput
            sx={{
              width: 70,
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
        <FunctionalitySignPdfColorButtonPopover
          onSelectedColor={onChangeColor}
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
