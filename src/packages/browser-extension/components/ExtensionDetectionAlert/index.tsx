import { Paper } from '@mui/material';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React from 'react';

import MaxAIExtensionInstallButton from '@/packages/browser-extension/components/MaxAIExtensionInstallButton';
import { useMaxAITranslation } from '@/packages/common';
import useBrowserAgent from '@/packages/common/hooks/useBrowserAgent';

import useExtensionDetectionAlert from './useExtensionDetectionAlert';

const ExtensionDetectionAlert = () => {
  const { t } = useMaxAITranslation();
  const { open, closeExtensionDetectionAlert } = useExtensionDetectionAlert();
  const { browserAgent } = useBrowserAgent();

  return (
    <Modal open={open} onClose={closeExtensionDetectionAlert}>
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 464,
          minWidth: 360,
          p: 4,
        }}
      >
        <Typography variant={'h5'} mb={2}>
          {t('package__browser_extension:extension_detection_alert__title', {
            BROWSER_AGENT: browserAgent,
          })}
        </Typography>
        <MaxAIExtensionInstallButton
          variant='contained'
          sx={{
            width: '100%',
          }}
        />
      </Paper>
    </Modal>
  );
};

export default ExtensionDetectionAlert;
export { useExtensionDetectionAlert };
