import { Stack } from '@mui/material';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { lazy, Suspense, useState } from 'react';
import { useRecoilState } from 'recoil';

import AppLoadingLayout from '@/features/common/components/AppLoadingLayout';
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/notificationTool';

import {
  FunctionalitySignPdfOperationOBjectAtom,
  functionalitySignPdfOperationOBjectDefault,
} from '../store';
const FunctionalitySignPdfDetail = lazy(
  () =>
    import(
      '@/features/functionality_sign_pdf/components/FunctionalitySignPdfDetail'
    ),
);

const FunctionalitySignPdfMain = () => {
  const { t } = useTranslation();
  const [, setPdfOperationOBject] = useRecoilState(
    FunctionalitySignPdfOperationOBjectAtom,
  );
  const [fileData, setFileData] = useState<File | null>(null);
  const onChangeFile = (fileList: FileList) => {
    if (fileList?.length > 0) {
      setFileData(fileList[0]);
    }
  };
  const handleUnsupportedFileType = () => {
    functionalityCommonSnackNotifications(
      t(
        'functionality__sign_pdf:components__sign_pdf__unsupported_file_type_tip',
      ),
    );
  };
  const onClearReturn = () => {
    setFileData(null);
    // 清空Atom的值
    setPdfOperationOBject(functionalitySignPdfOperationOBjectDefault);
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
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Concert+One&family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Dancing+Script:wght@400..700&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=La+Belle+Aurore&family=Lobster&family=Ma+Shan+Zheng&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Orbitron:wght@400..900&family=Oswald:wght@200..700&family=Pacifico&family=Permanent+Marker&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Teko:wght@300..700&family=Zeyada&display=swap'
          rel='stylesheet'
        />
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
          <FunctionalitySignPdfDetail
            file={fileData}
            onClearReturn={onClearReturn}
          />
        </Suspense>
      )}
    </Stack>
  );
};
export default FunctionalitySignPdfMain;
