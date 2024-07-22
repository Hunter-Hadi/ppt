import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import React from 'react'

// import ChromeConfigLogo from '@/packages/base-ui/components/ChromeConfigLogo'
import { useMaxAITranslation } from '@/packages/common'
import { ChromeConfigLogo } from '@/packages/common/components/CustomIcon'
import MaxAICloseButton from '@/packages/common/components/MaxAICloseButton'
import useBrowserAgent from '@/packages/common/hooks/useBrowserAgent'

import useMaxAIAlertModals from './useMaxAIAlertModals'

const MaxAIAlertModals = () => {
  const { t } = useMaxAITranslation()
  const { useDesktopBrowsersAlertOpen, closeDesktopBrowsersAlert } =
    useMaxAIAlertModals()
  const { browserAgent } = useBrowserAgent()

  return (
    <>
      <Modal
        open={useDesktopBrowsersAlertOpen}
        onClose={closeDesktopBrowsersAlert}
      >
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: 207,
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
            onClick={closeDesktopBrowsersAlert}
          />
          <ChromeConfigLogo sx={{ width: '64px', height: '56px', mb: 1 }} />

          <Typography
            sx={{ fontSize: 16, fontWeight: '600', lineHeight: '150%' }}
            mb={1}
          >
            {t('package__browser_extension:extension_detection_alert__title', {
              BROWSER_AGENT: browserAgent,
            })}
          </Typography>
          <Typography sx={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.60)' }}>
            {t('package__browser_extension:mobile_alert__desc', {
              BROWSER_AGENT: browserAgent,
            })}
          </Typography>
        </Paper>
      </Modal>
    </>
  )
}

export default MaxAIAlertModals
export { useMaxAIAlertModals }
