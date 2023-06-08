import { OptionsObject, useSnackbar, WithSnackbarProps } from 'notistack';
import React from 'react';

let snackbarRef: WithSnackbarProps;
export const SnackbarUtilsConfigurator: React.FC = () => {
  snackbarRef = useSnackbar();
  return null;
};

const toast = (msg: string, options: OptionsObject = {}): void => {
  snackbarRef.enqueueSnackbar(msg, options);
};

const success = (msg: string, options: OptionsObject = {}): void => {
  toast(msg, { ...options, variant: 'success' });
};
const warning = (msg: string, options: OptionsObject = {}): void => {
  toast(msg, { ...options, variant: 'warning' });
};
const info = (msg: string, options: OptionsObject = {}): void => {
  toast(msg, { ...options, variant: 'info' });
};
const error = (msg: string, options: OptionsObject = {}): void => {
  toast(msg, { ...options, variant: 'error' });
};

const exportedObject = {
  success,
  warning,
  info,
  error,
};

export default exportedObject;
