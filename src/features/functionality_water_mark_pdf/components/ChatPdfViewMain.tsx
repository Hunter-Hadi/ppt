// import 'pdfjs-dist/web/pdf_viewer.css'

import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import CircularProgress from '@mui/material/CircularProgress'
import Input from '@mui/material/Input'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import html2canvas from 'html2canvas'
import { useTranslation } from 'next-i18next'
import { PDFDocument } from 'pdf-lib'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'

import ChatPdfViewPage from '@/features/functionality_common/components/FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewPage'
import FunctionalityCommonPdfViewVirtualScrollMain from '@/features/functionality_common/components/FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewVirtualScrollMain'
// import FunctionalityCommonColorButtonPopover from '@/features/functionality_sign_pdf/components/FunctionalitySignPdfButtonPopover/FunctionalityCommonColorButtonPopover'
// import FunctionalityCommonFontsButtonPopover from '@/features/functionality_sign_pdf/components/FunctionalitySignPdfButtonPopover/FunctionalityCommonFontsButtonPopover'
// import FunctionalitySignPdfIcon from '@/features/functionality_sign_pdf/components/FunctionalitySignPdfIcon'
// import { SIGN_TEXT_FONT_FAMILY_LIST } from '@/features/functionality_sign_pdf/constant/index'
import FunctionalityCommonColorButtonPopover from '@/features/functionality_common/components/FunctionalityCommonPopover/FunctionalityCommonColorButtonPopover'
import FunctionalityCommonColorTransparencyPopover from '@/features/functionality_common/components/FunctionalityCommonPopover/FunctionalityCommonColorTransparencyPopover'
import FunctionalityCommonFontsButtonPopover from '@/features/functionality_common/components/FunctionalityCommonPopover/FunctionalityCommonFontsButtonPopover'
import FunctionalitySignPdfIcon from '@/features/functionality_common/components/FunctionalityCommonPopover/FunctionalitySignPdfIcon'
import { SIGN_TEXT_FONT_FAMILY_LIST } from '@/features/functionality_common/constants'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'
import { functionalityCommonFileNameRemoveAndAddExtension } from '@/features/functionality_common/utils/functionalityCommonIndex'

import FunctionalityWateMarkPdfShowPdfWaterMarkRender from './FunctionalityWateMarkPdfShowPdfWaterMarkRender'

const InputContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  borderRadius: '4px',
  padding: '0px 12px',
  height: '40px', // 总体输入框高度
  '&:hover': {
    borderColor: 'rgba(0, 0, 0, 0.87)',
  },
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
  },
}))

const CustomInput = styled('input')({
  width: '100%',
  border: 'none',
  outline: 'none',
  fontSize: '16px',
  padding: '8px 0',
  marginRight: '8px', // 为了给IconButton留出空间
  height: '26px', // 输入框高度
  boxSizing: 'border-box',
  minWidth: '50px',
})

interface IPdfContainerMainProps {
  file: File
  onClearReturn: () => void
}

