import { Box, Button, Modal, Stack, Tab, Tabs } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { FC, useRef, useState } from 'react'

import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

import FunctionalitySignPdfOperationSignaturePad, {
  IIFunctionalityCommonSignaturePadPropsHandles,
} from './FunctionalityCommonSignaturePad'
import FunctionalitySignPdfOperationSignatureType, {
  IFFunctionalityCommonSignatureTypeHandles,
} from './FunctionalityCommonSignatureType'
import FunctionalitySignPdfOperationSignatureUpload, {
  IFunctionalityCommonSignatureUploadHandles,
} from './FunctionalityCommonSignatureUpload'

export type ISignatureType = 'type' | 'draw' | 'upload'
interface IFunctionalitySignPdfSignModalProps {
  onClose: () => void
  onCreate: (type: ISignatureType, value: string) => void
}

/**
 * 签名操作弹窗。签名手绘板，输入签名，上传签名
 */
const FunctionalitySignPdfOperationSignatureModal: FC<
  IFunctionalitySignPdfSignModalProps
> = ({ onClose, onCreate }) => {
  const isMobile = useFunctionalityCommonIsMobile()

  const { t } = useTranslation()

  const [tabValue, setTabValue] = useState<ISignatureType>('draw')
  const signaturePadRef =
    useRef<IIFunctionalityCommonSignaturePadPropsHandles | null>(null)
  const signatureTypeRef =
    useRef<IFFunctionalityCommonSignatureTypeHandles | null>(null)
  const signatureUploadRef =
    useRef<IFunctionalityCommonSignatureUploadHandles | null>(null)
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: ISignatureType,
  ) => {
    setTabValue(newValue)
  }
  const onConfirm = () => {
    let imageString: string | undefined = ''
    switch (tabValue) {
      case 'type':
        imageString = signatureTypeRef.current?.getPngBase64()
        break
      case 'draw':
        imageString = signaturePadRef.current?.getPngBase64()
        break
      case 'upload':
        imageString = signatureUploadRef.current?.getPngBase64()
        break
      default:
        break
    }
    if (imageString) {
      onCreate(tabValue, imageString)
    }
  }
  const bottomView = (disabled: boolean) => {
    return (
      <Stack
        sx={{
          padding: 2,
        }}
        direction='row'
        justifyContent='end'
        gap={1}
      >
        <Button sx={{ borderRadius: 1 }} variant='outlined' onClick={onClose}>
          {t(
            'functionality__sign_pdf:components__sign_pdf__operation_view__cancel',
          )}
        </Button>
        <Button
          sx={{ borderRadius: 1 }}
          variant='contained'
          disabled={disabled}
          onClick={onConfirm}
        >
          {t(
            'functionality__sign_pdf:components__sign_pdf__operation_view__create',
          )}
        </Button>
      </Stack>
    )
  }
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '100%' : 650,
    height: isMobile ? '100%' : 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #fafafa',
    boxShadow: 24,
    px: 1,
    minHeight: 300,
    zIndex: 99999,
  }
  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab
              label={t(
                'functionality__sign_pdf:components__sign_pdf__operation_view__draw',
              )}
              value='draw'
            />
            <Tab
              label={t(
                'functionality__sign_pdf:components__sign_pdf__operation_view__type',
              )}
              value='type'
            />
            <Tab
              label={t(
                'functionality__sign_pdf:components__sign_pdf__operation_view__upload',
              )}
              value='upload'
            />
          </Tabs>
        </Box>
        <Box
          sx={{
            padding: 2,
          }}
        >
          {tabValue === 'draw' && (
            <FunctionalitySignPdfOperationSignaturePad
              ref={signaturePadRef}
              bottomView={bottomView}
            />
          )}
          {tabValue === 'type' && (
            <FunctionalitySignPdfOperationSignatureType
              ref={signatureTypeRef}
              bottomView={bottomView}
            />
          )}
          {tabValue === 'upload' && (
            <FunctionalitySignPdfOperationSignatureUpload
              ref={signatureUploadRef}
              bottomView={bottomView}
            />
          )}
        </Box>
      </Box>
    </Modal>
  )
}
export default FunctionalitySignPdfOperationSignatureModal
