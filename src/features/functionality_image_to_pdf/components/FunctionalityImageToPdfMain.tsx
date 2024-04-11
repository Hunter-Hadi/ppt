import {
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { ceil, divide } from 'lodash-es';
import { useTranslation } from 'next-i18next';
import { PDFDocument, PDFImage } from 'pdf-lib/cjs/api';
import { FC, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView';
import FunctionalityCommonDragSortableList from '@/features/functionality_common/components/FunctionalityCommonDragSortableList';
import FunctionalityCommonIcon from '@/features/functionality_common/components/FunctionalityCommonIcon';
import FunctionalityCommonImage from '@/features/functionality_common/components/FunctionalityCommonImage';
import FunctionalityCommonTooltip from '@/features/functionality_common/components/FunctionalityCommonTooltip';
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';
import { IFunctionalityCommonImageInfo } from '@/features/functionality_common/types/functionalityCommonImageType';
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload';
import snackNotifications from '@/utils/globalSnackbar';

import { PDF_IMAGE_POSITION_OPTIONS, PDF_PAGE_SIZE_OPTIONS } from '../constant';
type IFunctionalityImageToPdfImageInfo = IFunctionalityCommonImageInfo & {
  file: File;
};
interface IFunctionalityImageToPdfMainProps {
  accept: string;
}
const FunctionalityImageToPdfMain: FC<IFunctionalityImageToPdfMainProps> = ({
  accept,
}) => {
  console.log('simply accept', accept);
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userSelectSizeType, setUserSelectSizeType] = useState<string>('A4');
  const [userSelectPositionType, setUserSelectPositionType] = useState<string>(
    PDF_IMAGE_POSITION_OPTIONS[0].key,
  );
  const [imageInfoList, setImageInfoList] = useState<
    IFunctionalityImageToPdfImageInfo[]
  >([]); //展示的pdf信息 列表

  const [totalPages, setTotalPages] = useState<number>(0); //总页数
  const [currentActionNum, setCurrentActionNum] = useState<number>(0); //当前加载页数

  const convertFileListToImageUrls = async (
    fileList: FileList,
  ): Promise<IFunctionalityImageToPdfImageInfo[]> => {
    setTotalPages(fileList.length);
    const imageUrls: IFunctionalityImageToPdfImageInfo[] = [];
    for (let i = 0; i < fileList.length; i++) {
      setCurrentActionNum(i);
      const file = fileList[i];
      const url = URL.createObjectURL(file);
      imageUrls.push({
        imageUrlString: url,
        id: uuidV4(),
        size: file.size,
        file,
      });
    }
    setTotalPages(0);
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
    snackNotifications.warning(
      t(
        'functionality__image_to_pdf:components__image_to_pdf__error_uploaded__tips',
      ),
      {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      },
    );
  };
  const getUserSelectPageSize = () => {
    return PDF_PAGE_SIZE_OPTIONS.find(
      (page) => page.name === userSelectSizeType,
    );
  };
  const convertToPDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      setIsLoading(true);
      setTotalPages(imageInfoList.length);
      for (const index in imageInfoList) {
        try {
          const imageFile = imageInfoList[index];
          const fileType = imageFile.file.type;
          console.log('simply fileType', fileType);
          if (
            fileType !== 'image/png' &&
            fileType !== 'image/jpeg' &&
            fileType !== 'image/jpg'
          ) {
            continue;
          }
          setCurrentActionNum(index as unknown as number);
          console.log('simply imageFile file', imageFile.file);
          const imageBytes = await imageFile.file.arrayBuffer();
          let image: PDFImage | null = null;
          if (fileType === 'image/png') {
            image = await pdfDoc.embedPng(imageBytes);
          } else {
            image = await pdfDoc.embedJpg(imageBytes);
          }
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
        } catch (e) {
          console.log('convertToPDF error:', e);
        }
      }
      setTotalPages(0);
      const pdfBytes = await pdfDoc.save();
      downloadUrl(pdfBytes, 'images(MaxAI.me).pdf');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error converting images to PDF:', error);
    }
  };
  const onDeleteInfo = (id: string) => {
    if (imageInfoList) {
      const newPdfInfoList = imageInfoList.filter((pdf) => pdf.id !== id);
      setImageInfoList(newPdfInfoList);
    }
  };
  //按钮配置列表
  const buttonConfigs: IButtonConfig[] = [
    {
      type: 'upload',
      uploadProps: {
        tooltip: t(
          'functionality__image_to_pdf:components__image_to_pdf__button_add_png__tooltip',
        ),
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
          accept: accept || 'image/png',
          multiple: true,
        },
        handleUnsupportedFileType: handleUnsupportedFileTypeTip,
        children: t(
          'functionality__image_to_pdf:components__image_to_pdf__button_add_png',
        ),
      },
    },
    {
      type: 'button',
      buttonProps: {
        tooltip: t(
          'functionality__image_to_pdf:components__image_to_pdf__button_remove_png__tooltip',
        ),
        children: t(
          'functionality__image_to_pdf:components__image_to_pdf__button_remove_png',
        ),
        variant: 'outlined',
        color: 'error',
        disabled: isLoading,
        onClick: () => setImageInfoList([]),
      },
    },
  ];
  const isEmptyList = imageInfoList.length === 0;
  const bottomButtonConfigs: IButtonConfig[] = [
    {
      type: 'button',
      isShow: !isEmptyList,
      buttonProps: {
        onClick: convertToPDF,
        disabled: isLoading,
        variant: 'contained',
        tooltip: t(
          'functionality__image_to_pdf:components__image_to_pdf__download__tooltip',
        ),
        children: t(
          'functionality__image_to_pdf:components__image_to_pdf__download',
        ),
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
            accept: accept || 'image/png',
            multiple: true,
          }}
          onChange={onUploadFile}
          handleUnsupportedFileType={handleUnsupportedFileTypeTip}
        />
      )}
      {!isEmptyList && (
        <FunctionalityCommonButtonListView buttonConfigs={buttonConfigs} />
      )}
      {(!isEmptyList || isLoading) && (
        <Box
          my={3}
          sx={{
            position: 'relative',
            minHeight: 200,
          }}
        >
          {!isLoading && (
            <FunctionalityCommonDragSortableList
              list={imageInfoList}
              onUpdateList={setImageInfoList}
              replacementElement={(dragInfo) => (
                <FunctionalityCommonImage
                  sx={{
                    bgcolor: 'transparent',
                    '&:hover': {
                      bgcolor: 'transparent',
                    },
                  }}
                  imageInfo={dragInfo}
                />
              )}
            >
              {(imageInfo, index, currentDragInfo) => (
                <FunctionalityCommonTooltip
                  key={imageInfo.id}
                  title={`${ceil(divide(imageInfo.size || 0, 1000))}kb`}
                >
                  <FunctionalityCommonImage
                    key={imageInfo.id}
                    name={String(index + 1)}
                    imageInfo={imageInfo}
                    sx={{
                      border:
                        currentDragInfo?.id === imageInfo.id
                          ? '1px dashed #64467b'
                          : 'none',
                    }}
                    imgStyle={{
                      opacity: currentDragInfo?.id === imageInfo.id ? 0 : 1,
                    }}
                  >
                    {!currentDragInfo ? (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}
                      >
                        <IconButton
                          size='small'
                          onClick={() => onDeleteInfo(imageInfo.id)}
                        >
                          <FunctionalityCommonIcon
                            name='CloseTwoTone'
                            fontSize='small'
                            sx={{
                              bgcolor: '#d1d5db',
                              borderRadius: 3,
                            }}
                          />
                        </IconButton>
                      </Box>
                    ) : null}
                  </FunctionalityCommonImage>
                </FunctionalityCommonTooltip>
              )}
            </FunctionalityCommonDragSortableList>
          )}
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
              {totalPages > 0 ? `${currentActionNum}/${totalPages}` : ''}
            </Box>
          )}
        </Box>
      )}
      {!isEmptyList && (
        <Stack
          direction='row'
          flexWrap='wrap'
          justifyContent='center'
          alignItems='center'
          my={3}
          gap={2}
          sx={{
            position: 'relative',
          }}
        >
          <Typography
            fontSize={{
              xs: 14,
              lg: 16,
            }}
            color='text.secondary'
          >
            {t(
              'functionality__image_to_pdf:components__image_to_pdf__page_size',
            )}
          </Typography>
          <Select
            value={userSelectSizeType}
            onChange={(event) => setUserSelectSizeType(event.target.value)}
            displayEmpty
            size='small'
            disabled={isLoading}
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
            {PDF_PAGE_SIZE_OPTIONS.map((page) => (
              <MenuItem value={page.name} key={page.name}>
                {page.name}
              </MenuItem>
            ))}
          </Select>
          <Typography
            fontSize={{
              xs: 14,
              lg: 16,
            }}
            color='text.secondary'
          >
            {t(
              'functionality__image_to_pdf:components__image_to_pdf__image_alignment',
            )}
          </Typography>
          <Select
            value={userSelectPositionType}
            onChange={(event) => setUserSelectPositionType(event.target.value)}
            displayEmpty
            size='small'
            disabled={isLoading}
            sx={{
              width: 150,
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  width: 150,
                },
              },
            }}
          >
            {PDF_IMAGE_POSITION_OPTIONS.map((pagePosition) => (
              <MenuItem value={pagePosition.key} key={pagePosition.key}>
                {t(pagePosition.title)}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      )}
      {!isEmptyList && (
        <FunctionalityCommonButtonListView
          buttonConfigs={bottomButtonConfigs}
        />
      )}
    </Box>
  );
};
export default FunctionalityImageToPdfMain;
