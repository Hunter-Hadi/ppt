import { Button, Stack, Typography } from '@mui/material'
import * as fabric from 'fabric'
// 引入 rangy
import rangy from 'rangy'
import { FC, useState } from 'react'
import React from 'react'
// 初始化 rangy
rangy.init()
import UploadButton from '@/features/common/components/UploadButton'
import eventEmitter, {
  eventEmitterAddFabricCanvas,
} from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/eventEmitter'
import FunctionalityCommonSignaturePopoverView from '@/features/functionality_common/components/FunctionalityCommonOperateTestView/FunctionalityCommonSignaturePopoverView'

import { convertFileToBase64Png } from '../utils/convertPNGToBase64'
import getClientRects from '../utils/get-client-rects'
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
    eventEmitterAddFabricCanvas({
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
    eventEmitterAddFabricCanvas({
      type: 'image',
      value: params.value,
      width: params.width,
      height: params.height,
    })
  }
  function getParentTopByClass(element, targetClass, maxLevels) {
    let currentElement = element
    let levelCount = 0 // 设置级别计数器

    // 向上查找，直到找到指定 class 的元素或达到最大级别
    while (currentElement && levelCount < maxLevels) {
      if (currentElement.classList?.contains(targetClass)) {
        return currentElement
      }
      currentElement = currentElement.parentNode // 移动到上一个父元素
      levelCount++ // 计数器 +1
    }

    // 如果没有找到目标类的父元素，返回 0
    return 0
  }
  const onAddTextTest = () => {
    const selection = window.getSelection()
    console.log('selection', selection)

    if (selection) {
      const selectedText = selection.toString() // 获取选中的文本

      if (selectedText) {
        const range = selection.getRangeAt(0) // 获取选区的范围
        const selectedElement = range // 获取最近的共同祖先元素
        console.log('selectedElement', selectedElement.commonAncestorContainer)
        const wrapContainer = getParentTopByClass(
          selectedElement.commonAncestorContainer,
          'textLayer',
          10,
        )
        console.log('wrapContainer', wrapContainer)
        const rects = getClientRects(range, [
          {
            node: wrapContainer,
            number: 1,
          },
        ]) // 调用 getClientRects 方法获取矩形区域

        console.log('rects', rects)

        for (const rect of rects) {
          const fabricDivRect = new fabric.Rect({
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
            fill: 'red',
            opacity: 0.5,
          })

          eventEmitter.emit(
            'eventEmitterAddFabricTestTextCanvasKey-0',
            fabricDivRect,
          )
        }
      }
    }
  }
  // const onAddTextTest = () => {
  //   console.log('rangy', rangy)
  //   const selection = rangy.getSelection() // 获取选中文本
  //   console.log('selection', selection)
  //   const rectangles: any[] = []

  //   if (selection.rangeCount > 0) {
  //     for (let i = 0; i < selection.rangeCount; i++) {
  //       const range = selection.getRangeAt(i)
  //       console.log('range', range)
  //       const rects = range.getClientRects() // 获取选区的矩形

  //       for (let j = 0; j < rects.length; j++) {
  //         const rect = rects[j]
  //         rectangles.push({
  //           left: rect.left,
  //           top: rect.top,
  //           width: rect.width,
  //           height: rect.height,
  //         })
  //       }
  //     }
  //   }

  //   // console.log(rectangles) // 输出所有矩形信息
  // }
  return (
    <Stack
      direction='row'
      alignItems='center'
      sx={{
        overflow: 'hidden',
      }}
      gap={1}
    >
      <Button
        sx={{
          flexDirection: 'column',
        }}
        size='small'
        onClick={onAddTextTest}
      >
        <FunctionalityPdfAnnotatorIcon
          fontSize='inherit'
          color='primary'
          name='Brush'
        />
        <Typography variant='custom' fontSize={12} color='primary.main'>
          ADD TEXT Box
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
