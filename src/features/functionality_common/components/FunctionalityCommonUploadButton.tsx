import { Box, Button, Typography } from '@mui/material';
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
            disableRipple: true,
            sx: {
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                bgcolor: 'transparent',
              },
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
            sx={{ fontSize: 68 }}
            name='CloudUploadIcon'
          />
          <Button
            variant='contained'
            sx={{
              my: 1,
              width: 240,
              height: 54,
              bgcolor: '#ffffff',
              color: '#000000',
              fontSize: 16,
              fontWeight: 700,
            }}
            startIcon={<FunctionalityCommonIcon name='NoteAdd' />}
            color='inherit'
          >
            {t('functionality__common:components__common__upload_button_title')}
          </Button>
          <Typography
            sx={{
              fontSize: {
                xs: 14,
                lg: 16,
              },
            }}
          >
            {t('functionality__common:components__common__upload_button_tips')}
          </Typography>
        </UploadButton>
      </Box>
    </Box>
  );
};

export default FunctionalityCommonUploadButton;
