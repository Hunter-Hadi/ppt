import { Button, ButtonGroup, Stack } from '@mui/material'
import * as fabric from 'fabric'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { FC, useState } from 'react'
import { useRecoilState } from 'recoil'
import { v4 as uuidV4 } from 'uuid'

import { ISignatureType } from '@/features/functionality_common/components/FunctionalityCommonPopover/FunctionalityCommonSignaturePopoverView/FunctionalityCommonSignatureModal'
import FunctionalityCommonSignatureModal from '@/features/functionality_common/components/FunctionalityCommonPopover/FunctionalityCommonSignaturePopoverView/FunctionalityCommonSignatureModal'

import { FunctionalitySignPdfOperationOBjectAtom } from '../../../store/setOperateFabricCanvas'
import { IFabricAddObjectType } from '../../../types'
import { onFabricAddObject } from '../../../utils/FabricCanvas/fabricCanvasNewAdd'
import FunctionalityCommonOperateIcon from '../../FunctionalityCommonOperateIcon'
import { IControlDiv } from './FunctionalityCommonOperateFabricCanvasMain'

interface IFFunctionalityCommonOperateAddToolsPopupProps {
  controlDivPosition: IControlDiv
  scaleFactor: number
  editor: React.MutableRefObject<fabric.Canvas | null>
  onClose: (type: string, value: string) => void
}
const FunctionalityCommonOperateAddToolsPopup: FC<
  IFFunctionalityCommonOperateAddToolsPopupProps
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
        id: uuidV4(),
        x: controlDivPosition.left / scaleFactor,
        y: Math.max(controlDivPosition.top, 0) / scaleFactor,
        type: type,
        value: value,
      }
      onFabricAddObject(editor, positionData)
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
          <FunctionalityCommonOperateIcon name='TextFields' />
        </Button>
        <Button onClick={() => onClickSignatureType('yourInitials')}>
          <FunctionalityCommonOperateIcon name='Abc' />
        </Button>
        <Button
          onClick={() =>
            onAddObject('text-box', t(pdfOperationOBject.textField))
          }
        >
          <FunctionalityCommonOperateIcon name='Title' />
        </Button>
        <Button
          onClick={() => onAddObject('i-text', pdfOperationOBject.dateField)}
        >
          <FunctionalityCommonOperateIcon name='CalendarMonthOutlined' />
        </Button>
        <Button
          onClick={() => onAddObject('text', pdfOperationOBject.checkbox)}
        >
          <FunctionalityCommonOperateIcon name='Check' />
        </Button>
      </ButtonGroup>
      {!!signatureModalOpenType && (
        <FunctionalityCommonSignatureModal
          onClose={() => setModalSignatureOpenType(null)}
          onCreate={onCreateSignatureValue}
        />
      )}
    </Stack>
  )
}
export default FunctionalityCommonOperateAddToolsPopup
