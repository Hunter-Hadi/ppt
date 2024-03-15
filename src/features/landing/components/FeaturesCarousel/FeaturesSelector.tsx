import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

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
        p: 2,
        borderRadius: 4,
        transition: 'all 0.3s ease',
        cursor: active ? 'default' : 'pointer',
        minWidth: 180,
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
