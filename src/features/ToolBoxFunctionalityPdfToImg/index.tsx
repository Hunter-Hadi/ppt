import { Box, Typography } from '@mui/material';
import { FC, lazy, Suspense, useMemo, useState } from 'react';

import UploadButton from '@/features/common/components/UploadButton';
import ToolBoxIcon from '@/page_components/ToolBoxPages/components/ToolBoxIcon';
import {
  IToolUrkKeyType,
  toolBoxObjData,
} from '@/page_components/ToolBoxPages/constant';

const ToolBoxFunctionalityPdfToImg = lazy(
  () =>
    import(
      '@/features/ToolBoxFunctionalityPdfToImg/components/ToolBoxFunctionalityPdfToImgDetail'
    ),
);

interface IToolBoxDetailProps {
  urlKey: IToolUrkKeyType;
}

const ToolBoxDetail: FC<IToolBoxDetailProps> = ({ urlKey }) => {
  const currentToolData = useMemo(() => toolBoxObjData[urlKey], [urlKey]);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const onChangeFile = (fileList: FileList) => {
    setFileList(fileList);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pb: 5,
        width: '100%',
      }}
    >
      {!fileList && (
        <UploadButton
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 240,
            width: 230,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          variant='outlined'
          isDrag={true}
          onChange={onChangeFile}
          accept={currentToolData.accept}
        >
          <ToolBoxIcon sx={{ fontSize: 35 }} name='CloudUploadIcon' />
          <Typography
            sx={{
              fontSize: {
                xs: 12,
                lg: 18,
              },
            }}
          >
            Click to upload or drag and drop
          </Typography>
        </UploadButton>
      )}
      {urlKey === 'pdf-to-png' && fileList && fileList?.length > 0 && (
        <Suspense fallback={<div>Loading...</div>}>
          <ToolBoxFunctionalityPdfToImg
            fileList={fileList}
            onRemoveFile={() => setFileList(null)}
          />
        </Suspense>
      )}
    </Box>
  );
};
export default ToolBoxDetail;
