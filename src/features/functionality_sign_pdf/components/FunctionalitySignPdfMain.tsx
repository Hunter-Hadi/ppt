import { Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { lazy, Suspense, useState } from 'react';

import AppLoadingLayout from '@/features/common/components/AppLoadingLayout';
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';
import snackNotifications from '@/utils/globalSnackbar';

const FunctionalitySignPdfDetail = lazy(
  () =>
    import(
      '@/features/functionality_sign_pdf/components/FunctionalitySignPdfDetail'
    ),
);

const FunctionalityPdfToImage = () => {
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
        'functionality__sign_pdf:components__sign_pdf__unsupported_file_type_tip',
      ),
      {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      },
    );
  };
  return (
    <Stack
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        pb: 5,
        width: '100%',
      }}
    >
      {!fileData && (
        <FunctionalityCommonUploadButton
          inputProps={{
            accept: 'application/pdf',
            multiple: false,
          }}
          onChange={onChangeFile}
          handleUnsupportedFileType={handleUnsupportedFileType}
        />
      )}
      {fileData && (
        <Suspense fallback={<AppLoadingLayout loading />}>
          <FunctionalitySignPdfDetail file={fileData} />
        </Suspense>
      )}
    </Stack>
  );
};
export default FunctionalityPdfToImage;
