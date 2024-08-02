import { PDFDocument } from '@cantoo/pdf-lib'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { useCallback } from 'react'
import { FC, useEffect, useMemo, useRef, useState } from 'react'

import { copyPdfAllPagesToNewPDF } from '@/features/common/utils/pdflibUtils'
import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView'
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload'
import { functionalityCommonFileNameRemoveAndAddExtension } from '@/features/functionality_common/utils/functionalityCommonIndex'
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool'

import {
  fileGetPdfDocument,
  uintArrayGetPdfDocument,
} from '../utils/unlockPdfTool'

interface IFunctionalityUnlockPdfDetail {
  file: File
  onRemoveFile: () => void
}

const FunctionalityUnlockPdfDetail: FC<IFunctionalityUnlockPdfDetail> = ({
  file,
  onRemoveFile,
}) => {
  const { t } = useTranslation()
  const isReadFile = useRef(false) //是否已经读取文件
  const [passwordValue, setPasswordValue] = useState<string>('') //输入的密码

  const [fileName, setFileName] = useState<string>('') //文件名
  const [fileArrayBuffer, setFileArrayBuffer] = useState<ArrayBuffer | null>(
    null,
  ) //文件ArrayBuffer

  const [pdfDocument, setPdfDocument] = useState<null | PDFDocument>(null) //PDF文档

  const [isLoading, setIsLoading] = useState<boolean>(true) //是否加载中
  const [showPassword, setShowPassword] = useState(false) //是否显示密码

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const onInitFile = async (fileList: FileList) => {
    try {
      setIsLoading(true)
      if (fileList[0]) {
        //去除文件名后缀
        const fileName = functionalityCommonFileNameRemoveAndAddExtension(
          fileList[0]?.name || '',
          'pdf',
        )
        setFileName(fileName)
        // 加载PDF文档
        const pdfInfo = await fileGetPdfDocument(fileList[0])
        if (pdfInfo) {
          if (pdfInfo.pdfDocument.isEncrypted) {
            //文件加密了，需要输入密码
            setFileArrayBuffer(pdfInfo.buff)
          } else {
            //文件没有加密，则可以copy直接下载
            setPdfDocument(pdfInfo.pdfDocument) //保存pdfDocument
          }
        } else {
          functionalityCommonSnackNotifications(
            `${file.name} ${t(
              'functionality__common:components__common__pdf_encryption_tip',
            )}`,
          )
          onRemoveFile()
        }
      }
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      functionalityCommonSnackNotifications(
        `${file.name} ${t(
          'functionality__common:components__common__pdf_encryption_tip',
        )}`,
      )
      onRemoveFile()
    }
  }
  const unlockPdf = useCallback(async () => {
    try {
      if (pdfDocument) {
        //文件没有加密，则可以copy直接下载
        setIsLoading(true)
        const newPdfBytes = await copyPdfAllPagesToNewPDF(pdfDocument)
        downloadUrl(newPdfBytes, fileName, 'application/pdf')
        setIsLoading(false)
      } else {
        try {
          //文件加密了，需要输入密码
          if (fileArrayBuffer) {
            setIsLoading(true)
            const PdfInfo = await uintArrayGetPdfDocument(
              fileArrayBuffer,
              passwordValue,
            ) //读取Uint8Array为PDF文档

            const newPdfBytes = await copyPdfAllPagesToNewPDF(
              PdfInfo.pdfDocument,
            ) //复制PDF文档的所有页面到新的PDF文档
            if (newPdfBytes) {
              downloadUrl(newPdfBytes, fileName, 'application/pdf')
            }
            setIsLoading(false)
          }
        } catch (e) {
          setIsLoading(false)
          functionalityCommonSnackNotifications(
            `${t(
              'functionality__unlock_pdf:components__unlock_pdf_detail__incorrect_password_tips',
            )}`,
          )
        }
      }
    } catch (e) {
      setIsLoading(false)
      functionalityCommonSnackNotifications(
        `${file.name} ${t(
          'functionality__common:components__common__pdf_encryption_tip',
        )}`,
      )
    }
  }, [file.name, fileArrayBuffer, fileName, passwordValue, pdfDocument, t])
  useEffect(() => {
    if (file) {
      if (isReadFile.current) {
        return
      }
      isReadFile.current = true
      onInitFile([file] as unknown as FileList)
    }
  }, [file])
  //按钮配置列表
  const buttonConfigs: IButtonConfig[] = useMemo(
    () => [
      {
        type: 'button',
        buttonProps: {
          children: isLoading ? (
            <CircularProgress size={26} />
          ) : (
            t(
              'functionality__unlock_pdf:components__unlock_pdf_detail__button__unlock',
            )
          ),
          variant: 'contained',
          disabled: isLoading || (!pdfDocument && passwordValue.length === 0),
          onClick: () => unlockPdf(),
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
            onRemoveFile()
          },
        },
      },
    ],
    [isLoading, t, pdfDocument, passwordValue.length, unlockPdf, onRemoveFile],
  )
  return (
    <Box sx={{ width: '100%' }}>
      {!pdfDocument && fileArrayBuffer && (
        <Grid container justifyContent='center' spacing={2}>
          <Grid item {...{ xs: 12, md: 12, lg: 6 }}>
            <Box>
              <Box sx={{ marginBottom: 0.5 }}>
                <Typography variant='custom' fontSize={16}>
                  {t(
                    'functionality__unlock_pdf:components__unlock_pdf_detail_input_password',
                  )}
                </Typography>
              </Box>
              <TextField
                sx={{
                  width: '100%',
                  mt: 1,
                }}
                type={showPassword ? 'text' : 'password'}
                size='small'
                placeholder={t(
                  'functionality__unlock_pdf:components__unlock_pdf_detail_input_placeholder',
                )}
                value={passwordValue}
                onChange={(event) => setPasswordValue(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={handleToggleShowPassword} edge='end'>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ mt: 0.5 }}>
                <Typography
                  variant='custom'
                  color='text.secondary'
                  fontSize={14}
                >
                  {t(
                    'functionality__unlock_pdf:components__unlock_pdf_detail__use_tips',
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
      <Box mt={5}>
        <FunctionalityCommonButtonListView
          buttonConfigs={buttonConfigs}
          gridBreakpoints={{ xs: 12, md: 6, lg: 3 }}
        />
      </Box>
    </Box>
  )
}
export default FunctionalityUnlockPdfDetail
