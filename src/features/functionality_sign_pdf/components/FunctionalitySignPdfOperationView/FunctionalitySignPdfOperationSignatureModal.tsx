import { Box, Button, Modal, Stack, Tab, Tabs } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useRef, useState } from 'react';

import FunctionalitySignPdfOperationSignaturePad, {
  IFunctionalitySignPdfSignaturePadHandles,
} from './FunctionalitySignPdfOperationSignaturePad';
import FunctionalitySignPdfOperationSignatureType, {
  IFunctionalitySignPdfSignatureTypeHandles,
} from './FunctionalitySignPdfOperationSignatureType';
import FunctionalitySignPdfOperationSignatureUpload, {
  IFunctionalitySignPdfSignatureUploadHandles,
} from './FunctionalitySignPdfOperationSignatureUpload';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.paper',
  border: '2px solid #fafafa',
  boxShadow: 24,
  px: 1,
  minHeight: 300,
};
export type ISignatureType = 'type' | 'draw' | 'upload';
interface IFunctionalitySignPdfSignModalProps {
  onClose: () => void;
  onCreate: (type: ISignatureType, value: string) => void;
  open: boolean;
}

/**
 * 签名操作弹窗。签名手绘板，输入签名，上传签名
 */
const FunctionalitySignPdfOperationSignatureModal: FC<
  IFunctionalitySignPdfSignModalProps
> = ({ onClose, onCreate, open }) => {
  const { t } = useTranslation();

  const [tabValue, setTabValue] = useState<ISignatureType>('type');
  const signaturePadRef =
    useRef<IFunctionalitySignPdfSignaturePadHandles | null>(null);
  const signatureTypeRef =
    useRef<IFunctionalitySignPdfSignatureTypeHandles | null>(null);
  const signatureUploadRef =
    useRef<IFunctionalitySignPdfSignatureUploadHandles | null>(null);
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: ISignatureType,
  ) => {
    setTabValue(newValue);
  };
  const onConfirm = () => {
    if (tabValue === 'type') {
      const imageString = signatureTypeRef.current?.getPngBase64();
      if (imageString) {
        onCreate(tabValue, imageString);
      }
    } else if (tabValue === 'draw') {
      const imageString = signaturePadRef.current?.getPngBase64();
      if (imageString) {
        onCreate(tabValue, imageString);
      }
    } else if (tabValue === 'upload') {
      const imageString = signatureUploadRef.current?.getPngBase64();
      if (imageString) {
        onCreate(tabValue, imageString);
      }
    }
  };
  return (
    <Modal
      open={open}
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
            <Box>
              <FunctionalitySignPdfOperationSignaturePad
                ref={signaturePadRef}
              />
            </Box>
          )}
          {tabValue === 'type' && (
            <Box>
              <FunctionalitySignPdfOperationSignatureType
                ref={signatureTypeRef}
              />
            </Box>
          )}
          {tabValue === 'upload' && (
            <Box>
              <FunctionalitySignPdfOperationSignatureUpload
                ref={signatureUploadRef}
              />
            </Box>
          )}
        </Box>
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
            onClick={onConfirm}
          >
            {t(
              'functionality__sign_pdf:components__sign_pdf__operation_view__create',
            )}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
export default FunctionalitySignPdfOperationSignatureModal;
