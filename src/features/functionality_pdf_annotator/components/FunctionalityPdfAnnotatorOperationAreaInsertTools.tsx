import { Button, Stack, Typography } from '@mui/material'
import { FC, useState } from 'react'
import React from 'react'

import UploadButton from '@/features/common/components/UploadButton'
import { eventEmitterAddFabricIndexCanvas } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/eventEmitter'
import FunctionalityCommonSignaturePopoverView from '@/features/functionality_common/components/FunctionalityCommonOperateTestView/FunctionalityCommonSignaturePopoverView'

import { convertFileToBase64Png } from '../utils/convertPNGToBase64'
import FunctionalitySignPdfOperationDraggableView from './FunctionalityCommonOperateDraggable/FunctionalitySignPdfOperationDraggableView'
import FunctionalityPdfAnnotatorIcon from './FunctionalityPdfAnnotatorIcon'

interface IFunctionalityOperationAreaCanvasTools {}
const FunctionalityOperationAreaCanvasTools: FC<
  IFunctionalityOperationAreaCanvasTools
> = () => {
  const [uploadKey, setUploadKey] = useState(0)
  const isOpenPagePainter = false
  const isEraser = false

  const uploadImg = async (fileList: FileList) => {
    const file = fileList[0]
    if (!file) return
    const { base64String, width, height } = await convertFileToBase64Png(file)
    eventEmitterAddFabricIndexCanvas(0, {
      type: 'image',
      value: base64String,
      width,
      height,
    })
  }
  const onAddImg = (params: {
    value: string
    width: number
    height: number
  }) => {
    eventEmitterAddFabricIndexCanvas(0, {
      type: 'image',
      value: params.value,
      width: params.width,
      height: params.height,
    })
  }
  return (
    <Stack
      direction='row'
      alignItems='center'
      sx={{
        overflow: 'hidden',
      }}
      gap={1}
    >
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
          fontSize='inherit'
          color='primary'
          name='Image'
        />
        <Typography variant='custom' fontSize={12} color='primary.main'>
          图片
        </Typography>
      </UploadButton>
      <FunctionalityCommonSignaturePopoverView onAddImg={onAddImg}>
        <Button
          sx={{
            flexDirection: 'column',
          }}
          size='small'
        >
          <FunctionalityPdfAnnotatorIcon
            fontSize='inherit'
            color='primary'
            name='Brush'
          />
          <Typography variant='custom' fontSize={12} color='primary.main'>
            签名
          </Typography>
        </Button>
      </FunctionalityCommonSignaturePopoverView>

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
        <Button
          sx={{
            flexDirection: 'column',
            bgcolor: isOpenPagePainter ? '#f5f5f5' : 'transparent',
          }}
          size='small'
          onClick={() => {}}
        >
          <FunctionalityPdfAnnotatorIcon
            fontSize='inherit'
            color='primary'
            name='Brush'
          />
          <Typography variant='custom' fontSize={12} color='primary.main'>
            随意画
          </Typography>
        </Button>
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
              fontSize='inherit'
              color='primary'
              name='BackspaceIcon'
            />
            <Typography variant='custom' fontSize={8} color='primary.main'>
              橡皮擦
            </Typography>
          </Button>
        )}
      </Stack>

      {/* {activeInfo && (
        <React.Fragment>
          <Button onClick={onDeleteText}>
            <FunctionalityPdfAnnotatorIcon name='DeleteForeverOutlined' />
          </Button>
        </React.Fragment>
      )} */}
      <FunctionalitySignPdfOperationDraggableView
        id='abcd123456'
        data={{
          type: 'text',
          value: '2323',
        }}
      >
        <div>2323</div>
      </FunctionalitySignPdfOperationDraggableView>
    </Stack>
  )
}

export default FunctionalityOperationAreaCanvasTools
