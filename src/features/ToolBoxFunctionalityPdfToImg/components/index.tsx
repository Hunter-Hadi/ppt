import { Box, Typography } from '@mui/material';
import { FC, lazy, Suspense, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import UploadButton from '@/features/common/components/UploadButton';
import ToolBoxIcon from '@/page_components/ToolBoxPages/components/ToolBoxIcon';
import {
  IToolUrkKeyType,
  toolBoxObjectData,
} from '@/page_components/ToolBoxPages/constant';
import snackNotifications from '@/utils/globalSnackbar';

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
  const { t } = useTranslation();

  const currentToolData = useMemo(() => toolBoxObjectData[urlKey], [urlKey]);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const onChangeFile = (fileList: FileList) => {
    setFileList(fileList);
  };
  const handleUnsupportedFileType = () => {
    snackNotifications.warning(
      t(
        'tool_box_functionality_pdf_to_img:components_index_unsupported_file_type_tip',
      ),
      {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      },
    );
  };
  const toImgType = useMemo(() => {
    switch (urlKey) {
      case 'pdf-to-jpeg':
        return 'jpeg';
      case 'pdf-to-png':
        return 'png';
    }
  }, [urlKey]);
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
            border: '1px dashed',
          }}
          variant='outlined'
          onChange={onChangeFile}
          handleUnsupportedFileType={handleUnsupportedFileType}
          accept={currentToolData.accept}
        >
          <ToolBoxIcon sx={{ fontSize: 35 }} name='CloudUploadIcon' />
          <Typography
            sx={{
              fontSize: {
                xs: 12,
                lg: 13,
              },
            }}
          >
            {t(
              'tool_box_functionality_pdf_to_img:components_index_upload_title',
            )}
          </Typography>
        </UploadButton>
      )}
      {fileList && fileList?.length > 0 && toImgType && (
        <Suspense fallback={<div>Loading...</div>}>
          <ToolBoxFunctionalityPdfToImg
            fileList={fileList}
            toType={toImgType}
            onRemoveFile={() => setFileList(null)}
          />
        </Suspense>
      )}
    </Box>
  );
};
export default ToolBoxDetail;
