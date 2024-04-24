import { Box, Popover, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { FC, useState } from 'react';

import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
interface IFunctionalitySignPdfColorButtonPopoverProps {
  text: string;
  onSelectedFonts: (fonts: string) => void;
}
const FunctionalitySignPdfFontsButtonPopover: FC<
  IFunctionalitySignPdfColorButtonPopoverProps
> = ({ onSelectedFonts, text }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleColorSelect = (fonts) => {
    setAnchorEl(null);
    onSelectedFonts(fonts);
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
        Change style
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
                    xs: 25,
                    lg: 25,
                  },
                }}
              >
                {text || 'Your Signature'}
              </Typography>
            </Button>
          </Box>
        ))}
      </Popover>
    </Button>
  );
};
export default FunctionalitySignPdfFontsButtonPopover;
