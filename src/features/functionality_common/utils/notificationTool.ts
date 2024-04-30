import snackNotifications from '@/utils/globalSnackbar';

export const functionalityCommonSnackNotifications = (message: string) => {
    snackNotifications.warning(
        message,
        {
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        },
    );
}