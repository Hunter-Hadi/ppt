import { Button, Stack, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';

import CustomModal from '@/components/CustomModal';
import ResponsiveImage from '@/components/ResponsiveImage';
import { webPageOpenMaxAIImmersiveChat } from '@/features/common/utils/postMessageToCRX';
import useBrowserAgent from '@/hooks/useBrowserAgent';

import { ExtensionUpdateRemindDialogState } from '../store';

const ExtensionUpdateRemindDialog = () => {
  const [
    extensionUpdateRemindDialogState,
    setExtensionUpdateRemindDialogState,
  ] = useRecoilState(ExtensionUpdateRemindDialogState);

  const { browserAgent } = useBrowserAgent();

  const { show } = extensionUpdateRemindDialogState;

  const setShow = (show: boolean) => {
    setExtensionUpdateRemindDialogState((pre) => ({
      ...pre,
      show,
    }));
  };

  const handleClickRouteToExtensionPage = () => {
    webPageOpenMaxAIImmersiveChat();
  };

  return (
    <>
      {show && (
        <CustomModal
          onClose={() => {
            setShow(false);
          }}
          show={show}
          sx={{
            mt: '10vh',
            height: 'unset',
            width: '90%',
            maxWidth: 400,
          }}
        >
          <Stack spacing={2} p={4} bgcolor='white'>
            <Typography variant={'h5'}>
              {`To run this prompt, access the '1-click prompts' feature in 'Immersive chat'.`}
            </Typography>
            <ResponsiveImage
              alt='1-click-prompt-btn'
              src='/assets/extension/1-click-prompt-btn.jpg'
              width={1772}
              height={862}
            />
            <Button
              variant='contained'
              onClick={handleClickRouteToExtensionPage}
            >
              {`Open 'Immersive chat'`}
            </Button>
          </Stack>
        </CustomModal>
      )}
    </>
  );
};

export default ExtensionUpdateRemindDialog;
