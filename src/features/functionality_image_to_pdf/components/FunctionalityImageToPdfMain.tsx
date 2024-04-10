import { CircularProgress, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView';
import FunctionalityCommonImage from '@/features/functionality_common/components/FunctionalityCommonImage';
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';
import { IFunctionalityCommonImageInfo } from '@/features/functionality_common/types/functionalityCommonImageType';
import snackNotifications from '@/utils/globalSnackbar';

const FunctionalityImageToPdfMain = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageInfoList, setImageInfoList] = useState<
    IFunctionalityCommonImageInfo[]
  >([]); //展示的pdf信息 列表
  const convertFileListToImageUrls = async (
    fileList: FileList,
  ): Promise<IFunctionalityCommonImageInfo[]> => {
    const imageUrls: IFunctionalityCommonImageInfo[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const url = URL.createObjectURL(file);
      imageUrls.push({
        imageUrlString: url,
        id: uuidV4(),
      });
    }
    return imageUrls;
  };

  const onUploadFile = async (fileList: FileList) => {
    setIsLoading(true);
    const imageUrls = await convertFileListToImageUrls(fileList);
    console.log('simply imageUrls', imageUrls);
    setImageInfoList((list) => [...list, ...imageUrls]);
    setIsLoading(false);
  };
  const handleUnsupportedFileTypeTip = () => {
    snackNotifications.warning('notI18:只能上传png类型图片', {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    });
  };
  //按钮配置列表
  const buttonConfigs: IButtonConfig[] = [
    {
      type: 'upload',
      uploadProps: {
        tooltip: 'notI18:Add PNG',
        onChange: onUploadFile,
        isDrag: false,
        buttonProps: {
          variant: 'outlined',
          disabled: isLoading,
          sx: {
            height: 48,
            width: '100%',
          },
        },
        inputProps: {
          accept: 'application/pdf',
          multiple: true,
        },
        handleUnsupportedFileType: handleUnsupportedFileTypeTip,
        children: 'notI18:Add PNG',
      },
    },
  ];
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
      {imageInfoList.length === 0 && !isLoading && (
        <FunctionalityCommonUploadButton
          inputProps={{
            accept: 'image/png',
            multiple: true,
          }}
          onChange={onUploadFile}
          handleUnsupportedFileType={handleUnsupportedFileTypeTip}
        />
      )}
      {imageInfoList.length > 0 && (
        <FunctionalityCommonButtonListView buttonConfigs={buttonConfigs} />
      )}
      {(imageInfoList.length > 0 || isLoading) && (
        <Grid
          container
          item
          justifyContent='center'
          my={3}
          gap={2}
          sx={{
            position: 'relative',
            minHeight: 200,
          }}
        >
          {!isLoading &&
            imageInfoList.map((imageInfo, index) => (
              <FunctionalityCommonImage
                key={imageInfo.id}
                name={String(index + 1)}
                imageInfo={imageInfo}
                rightTopChildren={<div>关闭</div>}
              />
            ))}
          {isLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 15,
                bottom: 0,
                bgcolor: 'rgba(255,255,255,0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: 10,
              }}
            >
              <CircularProgress />
              {/* {pdfTotalPages > 0
                ? `${currentPdfActionNum}/${pdfTotalPages}`
                : ''} */}
            </Box>
          )}
        </Grid>
      )}
    </Box>
  );
};
export default FunctionalityImageToPdfMain;
