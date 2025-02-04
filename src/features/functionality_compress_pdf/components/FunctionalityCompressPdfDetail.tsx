import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { PDFDocument, PDFName, PDFNumber, PDFRawStream } from 'pdf-lib'
import React, { FC, useMemo, useState } from 'react'

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView'
import FunctionalityCommonOptionSelector from '@/features/functionality_common/components/FunctionalityCommonOptionSelector'
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload'
import { functionalityCommonFileNameRemoveAndAddExtension } from '@/features/functionality_common/utils/functionalityCommonIndex'
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool'

import { compressPdfStreams } from '../utils/compressPdfStreams'
import { createPngFromPdf } from '../utils/createPngFromPdf'
import { getPdfLibImages } from '../utils/getPdfLibImages'
import { imageToUint8Array } from '../utils/imageToUint8Array'
interface IFunctionalityCompressPdfDetail {
  file: File
  onRemoveFile: () => void
}

const FunctionalityCompressPdfDetail: FC<IFunctionalityCompressPdfDetail> = ({
  file,
  onRemoveFile,
}) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [compressionGrade, setCompressionGrade] = useState<
    'low' | 'basic' | 'strong'
  >('basic')
  const [pdfSizeDiff, setPdfSizeDiff] = useState<
    { after: number; before: number } | undefined
  >(undefined)

  const uInt8ArrayToImage = (arr: Uint8Array | Blob, type: string) => {
    const b = arr instanceof Blob ? arr : new Blob([arr], { type })
    const imageDocument = document.createElement('img')
    imageDocument.src = URL.createObjectURL(b)

    return imageDocument
  }
  const pdfPngToJpeg = (pdfRawStream: PDFRawStream, newData: Uint8Array) => {
    pdfRawStream.dict.delete(PDFName.of('Interpolate'))
    pdfRawStream.dict.delete(PDFName.of('SMask'))
    pdfRawStream.dict.delete(PDFName.of('Intent'))

    pdfRawStream.dict.set(PDFName.of('Filter'), PDFName.of('DCTDecode'))
    pdfRawStream.dict.set(
      PDFName.of('Length'),
      PDFNumber.of(newData.byteLength),
    )
    pdfRawStream.dict.set(PDFName.of('ColorSpace'), PDFName.of('DeviceRGB'))
    ;(pdfRawStream as { contents: Uint8Array }).contents = newData
  }
  const onCompressPdf = async () => {
    try {
      setPdfSizeDiff(undefined)
      setIsLoading(true)
      const pdfData = await file.arrayBuffer()
      const doc = await PDFDocument.load(pdfData!)

      compressPdfStreams(doc)

      const docImages: any = getPdfLibImages(doc)
      for (let index = 0; index < docImages.length; index++) {
        const image = docImages[index]

        if (!image.isAlphaLayer) {
          const arr =
            image.type === 'png' ? await createPngFromPdf(image) : image.data
          const imageDocument = uInt8ArrayToImage(arr, `image/${image.type}`)
          let quality = 0.85
          if (compressionGrade === 'strong') {
            quality = 0.1
          } else if (compressionGrade === 'basic') {
            quality = 0.5
          }
          const newData = await imageToUint8Array({
            imageDocument,
            type: 'image/jpeg',
            quality,
          })

          if (image.type === 'png') {
            pdfPngToJpeg(image.pdfObject, newData)
          } else {
            image.pdfObject.contents = newData
          }
        }
      }

      const bytes = await doc!.save()

      if (bytes.byteLength > pdfData!.byteLength) {
        //转检查，如果大于之前的，则下载原始文件
        //因为图片会重新编码，导致概率可能会变大
        const blob = new Blob([pdfData], { type: 'application/pdf' })
        setPdfSizeDiff({
          before: pdfData!.byteLength,
          after: pdfData.byteLength,
        })
        onDownload(blob)
      } else {
        const blob = new Blob([bytes], { type: 'application/pdf' })
        setPdfSizeDiff({
          before: pdfData!.byteLength,
          after: bytes.byteLength,
        })
        onDownload(blob)
      }
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      onRemoveFile()
      console.log('simply onCompressPdf error', e)
      functionalityCommonSnackNotifications(
        t(
          'functionality__compress_pdf:components__compress_pdf__main__compress_error',
        ),
      )
    }
  }
  const onDownload = (blobUrl: Blob) => {
    if (blobUrl) {
      const fileName = functionalityCommonFileNameRemoveAndAddExtension(
        file.name,
      )
      downloadUrl(blobUrl, fileName, 'application/pdf')
    }
  }
  //按钮配置列表
  const compressBeforeButtonConfigs: IButtonConfig[] = useMemo(
    () => [
      {
        type: 'button',
        buttonProps: {
          children: (
            <Stack gap={2} direction='row' alignItems='center'>
              {isLoading && <CircularProgress size={20} />}
              <Box>
                {t(
                  'functionality__compress_pdf:components__compress_pdf__main__compress_download',
                )}
              </Box>
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
          children: t(
            'functionality__compress_pdf:components__compress_pdf__main__choose_another_file',
          ),
          variant: 'outlined',
          disabled: isLoading,
          color: 'error',
          onClick: () => {
            setPdfSizeDiff(undefined)
            onRemoveFile()
          },
        },
      },
    ],
    [isLoading, file, compressionGrade, t],
  )

  //压缩等级列表
  const compressGradeOptions: {
    label: string
    tips: string
    value: 'low' | 'basic' | 'strong'
  }[] = [
    {
      label: t(
        'functionality__compress_pdf:components__compress_pdf__main__compress_low_grade_title',
      ),
      tips: t(
        'functionality__compress_pdf:components__compress_pdf__main__compress_low_grade_description',
      ),
      value: 'low',
    },
    {
      label: t(
        'functionality__compress_pdf:components__compress_pdf__main__compress_basic_grade_title',
      ),
      tips: t(
        'functionality__compress_pdf:components__compress_pdf__main__compress_basic_grade_description',
      ),
      value: 'basic',
    },
    {
      label: t(
        'functionality__compress_pdf:components__compress_pdf__main__compress_strong_grade_title',
      ),
      tips: t(
        'functionality__compress_pdf:components__compress_pdf__main__compress_strong_grade_description',
      ),
      value: 'strong',
    },
  ]
  return (
    <Stack
      sx={{
        width: '100%',
        position: 'relative',
        minHeight: 200,
      }}
      alignItems='center'
      direction='column'
    >
      <Box
        sx={{
          mb: 5,
          width: '100%',
        }}
      >
        <FunctionalityCommonOptionSelector
          disabled={isLoading}
          list={compressGradeOptions}
          selectKey={compressionGrade}
          onSelect={(item) => setCompressionGrade(item.value)}
        />
      </Box>
      <FunctionalityCommonButtonListView
        buttonConfigs={compressBeforeButtonConfigs}
        gridBreakpoints={{ xs: 12, md: 6, lg: 4 }}
      />
      {pdfSizeDiff && (
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
          {t(
            'functionality__compress_pdf:components__compress_pdf__main__current_pdf_size',
          )}
          :{(pdfSizeDiff.after / 1000).toFixed(2)}kB!
          {t(
            'functionality__compress_pdf:components__compress_pdf__main__original_pdf_size',
          )}
          :{(pdfSizeDiff.before / 1000).toFixed(2)}kB!
          <p style={{ textAlign: 'center' }}>
            {t(
              'functionality__compress_pdf:components__compress_pdf__main__different_pdf_size',
              {
                DiFF_NUMBER: (
                  (1 - pdfSizeDiff.after / pdfSizeDiff.before) *
                  100
                ).toFixed(0),
              },
            )}
          </p>
        </Typography>
      )}
    </Stack>
  )
}
export default FunctionalityCompressPdfDetail
