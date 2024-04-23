import { Box, Popover } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { FC, useState } from 'react';

import FunctionalitySignPdfIcon from '../../FunctionalitySignPdfIcon';
interface IFunctionalitySignPdfColorButtonPopoverProps {
  onSelectedColor: (coloe: string) => void;
}
const FunctionalitySignPdfColorButtonPopover: FC<
  IFunctionalitySignPdfColorButtonPopoverProps
> = ({ onSelectedColor }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentColor, setCurrentColor] = useState('black');

  const handleClick = (event) => {
    console.log('666', event.currentTarget);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleColorSelect = (color) => {
    setAnchorEl(null);
    onSelectedColor(color);
    setCurrentColor(color);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'color-popper' : undefined;

  return (
    <Box onClick={handleClick}>
      <Button
        aria-describedby={id}
        sx={{
          bgcolor: '#fafafa',
          p: 1,
        }}
        endIcon={<FunctionalitySignPdfIcon name='ArrowDropDown' />}
      >
        <Box
          sx={{
            width: 20,
            height: 20,
            bgcolor: currentColor,
            borderRadius: '50%',
          }}
        />
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Paper
          sx={{
            p: 1,
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          {['black', 'blue', 'red'].map((color) => (
            <Button onClick={() => handleColorSelect(color)} key={color}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: color,
                  '&:hover': {
                    backgroundColor: color,
                  },
                }}
              ></Box>
            </Button>
          ))}
        </Paper>
      </Popover>
    </Box>
  );
};
export default FunctionalitySignPdfColorButtonPopover;
