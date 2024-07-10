import {
  Box,
  Button,
  LinearProgress,
  SxProps,
  Theme,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'

import UploadButton, {
  IUploadButtonProps,
} from '@/features/common/components/UploadButton'
import FunctionalityCommonIcon from '@/features/functionality_common/components/FunctionalityCommonIcon'
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool'

import useFunctionalityCommonUrlParamsUploadFile from '../hooks/useFunctionalityCommonUrlParamsUploadFile'

interface IFunctionalityCommonUploadButton {
  wrapBoxSx?: SxProps<Theme>
  contentBoxSx?: SxProps<Theme>
  isShowUploadIcon?: boolean
  themeColor?: 'primary' | 'white'
  buttonTitle?: string
  dropDescription?: string
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
  inputProps,
  handleUnsupportedFileType,
  onChange,
  ...props
}) => {
  const { urlFileUploadProgress, fileName } =
    useFunctionalityCommonUrlParamsUploadFile({ onChangeFile: onChange }) //用来处理url参数上传的
  const { t } = useTranslation()
  const isPrimary = themeColor === 'primary'
  const onHandleUnsupportedFileType = () => {
    if (!inputProps?.accept || inputProps?.accept === 'application/pdf') {
      //!inputProps?.accept是因为该工具默认指定上传的是PDF文件
      // 因为目前工具最多的是只上传PDF类型文件，所以这里做提示PDF类型文件，其它的需要自己额外加逻辑，不做过多的复杂逻辑处理
      functionalityCommonSnackNotifications(
        t(
          'functionality__common:components__common__upload_button__unsupported_file_type_tip',
        ),
      )
    } else {
      handleUnsupportedFileType && handleUnsupportedFileType()
    }
  }
  const isShowUploadProgress = urlFileUploadProgress !== null
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
            multiple: false,
            disabled: isShowUploadProgress,
            ...inputProps,
          }}
          handleUnsupportedFileType={onHandleUnsupportedFileType}
          {...props}
        >
          {isShowUploadIcon && (
            <FunctionalityCommonIcon
              sx={{ fontSize: 68 }}
              name='CloudUploadIcon'
            />
          )}
          {!isShowUploadProgress && (
            <React.Fragment>
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
                  t(
                    'functionality__common:components__common__upload_button_tips',
                  )}
              </Typography>
            </React.Fragment>
          )}
          {isShowUploadProgress && (
            <React.Fragment>
              {fileName && (
                <Typography
                  sx={{
                    fontSize: {
                      xs: 16,
                      lg: 18,
                    },
                    mt: 2,
                    fontWeight: 600,
                  }}
                >
                  {fileName}
                </Typography>
              )}
            </React.Fragment>
          )}
          {urlFileUploadProgress !== null && (
            <Box
              sx={{
                width: '80%',
                mt: 2,
              }}
            >
              <LinearProgress
                color='inherit'
                variant='determinate'
                value={urlFileUploadProgress}
              />
            </Box>
          )}
        </UploadButton>
      </Box>
    </Box>
  )
}

export default FunctionalityCommonUploadButton
