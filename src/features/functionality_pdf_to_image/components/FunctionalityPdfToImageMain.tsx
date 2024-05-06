import { Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, lazy, Suspense, useMemo, useState } from 'react';

import AppLoadingLayout from '@/features/common/components/AppLoadingLayout';
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool';

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
    functionalityCommonSnackNotifications(
      t(
        'functionality__pdf_to_image:components__index__unsupported_file_type_tip',
      ),
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
    <Stack
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      sx={{
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
      {fileData && toImageType && (
        <Suspense fallback={<AppLoadingLayout loading />}>
          <FunctionalityPdfToImageDetail
            fileData={fileData}
            toType={toImageType}
            onRemoveFile={() => setFileData(null)}
          />
        </Suspense>
      )}
    </Stack>
  );
};
export default FunctionalityPdfToImage;
