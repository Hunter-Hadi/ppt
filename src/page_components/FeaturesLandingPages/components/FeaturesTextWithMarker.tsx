import Box from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import React, { FC } from 'react';

interface IProps extends TypographyProps {
  marker?: boolean;
}

const FeaturesTextWithMarker: FC<IProps> = (props) => {
  const { marker, children, ...resetProps } = props;
  return (
    <Typography {...resetProps}>
      {/* marker */}
      {marker && (
        <Box
          component={'span'}
          sx={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: props.color ?? 'text.secondary',
            display: 'inline-block',
            marginRight: 1,
            verticalAlign: 'middle',
            mt: '-4px',
          }}
        />
      )}
      {children}
    </Typography>
  );
};

export default FeaturesTextWithMarker;
