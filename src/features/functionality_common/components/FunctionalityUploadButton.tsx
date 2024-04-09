import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import UploadButton, {
  IUploadButtonProps,
} from '@/features/common/components/UploadButton';
import FunctionalityIcon from '@/features/functionality_common/components/FunctionalityIcon';

/**
 * Functionality公共的上传组件
 * 为了统一的上传按钮样式
 */
const FunctionalityUploadButton: FC<IUploadButtonProps> = (props) => {
  const { t } = useTranslation();

  return (
    <UploadButton
      buttonProps={{
        sx: {
          display: 'flex',
          flexDirection: 'column',
          height: 280,
          width: 260,
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed',
        },
        variant: 'outlined',
      }}
      inputProps={{
        accept: 'application/pdf',
        multiple: true,
      }}
      {...props}
    >
      <FunctionalityIcon sx={{ fontSize: 35 }} name='CloudUploadIcon' />
      <Typography
        sx={{
          fontSize: {
            xs: 12,
            lg: 13,
          },
        }}
      >
        {t('functionality__pdf_to_image:components__index__upload_title')}
      </Typography>
    </UploadButton>
  );
};

export default FunctionalityUploadButton;
