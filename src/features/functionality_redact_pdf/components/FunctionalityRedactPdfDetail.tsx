import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'next-i18next'
import { PDFDocument } from 'pdf-lib'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { currentScrollOffsetRecoil } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/store/index'
import { fabricCanvasJsonStringListRecoil } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/store/setOperateFabricCanvas'
import { pdfLibFabricCanvasEmbedSave } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/FabricCanvas/pdfLibFabricCanvasEmbedSave'
import ChatPdfViewPage from '@/features/functionality_common/components/FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewPage'
import FunctionalityCommonPdfViewVirtualScrollMain from '@/features/functionality_common/components/FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewVirtualScrollMain'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload'

import FunctionalityCommonOperateFabricCanvas from './FunctionalityRedactPDFOperateFabricCanvasMain'

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
  const [overallViewHeight, setOverallViewHeight] = useState<number>(0)
  const [numberPage, setNumberPage] = React.useState(0)

  const isMobile = useFunctionalityCommonIsMobile()
  const [width, setWidth] = useState(850)
  const setScrollPositionNumber = useSetRecoilState(currentScrollOffsetRecoil)

  const { t } = useTranslation()
  const [fabricCanvasJsonStringList, setFabricCanvasJsonStringList] =
    useRecoilState(fabricCanvasJsonStringListRecoil)

  const autoSetOverallViewHeight = () => {
    const distanceFromTop = infintyViewRef.current?.getBoundingClientRect().top
    
    const overallViewHeight =
      window.innerHeight - (distanceFromTop || 280) + 50
    setOverallViewHeight(overallViewHeight)
  }

  const onSavePDF = async () => {
    setDownLoadLoading(true)
    let pdfDoc: PDFDocument | null = null
    try {
      const fileBuffer = await file.arrayBuffer()
      pdfDoc = await PDFDocument.load(fileBuffer)
    } catch (error) {
      console.error('Error loading PDF Document:', error)
      return
    }
    await pdfLibFabricCanvasEmbedSave(pdfDoc, fabricCanvasJsonStringList)
    pdfDoc
      .save()
      .then((blob) => {
        let newFileName = file.name
        if (newFileName.endsWith(`.pdf`)) {
          newFileName = newFileName.slice(0, -4)
        }
        downloadUrl(blob, `${newFileName}-redact(Powered by MaxAI).pdf`)
      })
      .finally(() => {
        setDownLoadLoading(false)
      })
  }


  const InfinityList = useMemo(() => {
    return (
      <FunctionalityCommonPdfViewVirtualScrollMain
        viewWidth={width}
        viewHeight={overallViewHeight - 50}
        file={file}
        onViewInfo={(info) => {
          setScrollPositionNumber(info.currentScrollOffset)
        }}
        onDocumentLoadSuccess={(info) => {
          setNumberPage(info.numPages)
        }}
        isStopTouchMove={isMobile ? true : false}
      >
        {(props) => {
          const { index } = props
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
              <Box
                className='pdf-insert-view'
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  zIndex: 999,
                  width: '100%',
                  height: '100%',
                }}
              >
                <FunctionalityCommonOperateFabricCanvas
                  defaultWidth={props.pdfInfo.width * 2}
                  index={props.index}
                  canvasNumber={numberPage}
                  fabricCanvasJsonStringList={fabricCanvasJsonStringList}
                  canvasScale={props.pdfInfo.height / props.pdfInfo.width}
                  pdfInfo={props.pdfInfo}
                ></FunctionalityCommonOperateFabricCanvas>
              </Box>
            </Box>
          )
        }}
      </FunctionalityCommonPdfViewVirtualScrollMain>
    )
  }, [file, width, overallViewHeight, fabricCanvasJsonStringList, isMobile])

  useEffect(() => {
    setFabricCanvasJsonStringList([])

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
                onSavePDF()
                // donwLoadFile(file)
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
          // pt: 8,
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
