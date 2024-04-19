import { Box, Typography } from '@mui/material';
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
    <Box
      sx={{
        width: '100%',
        bgcolor: 'primary.main',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          border: '1px dashed #fff',
          margin: 1,
          borderRadius: 2,
          height: 280,
        }}
      >
        <UploadButton
          buttonProps={{
            fullWidth: true,
            sx: {
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            },
            variant: 'contained',
          }}
          inputProps={{
            accept: 'application/pdf',
            multiple: true,
          }}
          {...props}
        >
          <FunctionalityCommonIcon
            sx={{ fontSize: 50 }}
            name='CloudUploadIcon'
          />
          <Typography
            sx={{
              fontSize: {
                xs: 18,
                lg: 20,
              },
            }}
          >
            {t('functionality__pdf_to_image:components__index__upload_title')}
          </Typography>
        </UploadButton>
      </Box>
    </Box>
  );
};

export default FunctionalityCommonUploadButton;
