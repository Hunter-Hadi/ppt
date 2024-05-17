import {
  CircularProgress,
  Grid,
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
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import { v4 as uuidV4 } from 'uuid';

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView';
import FunctionalityCommonDragSortableList from '@/features/functionality_common/components/FunctionalityCommonDragSortableList';
import FunctionalityCommonIcon from '@/features/functionality_common/components/FunctionalityCommonIcon';
import FunctionalityCommonImage from '@/features/functionality_common/components/FunctionalityCommonImage';
import FunctionalityCommonTooltip from '@/features/functionality_common/components/FunctionalityCommonTooltip';
import { IFunctionalityCommonImageInfo } from '@/features/functionality_common/types/functionalityCommonImageType';
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload';
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool';

import {
  IPdfImagePositionOptionKeyType,
  PDF_IMAGE_POSITION_OPTIONS,
  PDF_PAGE_SIZE_OPTIONS,
} from '../constant';

type IFunctionalityImageToPdfImageInfo = IFunctionalityCommonImageInfo & {
  file: File | Blob;
};
interface IFunctionalityImageToPdfMainProps {
  accept?: string;
  fileList: FileList;
  onRemoveFileList: () => void;
}
const FunctionalityImageToPdfMain: FC<IFunctionalityImageToPdfMainProps> = ({
  accept,
  fileList,
  onRemoveFileList,
}) => {
  const uploadAccept = useMemo(
    () => accept || 'image/png, image/jpeg,image/heic', //如果没有传入accept参数，默认支持png,jpeg,heic。防止无法上传文件情况
    [accept],
  );
  const { t } = useTranslation();
  const isReadFile = useRef(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloadLoading, setIsDownloadLoading] = useState<boolean>(false);

  const [userSelectSizeType, setUserSelectSizeType] = useState<string>('A4');
  const [userSelectPositionType, setUserSelectPositionType] =
    useState<IPdfImagePositionOptionKeyType>(PDF_IMAGE_POSITION_OPTIONS[0].key);
  const [imageInfoList, setImageInfoList] = useState<
    IFunctionalityImageToPdfImageInfo[]
  >([]); //展示的pdf信息 列表

  const [totalPages, setTotalPages] = useState<number>(0); //总页数
  const [currentActionNum, setCurrentActionNum] = useState<number>(0); //当前加载页数
  const heic2any = useMemo(async () => {
    const heic2anyModule = await import('heic2any');
    return heic2anyModule.default;
  }, []);
  const convertFileListToImageUrls = async (
    fileList: FileList,
  ): Promise<IFunctionalityImageToPdfImageInfo[]> => {
    setTotalPages(fileList.length);
    const imageUrls: IFunctionalityImageToPdfImageInfo[] = [];
    const heicToJpeg = await heic2any;
    for (let i = 0; i < fileList.length; i++) {
      try {
        setCurrentActionNum(i);
        let file: File | Blob = fileList[i];
        let url = '';
        if (file.type === 'image/heic') {
          const resultBlob = await heicToJpeg({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.9,
          });
          file = resultBlob as Blob;
        }
        url = URL.createObjectURL(file);
        imageUrls.push({
          imageUrlString: url,
          id: uuidV4(),
          size: file.size,
          file,
        });
      } catch (e) {
        console.log('simply convertFileListToImageUrls for error:', e);
      }
    }
    setTotalPages(0);
    return imageUrls;
  };

  const onUploadFile = async (fileList: FileList) => {
    setIsLoading(true);
    const imageUrls = await convertFileListToImageUrls(fileList);
    setImageInfoList((list) => [...list, ...imageUrls]);
    setIsLoading(false);
  };
  const initReadFileList = async (fileList) => {
    if (isReadFile.current) {
      return;
    }
    isReadFile.current = true;
    if (fileList) {
      onUploadFile(fileList);
    }
  };
  useEffect(() => {
    if (fileList) {
      initReadFileList(fileList);
    }
  }, [fileList]);
  const handleUnsupportedFileTypeTip = () => {
    functionalityCommonSnackNotifications(
      t(
        'functionality__image_to_pdf:components__image_to_pdf__error_uploaded__tips',
      ),
    );
  };
  const getUserSelectPageSize = useCallback(() => {
    return PDF_PAGE_SIZE_OPTIONS.find(
      (page) => page.name === userSelectSizeType,
    );
  }, [userSelectSizeType]);
  const convertToPDF = useCallback(async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      setIsDownloadLoading(true);
      setTotalPages(imageInfoList.length);
      for (const index in imageInfoList) {
        try {
          const imageFile = imageInfoList[index];
          const fileType = imageFile.file.type;
          if (
            fileType !== 'image/png' &&
            fileType !== 'image/jpeg' &&
            fileType !== 'image/jpg'
          ) {
            continue;
          }
          setCurrentActionNum(index as unknown as number);
          const imageBytes = await imageFile.file.arrayBuffer();
          let image: PDFImage | null = null;
          if (fileType === 'image/png') {
            image = await pdfDoc.embedPng(imageBytes);
          } else {
            image = await pdfDoc.embedJpg(imageBytes);
          }

          //开始获取选择的尺寸和page适配
          const pageSize = await getUserSelectPageSize();
          if (!pageSize) return;
          const page = pdfDoc.addPage([pageSize.width, pageSize.height]);
          const imageWidth = pageSize.width;
          const imageHeight = (imageWidth * image.height) / image.width;
          let x = 0,
            y = 0;
          //当适应完后，图片高度还大于页面高度时，按比例缩放
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
            if (userSelectPositionType === 'middle') {
              x = (pageSize.width - imageWidth) / 2;
              y = (pageSize.height - imageHeight) / 2;
            } else if (userSelectPositionType === 'top') {
              x = (pageSize.width - imageWidth) / 2;
              y = pageSize.height - imageHeight;
            } else if (userSelectPositionType === 'bottom') {
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
      downloadUrl(pdfBytes, 'images(Powered by MaxAI).pdf');
      setIsDownloadLoading(false);
    } catch (error) {
      setIsDownloadLoading(false);
      console.error('Error converting images to PDF:', error);
    }
  }, [imageInfoList, userSelectPositionType, getUserSelectPageSize]);
  const onDeleteInfo = (id: string) => {
    if (imageInfoList) {
      const newPdfInfoList = imageInfoList.filter((pdf) => pdf.id !== id);
      setImageInfoList(newPdfInfoList);
      if (newPdfInfoList.length === 0) {
        onRemoveFileList();
      }
    }
  };
  const currentIsLoading = isLoading || isDownloadLoading;
  //按钮配置列表
  const buttonConfigs: IButtonConfig[] = useMemo(
    () => [
      {
        type: 'upload',
        uploadProps: {
          tooltip: t(
            'functionality__image_to_pdf:components__image_to_pdf__button_add_png__tooltip',
          ),
          onChange: onUploadFile,
          isDrag: false,
          buttonProps: {
            disabled: currentIsLoading,
            variant: 'outlined',
            sx: {
              height: 48,
              width: '100%',
            },
          },
          inputProps: {
            accept: uploadAccept,
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
          disabled: currentIsLoading,
          onClick: () => {
            setImageInfoList([]);
            onRemoveFileList();
          },
        },
      },
    ],
    [uploadAccept, currentIsLoading, t],
  );
  const isEmptyList = imageInfoList.length === 0;
  const bottomButtonConfigs: IButtonConfig[] = useMemo(
    () => [
      {
        type: 'button',
        isShow: !isEmptyList,
        buttonProps: {
          onClick: convertToPDF,
          disabled: currentIsLoading,
          variant: 'contained',
          tooltip: t(
            'functionality__image_to_pdf:components__image_to_pdf__download__tooltip',
          ),
          children: isDownloadLoading ? (
            <CircularProgress size={26} />
          ) : (
            t('functionality__image_to_pdf:components__image_to_pdf__download')
          ),
        },
      },
    ],
    [currentIsLoading, t, isEmptyList, convertToPDF, isDownloadLoading],
  );
  return (
    <React.Fragment>
      {!isEmptyList && (
        <FunctionalityCommonButtonListView buttonConfigs={buttonConfigs} />
      )}
      {!isEmptyList && !isLoading && (
        <Box
          my={3}
          sx={{
            position: 'relative',
            minHeight: 200,
          }}
        >
          <FunctionalityCommonDragSortableList
            list={imageInfoList}
            disabled={currentIsLoading}
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
                            bgcolor: currentIsLoading ? '#f6f6f6' : '#9065B0',
                            borderRadius: 3,
                            color: '#fff',
                          }}
                        />
                      </IconButton>
                    </Box>
                  ) : null}
                </FunctionalityCommonImage>
              </FunctionalityCommonTooltip>
            )}
          </FunctionalityCommonDragSortableList>
        </Box>
      )}
      {isLoading && (
        <Box
          my={3}
          sx={{
            position: 'relative',
            minHeight: 200,
          }}
        >
          <Stack
            flexDirection='column'
            alignItems='center'
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 15,
              bottom: 0,
              bgcolor: 'rgba(255,255,255,0.3)',
              paddingTop: 10,
            }}
          >
            <CircularProgress />
            {totalPages > 0 ? `${currentActionNum}/${totalPages}` : ''}
          </Stack>
        </Box>
      )}
      {!isEmptyList && (
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          my={3}
          gap={2}
        >
          <Grid item display='flex' alignItems='center'>
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
              :
            </Typography>
            <Select
              value={userSelectSizeType}
              onChange={(event) => setUserSelectSizeType(event.target.value)}
              displayEmpty
              size='small'
              disabled={currentIsLoading}
              sx={{
                width: 150,
                ml: 1,
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
          </Grid>
          <Grid item display='flex' alignItems='center'>
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
              :
            </Typography>
            <Select
              value={userSelectPositionType}
              onChange={(event) =>
                setUserSelectPositionType(
                  event.target.value as IPdfImagePositionOptionKeyType,
                )
              }
              displayEmpty
              size='small'
              disabled={currentIsLoading}
              sx={{
                width: 150,
                ml: 1,
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
          </Grid>
        </Grid>
      )}
      {!isEmptyList && (
        <FunctionalityCommonButtonListView
          buttonConfigs={bottomButtonConfigs}
        />
      )}
    </React.Fragment>
  );
};
export default FunctionalityImageToPdfMain;
