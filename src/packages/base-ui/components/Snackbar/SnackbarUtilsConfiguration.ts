import { OptionsObject, useSnackbar, WithSnackbarProps } from 'notistack';

let snackbarRef: WithSnackbarProps;
export const SnackbarUtilsConfiguration: React.FC = () => {
  snackbarRef = useSnackbar();
  return null;
};

const snackbar = (msg: string, options: OptionsObject = {}): void => {
  snackbarRef.enqueueSnackbar(msg, options);
};

const success = (msg: string, options: OptionsObject = {}): void => {
  snackbar(msg, { ...options, variant: 'success' });
};
const warning = (msg: string, options: OptionsObject = {}): void => {
  snackbar(msg, { ...options, variant: 'warning' });
};
const info = (msg: string, options: OptionsObject = {}): void => {
  snackbar(msg, { ...options, variant: 'info' });
};
const error = (msg: string, options: OptionsObject = {}): void => {
  snackbar(msg, { ...options, variant: 'error' });
};

const exportObject = {
  success,
  warning,
  info,
  error,
};

export default exportObject;
