import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { Box, Button, CircularProgress, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { PDFDocument } from 'pdf-lib'
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useRecoilState } from 'recoil'

import FunctionalityCommonOperatePdfToolViewMain from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/components/FunctionalityCommonOperatePdfToolViewMain'
import useFunctionalityEditDndContextHandle from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/hooks/useFunctionalityEditDndContextHandle'
import { fabricCanvasJsonStringListRecoil } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/store/setOperateFabricCanvas'
import { textAnnotatorRecoilList } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/store/setTextContentAnnotator'
import { pdfLibFabricCanvasEmbedSave } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/FabricCanvas/pdfLibFabricCanvasEmbedSave'
import { textContentHighlighterPdfLibEmbedSave } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/TextContentHighlighter/pdfLibEmbedSave'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload'

import FunctionalityPdfAnnotatorOperationAreaInsertTools from './FunctionalityPdfAnnotatorOperationAreaInsertTools'
export interface IFunctionalityPdfAnnotatorDetailHandles {}
interface IFunctionalityPdfAnnotatorDetailProps {
  file: File
  onClearFile: () => void
}
const FunctionalityPdfAnnotatorDetail: ForwardRefRenderFunction<
  IFunctionalityPdfAnnotatorDetailHandles,
  IFunctionalityPdfAnnotatorDetailProps
> = ({ file, onClearFile }) => {
  const { t } = useTranslation()
  const [textAnnotatorList, setTextAnnotatorList] = useRecoilState(
    textAnnotatorRecoilList,
  )
  const [fabricCanvasJsonStringList, setFabricCanvasJsonStringList] =
    useRecoilState(fabricCanvasJsonStringListRecoil)
  const isMobile = useFunctionalityCommonIsMobile()
  const topViewRef = useRef<HTMLElement | null>(null)
  const pdfViewRef = useRef<HTMLElement | null>(null)

  const [overallViewHeight, setOverallViewHeight] = useState<number>(0)

  const [downLoadLoading, setDownLoadLoading] = useState(false)

  const [editType, setEditType] = React.useState<'annotator' | 'insert'>(
    'annotator',
  )

  const autoSetOverallViewHeight = useCallback(() => {
    const distanceFromTop = topViewRef.current?.getBoundingClientRect().top
    const overallViewHeight =
      window.innerHeight - (distanceFromTop || 280) - 10 - (isMobile ? 50 : 0)
    setOverallViewHeight(overallViewHeight)
  }, [isMobile])
  useEffect(() => {
    if (isMobile) {
      setTimeout(() => {
        autoSetOverallViewHeight()
      }, 100)
    } else {
      setTimeout(() => {
        autoSetOverallViewHeight()
      }, 100)
    }
  }, [autoSetOverallViewHeight, isMobile])
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 1,
      },
    }),
    useSensor(KeyboardSensor),
  )
  const { activeData, onDragStart, onDragEnd } =
    useFunctionalityEditDndContextHandle({
      onStart: () => {},
      onEnd: () => {},
    })
  const onSavePDF = async () => {
    setDownLoadLoading(true)
    console.log('textAnnotatorList', textAnnotatorList)
    let pdfDoc: PDFDocument | null = null
    try {
      const fileBuffer = await file.arrayBuffer()
      pdfDoc = await PDFDocument.load(fileBuffer)
    } catch (error) {
      console.error('Error loading PDF Document:', error)
      return
    }
    await textContentHighlighterPdfLibEmbedSave(pdfDoc, textAnnotatorList)
    await pdfLibFabricCanvasEmbedSave(pdfDoc, fabricCanvasJsonStringList)
    pdfDoc
      .save()
      .then((blob) => {
        downloadUrl(blob, 'newFileName.pdf')
      })
      .finally(() => {
        setDownLoadLoading(false)
      })
  }
  const onSavePDFAndAwaitCanvas = async () => {
    setDownLoadLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) //等待canvas数据更新
    onSavePDF()
  }
  return (
    <Stack
      ref={topViewRef}
      sx={{
        height: overallViewHeight,
        width: '100%',
        minHeight: 500,
      }}
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <FunctionalityPdfAnnotatorOperationAreaInsertTools
          editType={editType}
          onChangeType={(type) => {
            if (type) {
              setEditType(type)
              return
            }
            setEditType(editType === 'insert' ? 'annotator' : 'insert')
          }}
        >
          <Stack
            direction={'row'}
            gap={'8px'}
            sx={{ ml: 1, minWidth: 0, flex: '0 1 auto' }}
          >
            <Button
              variant='contained'
              size='large'
              onClick={onSavePDFAndAwaitCanvas}
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
                setTextAnnotatorList([])
                setFabricCanvasJsonStringList([])
                onClearFile()
              }}
              disabled={downLoadLoading}
            >
              {isMobile ? t('common:back') : t('common:choose_another_file')}
            </Button>
          </Stack>
        </FunctionalityPdfAnnotatorOperationAreaInsertTools>
        <Box
          sx={{
            width: '100%',
            flex: 1,
            bgcolor: '#f0f0f0',
          }}
          ref={pdfViewRef}
        >
          <FunctionalityCommonOperatePdfToolViewMain
            file={file}
            isShowBottomOperation={true}
            currentEditType={editType}
          />
        </Box>

        {activeData && (
          <DragOverlay
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'grabbing',
              justifyContent: 'center',
              width: activeData.width + 8,
              height: activeData.height + 8,
            }}
          >
            <Box
              id='pdf-text-drag-overlay'
              sx={{
                margin: '5px',
                border: '1px dashed #9065B0',
                width: 'calc(100% - 10px)',
                height: '100%',
              }}
            ></Box>
          </DragOverlay>
        )}
      </DndContext>
    </Stack>
  )
}
export default forwardRef(FunctionalityPdfAnnotatorDetail)
