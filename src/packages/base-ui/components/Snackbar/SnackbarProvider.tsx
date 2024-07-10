import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import IconButton from '@mui/material/IconButton';
import {
  SnackbarKey,
  SnackbarProvider as NotistackSnackbarProvider,
} from 'notistack';
import React, { FC } from 'react';

import { SnackbarUtilsConfiguration } from './SnackbarUtilsConfiguration';

interface ISnackbarProviderProps {
  children?: React.ReactNode;
}

const SnackbarProvider: FC<ISnackbarProviderProps> = ({ children }) => {
  const snackbarRef = React.useRef(null);

  return (
    <NotistackSnackbarProvider
      maxSnack={3}
      preventDuplicate
      ref={snackbarRef}
      hideIconVariant
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      action={(key) => (
        <IconButton
          onClick={() => {
            if (snackbarRef?.current) {
              const snRef = snackbarRef?.current as {
                closeSnackbar: (p: SnackbarKey) => void;
              };
              if (snRef.closeSnackbar) {
                snRef.closeSnackbar(key);
              }
            }
          }}
        >
          <CloseOutlinedIcon fontSize='inherit' sx={{ color: 'white' }} />
        </IconButton>
      )}
    >
      <SnackbarUtilsConfiguration />
      {children}
    </NotistackSnackbarProvider>
  );
};

export default SnackbarProvider;
