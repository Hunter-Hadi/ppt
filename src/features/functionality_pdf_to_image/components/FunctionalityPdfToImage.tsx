import { Box } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, lazy, Suspense, useMemo, useState } from 'react';

import AppLoadingLayout from '@/features/common/components/AppLoadingLayout';
import FunctionalityUploadButton from '@/features/functionality_common/components/FunctionalityUploadButton';
import snackNotifications from '@/utils/globalSnackbar';

const FunctionalityPdfToImageDetail = lazy(
  () =>
    import(
      '@/features/functionality_pdf_to_image/components/FunctionalityPdfToImageDetail'
    ),
);

interface IFunctionalityPdfToImageProps {
  toType: 'pdf-to-jpeg' | 'pdf-to-png';
}

const FunctionalityPdfToImage: FC<IFunctionalityPdfToImageProps> = ({
  toType,
}) => {
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
  const toImageType = useMemo(() => {
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
        <FunctionalityUploadButton
          inputProps={{
            accept: 'application/pdf',
            multiple: true,
          }}
          onChange={onChangeFile}
          handleUnsupportedFileType={handleUnsupportedFileType}
        />
      )}
      {fileData && toImageType && (
        <Suspense fallback={<AppLoadingLayout loading />}>
          <FunctionalityPdfToImageDetail
            fileData={fileData}
            toType={toImageType}
            onRemoveFile={() => setFileData(null)}
          />
        </Suspense>
      )}
    </Box>
  );
};
export default FunctionalityPdfToImage;
