import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { IUserCommentType } from '@/features/landing/constants/userComment';

import CommentTypeIcons from './CommentTypeIcons';

interface IProps {
  active?: boolean;
  type: IUserCommentType;
  label: string;
}

const FeaturesSelector: FC<IProps> = ({ active, type, label }) => {
  const { t } = useTranslation();

  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        bgcolor: active ? 'white' : '#F9FAFB',
        border: '2px solid',
        borderColor: active ? '#9065B03D' : '#F9FAFB',
        p: 2,
        borderRadius: 4,
        transition: 'all 0.3s ease',
        cursor: active ? 'default' : 'pointer',
        minWidth: 190,
        boxSizing: 'border-box',
      }}
      spacing={2}
    >
      <CommentTypeIcons icon={type} />
      <Typography
        variant='custom'
        fontSize={18}
        fontWeight={700}
        textAlign='center'
      >
        {t(label)}
      </Typography>
    </Stack>
  );
};

export default FeaturesSelector;
