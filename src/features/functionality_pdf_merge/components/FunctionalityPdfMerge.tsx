import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Suspense, useState } from 'react';

import AppLoadingLayout from '@/features/common/components/AppLoadingLayout';
import UploadButton from '@/features/common/components/UploadButton';
import FunctionalityIcon from '@/features/functionality_pdf_merge/components/FunctionalityIcon';
import snackNotifications from '@/utils/globalSnackbar';

const FunctionalityPdfMerge = () => {
  const { t } = useTranslation();
  const [pdfInfoList] = useState<FileList | null>(null);
  const onChangeFile = (fileList: FileList) => {
    console.log('simply fileList', fileList);
    getPdfFileInfo(fileList);
  };
  const handleUnsupportedFileType = () => {
    snackNotifications.warning(
      t('functionality_pdf_to_img:components_index_unsupported_file_type_tip'),
      {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      },
    );
  };
  const getPdfFileInfo = (fileList: FileList) => {
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      console.log('simply file', file);
    }
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
      {!pdfInfoList && (
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
            multiple: true,
          }}
          onChange={onChangeFile}
          handleUnsupportedFileType={handleUnsupportedFileType}
        >
          <FunctionalityIcon sx={{ fontSize: 35 }} name='CloudUploadIcon' />
          <Typography
            sx={{
              fontSize: {
                xs: 12,
                lg: 13,
              },
            }}
          >
            {t('functionality_pdf_to_img:components_index_upload_title')}
          </Typography>
        </UploadButton>
      )}
      {pdfInfoList && pdfInfoList?.length > 0 && (
        <Suspense fallback={<AppLoadingLayout loading />}></Suspense>
      )}
    </Box>
  );
};
export default FunctionalityPdfMerge;
