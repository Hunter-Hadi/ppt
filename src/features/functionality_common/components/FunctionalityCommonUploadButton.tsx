import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import UploadButton, {
  IUploadButtonProps,
} from '@/features/common/components/UploadButton';
import FunctionalityCommonIcon from '@/features/functionality_common/components/FunctionalityCommonIcon';

/**
 * Functionality公共的上传组件
 * 为了统一的上传按钮样式
 */
const FunctionalityCommonUploadButton: FC<IUploadButtonProps> = (props) => {
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
      <FunctionalityCommonIcon sx={{ fontSize: 34 }} name='CloudUploadIcon' />
      <Typography
        sx={{
          fontSize: {
            xs: 12,
            lg: 14,
          },
        }}
      >
        {t('functionality__pdf_to_image:components__index__upload_title')}
      </Typography>
    </UploadButton>
  );
};

export default FunctionalityCommonUploadButton;
