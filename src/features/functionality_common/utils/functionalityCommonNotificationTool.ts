import snackNotifications from '@/utils/globalSnackbar';

export const functionalityCommonSnackNotifications = (
  message: string,
  type: string = 'warning',
) => {
  snackNotifications[type](message, {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
  });
};
