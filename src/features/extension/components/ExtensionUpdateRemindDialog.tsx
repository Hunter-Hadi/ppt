import { Button, Stack, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';

import CustomModal from '@/components/CustomModal';
import { webPageOpenMaxAIExtensionPage } from '@/features/common/utils/postMessageToCRX';
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
    webPageOpenMaxAIExtensionPage();
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
            mt: '20%',
            height: 'unset',
            width: '90%',
            maxWidth: 464,
          }}
        >
          <Stack spacing={2} p={4}>
            <Typography variant={'h5'}>
              Update MaxAI.me extension to continue.
            </Typography>
            <Button
              variant='contained'
              onClick={handleClickRouteToExtensionPage}
            >
              Updated now
            </Button>
          </Stack>
        </CustomModal>
      )}
    </>
  );
};

export default ExtensionUpdateRemindDialog;
