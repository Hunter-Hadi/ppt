import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import { Stack, SxProps } from '@mui/material';
import React, { FC } from 'react';

interface IProps {
  count: number;
  size?: number;
  sx?: SxProps;
}

const Stars: FC<IProps> = ({ count, sx, size = 24 }) => {
  return (
    <Stack direction={'row'} alignItems='center' sx={sx}>
      {Array.from({ length: count }).map((_, index) => (
        <GradeRoundedIcon
          key={index}
          sx={{
            color: '#F5A523',
            fontSize: size,
          }}
        />
      ))}
    </Stack>
  );
};

export default Stars;
