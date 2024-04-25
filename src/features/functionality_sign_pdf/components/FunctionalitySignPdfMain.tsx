import { Stack } from '@mui/material';
import Head from 'next/head';
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
        width: '100%',
      }}
    >
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=La+Belle+Aurore&display=swap'
          rel='stylesheet'
        ></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Dancing+Script:wght@400..700&family=La+Belle+Aurore&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Dancing+Script:wght@400..700&family=La+Belle+Aurore&family=Noto+Sans+Georgian:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap'
          rel='stylesheet'
        ></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Dancing+Script:wght@400..700&family=La+Belle+Aurore&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
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
