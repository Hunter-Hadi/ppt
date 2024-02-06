import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';

import Toast from '@/utils/globalSnackbar';

const ShareConversationCopyLInk = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleOnCopy = () => {
    Toast.success(t('common:link_copied'), {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      autoHideDuration: 2000,
    });
  };

  if (!router.isReady || !window) {
    return null;
  }

  const copyText = window.location.href;

  return (
    <>
      <CopyToClipboard text={copyText} onCopy={handleOnCopy}>
        <Button variant='contained' startIcon={<IosShareOutlinedIcon />}>
          <Typography variant='custom' fontSize={16}>
            {t('common:share')}
          </Typography>
        </Button>
      </CopyToClipboard>
    </>
  );
};

export default ShareConversationCopyLInk;
