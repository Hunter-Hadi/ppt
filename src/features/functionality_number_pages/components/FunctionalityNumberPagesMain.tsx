import { CircularProgress, Stack } from '@mui/material';
import React, { lazy, Suspense, useState } from 'react';

import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';

const FunctionalityNumberPagesDetail = lazy(
  () =>
    import(
      '@/features/functionality_number_pages/components/FunctionalityNumberPagesDetail'
    ),
);

const FunctionalityNumberPagesMain = () => {
  const [file, setFile] = useState<File | null>(null); //文件
  const onUploadFile = async (fileList: FileList) => {
    //用户上传，读取pdf文件显示的图片列表
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
    }
  };

  return (
    <Stack
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        width: '100%',
      }}
    >
      {!file && (
        <FunctionalityCommonUploadButton
          inputProps={{
            multiple: true,
          }}
          onChange={onUploadFile}
        />
      )}
      {file && (
        <Suspense fallback={<CircularProgress size={26} />}>
          <FunctionalityNumberPagesDetail
            file={file}
            onRemoveFile={() => setFile(null)}
          />
        </Suspense>
      )}
    </Stack>
  );
};
export default FunctionalityNumberPagesMain;
