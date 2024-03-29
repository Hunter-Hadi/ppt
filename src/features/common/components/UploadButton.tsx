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

interface IUploadButtonProps extends Omit<ButtonProps, 'onChange'> {
  accept?: string;
  isDrag?: boolean;
  onChange?: (fileList: FileList) => void;
}

const UploadButton: FC<IUploadButtonProps> = (props) => {
  const {
    children,
    variant = 'contained',
    accept,
    onChange,
    isDrag = true,
    ...restProps
  } = props;
  const {
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isSidebarDragOver,
  } = useViewDropEvent({
    onChange,
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
      variant={variant}
      {...(restProps as any)}
    >
      {!isSidebarDragOver && children}
      {isSidebarDragOver && <div>Drop here</div>}
      <VisuallyHiddenInput
        type='file'
        accept={accept}
        onChange={(event) => {
          event.target.files && onChange && onChange(event.target.files);
        }}
      />
    </Button>
  );
};

export default UploadButton;
