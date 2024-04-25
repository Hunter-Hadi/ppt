import { Box, Popover, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useTranslation } from 'next-i18next';
import { FC, useMemo, useState } from 'react';

import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
interface IFunctionalitySignPdfColorButtonPopoverProps {
  currentFonts?: string;
  text?: string;
  onSelectedFonts: (fonts: string) => void;
  isShowFontsName?: boolean;
  fontSize?: number;
  fontsList?: string[];
}
/**
 * 用于选择字体的弹出式按钮
 */
const FunctionalitySignPdfFontsButtonPopover: FC<
  IFunctionalitySignPdfColorButtonPopoverProps
> = ({
  onSelectedFonts,
  text,
  currentFonts,
  isShowFontsName,
  fontSize,
  fontsList,
}) => {
  const { t } = useTranslation();
  const newFontsList = useMemo(
    () => [...(fontsList || []), 'Caveat', 'La Belle Aurore', 'Dancing Script'],
    [fontsList],
  );
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [newCurrentFonts, setNewCurrentFonts] = useState();

  const handleClick = (event) => {
    setPopoverAnchorEl(popoverAnchorEl ? null : event.currentTarget);
  };

  const handleColorSelect = (fonts) => {
    setPopoverAnchorEl(null);
    onSelectedFonts(fonts);
    setNewCurrentFonts(fonts);
  };

  const open = Boolean(popoverAnchorEl);
  const id = open ? 'fonts-popper' : undefined;

  return (
    <Button
      onClick={handleClick}
      aria-describedby={id}
      sx={{
        bgcolor: '#fafafa',
        p: 1,
      }}
      endIcon={<FunctionalitySignPdfIcon name='ArrowDropDown' />}
    >
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
        {currentFonts
          ? newCurrentFonts || currentFonts
          : t(
              'functionality__sign_pdf:components__sign_pdf__button_popover__change_style',
            )}
      </Typography>
      <Popover
        open={open}
        anchorEl={popoverAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          ' button': {
            border: '1px solid transparent!important',
          },
        }}
      >
        {newFontsList.map((fonts) => (
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
                {isShowFontsName ? fonts : text || 'Your Signature'}
              </Typography>
            </Button>
          </Box>
        ))}
      </Popover>
    </Button>
  );
};
export default FunctionalitySignPdfFontsButtonPopover;
