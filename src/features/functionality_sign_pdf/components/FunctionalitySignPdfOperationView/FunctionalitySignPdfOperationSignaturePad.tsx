import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import React from 'react'
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import SmoothSignature from 'smooth-signature'

import { getCanvasBounds } from '../../utils/canvasTools'
import { changeImageColor } from '../../utils/colorTools'
import FunctionalitySignPdfColorButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfColorButtonPopover'
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon'

// 定义通过ref暴露的方法的接口
export interface IFunctionalitySignPdfSignaturePadHandles {
  getPngBase64: () => string
}
interface IFunctionalitySignPdfOperationSignaturePadProps {
  bottomView: (isValuable: boolean) => React.ReactNode
}
/**
 * 签名手绘板
 */
const FunctionalitySignPdfOperationSignaturePad: ForwardRefRenderFunction<
  IFunctionalitySignPdfSignaturePadHandles,
  IFunctionalitySignPdfOperationSignaturePadProps
> = ({ bottomView }, ref) => {
  const { t } = useTranslation()

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const signaturePadRef = useRef<SmoothSignature | null>(null)
  const [historyCanvasList, setHistoryCanvasList] = useState<
    {
      color: string
      value: string
    }[]
  >([]) //操作的历史记录
  const [refreshIndex, setRefreshIndex] = useState<number | null>(null) //当前回归操作的历史记录索引
  const [isStartSign, setIsStartSign] = useState<boolean>(false) //是否开始签名

  const currentColor = useRef<string>('block')
  useImperativeHandle(ref, () => ({
    getPngBase64: () => {
      if (historyCanvasList.length) {
        return saveSignature() || ''
      } else {
        return ''
      }
    },
  }))
  useEffect(() => {
    try {
      if (canvasRef.current === null || signaturePadRef.current) return
      const signaturePad = (signaturePadRef.current = new SmoothSignature(
        canvasRef.current,
        {
          scale: 3,
          width: 600,
          height: 200,
          onStart: () => {
            console.log('onStart')
            setIsStartSign(true)
          },
          onEnd: () => {
            console.log('onEnd')
            let currentRefreshIndex: number | null = null
            setRefreshIndex((refreshIndex) => {
              currentRefreshIndex = refreshIndex
              return refreshIndex
            })
            setHistoryCanvasList((canvasList) => {
              if (currentRefreshIndex !== null) {
                canvasList.splice((currentRefreshIndex || 0) + 1)
              }
              return [
                ...canvasList,
                {
                  color: currentColor.current,
                  value: canvasRef.current?.toDataURL() || '',
                },
              ]
            })

            setRefreshIndex(null)
            setIsStartSign(false)
          },
        },
      ))
      console.log('signaturePad', signaturePad)
    } catch (e) {
      console.log(e)
    }
  }, [canvasRef])
  // 获取签名的边界框
  const getSignatureBounds = () => {
    if (!canvasRef.current) return false
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return false

    const imageData = ctx.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    )
    return getCanvasBounds(imageData)
  }

  // 根据签名的边界框裁剪并保存画布
  const saveSignature = () => {
    const data = getSignatureBounds()
    if (!data || !canvasRef.current) return
    const { minX, minY, maxX, maxY } = data
    const width = maxX - minX + 1
    const height = maxY - minY + 1

    // 创建一个新的canvas用于裁剪画布
    const clippedCanvas = document.createElement('canvas')
    clippedCanvas.width = width
    clippedCanvas.height = height
    const clippedCtx = clippedCanvas.getContext('2d')
    if (clippedCtx) {
      // 将签名的部分绘制到新的画布上
      clippedCtx.drawImage(
        canvasRef.current,
        minX,
        minY,
        width,
        height,
        0,
        0,
        width,
        height,
      )

      // 返回裁剪后的画布的DataURL
      return clippedCanvas.toDataURL()
    }
  }
  const onSelectedColor = (color: string) => {
    currentColor.current = color
    onChangeCanvasColor(color)
  }
  const onChangeCanvasColor = (color: string) => {
    try {
      setTimeout(() => {
        if (signaturePadRef.current && canvasRef.current) {
          signaturePadRef.current.color = color

          const ctx = canvasRef.current.getContext('2d')
          if (ctx) {
            let imageData = ctx.getImageData(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height,
            )
            imageData = changeImageColor(imageData, color)

            ctx.putImageData(imageData, 0, 0)
          }
        }
      }, 10) //延迟10ms，等待画布绘制完成，可以优化：在渲染前重新设置画布颜色
    } catch (e) {
      console.log(e)
    }
  }
  const onReplay = async () => {
    try {
      if (signaturePadRef.current && canvasRef.current) {
        signaturePadRef.current.clear()
        const index =
          refreshIndex !== null
            ? refreshIndex - 1
            : historyCanvasList.length - 2
        if (historyCanvasList[index]) {
          const currentCanvas = historyCanvasList[index].value
          if (currentCanvas) {
            await signaturePadRef.current.drawByImageUrl(currentCanvas)
          }
          if (historyCanvasList[index].color !== currentColor.current) {
            onChangeCanvasColor(currentColor.current)
          }
        }
        setRefreshIndex(index)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const onRefresh = async () => {
    try {
      const index = refreshIndex === null ? 0 : refreshIndex + 1
      if (historyCanvasList[index] && signaturePadRef.current) {
        await signaturePadRef.current.drawByImageUrl(
          historyCanvasList[index].value,
        )
        if (historyCanvasList[index].color !== currentColor.current) {
          onChangeCanvasColor(currentColor.current)
        }
        setRefreshIndex(index)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const clearCanvas = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear()
      setHistoryCanvasList([])
      setRefreshIndex(null)
    }
  }
  const isNotSignatureData =
    historyCanvasList.length === 0 || refreshIndex === -1
  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' mb={1}>
        <FunctionalitySignPdfColorButtonPopover
          onSelectedColor={onSelectedColor}
        />
        <Stack direction='row' gap={1} sx={{ height: 40 }}>
          <Button
            disabled={isNotSignatureData}
            onClick={onReplay}
            variant='outlined'
          >
            <FunctionalitySignPdfIcon name='UndoOutlined' />
          </Button>
          <Button
            disabled={
              historyCanvasList.length === 0 ||
              refreshIndex === null ||
              refreshIndex === historyCanvasList.length - 1
            }
            variant='outlined'
            onClick={onRefresh}
          >
            <FunctionalitySignPdfIcon name='RedoOutlined' />
          </Button>
        </Stack>
      </Stack>
      <Box
        sx={{
          bgcolor: '#fafafa',
          position: 'relative',
        }}
      >
        <canvas
          id='functionality-sign-pdf-signature-pad'
          ref={canvasRef}
          style={{
            zIndex: 2,
          }}
          width='600'
          height='200'
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 70,
            left: 8,
          }}
        >
          <FunctionalitySignPdfIcon name='SignArrowIndicate' />
        </Box>

        <Stack
          sx={{
            borderTop: '0.5px solid #e8e8e8',
            position: 'absolute',
            left: 0,
            right: 0,
            zIndex: 0,
            bottom: 45,
          }}
          direction='row-reverse'
        ></Stack>
        <Button
          sx={{
            position: 'absolute',
            bottom: 5,
            right: 10,
          }}
          disabled={isNotSignatureData}
          onClick={clearCanvas}
        >
          {t(
            'functionality__sign_pdf:components__sign_pdf__operation_view__clear',
          )}
        </Button>
        {isNotSignatureData && !isStartSign && (
          <Typography
            color='text.secondary'
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              pointerEvents: 'none',
              fontSize: {
                lg: 12,
              },
            }}
          >
            {t(
              'functionality__sign_pdf:components__sign_pdf__operation_view__draw__here',
            )}
          </Typography>
        )}
      </Box>
      {bottomView(isNotSignatureData)}
    </Box>
  )
}
export default forwardRef(FunctionalitySignPdfOperationSignaturePad)
