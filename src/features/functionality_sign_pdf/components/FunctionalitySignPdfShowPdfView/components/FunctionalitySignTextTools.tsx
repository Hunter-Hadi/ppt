import { Button, ButtonGroup, Stack } from '@mui/material';
import { FC } from 'react';

import {
  copyFabricSelectedObject,
  onChangeFabricColor,
} from '@/features/functionality_sign_pdf/utils/fabricjsTools';

import FunctionalitySignPdfIcon from '../../FunctionalitySignPdfIcon';
import FunctionalitySignPdfColorButtonPopover from '../../FunctionalitySignPdfOperationView/components/FunctionalitySignPdfColorButtonPopover';
import FunctionalitySignPdfFontsButtonPopover from '../../FunctionalitySignPdfOperationView/components/FunctionalitySignPdfFontsButtonPopover';
interface IFunctionalitySignTextTools {
  controlDiv: {
    left: number;
    top: number;
    scaleFactor: number;
  };
  editor: any;
}
export const FunctionalitySignTextTools: FC<IFunctionalitySignTextTools> = ({
  controlDiv,
  editor,
}) => {
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
    const activeObject = editor.canvas?.getActiveObject();
    if (activeObject) {
      activeObject.set('fontFamily', fonts);
      editor.canvas.renderAll(); // 更新画布以显示颜色变更
    }
  };
  return (
    <Stack
      sx={{
        position: 'absolute',
        transform: `scale(${1 / controlDiv.scaleFactor})`,
        left: controlDiv.left,
        top: controlDiv.top - 45 / controlDiv.scaleFactor,
      }}
    >
      <ButtonGroup
        variant='outlined'
        sx={{
          borderRadius: 2,
          bgcolor: '#fafafa',
        }}
        aria-label='Basic button group'
      >
        <FunctionalitySignPdfFontsButtonPopover
          text={''}
          onSelectedFonts={onSelectedFonts}
        />
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
