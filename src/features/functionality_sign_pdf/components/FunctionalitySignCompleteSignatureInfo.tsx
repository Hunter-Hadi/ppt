import { Box, Button, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { FC, useMemo } from 'react'

import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload'
import { functionalityCommonFileNameRemoveAndAddExtension } from '@/features/functionality_common/utils/functionalityCommonIndex'

import FunctionalitySignPdfIcon from './FunctionalitySignPdfIcon'

interface IFunctionalitySignCompleteSignatureInfoProps {
  downloadUint8Array: Uint8Array
  onClearReturn: () => void
  fileName: string
}
const FunctionalitySignCompleteSignatureInfo: FC<
  IFunctionalitySignCompleteSignatureInfoProps
> = ({ downloadUint8Array, onClearReturn, fileName }) => {
  const isMobile = useFunctionalityCommonIsMobile()

  const { t } = useTranslation()
  const onDownload = () => {
    const newFileName =
      functionalityCommonFileNameRemoveAndAddExtension(fileName)
    downloadUrl(downloadUint8Array, newFileName)
  }
  const currentTime = useMemo(() => dayjs().format('YYYY-MM-DD'), [])
  return (
    <Stack
      direction='column'
      justifyContent='space-between'
      sx={{
        border: isMobile ? 'none' : '1px solid #e8e8e8',
        borderLeft: 'none',
        height: '100%',
      }}
    >
      <Box>
        {!isMobile && (
          <React.Fragment>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              sx={{
                px: 2,
                py: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 14,
                  },
                  fontWeight: 'bold',
                }}
              >
                {t(
                  'functionality__sign_pdf:components__sign_pdf__complete_signature_info__status',
                )}
              </Typography>
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  padding: '1px 10px',
                  borderRadius: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: 12,
                      color: 'white',
                    },
                    fontWeight: 'bold',
                  }}
                >
                  {t(
                    'functionality__sign_pdf:components__sign_pdf__complete_signature_info__completed',
                  )}
                </Typography>
              </Box>
            </Stack>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              sx={{
                px: 2,
                py: 1,
                borderBottom: '1px solid #e8e8e8',
              }}
              gap={2}
            >
              <Typography
                color='text.secondary'
                sx={{
                  fontSize: {
                    xs: 14,
                  },
                  fontWeight: 'bold',
                }}
              >
                {t(
                  'functionality__sign_pdf:components__sign_pdf__complete_signature_info__signed_on',
                )}
              </Typography>
              <Box
                sx={{
                  flex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: 14,
                    },
                    fontWeight: 'bold',
                  }}
                >
                  {currentTime}
                </Typography>
              </Box>
            </Stack>
            <Stack
              direction='row'
              sx={{
                px: 2,
                py: 1,
              }}
              gap={2}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 14,
                  },
                  fontWeight: 'bold',
                }}
              >
                {t(
                  'functionality__sign_pdf:components__sign_pdf__complete_signature_info__signed_info',
                )}
              </Typography>
            </Stack>
            {[
              t(
                'functionality__sign_pdf:components__sign_pdf__complete_signature_info__secure_environment',
              ),
              t(
                'functionality__sign_pdf:components__sign_pdf__complete_signature_info__local_parsing',
              ),
              t(
                'functionality__sign_pdf:components__sign_pdf__complete_signature_info__local_drawing',
              ),
              t(
                'functionality__sign_pdf:components__sign_pdf__complete_signature_info__local_signature',
              ),
              t(
                'functionality__sign_pdf:components__sign_pdf__complete_signature_info__local_operation',
              ),
              t(
                'functionality__sign_pdf:components__sign_pdf__complete_signature_info__local_download',
              ),
            ].map((infoTitle) => (
              <Stack
                key={infoTitle}
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                sx={{
                  px: 2,
                  py: 1,
                }}
              >
                <Typography
                  color='text.secondary'
                  sx={{
                    fontSize: {
                      xs: 14,
                    },
                    fontWeight: 'bold',
                  }}
                >
                  {infoTitle}
                </Typography>
                <FunctionalitySignPdfIcon name='CheckCircle' color='success' />
              </Stack>
            ))}
          </React.Fragment>
        )}

        <Box
          sx={{
            borderTop: '1px solid #e8e8e8',
            padding: 2,
          }}
        >
          <Button
            onClick={onDownload}
            variant='contained'
            sx={{ width: '100%' }}
            size='large'
          >
            {t(
              'functionality__sign_pdf:components__sign_pdf__complete_signature_info__download',
            )}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          borderTop: '1px solid #e8e8e8',
        }}
      >
        <Button onClick={onClearReturn} sx={{ width: '100%' }} size='large'>
          {t(
            'functionality__sign_pdf:components__sign_pdf__complete_signature_info__sign_pdf_homepage',
          )}
        </Button>
      </Box>
    </Stack>
  )
}
export default FunctionalitySignCompleteSignatureInfo
