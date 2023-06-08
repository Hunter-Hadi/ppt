import { LoadingButton } from '@mui/lab';
import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { FC, useState } from 'react';

import EmailTextField from '@/components/EmailTextField';
import VideoPlayer from '@/components/VideoPlayer';
import { useGetStarted } from '@/features/user';
import GoMailBoxModal from '@/page_components/landing_page/GoMailBoxModal';

const LandingPageBannerWhite: FC<{
  title?: string;
  textAlign?: string;
  withVideo?: boolean;
}> = (props) => {
  const { title = 'Reply to emails ', withVideo, textAlign = 'center' } = props;
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [validate, setValidate] = useState(0);
  const { sendEmail, loading } = useGetStarted(inputValue);
  const isMdScreen = useMediaQuery('(max-width:1280px)');
  const isSmScreen = useMediaQuery('(max-width:768px)');

  return (
    <Grid
      container
      py={{
        xs: 2,
        lg: 6,
        xl: 9,
      }}
      rowSpacing={{
        xs: 2,
        md: 4,
        lg: 7,
      }}
      columnSpacing={3}
      sx={{
        marginTop: '0!important',
        p: {
          xs: 2,
          md: 0,
        },
      }}
    >
      <Grid
        item
        xs={12}
        md={12}
        columnSpacing={3}
        sx={{
          mt: {
            lg: -6,
          },
        }}
      >
        <Stack
          spacing={{
            xs: 2,
            md: 4,
            lg: 7,
          }}
          justifyContent={'center'}
          height={'100%'}
        >
          <Typography
            textAlign={textAlign as 'center'}
            component={'h2'}
            sx={{
              fontSize: {
                xs: 36,
                sm: 48,
                md: 56,
              },
              fontWeight: 700,
              lineHeight: 1.14,
            }}
          >
            <Box
              component={'span'}
              sx={{
                position: 'relative',
                zIndex: 1,
                width: {
                  xs: '100%',
                  md: 'unset',
                },
                display: {
                  xs: 'inline-flex',
                  sm: 'unset',
                },
              }}
            >
              {title}
            </Box>
            {textAlign === 'left' && (
              <>
                <Box
                  component={'span'}
                  sx={{
                    mt: 1,
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    display: 'inline-block',
                  }}
                >
                  {`with `}
                  <Box
                    component={'span'}
                    sx={{
                      display: 'inline-block',
                      backgroundPosition: isSmScreen
                        ? '50% 55%'
                        : isMdScreen
                        ? '50% 60%'
                        : '50% 50%',
                      backgroundSize: '80%',
                      backgroundRepeat: 'no-repeat',
                      backgroundImage:
                        'url(/assets/landing-page/text-color-underline.svg)',
                      pb: {
                        xs: '2.7rem',
                        md: '3.5rem',
                        lg: '5rem',
                      },
                      pl: {
                        xs: '1.2rem',
                        md: '2rem',
                        lg: '3rem',
                      },
                      pr: {
                        xs: '0rem',
                        md: '2rem',
                        lg: '3rem',
                      },
                      mx: {
                        xs: '-1.5rem',
                        md: '-2rem',
                        lg: '-3rem',
                      },
                      mb: {
                        xs: '-2.7rem',
                        md: '-3.5rem',
                        lg: '-5rem',
                      },
                    }}
                  >
                    {' '}
                    pre-filled drafts
                  </Box>
                </Box>
                <Box
                  component={'span'}
                  sx={{
                    position: 'relative',
                    top: 16,
                    pb: 2,
                    zIndex: 1,
                    width: {
                      xs: '100%',
                      md: 'unset',
                    },
                    display: 'inline-block',
                  }}
                >
                  using AI
                </Box>
              </>
            )}
          </Typography>
          {textAlign === 'left' && (
            <Typography variant={'body1'} color={'#000'} maxWidth={'sm'}>
              EzMail.AI pre-fills personalized responses for you, enabling 10X
              faster email replies on Gmail, especially for repetitive or
              similar messages.
            </Typography>
          )}
          <Stack
            sx={{
              justifyContent: textAlign === 'center' ? 'center' : 'center',
              alignItems: textAlign === 'center' ? 'center' : 'flex-start',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              gap: 2,
            }}
          >
            <EmailTextField
              whiteMode={false}
              validate={validate}
              onEnter={async () => {
                const emailRegex =
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (emailRegex.test(inputValue)) {
                  const isSuccess = await sendEmail();
                  isSuccess && setShowModal(true);
                }
              }}
              onChange={(value) => setInputValue(value)}
            />
            <LoadingButton
              loading={loading}
              onClick={async () => {
                setValidate(validate + 1);
                const emailRegex =
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (emailRegex.test(inputValue)) {
                  const isSuccess = await sendEmail();
                  isSuccess && setShowModal(true);
                }
              }}
              variant={'contained'}
              sx={{
                lineHeight: 32,
                height: 56,
                width: {
                  sm: 200,
                  xs: '100%',
                },
              }}
            >
              <Typography variant={'body1'}>Get started</Typography>
            </LoadingButton>
            <GoMailBoxModal
              email={inputValue}
              show={showModal}
              onClose={() => {
                setShowModal(false);
              }}
            />
          </Stack>
        </Stack>
      </Grid>
      {withVideo && (
        <Grid item xs={12}>
          <Box
            position={'relative'}
            mx={'auto'}
            boxSizing={'border-box'}
            width={{
              sm: 720,
              xs: '100%',
            }}
            height={{
              sm: 720,
              xs: '100vw',
            }}
            sx={{
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <VideoPlayer
              muted
              loop
              autoPlay
              width={'100%'}
              height={'100%'}
              src={
                isSmScreen
                  ? '/assets/landing-page/mobile.mov'
                  : '/assets/landing-page/pc.webm'
              }
            />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
export default LandingPageBannerWhite;
