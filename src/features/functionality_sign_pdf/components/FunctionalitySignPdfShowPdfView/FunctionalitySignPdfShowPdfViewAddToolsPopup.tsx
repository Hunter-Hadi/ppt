import { Button, ButtonGroup, Stack } from '@mui/material'
import * as fabric from 'fabric'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { FC, useState } from 'react'
import { useRecoilState } from 'recoil'

import { FunctionalitySignPdfOperationOBjectAtom } from '../../store'
import {
  IFabricAddObjectType,
  onFabricAddObject,
} from '../../utils/fabricjsTools'
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon'
import FunctionalitySignPdfOperationSignatureModal, {
  ISignatureType,
} from '../FunctionalitySignPdfOperationView/FunctionalitySignPdfOperationSignatureModal'
import { IControlDiv } from './FunctionalitySignPdfShowPdfViewRenderCanvas'
interface IFunctionalitySignPdfShowPdfViewAddToolsPopupProps {
  controlDivPosition: IControlDiv
  scaleFactor: number
  editor: React.MutableRefObject<fabric.Canvas | null>
  onClose: (type: string, value: string) => void
}
const FunctionalitySignPdfShowPdfViewAddToolsPopup: FC<
  IFunctionalitySignPdfShowPdfViewAddToolsPopupProps
> = ({ controlDivPosition, editor, scaleFactor, onClose }) => {
  const { t } = useTranslation()

  const [pdfOperationOBject, setPdfOperationOBject] = useRecoilState(
    FunctionalitySignPdfOperationOBjectAtom,
  )
  const [signatureModalOpenType, setModalSignatureOpenType] = useState<
    null | 'yourSignature' | 'yourInitials'
  >(null)

  const onAddObject = (type: IFabricAddObjectType, value: string) => {
    try {
      if (!editor) return
      const positionData = {
        left: controlDivPosition.left,
        top: Math.max(controlDivPosition.top, 0),
      }
      onFabricAddObject(editor, positionData, type, value)
      onClose(type, value)
    } catch (e) {
      console.error(e)
    }
  }
  const onCreateSignatureValue = (type: ISignatureType, value: string) => {
    //只做了第一个显示
    onAddObject('image', value)
    if (signatureModalOpenType) {
      setPdfOperationOBject({
        ...pdfOperationOBject,
        [signatureModalOpenType]: [
          value,
          ...pdfOperationOBject[signatureModalOpenType],
        ],
      })
      setModalSignatureOpenType(null)
    }
  }
  const onClickSignatureType = (type: 'yourSignature' | 'yourInitials') => {
    const pdfOperationData = pdfOperationOBject[type]
    if (pdfOperationData.length > 0) {
      onAddObject('image', pdfOperationData[pdfOperationOBject.index[type]])
    } else {
      setModalSignatureOpenType(type)
    }
  }
  return (
    <Stack
      sx={{
        position: 'fixed',
        left: controlDivPosition.left + controlDivPosition.windowLeft,
        top: controlDivPosition.top + controlDivPosition.windowTop - 50,
      }}
    >
      <ButtonGroup
        variant='outlined'
        sx={{
          borderRadius: 2,
          bgcolor: '#fafafa',
          height: 40,
        }}
      >
        <Button onClick={() => onClickSignatureType('yourSignature')}>
          <FunctionalitySignPdfIcon name='TextFields' />
        </Button>
        <Button onClick={() => onClickSignatureType('yourInitials')}>
          <FunctionalitySignPdfIcon name='Abc' />
        </Button>
        <Button
          onClick={() =>
            onAddObject('text-box', t(pdfOperationOBject.textField))
          }
        >
          <FunctionalitySignPdfIcon name='Title' />
        </Button>
        <Button
          onClick={() => onAddObject('i-text', pdfOperationOBject.dateField)}
        >
          <FunctionalitySignPdfIcon name='CalendarMonthOutlined' />
        </Button>
        <Button
          onClick={() => onAddObject('text', pdfOperationOBject.checkbox)}
        >
          <FunctionalitySignPdfIcon name='Check' />
        </Button>
      </ButtonGroup>
      {!!signatureModalOpenType && (
        <FunctionalitySignPdfOperationSignatureModal
          onClose={() => setModalSignatureOpenType(null)}
          onCreate={onCreateSignatureValue}
        />
      )}
    </Stack>
  )
}
export default FunctionalitySignPdfShowPdfViewAddToolsPopup
