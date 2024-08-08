import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import html2canvas from 'html2canvas'
import { useTranslation } from 'next-i18next'
import { PDFDocument } from 'pdf-lib'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'

import ChatPdfViewPage from '@/features/functionality_common/components/FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewPage'
import FunctionalityCommonPdfViewVirtualScrollMain from '@/features/functionality_common/components/FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewVirtualScrollMain'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'
import { functionalityCommonFileNameRemoveAndAddExtension } from '@/features/functionality_common/utils/functionalityCommonIndex'

import MarkContainer, { IMarkContainerHandles } from './MarkContainer'

interface IPdfContainerMainProps {
  file: File
  onClearReturn: () => void
}

const FunctionalityRedactPdfDetail: FC<IPdfContainerMainProps> = ({
  file,
  onClearReturn,
}) => {
  const [downLoadLoading, setDownLoadLoading] = useState(false)

  const currentViewRef = useRef<number>(0)
  const infintyViewRef = useRef<HTMLElement>()
  const viewContainerRef = useRef<HTMLElement>()
  const showPdfHandlesRef = useRef<IMarkContainerHandles[] | []>([]) //当前在居中pdf的ref
  const [overallViewHeight, setOverallViewHeight] = useState<number>(0)

  const isMobile = useFunctionalityCommonIsMobile()
  const [width, setWidth] = useState(850)

  const { t } = useTranslation()

  const autoSetOverallViewHeight = () => {
    const distanceFromTop = infintyViewRef.current?.getBoundingClientRect().top

    const overallViewHeight =
      window.innerHeight - (distanceFromTop || 280) - 10 - (isMobile ? 0 : 0)
    setOverallViewHeight(overallViewHeight)
  }

  const pdfAddSignCanvasViewReturnUint8ArrayTest = async (file: File) => {
    try {
      setDownLoadLoading(true)
      let pdfDoc: PDFDocument | null = null
      try {
        const fileBuffer = await file.arrayBuffer()
        pdfDoc = await PDFDocument.load(fileBuffer)
      } catch (error) {
        console.error('Error loading PDF Document:', error)
        setDownLoadLoading(false)
        return
      }
      const pdfPageNumber = pdfDoc.getPageCount() // 获取 PDF 页数

      const topDiv = document.getElementById('chat-test-canvas') as any
      const canvas = await html2canvas(topDiv, {
        backgroundColor: null, // 设置背景为透明
      })
      const base64Image = canvas.toDataURL('image/png')
      // 虚拟滚动取当前视图的水印
      const resConvas = await pdfDoc.embedPng(base64Image)
      for (let i = 0; i < pdfPageNumber; i++) {
        const page = pdfDoc.getPage(i)
        const pdfPageSize = page.getSize()
        page.drawImage(resConvas, {
          x: 0,
          y: 0,
          width: pdfPageSize.width,
          height: pdfPageSize.height,
        })
      }

      const pdfDocData = await pdfDoc.save()
      const blob = new Blob([pdfDocData], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const fileName = functionalityCommonFileNameRemoveAndAddExtension(
        file.name,
      ) //获取文件名
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      link.click()
      URL.revokeObjectURL(url)
      setDownLoadLoading(false)
    } catch (e) {
      setDownLoadLoading(false)
      console.log(e)
    }
  }

  const pdfAddSignCanvasViewReturnUint8Array = async (
    file: File,
    canvasImgList: (string | undefined)[],
  ) => {
    try {
      const fileBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(fileBuffer)
      const pdfPageNumber = pdfDoc.getPageCount() // 获取 PDF 页数

      for (let i = 0; i < pdfPageNumber; i++) {
        const page = pdfDoc.getPage(i)
        const pdfPageSize = page.getSize()
        const pngImage = await pdfDoc.embedPng(canvasImgList[i] as string)
        page.drawImage(pngImage, {
          x: 0,
          y: 0,
          width: pdfPageSize.width,
          height: pdfPageSize.height,
        })
      }

      return await pdfDoc.save()
    } catch (e) {
      console.log(e)
    }
  }

  const donwLoadFile = async (file) => {
    setDownLoadLoading(true)
    const canvasImgList = showPdfHandlesRef.current?.map((convasHandlesRef) => {
      return convasHandlesRef.getCanvasBase64()
    })
    console.log(`canvasImgList:`, canvasImgList)
    const uint8Array = await pdfAddSignCanvasViewReturnUint8Array(
      file,
      canvasImgList,
    )
    console.log(`uint8Array:`, uint8Array)
    if (uint8Array) {
      const blob = new Blob([uint8Array], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const fileName = functionalityCommonFileNameRemoveAndAddExtension(
        file.name,
      ) //获取文件名
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      link.click()
      URL.revokeObjectURL(url)
      }
    setDownLoadLoading(false)
  }

  const InfinityList = useMemo(() => {
    return (
      <FunctionalityCommonPdfViewVirtualScrollMain
        viewWidth={width}
        viewHeight={overallViewHeight - 50}
        file={file}
      >
        {(props) => {
          const { pdfInfo, index } = props
          const { height, width } = pdfInfo
          const tempPdfInfo = {
            height: height * 4,
            width: width * 4,
          }
          currentViewRef.current = index
          return (
            <Box
              style={{
                position: 'relative',
                overflow: 'hidden',
              }}
              sx={{
                '.canvas-container': {
                  zIndex: 2,
                  position: 'absolute !important',
                  top: '0',
                },
              }}
            >
              <ChatPdfViewPage pdfInfo={props.pdfInfo} index={props.index} />
              <MarkContainer
                sizeInfo={tempPdfInfo}
                ref={(el) => {
                  if (el) {
                    showPdfHandlesRef.current[index] = el
                  }
                }}
              ></MarkContainer>
            </Box>
          )
        }}
      </FunctionalityCommonPdfViewVirtualScrollMain>
    )
  }, [file, width, overallViewHeight])

  useEffect(() => {
    if (infintyViewRef.current) {
      // 定义一个更新宽度的函数
      const updateWidth = () => {
        // debugger
        if (infintyViewRef.current?.offsetWidth) {
          // 减去padding
          const refPadding = isMobile ? 0 : 128
          setWidth(infintyViewRef.current?.offsetWidth - refPadding)
        }
      }

      // 立即更新一次宽度，以获取初始值
      updateWidth()

      // 创建一个ResizeObserver实例来监听尺寸变化，并更新宽度
      const resizeObserver = new ResizeObserver(() => {
        updateWidth()
      })

      // 观察当前infintyViewRef所指向的元素
      resizeObserver.observe(infintyViewRef.current)

      // 清理函数：组件卸载时停止观察
      return () => {
        resizeObserver.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    if (isMobile) {
      setTimeout(() => {
        autoSetOverallViewHeight()
      }, 500)
    } else {
      autoSetOverallViewHeight()
    }
  }, [isMobile, infintyViewRef])

  return (
    <Stack
      sx={{
        height: '100%',
        width: '100%',
        color: '#000',
        overflow: 'hidden',
        bgcolor: '#fff',
        position: 'relative',
      }}
      alignItems={'center'}
      ref={viewContainerRef}
    >
      <Stack
        className='water-mark-pdf__view-title-container'
        sx={{
          height: 75,
          width: '100%',
          justifyContent: 'center',
          minWidth: '300px',
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Stack
            direction={'row'}
            gap={'8px'}
            sx={{ ml: 1, minWidth: 0, flex: '0 1 auto' }}
          >
            <Button
              variant='contained'
              size='large'
              onClick={() => {
                donwLoadFile(file)
                // pdfAddSignCanvasViewReturnUint8ArrayTest(file)
              }}
              disabled={downLoadLoading}
            >
              {downLoadLoading ? (
                <Stack direction={'row'} alignItems={'center'}>
                  <CircularProgress size={24} />
                </Stack>
              ) : (
                <>
                  {t(
                    'functionality__image_to_pdf:components__image_to_pdf__download',
                  )}
                </>
              )}
            </Button>
            <Button
              color='error'
              variant='outlined'
              size='large'
              onClick={() => {
                onClearReturn()
              }}
              disabled={downLoadLoading}
            >
              {isMobile ? t('common:back') : t('common:choose_another_file')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Box
        className='functionality-water-mark-object-tools-container'
        sx={{
          zIndex: '2',
          position: 'absolute',
          top: isMobile ? '78px' : '88px',
        }}
      ></Box>
      <Box
        sx={{
          pt: 8,
          px: isMobile ? 0 : 8,
          backgroundColor: '#fafafa',
          overflow: 'hidden',
          maxWidth: 1280,
          width: '100%',
          boxSizing: 'border-box',
          height: overallViewHeight,
          display: 'flex',
          justifyContent: 'center',
        }}
        className='functionality-water-mark--object-infinity-view'
        ref={infintyViewRef}
      >
        {InfinityList}
      </Box>
    </Stack>
  )
}
export default FunctionalityRedactPdfDetail
