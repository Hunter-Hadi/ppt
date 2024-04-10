import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React, { type FC, useMemo } from 'react';

import useViewDropEvent from '@/features/common/hooks/useViewDropEvent';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export interface IUploadButtonProps {
  buttonProps?: Omit<ButtonProps, 'onChange'>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  isDrag?: boolean;
  onChange?: (fileList: FileList) => void;
  handleUnsupportedFileType?: () => void;
}

const UploadButton: FC<
  IUploadButtonProps & {
    children: React.ReactNode;
  }
> = (props) => {
  const {
    children,
    onChange,
    isDrag = true,
    handleUnsupportedFileType,
    buttonProps,
    inputProps,
  } = props;
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
    <div>
      <Button
        {...dragMap}
        component='label'
        sx={{
          position: 'relative',
        }}
        {...(buttonProps as any)}
      >
        {!isSidebarDragOver && children}
        {isSidebarDragOver && <div>Drop here</div>}
        <VisuallyHiddenInput
          type='file'
          onChange={(event) =>
            onChange && event.target.files && onChange(event.target.files)
          }
          {...inputProps}
          accept={inputProps?.accept}
        />
      </Button>
    </div>
  );
};

export default UploadButton;
