import { Box, Button, Stack, TextField } from '@mui/material';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from 'react';

import FunctionalitySignPdfColorButtonPopover from './FunctionalitySignPdfColorButtonPopover';
import FunctionalitySignPdfFontsButtonPopover from './FunctionalitySignPdfFontsButtonPopover';
// 定义通过ref暴露的方法的接口
export interface IFunctionalitySignPdfSignatureTypeHandles {
  getTextVal: () => string;
}
const FunctionalitySignPdfSignatureType: ForwardRefRenderFunction<
  IFunctionalitySignPdfSignatureTypeHandles
> = (props, ref) => {
  const [currentColor, setCurrentColor] = useState<string>('block');
  const [currentFonts, setCurrentFonts] = useState<string>('Caveat, cursive');
  const [typeInputVal, setTypeInputVal] = useState('');
  useImperativeHandle(ref, () => ({
    getTextVal: () => typeInputVal,
  }));
  const onSelectedColor = (color: string) => {
    setCurrentColor(color);
  };
  const onSelectedFonts = (fonts: string) => {
    setCurrentFonts(fonts);
  };
  return (
    <Box>
      <Stack direction='row' mb={1} gap={1}>
        <FunctionalitySignPdfColorButtonPopover
          onSelectedColor={onSelectedColor}
        />
        <FunctionalitySignPdfFontsButtonPopover
          text={typeInputVal}
          onSelectedFonts={onSelectedFonts}
        />
      </Stack>
      <Box
        sx={{
          bgcolor: '#fafafa',
          position: 'relative',
        }}
      >
        <TextField
          placeholder='Enter signature'
          fullWidth
          variant='standard'
          value={typeInputVal}
          onChange={(e) => setTypeInputVal(e.target.value)}
          sx={{
            input: {
              fontFamily: currentFonts,
              color: currentColor,
            },
            '.MuiInputBase-root': {
              height: 150,
              fontSize: 66,
            },
            border: 0,
          }}
        />
        <Stack
          sx={{
            borderTop: '1px solid #e8e8e8',
            p: 1,
          }}
          direction='row-reverse'
        >
          <Button
            disabled={typeInputVal.length === 0}
            onClick={() => setTypeInputVal('')}
          >
            Clear
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default forwardRef(FunctionalitySignPdfSignatureType);
