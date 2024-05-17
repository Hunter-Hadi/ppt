import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import { Stack, Typography } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { type FC, useEffect, useMemo, useState } from 'react';

import useViewDropEvent from '@/features/common/hooks/useViewDropEvent';

const VisuallyHiddenInput = styled('input')({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  opacity: 0,
  cursor: 'pointer',
});

export interface IUploadButtonProps {
  buttonProps?: Omit<ButtonProps, 'onChange'>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  isDrag?: boolean;
  onChange?: (fileList: FileList) => void;
  handleUnsupportedFileType?: () => void;
  fontColor?: string;
}

const UploadButton: FC<
  IUploadButtonProps & {
    children: React.ReactNode;
  }
> = (props) => {
  const { isReady } = useRouter();
  const [isPageLoadingComplete, setIsPageLoadingComplete] = useState(true);
  const {
    children,
    onChange,
    isDrag = true,
    handleUnsupportedFileType,
    buttonProps,
    inputProps,
    fontColor,
  } = props;
  const { t } = useTranslation();
  useEffect(() => {
    setIsPageLoadingComplete(isReady);
  }, [isReady]);
  const fileMatchesAccept = (fileType: string, acceptString: string) => {
    // 将accept字符串按照","拆分成多个类型
    const types = acceptString.split(',');
    // 检查每一个指定类型是否与文件类型相匹配
    return types.some((type) => {
      type = type.trim();
      if (type.startsWith('.')) {
        // 如果accept是后缀名类型的限制(.png, .jpg等)
        return fileType === `image/${type.slice(1)}`;
      } else if (type.endsWith('/*')) {
        // 如果accept是类似image/*这样的通配符
        const match = new RegExp(`^${type.replace('*', '.*')}$`, 'i');
        return match.test(fileType);
      } else {
        // 具体的MIME type
        return fileType === type;
      }
    });
  };
  const onChangeFiles = (fileList: FileList) => {
    //拦截drag不符合type约束的文件
    if (
      inputProps?.accept &&
      fileList?.[0] &&
      !fileMatchesAccept(fileList[0].type, inputProps.accept)
    ) {
      handleUnsupportedFileType && handleUnsupportedFileType();
      return;
    }
    fileList && onChange && onChange(fileList);
  };
  const {
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isSidebarDragOver,
  } = useViewDropEvent({
    onChange: onChangeFiles,
  });

  const dragMap = useMemo(() => {
    return isDrag
      ? {
          onDragEnter: handleDragEnter,
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          onDrop: handleDrop,
        }
      : {};
  }, [isDrag]);
  return (
    <Button
      {...dragMap}
      component='label'
      sx={{
        position: 'relative',
      }}
      disabled={!isPageLoadingComplete}
      {...(buttonProps as any)}
    >
      {!isSidebarDragOver && children}
      {isSidebarDragOver && (
        <Stack direction='column' alignItems='center'>
          <FileOpenOutlinedIcon sx={{ fontSize: 50, color: fontColor }} />
          <Typography
            sx={{
              fontSize: {
                xs: 18,
                lg: 20,
              },
              color: fontColor,
            }}
          >
            {t('features__common:components__upload_button_drop_title')}
          </Typography>
        </Stack>
      )}
      <VisuallyHiddenInput
        type='file'
        onChange={(event) =>
          event.target.files && onChangeFiles(event.target.files)
        }
        title='' //去掉鼠标移动过去显示的 未选择任何文件
        {...inputProps}
      />
    </Button>
  );
};

export default UploadButton;
