import { Box, Popover } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { FC, useEffect, useState } from 'react';

import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
interface IFunctionalitySignPdfColorButtonPopoverProps {
  onSelectedColor: (color: string) => void;
  currentColor?: string;
}
/**
 * 签名颜色选择按钮
 */
const FunctionalitySignPdfColorButtonPopover: FC<
  IFunctionalitySignPdfColorButtonPopoverProps
> = ({ onSelectedColor, currentColor }) => {
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [currentShowColor, setShowCurrentColor] = useState('black');

  const handleClick = (event) => {
    setPopoverAnchorEl(popoverAnchorEl ? null : event.currentTarget);
  };
  useEffect(() => {
    if (currentColor) {
      setShowCurrentColor(currentColor);
    }
  }, [currentColor]);
  const handleColorSelect = (color) => {
    setPopoverAnchorEl(null);
    onSelectedColor(color);
    setShowCurrentColor(color);
  };

  const open = Boolean(popoverAnchorEl);
  const id = open ? 'color-popper' : undefined;

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
      <Box
        sx={{
          width: 20,
          height: 20,
          bgcolor: currentShowColor,
          borderRadius: '50%',
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={popoverAnchorEl}
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
            ' button': {
              border: '1px solid transparent!important',
            },
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
    </Button>
  );
};
export default FunctionalitySignPdfColorButtonPopover;
