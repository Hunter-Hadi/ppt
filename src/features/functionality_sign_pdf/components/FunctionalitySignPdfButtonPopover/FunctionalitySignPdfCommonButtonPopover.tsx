import { Popover } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import React, { FC, useState } from 'react';

import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
interface IFunctionalitySignPdfCommonButtonPopoverProps {
  children?: React.ReactNode;
  popoverView?: React.ReactNode;
}

const FunctionalitySignPdfCommonButtonPopover: FC<
  IFunctionalitySignPdfCommonButtonPopoverProps
> = ({ children, popoverView }) => {
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);

  const handleClick = (event) => {
    setPopoverAnchorEl(popoverAnchorEl ? null : event.currentTarget);
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
      {children}
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
          {popoverView}
        </Paper>
      </Popover>
    </Button>
  );
};
export default FunctionalitySignPdfCommonButtonPopover;
