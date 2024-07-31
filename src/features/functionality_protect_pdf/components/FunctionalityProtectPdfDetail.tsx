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

import { fileGetPdfDocument } from '../utils/protectPdfTool'

interface IFunctionalityProtectPdfDetailProps {
  file: File
  onRemoveFile: () => void
}

const FunctionalityProtectPdfDetail: FC<
  IFunctionalityProtectPdfDetailProps
> = ({ file, onRemoveFile }) => {
  const { t } = useTranslation()
  const isReadFile = useRef(false) //是否已经读取文件
  const [passwordValue, setPasswordValue] = useState<string>('') //输入的密码
  const [repeatPasswordValue, setRepeatPasswordValue] = useState<string>('') //输入的密码

  const [fileName, setFileName] = useState<string>('') //文件名
  const [fileArrayBuffer, setFileArrayBuffer] = useState<ArrayBuffer | null>(
    null,
  ) //文件ArrayBuffer

  const [pdfDocument, setPdfDocument] = useState<null | PDFDocument>(null) //PDF文档

  const [isLoading, setIsLoading] = useState<boolean>(true) //是否加载中
  const [showPassword, setShowPassword] = useState(false) //是否显示密码
  const [showRepeatPassword, setShowRepeatPassword] = useState(false) //是否显示密码

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
          setFileArrayBuffer(pdfInfo.buff)
          setPdfDocument(pdfInfo.pdfDocument) //保存pdfDocument
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
  const protectPdf = useCallback(async () => {
    try {
      if (pdfDocument) {
        //文件没有加密，则可以copy直接下载
        setIsLoading(true)
        const newPdfBytes = await copyPdfAllPagesToNewPDF(
          pdfDocument,
          passwordValue,
        )
        downloadUrl(newPdfBytes, fileName, 'application/pdf')
        setIsLoading(false)
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
              'functionality__protect_pdf:components__protect_pdf_detail__button__protect',
            )
          ),
          variant: 'contained',
          disabled:
            isLoading ||
            passwordValue.trim().length === 0 ||
            repeatPasswordValue.trim().length === 0 ||
            passwordValue !== repeatPasswordValue,
          onClick: () => protectPdf(),
        },
      },
      {
        type: 'button',
        buttonProps: {
          children: t(
            'functionality__protect_pdf:components__protect_pdf_detail__button__convert',
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
    [
      isLoading,
      t,
      passwordValue,
      repeatPasswordValue,
      protectPdf,
      onRemoveFile,
    ],
  )
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container justifyContent='center' spacing={2}>
        <Grid item {...{ xs: 12, md: 12, lg: 6 }}>
          <Box>
            <Box sx={{ marginBottom: 0.5 }}>
              <Typography variant='custom' fontSize={16}>
                {t(
                  'functionality__protect_pdf:components__protect_pdf_detail__type_password',
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
                'functionality__protect_pdf:components__protect_pdf_detail__input__placeholder',
              )}
              value={passwordValue}
              onChange={(event) => setPasswordValue(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ marginBottom: 0.5, mt: 1 }}>
              <Typography variant='custom' fontSize={16}>
                {t(
                  'functionality__protect_pdf:components__protect_pdf_detail__repeat_type_password',
                )}
              </Typography>
            </Box>
            <TextField
              sx={{
                width: '100%',
                mt: 1,
              }}
              type={showRepeatPassword ? 'text' : 'password'}
              size='small'
              placeholder={t(
                'functionality__protect_pdf:components__protect_pdf_detail__repeat_input__placeholder',
              )}
              value={repeatPasswordValue}
              onChange={(event) => setRepeatPasswordValue(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ mt: 0.5 }}>
            <Typography variant='custom' color='text.secondary' fontSize={14}>
              {t(
                'functionality__protect_pdf:components__protect_pdf_detail__use_tips',
              )}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box mt={5}>
        <FunctionalityCommonButtonListView
          buttonConfigs={buttonConfigs}
          gridBreakpoints={{ xs: 12, md: 6, lg: 3 }}
        />
      </Box>
    </Box>
  )
}
export default FunctionalityProtectPdfDetail
