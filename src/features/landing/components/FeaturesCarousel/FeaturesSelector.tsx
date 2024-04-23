import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import { IFeaturesCarouselItem, IFeaturesCarouselItemKey } from '.';
import FeaturesCarouselIcons from './FeaturesCarouselIcons';

interface IProps extends IFeaturesCarouselItem {
  active?: boolean;
  onClick?: (value: IFeaturesCarouselItemKey) => void;
}

const FeaturesSelector: FC<IProps> = ({
  active,
  icon,
  label,
  value,
  onClick,
}) => {
  const { t } = useTranslation();

  return (
    <Stack
      sx={{
        bgcolor: active ? 'white' : '#F9FAFB',
        border: '2px solid',
        borderColor: active ? '#9065B03D' : '#F9FAFB',
        py: 2,
        px: 1.5,
        borderRadius: 4,
        transition: 'all 0.3s ease',
        cursor: active ? 'default' : 'pointer',
        minWidth: 150,
        boxSizing: 'border-box',
      }}
      onClick={() => {
        onClick && onClick(value);
      }}
      spacing={2}
    >
      <FeaturesCarouselIcons icon={icon} />
      <Typography variant='custom' fontSize={18} fontWeight={700}>
        {t(label)}
      </Typography>
    </Stack>
  );
};

export default FeaturesSelector;
