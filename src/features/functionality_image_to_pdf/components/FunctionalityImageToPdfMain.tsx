import { CircularProgress, Grid, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import { useTranslation } from 'next-i18next';
import { PDFDocument } from 'pdf-lib/cjs/api';
import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView';
import FunctionalityCommonImage from '@/features/functionality_common/components/FunctionalityCommonImage';
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';
import { IFunctionalityCommonImageInfo } from '@/features/functionality_common/types/functionalityCommonImageType';
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload';
import FunctionalityPdfMergeIcon from '@/features/functionality_pdf_merge/components/FunctionalityPdfMergeIcon';
import snackNotifications from '@/utils/globalSnackbar';

import { pdfPagePositions, pdfPageSizes } from '../constant';
type IFunctionalityImageToPdfImageInfo = IFunctionalityCommonImageInfo & {
  file: File;
};
const FunctionalityImageToPdfMain = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userSelectSizeType, setUserSelectSizeType] = useState<string>('A4');
  const [userSelectPositionType, setUserSelectPositionType] = useState<string>(
    pdfPagePositions[0],
  );

  const [imageInfoList, setImageInfoList] = useState<
    IFunctionalityImageToPdfImageInfo[]
  >([]); //展示的pdf信息 列表
  const convertFileListToImageUrls = async (
    fileList: FileList,
  ): Promise<IFunctionalityImageToPdfImageInfo[]> => {
    const imageUrls: IFunctionalityImageToPdfImageInfo[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const url = URL.createObjectURL(file);
      imageUrls.push({
        imageUrlString: url,
        id: uuidV4(),
        file,
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
  const getUserSelectPageSize = () => {
    return pdfPageSizes.find((page) => page.name === userSelectSizeType);
  };
  const convertToPDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();

      for (const imageFile of imageInfoList) {
        console.log('simply imageFile file', imageFile.file);
        const imageBytes = await imageFile.file.arrayBuffer();
        const image = await pdfDoc.embedPng(imageBytes);
        const pageSize = await getUserSelectPageSize(); // Set the page size here
        if (!pageSize) return;
        const page = pdfDoc.addPage([pageSize.width, pageSize.height]);
        const imageWidth = pageSize.width;
        const imageHeight = (imageWidth * image.height) / image.width;
        let x = 0,
          y = 0;
        if (imageHeight > pageSize.height) {
          const scale = pageSize.height / imageHeight;
          const scaledWidth = imageWidth * scale;
          const scaledHeight = imageHeight * scale;
          x = (pageSize.width - scaledWidth) / 2;
          y = (pageSize.height - scaledHeight) / 2;
          page.drawImage(image, {
            x: x,
            y: y,
            width: scaledWidth,
            height: scaledHeight,
          });
        } else {
          if (userSelectPositionType === 'Middle') {
            x = (pageSize.width - imageWidth) / 2;
            y = (pageSize.height - imageHeight) / 2;
          } else if (userSelectPositionType === 'Top') {
            x = (pageSize.width - imageWidth) / 2;
            y = pageSize.height - imageHeight;
          } else if (userSelectPositionType === 'Bottom') {
            x = (pageSize.width - imageWidth) / 2;
            y = 0;
          }
          page.drawImage(image, {
            x: x,
            y: y,
            width: imageWidth,
            height: imageHeight,
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      downloadUrl(pdfBytes, 'image(MaxAI.me).pdf');
    } catch (error) {
      console.error('Error converting images to PDF:', error);
    }
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
          disabled: isLoading,
          variant: 'outlined',
          sx: {
            height: 48,
            width: '100%',
          },
        },
        inputProps: {
          accept: 'image/png',
          multiple: true,
        },
        handleUnsupportedFileType: handleUnsupportedFileTypeTip,
        children: 'notI18:Add PNG',
      },
    },
    {
      type: 'button',
      buttonProps: {
        tooltip: t(
          'functionality__pdf_split:components__pdf_split__button__remove__tooltip',
        ),
        children: t(
          'functionality__pdf_split:components__pdf_spli__remove_pdf',
        ),
        variant: 'outlined',
        color: 'error',
        disabled: isLoading,
        onClick: () => setImageInfoList([]),
      },
    },
  ];
  const onDeleteInfo = (id: string) => {
    if (imageInfoList) {
      const newPdfInfoList = imageInfoList.filter((pdf) => pdf.id !== id);
      setImageInfoList(newPdfInfoList);
    }
  };
  const bottomButtonConfigs: IButtonConfig[] = [
    {
      type: 'button',
      isShow: imageInfoList.length > 0,
      buttonProps: {
        onClick: convertToPDF,
        variant: 'contained',
        tooltip: 'notI18:开始转换',
        children: 'notI18:开始转换',
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
                rightTopChildren={
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#d1d5db',
                      borderRadius: 5,
                    }}
                    onClick={() => onDeleteInfo(imageInfo.id)}
                  >
                    <FunctionalityPdfMergeIcon
                      name='CloseTwoTone'
                      sx={{
                        fontSize: 16,
                      }}
                    />
                  </Box>
                }
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
            </Box>
          )}
          <Grid
            container
            item
            justifyContent='center'
            my={3}
            gap={2}
            sx={{
              position: 'relative',
            }}
          >
            <Select
              value={userSelectSizeType}
              onChange={(event) => setUserSelectSizeType(event.target.value)}
              displayEmpty
              size='small'
              sx={{
                width: 150,
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    height: 300,
                    width: 150,
                  },
                },
              }}
            >
              {pdfPageSizes.map((page) => (
                <MenuItem value={page.name} key={page.name}>
                  {page.name}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={userSelectPositionType}
              onChange={(event) =>
                setUserSelectPositionType(event.target.value)
              }
              displayEmpty
              size='small'
              sx={{
                width: 150,
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    height: 300,
                    width: 150,
                  },
                },
              }}
            >
              {pdfPagePositions.map((pagePosition) => (
                <MenuItem value={pagePosition} key={pagePosition}>
                  {pagePosition}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          {imageInfoList.length > 0 && (
            <FunctionalityCommonButtonListView
              buttonConfigs={bottomButtonConfigs}
            />
          )}
        </Grid>
      )}
    </Box>
  );
};
export default FunctionalityImageToPdfMain;
