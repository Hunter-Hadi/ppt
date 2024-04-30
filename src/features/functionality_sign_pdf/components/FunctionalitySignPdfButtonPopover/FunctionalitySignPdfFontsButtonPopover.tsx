import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useMemo, useState } from 'react';

import FunctionalitySignPdfCommonButtonPopover from './FunctionalitySignPdfCommonButtonPopover';
interface IFunctionalitySignPdfColorButtonPopoverProps {
  currentFont?: string;
  optionShowTitle?: string;
  onSelectedFont: (fonts: string) => void;
  isShowFontsName?: boolean;
  fontSize?: number;
  fontsList?: string[];
  title?: string;
}
/**
 * 用于选择字体的弹出式按钮
 */
const FunctionalitySignPdfFontsButtonPopover: FC<
  IFunctionalitySignPdfColorButtonPopoverProps
> = ({
  onSelectedFont,
  optionShowTitle,
  currentFont,
  fontSize,
  fontsList,
  title,
}) => {
  const { t } = useTranslation();
  const defaultAndCustomFontsList = useMemo(
    () => [...(fontsList || []), 'Caveat', 'La Belle Aurore', 'Dancing Script'],
    [fontsList],
  );
  const [newCurrentFont, setNewCurrentFont] = useState(
    t(
      'functionality__sign_pdf:components__sign_pdf__button_popover__change_style',
    ),
  );

  const handleColorSelect = (fonts) => {
    onSelectedFont(fonts);
    setNewCurrentFont(fonts);
  };
  useEffect(() => {
    if (currentFont) {
      setNewCurrentFont(currentFont);
    }
  }, [currentFont]);
  return (
    <FunctionalitySignPdfCommonButtonPopover
      buttonProps={{
        variant: 'outlined',
      }}
      popoverView={
        <Box>
          {defaultAndCustomFontsList.map((fonts) => (
            <Box key={fonts}>
              <Button
                sx={{
                  width: '100%',
                }}
                onClick={() => handleColorSelect(fonts)}
              >
                <Typography
                  color={'text.primary'}
                  sx={{
                    fontWeight: 'bold',
                    fontFamily: fonts,
                    fontSize: {
                      xs: fontSize || 25,
                      lg: fontSize || 25,
                    },
                  }}
                >
                  {optionShowTitle || fonts}
                </Typography>
              </Button>
            </Box>
          ))}
        </Box>
      }
    >
      <Box>
        <Typography
          color='text.secondary'
          sx={{
            fontWeight: 'bold',
            fontSize: {
              xs: 12,
              lg: 16,
            },
          }}
        >
          {title || newCurrentFont}
        </Typography>
      </Box>
    </FunctionalitySignPdfCommonButtonPopover>
  );
};
export default FunctionalitySignPdfFontsButtonPopover;
