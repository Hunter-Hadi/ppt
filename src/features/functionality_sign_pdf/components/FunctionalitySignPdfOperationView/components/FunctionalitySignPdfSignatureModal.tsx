import { Box, Button, Modal, Stack, Tab, Tabs, TextField } from '@mui/material';
import { FC, useState } from 'react';

import { textToBase64Image } from '@/features/functionality_sign_pdf/utils/toBase64';
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
}
const FunctionalitySignPdfSignatureModal: FC<
  IFunctionalitySignPdfSignModalProps
> = ({ onClose, onCreate }) => {
  const [tabValue, setTabValue] = useState<ISignatureType>('type');
  const [typeInputVal, setTypeInputVal] = useState('');

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: ISignatureType,
  ) => {
    setTabValue(newValue);
  };
  const onConfirm = () => {
    if (tabValue === 'type') {
      const imageString = textToBase64Image(typeInputVal);
      if (imageString) {
        onCreate(tabValue, imageString);
      }
    }
  };
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
            <Tab label='Draw' value='draw' />
            <Tab label='Type' value='type' />
            <Tab label='Upload' value='upload' />
          </Tabs>
        </Box>
        <Box
          sx={{
            padding: 2,
          }}
        >
          {tabValue === 'draw' && <Box>1</Box>}
          {tabValue === 'type' && (
            <Box>
              <TextField
                placeholder='Enter signature'
                fullWidth
                value={typeInputVal}
                onChange={(e) => setTypeInputVal(e.target.value)}
                sx={{
                  '.MuiInputBase-root': {
                    height: 150,
                    fontSize: 50,
                  },
                }}
              />
            </Box>
          )}
          {tabValue === 'upload' && <Box>3</Box>}
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
            Cancel
          </Button>
          <Button
            sx={{ borderRadius: 1 }}
            variant='contained'
            onClick={onConfirm}
          >
            Create
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
export default FunctionalitySignPdfSignatureModal;
