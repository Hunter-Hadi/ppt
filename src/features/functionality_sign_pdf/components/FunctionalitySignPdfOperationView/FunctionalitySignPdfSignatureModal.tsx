import { Box, Button, Modal, Stack, Tab, Tabs } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useRef, useState } from 'react';

import { textToBase64Image } from '@/features/functionality_sign_pdf/utils/toBase64';

import FunctionalitySignPdfSignaturePad, {
  IFunctionalitySignPdfSignaturePadHandles,
} from './FunctionalitySignPdfSignaturePad';
import FunctionalitySignPdfSignatureType, {
  IFunctionalitySignPdfSignatureTypeHandles,
} from './FunctionalitySignPdfSignatureType';
import FunctionalitySignPdfSignatureUpload, {
  IFunctionalitySignPdfSignatureUploadHandles,
} from './FunctionalitySignPdfSignatureUpload';
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
  modalOpen: boolean;
}
const FunctionalitySignPdfSignatureModal: FC<
  IFunctionalitySignPdfSignModalProps
> = ({ onClose, onCreate, modalOpen }) => {
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
      const inputVal = signatureTypeRef.current?.getTextVal();
      if (inputVal) {
        const imageString = textToBase64Image(inputVal, 80);
        if (imageString) {
          onCreate(tabValue, imageString);
        }
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
      open={modalOpen}
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
              <FunctionalitySignPdfSignaturePad ref={signaturePadRef} />
            </Box>
          )}
          {tabValue === 'type' && (
            <Box>
              <FunctionalitySignPdfSignatureType ref={signatureTypeRef} />
            </Box>
          )}
          {tabValue === 'upload' && (
            <Box>
              <FunctionalitySignPdfSignatureUpload ref={signatureUploadRef} />
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
export default FunctionalitySignPdfSignatureModal;
