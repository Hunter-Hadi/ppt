import { Box, Button, SxProps, Theme, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import UploadButton, {
  IUploadButtonProps,
} from '@/features/common/components/UploadButton';
import FunctionalityCommonIcon from '@/features/functionality_common/components/FunctionalityCommonIcon';

interface IFunctionalityCommonUploadButton {
  wrapBoxSx?: SxProps<Theme>;
  contentBoxSx?: SxProps<Theme>;
  isShowUploadIcon?: boolean;
  themeColor?: 'primary' | 'white';
  buttonTitle?: string;
  dropDescription?: string;
}

/**
 * Functionality公共的上传组件
 * 为了统一的上传按钮样式
 */
const FunctionalityCommonUploadButton: FC<
  IUploadButtonProps & IFunctionalityCommonUploadButton
> = ({
  wrapBoxSx,
  contentBoxSx,
  isShowUploadIcon = true,
  themeColor = 'primary',
  buttonTitle,
  dropDescription,
  ...props
}) => {
  const { t } = useTranslation();
  const isPrimary = themeColor === 'primary';
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: isPrimary ? 'primary.main' : '#fafafa',
        borderRadius: 2,
        ...wrapBoxSx,
      }}
    >
      <Box
        sx={{
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: isPrimary ? '#fff' : 'primary.main',
          margin: 1,
          borderRadius: 2,
          height: 280,
          ...contentBoxSx,
        }}
      >
        <UploadButton
          fontColor={isPrimary ? undefined : 'primary.main'}
          buttonProps={{
            fullWidth: true,
            disableRipple: true,
            sx: {
              display: 'flex',
              bgcolor: isPrimary ? 'primary.main' : '#fafafa',
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
          {isShowUploadIcon && (
            <FunctionalityCommonIcon
              sx={{ fontSize: 68 }}
              name='CloudUploadIcon'
            />
          )}
          <Button
            variant='contained'
            sx={{
              my: 1,
              width: 240,
              height: 54,
              bgcolor: isPrimary ? '#ffffff' : undefined,
              color: isPrimary ? '#000000' : undefined,
              fontSize: 16,
              fontWeight: 700,
            }}
            startIcon={<FunctionalityCommonIcon name='NoteAdd' />}
            color={isPrimary ? 'inherit' : 'primary'}
          >
            {buttonTitle ||
              t(
                'functionality__common:components__common__upload_button_title',
              )}
          </Button>
          <Typography
            sx={{
              fontSize: {
                xs: 14,
                lg: 16,
              },
              color: isPrimary ? undefined : 'primary.main',
            }}
          >
            {dropDescription ||
              t('functionality__common:components__common__upload_button_tips')}
          </Typography>
        </UploadButton>
      </Box>
    </Box>
  );
};

export default FunctionalityCommonUploadButton;
