import Typography from '@mui/material/Typography';
import React, { FC } from 'react';

import FeaturesLandingIcons from '@/page_components/FeaturesPages/components/FeaturesLandingIcons';

interface IProps {
  name: string;
}

const PoweredBy: FC<IProps> = ({ name }) => {
  return (
    <Typography
      variant='custom'
      fontSize={{
        xs: 48,
        sm: 56,
      }}
      fontWeight={700}
    >
      Powered by{' '}
      <Typography
        variant='custom'
        fontSize={'inherit'}
        fontWeight={700}
        sx={{
          position: 'relative',
        }}
      >
        {name}
        <FeaturesLandingIcons
          icon='line'
          sx={{
            position: 'absolute',
            fontSize: {
              xs: 210,
              sm: 233,
            },
            top: '-60%',
            right: '0%',
            userSelect: 'none',
          }}
        />
      </Typography>
    </Typography>
  );
};

export default PoweredBy;
