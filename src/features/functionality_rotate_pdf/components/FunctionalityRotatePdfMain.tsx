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
  rotateAngle: number;
};

export const FunctionalityRotatePdfMain = () => {
  const { t } = useTranslation();
  const [pdfPageImageInfoList, setPdfPageImageInfoList] = useState<
    IFunctionalityRotatePdfType[]
  >([]); //PDF页面的图片列信息表
  const [isLoading, setIsLoading] = useState<boolean>(false); //是否加载
  const [file, setFile] = useState<File | null>(null); //文件
  const {
    convertedPdfImages, //转换完的图片信息列表
    setConvertedPdfImages,
    pdfIsLoading,
    onReadPdfToImages,
    onCancelPdfActive,
    pdfTotalPages,
    currentPdfActionNum,
    setPdfTotalPages,
  } = useFunctionalityCommonPdfToImageConversion(); //pdf转图片类型 工具 的hook
  useEffect(() => {
    if (convertedPdfImages.length > 0) {
      console.log('simply convertedPdfImages', convertedPdfImages);
      //这里应该是在onUploadFile的onReadPdfToImages后处理更好，之前没有考虑到，先放在这里
      setPdfPageImageInfoList(
        convertedPdfImages.map((convertedPdfImage) => ({
          ...convertedPdfImage,
          rotateAngle: 0,
        })),
      );
    }
  }, [convertedPdfImages]);
  const { changeScale, currentScale } = useFunctionalityCommonChangeScale(); //放大缩小hooks
  const onUploadFile = async (fileList: FileList) => {
    //用户上传，读取pdf文件显示的图片列表
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
      setIsLoading(true);
      await onReadPdfToImages(fileList[0], 'png', false);
      setIsLoading(false);
    }
  };
  const confirmToRotatePdf = async () => {
    //确认并旋转PDF
    setIsLoading(true);
    setPdfTotalPages(0);
    if (!file) return;
    const buff = await file.arrayBuffer(); //获取文件的二进制数据
    const pdfDocument = await PDFDocument.load(buff); //加载pdf文件
    const pageCount = pdfDocument.getPageCount(); //获取pdf文件的页数
    for (let i = 0; i < pageCount; i++) {
      const pdfPage = pdfDocument.getPage(i);
      const oldRotationInfo = pdfPage.getRotation(); //获取旧的旋转输入
      pdfPage.setRotation(
        degrees(oldRotationInfo.angle + pdfPageImageInfoList[i].rotateAngle), //之前的旋转加现在的旋转等于新的角度
      ); //设置旋转角度
    }

    const bytes = await pdfDocument.save(); //保存pdf文件
    const blob = new Blob([bytes], { type: 'application/pdf' }); //创建blob对象
    const fileName = functionalityCommonFileNameRemoveAndAddExtension(
      'rotate-' + file?.name || '',
    ); //获取规定规范的文件名
    downloadUrl(blob, fileName);
    setIsLoading(false);
  };
  const onRemovePdfFile = () => {
    //删除当前的文件
    setConvertedPdfImages([]);
    setPdfPageImageInfoList([]);
    setFile(null);
  };
  const changeRotateNumberCorrect = (rotateNumber: number) => {
    //大于360就是0，不然数字会一直累积
    const newRotateNumber = rotateNumber + 90;
    return newRotateNumber === 360 ? 0 : newRotateNumber;
  };
  const onRotateSelect = (pdfImageInfo: IFunctionalityRotatePdfType) => {
    //旋转此刻图片
    setPdfPageImageInfoList((currentPdfPageImageList) => {
      return currentPdfPageImageList.map((pdfPageImage) => {
        if (pdfPageImage.id === pdfImageInfo.id) {
          return {
            ...pdfPageImage,
            rotateAngle: changeRotateNumberCorrect(pdfPageImage.rotateAngle),
          };
        } else {
          return pdfPageImage;
        }
      });
    });
  };
  const onRotateAll = () => {
    //旋转全部的图片
    setPdfPageImageInfoList((currentPdfPageImageList) => {
      return currentPdfPageImageList.map((pdfPageImage) => {
        return {
          ...pdfPageImage,
          rotateAngle: changeRotateNumberCorrect(pdfPageImage.rotateAngle),
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
          children: t(
            'functionality__rotate_pdf:components__rotate_pdf__main__rotate_all',
          ),
          variant: 'outlined',
          disabled: currentIsLoading || pdfPageImageInfoList.length === 0,
          onClick: onRotateAll,
        },
      },
      {
        type: 'button',
        buttonProps: {
          tooltip: t(
            'functionality__rotate_pdf:components__rotate_pdf__main__remove_pdf_tooltip',
          ),
          children: t(
            'functionality__rotate_pdf:components__rotate_pdf__main__remove_pdf',
          ),
          variant: 'outlined',
          color: 'error',
          disabled: currentIsLoading,
          onClick: onRemovePdfFile,
        },
      },
      {
        isShow: currentIsLoading,
        type: 'button',
        buttonProps: {
          tooltip: t(
            'functionality__rotate_pdf:components__rotate_pdf__button__cancel__tooltip',
          ),
          children: t(
            'functionality__rotate_pdf:components__rotate_pdf__cancel',
          ),
          variant: 'outlined',
          color: 'error',
          onClick: onCancelPdfActive,
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
              'functionality__rotate_pdf:components__rotate_pdf__button__zoom_in__tooltip',
            ),
          },
          {
            name: 'RemoveCircleTwoTone',
            onClick: () => changeScale('narrow'),
            tooltip: t(
              'functionality__rotate_pdf:components__rotate_pdf__button__zoom_out__tooltip',
            ),
            sx: {
              marginLeft: 1,
            },
          },
        ],
      },
    ],
    [currentIsLoading, pdfPageImageInfoList, t],
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
      {!currentIsLoading && pdfPageImageInfoList.length === 0 && (
        <FunctionalityCommonUploadButton
          inputProps={{
            accept: 'application/pdf',
          }}
          onChange={onUploadFile}
        />
      )}
      {pdfPageImageInfoList.length > 0 && (
        <FunctionalityCommonButtonListView buttonConfigs={buttonConfigs} />
      )}

      {pdfPageImageInfoList.length > 0 && !currentIsLoading && (
        <StackViewWrap>
          {pdfPageImageInfoList.map((imageInfo, index) => (
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
                transform: `rotate(${imageInfo.rotateAngle}deg)`,
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
      {pdfPageImageInfoList?.length > 0 && (
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
                'functionality__rotate_pdf:components__rotate_pdf__button__download__tooltip',
              )}
            >
              <Button
                sx={{ width: '100%', height: 48 }}
                disabled={currentIsLoading}
                size='large'
                variant='contained'
                onClick={() => confirmToRotatePdf()}
              >
                {t(
                  'functionality__rotate_pdf:components__rotate_pdf__button__download',
                )}
              </Button>
            </FunctionalityCommonTooltip>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};
export default FunctionalityRotatePdfMain;
