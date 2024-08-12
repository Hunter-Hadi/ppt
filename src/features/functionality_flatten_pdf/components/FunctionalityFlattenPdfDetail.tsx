import { Box, CircularProgress, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView'
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton'
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload'
import { functionalityCommonFileNameRemoveAndAddExtension } from '@/features/functionality_common/utils/functionalityCommonIndex'
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool'

import { convertFlattenPDF } from '../utils/convertFlattenPDF'

interface IFunctionalityFlattenPdfDetailProps {
  file: File
  onRemoveFile: () => void
}

const FunctionalityFlattenPdfDetail: FC<
  IFunctionalityFlattenPdfDetailProps
> = ({ file, onRemoveFile }) => {
  const { t } = useTranslation()
  const isReadFile = useRef(false)
  const [fileName, setFileName] = useState<string>('')
  const [uint8ArrayFile, setUint8ArrayFile] = useState<Uint8Array | null>(null) //生成的HTML 字符串数据，等用户点下载
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const onUploadFile = async (fileList: FileList) => {
    setIsLoading(true)
    if (fileList[0]) {
      //去除文件名后缀
      const fileName = functionalityCommonFileNameRemoveAndAddExtension(
        fileList[0]?.name || '',
      )
      setFileName(fileName)

      const pdfFile = await convertFlattenPDF(fileList[0])
      if (pdfFile) {
        setUint8ArrayFile(pdfFile)
      } else {
        functionalityCommonSnackNotifications(
          `${file.name} ${t(
            'functionality__common:components__common__pdf_encryption_tip',
          )}`,
        )
      }
    }
    setIsLoading(false)
  }
  useEffect(() => {
    if (file) {
      if (isReadFile.current) {
        return
      }
      isReadFile.current = true
      onUploadFile([file] as unknown as FileList)
    }
  }, [file])
  const downloadHtml = useCallback(() => {
    if (uint8ArrayFile) {
      downloadUrl(uint8ArrayFile, fileName)
    }
  }, [uint8ArrayFile, fileName])
  //按钮配置列表
  const buttonConfigs: IButtonConfig[] = useMemo(
    () => [
      {
        type: 'button',
        buttonProps: {
          children: t(
            'functionality__common:components__common__button__download',
          ),
          variant: 'contained',
          disabled: isLoading,
          onClick: downloadHtml,
        },
      },
      {
        type: 'button',
        buttonProps: {
          children: t(
            'functionality__common:components__common__select_other_file',
          ),
          variant: 'outlined',
          disabled: isLoading,
          color: 'error',
          onClick: () => {
            setUint8ArrayFile(null)
            onRemoveFile()
          },
        },
      },
    ],
    [isLoading, downloadHtml, t],
  )
  const BoxViewWrap = useCallback(
    (props) => (
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          minHeight: 200,
          pt: 10,
        }}
      >
        {props.children}
      </Box>
    ),
    [],
  )
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
      {!uint8ArrayFile && !isLoading && (
        <FunctionalityCommonUploadButton
          inputProps={{
            accept: 'application/pdf',
            multiple: false,
          }}
          onChange={onUploadFile}
        />
      )}
      {uint8ArrayFile && (
        <BoxViewWrap>
          <FunctionalityCommonButtonListView buttonConfigs={buttonConfigs} />
        </BoxViewWrap>
      )}
      {isLoading && (
        <BoxViewWrap>
          <Stack
            alignItems='center'
            flexDirection='column'
            justifyContent='center'
            sx={{
              position: 'absolute',
              top: 10,
              left: 0,
              right: 15,
              bottom: 0,
              bgcolor: 'rgba(255,255,255,0.3)',
            }}
          >
            <CircularProgress />
          </Stack>
        </BoxViewWrap>
      )}
    </Stack>
  )
}
export default FunctionalityFlattenPdfDetail
