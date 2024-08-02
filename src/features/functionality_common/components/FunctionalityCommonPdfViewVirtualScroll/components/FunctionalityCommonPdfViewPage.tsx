import { Box, CircularProgress, Stack } from '@mui/material'
import React, { FC, useEffect, useRef, useState } from 'react'

interface IFunctionalityCommonPdfViewPageProps {
  pdfInfo: any
  index: number
}

//pdf的单个页面显示视图
const FunctionalityCommonPdfViewPage: FC<
  IFunctionalityCommonPdfViewPageProps
> = ({ pdfInfo }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isInitData = useRef(false)
  useEffect(() => {
    renderPage()
  }, [pdfInfo, canvasRef])
  const renderPage = async () => {
    try {
      if (!pdfInfo || isInitData.current) return
      const { page, viewport, textContent } = pdfInfo
      const canvas = canvasRef.current
      if (!page || !viewport || !canvas || !textContent) return
      if (!canvas) return
      isInitData.current = true
      canvas.height = viewport.height
      canvas.width = viewport.width
      canvas.style.width = '100%'
      canvas.style.objectFit = 'contain'
      page
        .render({
          canvasContext: canvas.getContext('2d')!,
          viewport,
        })
        .promise.then(() => {
          // 渲染完成后更新状态
          setIsLoading(false)
        })
      // const textLayer = new pdfjs.TextLayer({
      //   textContentSource: textContent,
      //   viewport: viewport,
      //   container: textBoxRef.current,
      // });
      // await textLayer.render();
    } catch (e) {
      console.log('pdfchat renderPage error:', e)
    }
  }
  return (
    <Stack className={`pdf-page-number-${pdfInfo?.pdfIndex}`} zIndex={-1}>
      {pdfInfo && (
        <Stack
          alignItems={pdfInfo.viewScale > 1 ? 'flex-start' : 'center'}
          sx={{
            overflow: pdfInfo.viewScale > 1 ? 'visible' : 'hidden',
            visibility: !isLoading ? 'visible' : 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              width: '100%',
            }}
          >
            <Box
              sx={{
                '&::after': {
                  content: '" "',
                  position: 'absolute',
                  bottom: '1px',
                  left: '1px',
                  right: '1px',
                  top: '1px',
                  boxShadow: '2px 2px 8px 0 rgba(0,0,0,.2)',
                },
              }}
            >
              <canvas
                ref={canvasRef}
                style={{
                  width: '100%',
                  objectFit: 'contain',
                }}
              ></canvas>
            </Box>
          </Box>
        </Stack>
      )}
      {isLoading && (
        <Stack
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <CircularProgress size={20} sx={{ m: 'auto auto' }} />
        </Stack>
      )}
    </Stack>
  )
}
export default FunctionalityCommonPdfViewPage
