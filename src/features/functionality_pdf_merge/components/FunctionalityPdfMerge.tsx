import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Suspense, useState } from 'react';

import AppLoadingLayout from '@/features/common/components/AppLoadingLayout';
import UploadButton from '@/features/common/components/UploadButton';
import FunctionalityIcon from '@/features/functionality_pdf_merge/components/FunctionalityIcon';
import snackNotifications from '@/utils/globalSnackbar';
import FunctionalityUploadButton from '@/features/functionality_common/components/FunctionalityUploadButton';

const FunctionalityPdfMerge = () => {
  const { t } = useTranslation();
  const [pdfInfoList] = useState<FileList | null>(null);
  const onChangeFile = (fileList: FileList) => {
    console.log('simply fileList', fileList);
    getPdfFileInfo(fileList);
  };
  const handleUnsupportedFileType = () => {
    snackNotifications.warning(
      t(
        'functionality__pdf_to_image:components__index__unsupported_file_type_tip',
      ),
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
        <FunctionalityUploadButton
          inputProps={{
            accept: 'application/pdf',
            multiple: true,
          }}
          onChange={onChangeFile}
          handleUnsupportedFileType={handleUnsupportedFileType}
        />
      )}
      {pdfInfoList && pdfInfoList?.length > 0 && (
        <Suspense fallback={<AppLoadingLayout loading />}></Suspense>
      )}
    </Box>
  );
};
export default FunctionalityPdfMerge;