const ChatPdfViewMain: FC<IPdfContainerMainProps> = ({
  file,
  onClearReturn,
}) => {
  const [waterMarkValue, setWaterMarkValue] = useState('Watermark')
  const [waterMarkColor, setWaterMarkColor] = useState('red')
  const [waterMarkFontSize, setWaterMarkFontSize] = useState<number>(48)
  const [transparencyNumber, setTransparencyNumber] = useState<number>(0.5)
  const [waterMarkFontFamily, setWaterMarkFontFamily] =
    useState<string>('Arial')
  const [downLoadLoading, setDownLoadLoading] = useState(false)

  const currentViewRef = useRef<number>(0)
  const infintyViewRef = useRef<HTMLElement>()
  const viewContainerRef = useRef<HTMLElement>()
  const [overallViewHeight, setOverallViewHeight] = useState<number>(0)

  const isMobile = useFunctionalityCommonIsMobile()
  const [width, setWidth] = useState(850)

  const { t } = useTranslation()

  const autoSetOverallViewHeight = () => {
    const distanceFromTop = infintyViewRef.current?.getBoundingClientRect().top

    const overallViewHeight =
      // window.innerHeight - (distanceFromTop || 280) - 60 - (isMobile ? 0 : 0)
      window.innerHeight - (distanceFromTop || 280) - 10 - (isMobile ? 0 : 0)
    setOverallViewHeight(overallViewHeight)
  }

  const onChangeTransparency = (value: number) => {
    const convertedValue = (value - 1) / 99 // 转换为 0-1 的范围
    const roundedValue = Number(convertedValue.toFixed(1)) // 保留小数点后一位
    setTransparencyNumber(roundedValue)
  }

  const onSelectedFonts = (fonts: string) => {
    setWaterMarkFontFamily(fonts)
  }
  const onChangeFontSize = (size: number) => {
    setWaterMarkFontSize(size)
  }

  // const pdfAddSignCanvasViewReturnUint8Array = async (file: File) => {
  //   try {
  //     setDownLoadLoading(true)
  //     let pdfDoc: PDFDocument | null = null
  //     try {
  //       const fileBuffer = await file.arrayBuffer()
  //       pdfDoc = await PDFDocument.load(fileBuffer)
  //     } catch (error) {
  //       console.error('Error loading PDF Document:', error)
  //       setDownLoadLoading(false)
  //       return
  //     }
  //     const pdfPageNumber = pdfDoc.getPageCount() // 获取 PDF 页数

  //     // 虚拟滚动取当前视图的水印
  //     const resConvas = await pdfDoc.embedPng(
  //       canvasHandlesRefs.current[currentViewRef.current]?.getCanvasBase64(),
  //     )
  //     console.log(`resConvas:`, resConvas)
  //     console.log(`currentViewRef.current:`, currentViewRef.current)

  //     for (let i = 0; i < pdfPageNumber; i++) {
  //       const page = pdfDoc.getPage(i)
  //       const pdfPageSize = page.getSize()
  //       page.drawImage(resConvas, {
  //         x: 0,
  //         y: 0,
  //         width: pdfPageSize.width,
  //         height: pdfPageSize.height,
  //       })
  //       // }
  //     }

  //     const pdfDocData = await pdfDoc.save()
  //     console.log(`pdfDoc:`, pdfDoc)
  //     console.log(`pdfDocData:`, pdfDocData)
  //     const blob = new Blob([pdfDocData], { type: 'application/pdf' })
  //     const url = URL.createObjectURL(blob)
  //     const fileName = functionalityCommonFileNameRemoveAndAddExtension(
  //       file.name,
  //     ) //获取文件名
  //     const link = document.createElement('a')
  //     link.href = url
  //     link.download = fileName
  //     link.click()
  //     URL.revokeObjectURL(url)
  //     setDownLoadLoading(false)
  //   } catch (e) {
  //     setDownLoadLoading(false)
  //     console.log(e)
  //   }
  // }
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

      console.log(`currentViewRef.current:`, currentViewRef.current)
      // 使用 html2canvas 库将 div 绘制到 canvas
      const topDiv = document.getElementById('chat-test-canvas') as any
      const canvas = await html2canvas(topDiv, {
        backgroundColor: null, // 设置背景为透明
      })
      const base64Image = canvas.toDataURL('image/png')
      // 虚拟滚动取当前视图的水印
      const resConvas = await pdfDoc.embedPng(base64Image)
      for (let i = 0; i < pdfPageNumber; i++) {
        const page = pdfDoc.getPage(i)
        const {
          x: trimX,
          y: trimY,
          height: trimHeight,
          width: trimWidth,
        } = page.getCropBox()
        page.drawImage(resConvas, {
          x: trimX,
          y: trimY,
          width: trimWidth,
          height: trimHeight,
        })
      }

      const pdfDocData = await pdfDoc.save()
      // console.log(`pdfDoc:`, pdfDoc)
      // console.log(`pdfDocData:`, pdfDocData)
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

  const waterMarkInfo = useMemo(() => {
    return {
      textValue: waterMarkValue,
      color: waterMarkColor,
      fontSize: waterMarkFontSize,
      fontFamily: waterMarkFontFamily,
      opciaty: transparencyNumber,
    }
  }, [
    transparencyNumber,
    waterMarkColor,
    waterMarkFontFamily,
    waterMarkFontSize,
    waterMarkValue,
  ])

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
          // const tempPdfInfo = {
          //   height: height * 4,
          //   width: width * 4,
          // }
          const tempPdfInfo = {
            height: height,
            width: width,
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
              <FunctionalityWateMarkPdfShowPdfWaterMarkRender
                sizeInfo={tempPdfInfo}
                waterMarkInfo={waterMarkInfo}
              ></FunctionalityWateMarkPdfShowPdfWaterMarkRender>
            </Box>
          )
        }}
      </FunctionalityCommonPdfViewVirtualScrollMain>
    )
  }, [file, waterMarkInfo, width, overallViewHeight])

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
          // width: isMobile ? 'auto' : '100%',
          justifyContent: 'center',
          minWidth: '300px',
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <InputContainer sx={{ flex: '0 5 auto' }}>
            <CustomInput
              value={waterMarkValue}
              onChange={(e) => setWaterMarkValue(e.target.value)}
              placeholder={t(
                'functionality__sign_pdf:components__sign_pdf__operation_oBject_default__type__text_field__type_something',
              )}
            />
            <CloseIcon
              onClick={() => setWaterMarkValue('')}
              sx={{ fontSize: '16px', cursor: 'pointer' }}
            />
          </InputContainer>
          <Stack
            direction={'row'}
            gap={'8px'}
            sx={{ ml: 1, minWidth: 0, flex: '0 1 auto' }}
          >
            <Button
              variant='contained'
              size='large'
              onClick={() => {
                pdfAddSignCanvasViewReturnUint8ArrayTest(file)
                // pdfAddSignCanvasViewReturnUint8Array(file)
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
      >
        <Stack
          className='functionality-water-mark-object-tools-popup'
          sx={{
            mb: isMobile ? 1 : 0,
            button: {
              padding: isMobile ? '5px 3px!important' : '5px 7px!important',
              minWidth: isMobile ? '35px!important' : 40,
            },
          }}
        >
          <ButtonGroup
            variant='outlined'
            sx={{
              borderRadius: 2,
              bgcolor: isMobile ? '#fff' : '#fafafa',
              height: isMobile ? 60 : 40,
            }}
          >
            <FunctionalityCommonFontsButtonPopover
              currentFont={waterMarkFontFamily}
              isShowFontsName={true}
              title={
                isMobile ? (
                  <Stack>
                    <FunctionalitySignPdfIcon
                      color='primary'
                      name='FontDownload'
                    />
                  </Stack>
                ) : undefined
              }
              fontSize={18}
              onSelectedFont={onSelectedFonts}
              fontsList={SIGN_TEXT_FONT_FAMILY_LIST}
            />

            <Button>
              <Input
                sx={{
                  width: 60,
                  ' input': {
                    color: '#9065B0',
                  },
                }}
                defaultValue={waterMarkFontSize || 16}
                aria-describedby='outlined-weight-helper-text'
                inputProps={{
                  'aria-label': 'weight',
                }}
                type='number'
                onChange={(e) => {
                  onChangeFontSize(Number(e.target.value))
                }}
              />
            </Button>

            <Button>
              <FunctionalityCommonColorButtonPopover
                titleText={'A'}
                isShowRightIcon={false}
                buttonProps={{
                  variant: 'text',
                }}
                colorList={[
                  'transparent',
                  'black',
                  'white',
                  'blue',
                  'red',
                  'green',
                  'yellow',
                  'orange',
                  'purple',
                  'pink',
                  'brown',
                  'gray',
                ]}
                onSelectedColor={setWaterMarkColor}
                currentColor={waterMarkColor}
                showColorPicker={true}
              />
            </Button>

            <Button>
              <FunctionalityCommonColorTransparencyPopover
                onChangeTransparency={onChangeTransparency}
                currentTransparency={transparencyNumber * 100}
                sx={{ width: isMobile ? 150 : 200 }}
              ></FunctionalityCommonColorTransparencyPopover>
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
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
export default ChatPdfViewMain
