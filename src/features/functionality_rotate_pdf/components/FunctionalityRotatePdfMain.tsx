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
import React, { useCallback, useEffect, useMemo, useState } from 'react';

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
import FunctionalityRotatePdfIcon from '@/features/functionality_rotate_pdf/components/FunctionalityRotatePdfIcon';

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
  const { changeScale, currentScale } = useFunctionalityCommonChangeScale(); //放大缩小hooks
  const onUploadFile = async (fileList: FileList) => {
    //用户上传，读取pdf文件显示的图片列表
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
      setIsLoading(true);
      await onReadPdfToImages(fileList[0], 'png', false); //开始读取PDF生成为图片显示
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (convertedPdfImages.length > 0) {
      //这里应该是在onUploadFile的onReadPdfToImages后处理更好，之前没有考虑到，先放在这里
      //对生成好的图片信息列表，添加字短rotateAngle
      setPdfPageImageInfoList(
        convertedPdfImages.map((convertedPdfImage) => ({
          ...convertedPdfImage,
          rotateAngle: 0,
        })),
      );
    }
  }, [convertedPdfImages]);
  const confirmToRotatePdf = async () => {
    //确认并旋转PDF
    try {
      setIsLoading(true);
      setPdfTotalPages(0);
      if (!file) return;
      const buff = await file.arrayBuffer(); //获取文件的二进制数据
      const pdfDocument = await PDFDocument.load(buff); //加载pdf文件
      for (let i = 0; i < pdfPageImageInfoList.length; i++) {
        const pdfImageInfo = pdfPageImageInfoList[i];
        if (pdfImageInfo.rotateAngle === 0) continue;
        const pdfPage = pdfDocument.getPage(pdfImageInfo.definedIndex - 1); //获取最初的页数
        const oldRotationInfo = pdfPage.getRotation(); //获取旧的旋转输入
        pdfPage.setRotation(
          degrees(oldRotationInfo.angle + pdfImageInfo.rotateAngle), //之前的旋转加现在的旋转等于新的角度
        ); //设置旋转角度
      }
      const pageCount = pdfDocument.getPageCount(); //获取pdf文件的总页数
      const fileName = functionalityCommonFileNameRemoveAndAddExtension(
        'rotate-' + file?.name || '',
      ); //获取规定规范的文件名
      if (pdfPageImageInfoList.length === pageCount) {
        //是否跟获取的pdf页面加载的一致
        const bytes = await pdfDocument.save(); //保存pdf文件
        downloadUrl(bytes, fileName);
      } else {
        //因为用户加载的时候点击取消，相当于可以只显示部分页面给他
        const newPdfDocument = await PDFDocument.create(); //新的PDF来copy 截取的页面
        const pages = await newPdfDocument.copyPages(
          pdfDocument,
          pdfPageImageInfoList.map((_, index) => index), //截取的index
        );
        pages.forEach((page) => {
          newPdfDocument.addPage(page); //添加到
        });
        const bytes = await newPdfDocument.save(); //保存pdf文件
        downloadUrl(bytes, fileName);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('simply confirmToRotatePdf error', error);
    }
  };
  const onRemovePdfFile = () => {
    //删除当前的文件/图片信息
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
  const StackViewWrap = useCallback(
    (props) => (
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
    ),
    [],
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
