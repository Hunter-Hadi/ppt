import { Box, Button, Stack, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from 'react';

import { textToBase64Image } from '../../utils/toBase64';
import FunctionalitySignPdfColorButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfColorButtonPopover';
import FunctionalitySignPdfFontsButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfFontsButtonPopover';
// 定义通过ref暴露的方法的接口
export interface IFunctionalitySignPdfSignatureTypeHandles {
  getPngBase64: () => string | undefined;
}
interface IFunctionalitySignPdfOperationSignatureTypeProps {
  bottomView: (isInput: boolean) => React.ReactNode;
}
/**
 * 输入文字签名
 */
const FunctionalitySignPdfOperationSignatureType: ForwardRefRenderFunction<
  IFunctionalitySignPdfSignatureTypeHandles,
  IFunctionalitySignPdfOperationSignatureTypeProps
> = ({ bottomView }, ref) => {
  const { t } = useTranslation();

  const [currentColor, setCurrentColor] = useState<string>('block');
  const [currentFonts, setCurrentFonts] = useState<string>('Caveat, cursive');
  const [typeInputVal, setTypeInputVal] = useState('');
  useImperativeHandle(ref, () => ({
    getPngBase64: () => {
      if (typeInputVal) {
        return textToBase64Image(typeInputVal, currentColor, currentFonts);
      }
      return '';
    },
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
            {t(
              'functionality__sign_pdf:components__sign_pdf__operation_view__clear',
            )}
          </Button>
        </Stack>
      </Box>
      {bottomView(typeInputVal.length === 0)}
    </Box>
  );
};
export default forwardRef(FunctionalitySignPdfOperationSignatureType);
