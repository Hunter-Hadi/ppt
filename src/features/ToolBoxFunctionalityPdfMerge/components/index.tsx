import { Box, Typography } from '@mui/material';
import { FC, Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';

import UploadButton from '@/features/common/components/UploadButton';
import ToolBoxFunctionalityIcon from '@/features/ToolBoxFunctionalityPdfMerge/components/ToolBoxFunctionalityIcon';
import snackNotifications from '@/utils/globalSnackbar';

interface IToolBoxDetailProps {}

const ToolBoxDetail: FC<IToolBoxDetailProps> = () => {
  const { t } = useTranslation();

  const [fileList, setFileList] = useState<FileList | null>(null);
  const onChangeFile = (fileList: FileList) => {
    console.log('simply fileList', fileList);
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
          <ToolBoxFunctionalityIcon
            sx={{ fontSize: 35 }}
            name='CloudUploadIcon'
          />
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
      {fileList && fileList?.length > 0 && (
        <Suspense fallback={<div>Loading...</div>}></Suspense>
      )}
    </Box>
  );
};
export default ToolBoxDetail;
