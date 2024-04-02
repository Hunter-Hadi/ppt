import { Box, Typography } from '@mui/material';
import { FC, lazy, Suspense, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import UploadButton from '@/features/common/components/UploadButton';
import ToolBoxIcon from '@/page_components/ToolBoxPages/components/ToolBoxIcon';
import snackNotifications from '@/utils/globalSnackbar';

const ToolBoxFunctionalityPdfToImg = lazy(
  () =>
    import(
      '@/features/ToolBoxFunctionalityPdfToImg/components/ToolBoxFunctionalityPdfToImgDetail'
    ),
);

interface IToolBoxDetailProps {
  toType: 'pdf-to-jpeg' | 'pdf-to-png';
}

const ToolBoxDetail: FC<IToolBoxDetailProps> = ({ toType }) => {
  const { t } = useTranslation();

  const [fileData, setFileData] = useState<File | null>(null);
  const onChangeFile = (fileList: FileList) => {
    if (fileList?.length > 0) {
      setFileData(fileList[0]);
    }
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
    switch (toType) {
      case 'pdf-to-jpeg':
        return 'jpeg';
      case 'pdf-to-png':
        return 'png';
    }
  }, [toType]);
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
      {!fileData && (
        <UploadButton
          buttonProps={{
            sx: {
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              width: 230,
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px dashed',
            },
            variant: 'outlined',
          }}
          inputProps={{
            accept: 'application/pdf',
          }}
          onChange={onChangeFile}
          handleUnsupportedFileType={handleUnsupportedFileType}
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
      {fileData && toImgType && (
        <Suspense fallback={<div>Loading...</div>}>
          <ToolBoxFunctionalityPdfToImg
            fileData={fileData}
            toType={toImgType}
            onRemoveFile={() => setFileData(null)}
          />
        </Suspense>
      )}
    </Box>
  );
};
export default ToolBoxDetail;
