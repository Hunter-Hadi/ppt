import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { textToBase64Image } from '../../utils/toBase64';
import FunctionalitySignPdfColorButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfColorButtonPopover';
import FunctionalitySignPdfFontsButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfFontsButtonPopover';
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
// 定义通过ref暴露的方法的接口
export interface IFunctionalitySignPdfSignatureTypeHandles {
  getPngBase64: () => string | undefined;
}
interface IFunctionalitySignPdfOperationSignatureTypeProps {
  bottomView: (isValuable: boolean) => React.ReactNode;
}
/**
 * 输入文字签名
 */
const FunctionalitySignPdfOperationSignatureType: ForwardRefRenderFunction<
  IFunctionalitySignPdfSignatureTypeHandles,
  IFunctionalitySignPdfOperationSignatureTypeProps
> = ({ bottomView }, ref) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLDivElement | null>(null);

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
          title={t(
            'functionality__sign_pdf:components__sign_pdf__button_popover__change_style',
          )}
          optionShowTitle={
            typeInputVal ||
            t(
              'functionality__sign_pdf:components__sign_pdf__operation_view__your_sign',
            )
          }
          onSelectedFont={onSelectedFonts}
        />
      </Stack>
      <Box
        sx={{
          bgcolor: '#fafafa',
          position: 'relative',
          padding: 1,
        }}
      >
        <Box
          sx={{
            pl: 10,
            pr: 5,
            position: 'relative',
          }}
        >
          <TextField
            fullWidth
            variant='standard'
            ref={inputRef}
            value={typeInputVal}
            onChange={(e) => setTypeInputVal(e.target.value)}
            sx={{
              top: 45,
              input: {
                fontFamily: currentFonts,
                color: currentColor,
              },
              '.MuiInputBase-root': {
                height: 80,
                fontSize: 98,
                '&:hover': {
                  'border-bottom': '0!important',
                },
                '&:before': {
                  'border-bottom': '0!important',
                },
                '&:after': {
                  'border-bottom': '0!important',
                },
              },
              border: 0,
            }}
          />
        </Box>
        {typeInputVal.length === 0 && (
          <Typography
            color='text.secondary'
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              pointerEvents: 'none',
              fontSize: {
                lg: 12,
              },
            }}
          >
            {t(
              'functionality__sign_pdf:components__sign_pdf__operation_view__start__typing',
            )}
          </Typography>
        )}
        <FunctionalitySignPdfIcon name='SignArrowIndicate' />
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
