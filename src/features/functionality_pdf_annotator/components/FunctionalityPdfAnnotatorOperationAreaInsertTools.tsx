import { Box, Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { FC, useState } from 'react'
import React from 'react'

import UploadButton from '@/features/common/components/UploadButton'
import { eventEmitterAddFabricCanvas } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/FabricCanvas/eventEmitter'
import FunctionalityCommonSignaturePopoverViewMain from '@/features/functionality_common/components/FunctionalityCommonPopover/FunctionalityCommonSignaturePopoverView/FunctionalityCommonSignaturePopoverViewMain'

import { convertFileToBase64Png } from '../utils/convertPNGToBase64'
import FunctionalityPdfAnnotatorIcon from './FunctionalityPdfAnnotatorIcon'

interface IFunctionalityOperationAreaCanvasTools {
  editType: 'annotator' | 'insert'
  onChangeType: (type?: 'annotator' | 'insert') => void
  children?: React.ReactNode
}
const FunctionalityOperationAreaCanvasTools: FC<
  IFunctionalityOperationAreaCanvasTools
> = ({ editType, onChangeType, children }) => {
  const { t } = useTranslation()

  const [uploadKey, setUploadKey] = useState(0)
  const isOpenPagePainter = false
  const isEraser = false

  const uploadImg = async (fileList: FileList) => {
    const file = fileList[0]
    if (!file) return
    const { base64String, width, height } = await convertFileToBase64Png(file)
    eventEmitterAddFabricCanvas({
      type: 'image',
      value: base64String,
      width,
      height,
    })
    onChangeType('insert')
    setUploadKey((prev) => prev + 1)
  }
  const onAddImg = (params: {
    value: string
    width: number
    height: number
  }) => {
    eventEmitterAddFabricCanvas({
      type: 'image',
      value: params.value,
      width: params.width,
      height: params.height,
    })
    onChangeType('insert')
  }
  const onAddText = () => {
    eventEmitterAddFabricCanvas({
      type: 'text-box',
      value: 'Type something…',
    })
    onChangeType('insert')
  }
  return (
    <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Stack
        direction='row'
        alignItems='center'
        sx={{
          overflow: 'hidden',
        }}
        gap={1}
      >
        <Button
          onClick={() => onChangeType()}
          sx={{
            flexDirection: 'column',
            bgcolor: editType === 'annotator' ? '#f5f5f5' : 'transparent',
          }}
          size='small'
        >
          <FunctionalityPdfAnnotatorIcon
            fontSize='small'
            color='primary'
            name='DriveFileRenameOutline'
          />
          <Typography
            variant='custom'
            fontSize={14}
            color='primary.main'
            textAlign='center'
          >
            {t(
              'functionality__pdf_annotator:components__pdf_annotator__insert_tools__text_annotator',
            )}
          </Typography>
        </Button>
        <Button
          onClick={() => onAddText()}
          sx={{
            flexDirection: 'column',
          }}
          size='small'
        >
          <FunctionalityPdfAnnotatorIcon
            fontSize='small'
            color='primary'
            name='TextFields'
          />
          <Typography
            variant='custom'
            fontSize={14}
            color='primary.main'
            textAlign='center'
          >
            {t(
              'functionality__pdf_annotator:components__pdf_annotator__insert_tools__insert_text',
            )}
          </Typography>
        </Button>
        <UploadButton
          key={uploadKey}
          buttonProps={{
            sx: {
              flexDirection: 'column',
            },
          }}
          inputProps={{
            accept: 'image/png,image/heic,image/jpg,image/jpeg',
          }}
          onChange={uploadImg}
        >
          <FunctionalityPdfAnnotatorIcon
            fontSize='small'
            color='primary'
            name='Image'
          />
          <Typography
            variant='custom'
            fontSize={14}
            color='primary.main'
            textAlign='center'
          >
            {t(
              'functionality__pdf_annotator:components__pdf_annotator__insert_tools__insert_image',
            )}
          </Typography>
        </UploadButton>
        <FunctionalityCommonSignaturePopoverViewMain onAddImg={onAddImg}>
          <Button
            sx={{
              flexDirection: 'column',
            }}
            size='small'
          >
            <FunctionalityPdfAnnotatorIcon
              fontSize='small'
              color='primary'
              name='Draw'
            />
            <Typography
              variant='custom'
              fontSize={14}
              color='primary.main'
              textAlign='center'
            >
              {t(
                'functionality__pdf_annotator:components__pdf_annotator__insert_tools__insert_signature',
              )}
            </Typography>
          </Button>
        </FunctionalityCommonSignaturePopoverViewMain>

        <Stack
          flexDirection='row'
          sx={
            isOpenPagePainter
              ? {
                  border: '1px solid #00000033',
                  borderRadius: 1,
                  gap: 0.5,
                  padding: '2px',
                }
              : undefined
          }
        >
          {/* <Button
            sx={{
              flexDirection: 'column',
              bgcolor: isOpenPagePainter ? '#f5f5f5' : 'transparent',
            }}
            size='small'
            onClick={() => {}}
          >
            <FunctionalityPdfAnnotatorIcon
              fontSize='small'
              color='primary'
              name='Brush'
            />
            <Typography variant='custom' fontSize={12} color='primary.main'>
              随意画
            </Typography>
          </Button> */}
          {isOpenPagePainter && (
            <Button
              sx={{
                flexDirection: 'column',
                bgcolor: isEraser ? '#f5f5f5' : 'transparent',
              }}
              size='small'
              onClick={() => {}}
            >
              <FunctionalityPdfAnnotatorIcon
                fontSize='small'
                color='primary'
                name='BackspaceIcon'
              />
              <Typography variant='custom' fontSize={8} color='primary.main'>
                橡皮擦
              </Typography>
            </Button>
          )}
        </Stack>
        {/* <FunctionalitySignPdfOperationDraggableView
        id='abcd123456'
        data={{
          type: 'text',
          value: '2323',
        }}
      >
        <div>移动到下面的DEMO</div>
      </FunctionalitySignPdfOperationDraggableView> */}
      </Stack>
      <Box>{children}</Box>
    </Stack>
  )
}

export default FunctionalityOperationAreaCanvasTools
