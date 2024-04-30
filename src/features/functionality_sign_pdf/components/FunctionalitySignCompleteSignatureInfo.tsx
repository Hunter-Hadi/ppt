import { Box, Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { FC, useMemo } from 'react';

import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload';

import FunctionalitySignPdfIcon from './FunctionalitySignPdfIcon';

interface IFunctionalitySignCompleteSignatureInfoProps {
  downloadUint8Array: Uint8Array;
  onClearReturn: () => void;
  fileName: string;
}
const FunctionalitySignCompleteSignatureInfo: FC<
  IFunctionalitySignCompleteSignatureInfoProps
> = ({ downloadUint8Array, onClearReturn, fileName }) => {
  const { t } = useTranslation();
  const onDownload = () => {
    let newFileName = fileName;
    if (newFileName.endsWith('.pdf')) {
      newFileName = newFileName.slice(0, -4);
    }
    downloadUrl(downloadUint8Array, newFileName + '(Powered by MaxAI).pdf');
  };
  const currentTime = useMemo(() => dayjs().format('YYYY-MM-DD'), []);
  return (
    <Stack
      direction='column'
      justifyContent='space-between'
      sx={{
        border: '1px solid #e8e8e8',
        borderLeft: 'none',
        height: '100%',
      }}
    >
      <Box>
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
                lg: 14,
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
                  lg: 12,
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
                lg: 14,
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
                  lg: 14,
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
                lg: 14,
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
                  lg: 14,
                },
                fontWeight: 'bold',
              }}
            >
              {infoTitle}
            </Typography>
            <FunctionalitySignPdfIcon name='CheckCircle' color='success' />
          </Stack>
        ))}
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
  );
};
export default FunctionalitySignCompleteSignatureInfo;
