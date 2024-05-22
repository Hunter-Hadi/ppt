import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import { FEATURES_CONTENT_DATA_MAP, IFeaturesCarouselItemKey } from '.';
import FeaturesCarouselIcons from './FeaturesCarouselIcons';

interface IProps {
  activeCarouseItem: IFeaturesCarouselItemKey;
  active?: boolean;
  onClick?: (value: IFeaturesCarouselItemKey) => void;
}

const FeaturesSelector: FC<IProps> = ({
  activeCarouseItem,
  active,
  onClick,
}) => {
  const { t } = useTranslation();

  const activeCarouseItemData = FEATURES_CONTENT_DATA_MAP[activeCarouseItem];

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
        onClick && onClick(activeCarouseItem);
      }}
      spacing={2}
    >
      <FeaturesCarouselIcons icon={activeCarouseItemData.icon} />
      <Typography variant='custom' fontSize={18} fontWeight={700}>
        {t(activeCarouseItemData.label)}
      </Typography>
    </Stack>
  );
};

export default FeaturesSelector;
