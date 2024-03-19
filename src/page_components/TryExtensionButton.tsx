import { Button, SxProps, Typography } from '@mui/material';
import React, { FC } from 'react';

import { EXTENSION_SHARE_TRACKER_LINK } from '@/global_constants';

interface IProps {
  sx?: SxProps;
  propRef?: string;
}

const TryExtensionButton: FC<IProps> = ({ sx, propRef }) => {
  return (
    <Button
      href={`${EXTENSION_SHARE_TRACKER_LINK}?ref=${propRef}`}
      target='_blank'
      sx={{
        position: 'absolute',
        top: -24,
        left: '50%',
        bgcolor: '#F4EBFB',
        transform: 'translateX(-50%)',
        borderRadius: 99,
        px: 2,
        py: 1,
        whiteSpace: 'nowrap',
        ...sx,
      }}
    >
      <Typography color='primary'>{`Try our partner's new extension 👇`}</Typography>
    </Button>
  );
};

export default TryExtensionButton;
