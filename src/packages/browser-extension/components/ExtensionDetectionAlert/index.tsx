import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import React from 'react'

import MaxAIExtensionInstallButton from '@/packages/browser-extension/components/MaxAIExtensionInstallButton'
import { webPageOpenMaxAIExtensionPage } from '@/packages/browser-extension/utils/postMessageToCRX'
import { useMaxAITranslation } from '@/packages/common'
import { ChromeConfigLogo } from '@/packages/common/components/CustomIcon'
import MaxAICloseButton from '@/packages/common/components/MaxAICloseButton'
import useBrowserAgent from '@/packages/common/hooks/useBrowserAgent'

import useExtensionDetectionAlert from './useExtensionDetectionAlert'

const ExtensionDetectionAlert = () => {
  const { t } = useMaxAITranslation()
  const {
    installAlertOpen,
    closeExtensionInstallAlert,
    upgradeAlertOpen,
    closeExtensionUpgradeAlert,
  } = useExtensionDetectionAlert()
  const { browserAgent } = useBrowserAgent()

  return (
    <>
      <Modal open={installAlertOpen} onClose={closeExtensionInstallAlert}>
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 272,
            minWidth: 250,
            p: 3,
            borderRadius: 4,
          }}
        >
          <MaxAICloseButton
            aria-label='close'
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
            onClick={closeExtensionInstallAlert}
          />

          <ChromeConfigLogo sx={{ width: '64px', height: '56px', mb: 1 }} />
          <Typography
            variant='custom'
            component={'p'}
            sx={{ fontSize: 16, fontWeight: '600', lineHeight: 1.5 }}
            mb={1}
          >
            {t('package__browser_extension:extension_detection_alert__title', {
              BROWSER_AGENT: browserAgent,
            })}
          </Typography>
          <Typography
            variant='custom'
            component={'p'}
            sx={{
              fontSize: '14px',
              lineHeight: 1.5,
              color: 'rgba(0, 0, 0, 0.60)',
            }}
            mb={2}
          >
            {t('package__browser_extension:extension_detection_alert__desc', {
              BROWSER_AGENT: browserAgent,
            })}
          </Typography>
          <MaxAIExtensionInstallButton
            variant='contained'
            sx={{
              width: '100%',
              lineHeight: '150%',
              height: 'auto',
              fontSize: '16px',
            }}
            startIcon={null}
          />
        </Paper>
      </Modal>
      <Modal open={upgradeAlertOpen} onClose={closeExtensionUpgradeAlert}>
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 464,
            minWidth: 360,
            p: 4,
            borderRadius: 4,
          }}
        >
          <MaxAICloseButton
            aria-label='close'
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
            onClick={closeExtensionUpgradeAlert}
          />
          <Typography variant={'h5'} component='p' mb={2}>
            {t('package__browser_extension:upgrade_alert__title')}
          </Typography>
          <Typography variant={'body2'} component='p' mb={2}>
            {t('package__browser_extension:upgrade_alert__desc')}
          </Typography>
          <Typography variant={'caption'} component='p' mb={2} pl={2}>
            1. {t('package__browser_extension:upgrade_alert__desc__step1')}
          </Typography>
          <Typography variant={'caption'} component='p' mb={2} pl={2}>
            2. {t('package__browser_extension:upgrade_alert__desc__step2')}
          </Typography>
          <Typography variant={'caption'} component='p' mb={2} pl={2}>
            3. {t('package__browser_extension:upgrade_alert__desc__step3')}
          </Typography>
          <Typography variant={'caption'} component='p' mb={2} pl={2}>
            4. {t('package__browser_extension:upgrade_alert__desc__step4')}
          </Typography>

          <Button
            variant='contained'
            fullWidth
            sx={{
              height: 64,
              fontSize: 18,
            }}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              webPageOpenMaxAIExtensionPage()
            }}
          >
            {t('package__browser_extension:upgrade_alert__cta_txt')}
          </Button>
        </Paper>
      </Modal>
    </>
  )
}

export default ExtensionDetectionAlert
export { useExtensionDetectionAlert }
