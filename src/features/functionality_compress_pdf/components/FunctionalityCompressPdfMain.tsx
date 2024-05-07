import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { PDFDocument, PDFName, PDFNumber, PDFRawStream } from 'pdf-lib';
import { useMemo, useState } from 'react';

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView';
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';
import { functionalityCommonRemoveAndAddFileExtension } from '@/features/functionality_common/utils/functionalityCommonIndex';
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool';

import { compressPdfStreams } from '../utils/compressPdfStreams';
import { createPngFromPdf } from '../utils/createPngFromPdf';
import { getPdfLibImages } from '../utils/getPdfLibImages';
import { imageToUint8Array } from '../utils/imageToUint8Array';

const FunctionalityCompressPdfMain = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [compression, setCompression] = useState<'low' | 'basic' | 'strong'>(
    'basic',
  );
  const [sizeDiff, setSizeDiff] = useState<
    { after: number; before: number } | undefined
  >(undefined);

  const uInt8ArrayToImage = (arr: Uint8Array | Blob, type: string) => {
    const b = arr instanceof Blob ? arr : new Blob([arr], { type });
    const $img = document.createElement('img');
    $img.src = URL.createObjectURL(b);

    return $img;
  };
  const pdfPngToJpeg = (obj: PDFRawStream, newData: Uint8Array) => {
    obj.dict.delete(PDFName.of('Interpolate'));
    obj.dict.delete(PDFName.of('SMask'));
    obj.dict.delete(PDFName.of('Intent'));

    obj.dict.set(PDFName.of('Filter'), PDFName.of('DCTDecode'));
    obj.dict.set(PDFName.of('Length'), PDFNumber.of(newData.byteLength));
    obj.dict.set(PDFName.of('ColorSpace'), PDFName.of('DeviceRGB'));

    //@ts-ignore
    obj.contents = newData;
  };
  const onCompressPdf = async () => {
    try {
      if (file) {
        setSizeDiff(undefined);
        setIsLoading(true);
        const pdfData = await file.arrayBuffer();
        try {
          const doc = await PDFDocument.load(pdfData!);

          compressPdfStreams(doc);

          const docImages = getPdfLibImages(doc);
          for (let index = 0; index < docImages.length; index++) {
            const image = docImages[index];

            if (!image.isAlphaLayer) {
              const arr =
                image.type === 'png'
                  ? await createPngFromPdf(image)
                  : image.data;
              const imageInfo = uInt8ArrayToImage(
                arr as Blob,
                `image/${image.type}`,
              );
              let quality = 0.85;
              if (compression === 'strong') {
                quality = 0.1;
              } else if (compression === 'basic') {
                quality = 0.5;
              }
              const newData = await imageToUint8Array({
                imageInfo,
                type: 'image/jpeg',
                quality,
              });

              if (image.type === 'png') {
                pdfPngToJpeg(image.obj, newData);
              } else {
                // @ts-ignore
                image.obj.contents = newData;
              }
            }
          }

          const bytes = await doc!.save();
          const blob = new Blob([bytes], { type: 'application/pdf' });
          setSizeDiff({
            before: pdfData!.byteLength,
            after: bytes.byteLength,
          });
          onDownload(blob);
          setIsLoading(false);
        } catch (err) {
          console.warn(err);
        }
      }
    } catch (e) {
      setIsLoading(false);
      console.error('simply mergePdfFiles error', e);
      functionalityCommonSnackNotifications(
        t('functionality__pdf_split:components__pdf_split__error_maximum'),
      );
    }
  };
  const onDownload = (blobUrl: Blob) => {
    if (blobUrl && file) {
      const fileName = functionalityCommonRemoveAndAddFileExtension(file.name);
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blobUrl);
      a.download = fileName;
      a.click();
    }
  };
  const onUploadFile = async (fileList: FileList) => {
    if (fileList[0]) {
      setFile(fileList[0]);
    }
  };
  const handleUnsupportedFileType = () => {
    functionalityCommonSnackNotifications(
      t(
        'functionality__pdf_to_html:components__pdf_to_html__unsupported_file_type_tip',
      ),
    );
  };
  //按钮配置列表
  const compressBeforeButtonConfigs: IButtonConfig[] = useMemo(
    () => [
      {
        type: 'button',
        buttonProps: {
          children: (
            <Stack gap={2} direction='row' alignItems='center'>
              {isLoading && <CircularProgress size={20} />}
              <Box>Compress & Download</Box>
            </Stack>
          ),
          variant: 'contained',
          disabled: isLoading,
          onClick: onCompressPdf,
        },
      },
      {
        type: 'button',
        buttonProps: {
          children: 'Choose another file',
          variant: 'outlined',
          disabled: isLoading,
          color: 'error',
          onClick: () => {
            setFile(null);
            setSizeDiff(undefined);
          },
        },
      },
    ],
    [isLoading, file, compression],
  );
  const BoxViewWrap = (props) => (
    <Stack
      sx={{
        width: '100%',
        position: 'relative',
        minHeight: 200,
      }}
      alignItems='center'
      direction='column'
    >
      {props.children}
    </Stack>
  );
  const compressGradeList = [
    {
      title: 'Low',
      tips: 'Maximum file size, More details',
      key: 'low',
    },
    {
      title: 'Basic',
      tips: 'Medium file size, standard resolution',
      key: 'basic',
    },
    {
      title: 'Strong',
      tips: 'Small file size, lower resolution',
      key: 'strong',
    },
  ];
  return (
    <Stack
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        display: 'flex',
        width: '100%',
      }}
    >
      {!file && !isLoading && (
        <FunctionalityCommonUploadButton
          inputProps={{
            accept: 'application/pdf',
            multiple: true,
          }}
          onChange={onUploadFile}
          handleUnsupportedFileType={handleUnsupportedFileType}
        />
      )}
      {file && (
        <BoxViewWrap>
          <Box
            sx={{
              mb: 5,
              width: '100%',
            }}
          >
            {compressGradeList.map((item, index) => (
              <Grid container key={index} justifyContent='center'>
                <Grid item xs={12} lg={8}>
                  <Stack
                    direction='row'
                    alignItems='center'
                    onClick={() => {
                      if (!isLoading) {
                        setCompression(item.key as 'low' | 'basic' | 'strong');
                      }
                    }}
                    gap={2}
                    sx={{
                      padding: 1.5,
                      cursor: isLoading ? '' : 'pointer',
                      border: `1px solid ${
                        item.key === compression ? '#9065B0' : '#e8e8e8'
                      }`,
                      borderRadius: 1,
                      mt: 1,
                      '&:hover': {
                        bgcolor: isLoading ? 'transcript' : '#f4f4f4',
                      },
                    }}
                  >
                    <Stack
                      direction='row'
                      alignItems='center'
                      justifyContent='center'
                      sx={{
                        border: `1px solid ${
                          item.key === compression ? '#9065B0' : '#e8e8e8'
                        }`,
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor:
                            item.key === compression ? '#9065B0' : 'transcript',
                          width: 17,
                          height: 17,
                          borderRadius: 10,
                        }}
                      ></Box>
                    </Stack>
                    <Box>
                      <Box>
                        <Typography
                          fontSize={{
                            xs: 14,
                            lg: 16,
                          }}
                          color='text.primary'
                        >
                          {item.title}
                        </Typography>{' '}
                      </Box>
                      <Box>
                        <Typography
                          fontSize={{
                            xs: 12,
                            lg: 14,
                          }}
                          color='text.secondary'
                        >
                          {item.tips}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            ))}
          </Box>
          <FunctionalityCommonButtonListView
            buttonConfigs={compressBeforeButtonConfigs}
            gridSize={{ xs: 12, md: 4 }}
          />
          {sizeDiff && (
            <Typography
              fontSize={{
                xs: 12,
                lg: 14,
              }}
              sx={{
                mt: 2,
              }}
              color='text.secondary'
            >
              PDF current size :{(sizeDiff.after / 1000).toFixed(2)}kB! PDF
              original size:{(sizeDiff.before / 1000).toFixed(2)}kB!
              <p>
                Different from before
                {((1 - sizeDiff.after / sizeDiff.before) * 100).toFixed(0)}%
                smaller!
              </p>
            </Typography>
          )}
        </BoxViewWrap>
      )}
    </Stack>
  );
};
export default FunctionalityCompressPdfMain;
