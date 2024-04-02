import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, lazy, Suspense, useMemo, useState } from 'react';

import AppLoadingLayout from '@/features/common/components/AppLoadingLayout';
import UploadButton from '@/features/common/components/UploadButton';
import FunctionalityIcon from '@/features/functionality_pdf_to_img/components/FunctionalityIcon';
import snackNotifications from '@/utils/globalSnackbar';

const FunctionalityPdfToImgDetail = lazy(
  () =>
    import(
      '@/features/functionality_pdf_to_img/components/FunctionalityPdfToImgDetail'
    ),
);

interface IFunctionalityPdfToImgProps {
  toType: 'pdf-to-jpeg' | 'pdf-to-png';
}

const FunctionalityPdfToImg: FC<IFunctionalityPdfToImgProps> = ({ toType }) => {
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
              height: 280,
              width: 260,
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
          <FunctionalityIcon sx={{ fontSize: 35 }} name='CloudUploadIcon' />
          <Typography
            sx={{
              fontSize: {
                xs: 12,
                lg: 15,
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
        <Suspense fallback={<AppLoadingLayout loading />}>
          <FunctionalityPdfToImgDetail
            fileData={fileData}
            toType={toImgType}
            onRemoveFile={() => setFileData(null)}
          />
        </Suspense>
      )}
    </Box>
  );
};
export default FunctionalityPdfToImg;
