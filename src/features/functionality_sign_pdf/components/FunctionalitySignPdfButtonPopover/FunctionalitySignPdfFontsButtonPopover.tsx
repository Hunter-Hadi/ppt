import { Box, Popover, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { FC, useState } from 'react';

import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
interface IFunctionalitySignPdfColorButtonPopoverProps {
  currentFonts?: string;
  text?: string;
  onSelectedFonts: (fonts: string) => void;
  isShowFontsName?: boolean;
  fontSize?: number;
}
const FunctionalitySignPdfFontsButtonPopover: FC<
  IFunctionalitySignPdfColorButtonPopoverProps
> = ({ onSelectedFonts, text, currentFonts, isShowFontsName, fontSize }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [newCurrentFonts, setNewCurrentFonts] = useState('');

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleColorSelect = (fonts) => {
    setAnchorEl(null);
    onSelectedFonts(fonts);
    setNewCurrentFonts(fonts);
  };

  const open = Boolean(anchorEl);
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
        {currentFonts ? newCurrentFonts || currentFonts : 'Change style'}
      </Typography>
      <Popover
        open={open}
        anchorEl={anchorEl}
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
        {[
          'Caveat, cursive',
          '"La Belle Aurore", cursive',
          '"Dancing Script", cursive',
        ].map((fonts) => (
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
