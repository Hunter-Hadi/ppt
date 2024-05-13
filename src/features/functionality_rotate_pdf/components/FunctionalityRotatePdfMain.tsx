import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { degrees, PDFDocument } from 'pdf-lib';
import React, { useEffect, useMemo, useState } from 'react';

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView';
import FunctionalityCommonImage from '@/features/functionality_common/components/FunctionalityCommonImage';
import FunctionalityCommonTooltip from '@/features/functionality_common/components/FunctionalityCommonTooltip';
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';
import { useFunctionalityCommonChangeScale } from '@/features/functionality_common/hooks/useFunctionalityCommonChangeScale';
import useFunctionalityCommonPdfToImageConversion, {
  IFunctionalityPdfToImageType,
} from '@/features/functionality_common/hooks/useFunctionalityCommonPdfToImageConversion';
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload';
import { functionalityCommonFileNameRemoveAndAddExtension } from '@/features/functionality_common/utils/functionalityCommonIndex';

import FunctionalityRotatePdfIcon from './FunctionalityRotatePdfIcon';
type IFunctionalityRotatePdfType = IFunctionalityPdfToImageType & {
  rotate: number;
};

export const FunctionalityRotatePdfMain = () => {
  const { t } = useTranslation();
  const [pdfPageImageList, setPdfPageImageList] = useState<
    IFunctionalityRotatePdfType[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const {
    convertedPdfImages,
    setConvertedPdfImages,
    pdfIsLoading,
    onReadPdfToImages,
    onCancelPdfActive,
    pdfTotalPages,
    currentPdfActionNum,
    setPdfTotalPages,
  } = useFunctionalityCommonPdfToImageConversion();
  useEffect(() => {
    if (convertedPdfImages.length > 0) {
      //这里应该是在onUploadFile的onReadPdfToImages后处理更好，之前没有考虑到，先放在这里
      setPdfPageImageList(
        convertedPdfImages.map((convertedPdfImage) => ({
          ...convertedPdfImage,
          rotate: 0,
        })),
      );
    }
  }, [convertedPdfImages]);
  const { changeScale, currentScale } = useFunctionalityCommonChangeScale();
  const onUploadFile = async (fileList: FileList) => {
    //用户上传，读取pdf文件显示的图片列表
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
      setIsLoading(true);
      await onReadPdfToImages(fileList[0], 'png', false);
      setIsLoading(false);
    }
  };
  const confirmToSplit = async () => {
    setIsLoading(true);
    setPdfTotalPages(0);
    if (!file) return;
    const buff = await file.arrayBuffer(); //获取文件的二进制数据
    const downloadDoc = await PDFDocument.load(buff); //加载pdf文件
    const pageCount = downloadDoc.getPageCount(); //获取pdf文件的页数
    for (let i = 0; i < pageCount; i++) {
      const page = downloadDoc.getPage(i);
      page.setRotation(degrees(pdfPageImageList[i].rotate)); //设置旋转角度
    }

    const bytes = await downloadDoc.save(); //保存pdf文件
    const blob = new Blob([bytes], { type: 'application/pdf' }); //创建blob对象
    const fileName = functionalityCommonFileNameRemoveAndAddExtension(
      'split-' + file?.name || '',
    ); //获取规定规范的文件名
    downloadUrl(blob, fileName);
    setIsLoading(false);
  };
  const onRemoveFile = () => {
    setConvertedPdfImages([]);
    setPdfPageImageList([]);
    setFile(null);
  };
  const onRotateSelect = (pdfImageInfo: IFunctionalityRotatePdfType) => {
    //旋转图片
    setPdfPageImageList((currentPdfPageImageList) => {
      return currentPdfPageImageList.map((pdfPageImage) => {
        if (pdfPageImage.id === pdfImageInfo.id) {
          return {
            ...pdfPageImage,
            rotate: pdfPageImage.rotate + 90,
          };
        } else {
          return pdfPageImage;
        }
      });
    });
  };
  const onRotateAll = () => {
    setPdfPageImageList((currentPdfPageImageList) => {
      return currentPdfPageImageList.map((pdfPageImage) => {
        return {
          ...pdfPageImage,
          rotate: pdfPageImage.rotate + 90,
        };
      });
    });
  };
  const currentIsLoading = pdfIsLoading || isLoading;
  //按钮配置列表
  const buttonConfigs: IButtonConfig[] = useMemo(
    () => [
      {
        type: 'button',
        buttonProps: {
          children: 'Rotate All',
          variant: 'outlined',
          disabled: currentIsLoading || pdfPageImageList.length === 0,
          onClick: onRotateAll,
        },
      },
      {
        type: 'button',
        buttonProps: {
          tooltip: t(
            'functionality__pdf_split:components__pdf_split__button__remove__tooltip',
          ),
          children: t(
            'functionality__pdf_split:components__pdf_split__remove_pdf',
          ),
          variant: 'outlined',
          color: 'error',
          disabled: currentIsLoading,
          onClick: () => onRemoveFile(),
        },
      },
      {
        isShow: currentIsLoading,
        type: 'button',
        buttonProps: {
          tooltip: t(
            'functionality__pdf_split:components__pdf_split__button__cancel__tooltip',
          ),
          children: t('functionality__pdf_split:components__pdf_split__cancel'),
          variant: 'outlined',
          color: 'error',
          onClick: () => onCancelPdfActive(),
        },
      },
      {
        isShow: !currentIsLoading,
        type: 'iconButton',
        iconButtonProps: [
          {
            name: 'ControlPointTwoTone',
            onClick: () => changeScale('enlarge'),
            tooltip: t(
              'functionality__pdf_to_image:components__to_image_detail__button__zoom_in__tooltip',
            ),
          },
          {
            name: 'RemoveCircleTwoTone',
            onClick: () => changeScale('narrow'),
            tooltip: t(
              'functionality__pdf_to_image:components__to_image_detail__button__zoom_out__tooltip',
            ),
            sx: {
              marginLeft: 1,
            },
          },
        ],
      },
    ],
    [currentIsLoading, pdfPageImageList, t],
  );
  const StackViewWrap = (props) => (
    <Stack
      direction='row'
      flexWrap='wrap'
      justifyContent='center'
      my={3}
      gap={2}
      sx={{
        position: 'relative',
        minHeight: 200,
      }}
    >
      {props.children}
    </Stack>
  );
  return (
    <Stack
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        width: '100%',
      }}
    >
      {!currentIsLoading && pdfPageImageList.length === 0 && (
        <FunctionalityCommonUploadButton
          inputProps={{
            accept: 'application/pdf',
          }}
          onChange={onUploadFile}
        />
      )}
      {pdfPageImageList.length > 0 && (
        <FunctionalityCommonButtonListView buttonConfigs={buttonConfigs} />
      )}

      {pdfPageImageList.length > 0 && !currentIsLoading && (
        <StackViewWrap>
          {pdfPageImageList.map((imageInfo, index) => (
            <FunctionalityCommonImage
              key={imageInfo.id}
              name={String(index + 1)}
              imageInfo={imageInfo}
              onClick={() => onRotateSelect(imageInfo)}
              wrapSx={{
                width: currentScale * 50,
                overflow: 'hidden',
              }}
              imgStyle={{
                transform: `rotate(${imageInfo.rotate}deg)`,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
              >
                <IconButton>
                  <FunctionalityRotatePdfIcon
                    name='RotateRight'
                    fontSize='small'
                    sx={{
                      bgcolor: '#9065B0',
                      borderRadius: 3,
                      color: '#fff',
                    }}
                  />
                </IconButton>
              </Box>
            </FunctionalityCommonImage>
          ))}
        </StackViewWrap>
      )}
      {currentIsLoading && (
        <StackViewWrap>
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
            {pdfTotalPages > 0 ? `${currentPdfActionNum}/${pdfTotalPages}` : ''}
          </Stack>
        </StackViewWrap>
      )}
      {pdfPageImageList?.length > 0 && (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{ mt: 1 }}
        >
          <Grid item xs={10} md={2}>
            <FunctionalityCommonTooltip
              title={t(
                'functionality__pdf_split:components__pdf_split__button__download__tooltip',
              )}
            >
              <Button
                sx={{ width: '100%', height: 48 }}
                disabled={currentIsLoading}
                size='large'
                variant='contained'
                onClick={() => confirmToSplit()}
              >
                Download
              </Button>
            </FunctionalityCommonTooltip>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};
export default FunctionalityRotatePdfMain;
