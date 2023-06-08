import { LoadingButton } from '@mui/lab';
import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { FC, useState } from 'react';

import EmailTextField from '@/components/EmailTextField';
import VideoPlayer from '@/components/VideoPlayer';
import { useGetStarted } from '@/features/user';
import GoMailBoxModal from '@/page_components/landing_page/GoMailBoxModal';
import HeadingWords from '@/page_components/landing_page/HeadingWords';

const LandingPageBanner: FC<{
  title?: string | React.ReactNode;
  textAlign?: string;
  withVideo?: boolean;
}> = (props) => {
  const { title = 'Reply to emails ', withVideo, textAlign = 'center' } = props;
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [validate, setValidate] = useState(0);
  const { sendEmail, loading } = useGetStarted(inputValue);
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
        pb: {
          md: 4,
        },
      }}
    >
      <Grid item xs={12} md={12} columnSpacing={3}>
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
                xs: 32,
                sm: 36,
                md: 48,
                lg: 56,
              },
              fontWeight: 700,
              lineHeight: 1.14,
              color: 'white',
              mt: {
                lg: -8,
              },
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
                lineHeight: 1.3,
                bgcolor: 'primary.main',
              }}
            >
              {title}
            </Box>
            {textAlign === 'left' && (
              <>
                <HeadingWords />
                <Box
                  component={'span'}
                  sx={{
                    mt: 1,
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    display: 'inline-block',
                    bgcolor: 'primary.main',
                  }}
                >
                  {`10X faster `}
                  <Box
                    component={'span'}
                    sx={{
                      display: 'inline-block',
                      backgroundPosition: '50% 50%',
                      backgroundSize: '80%',
                      backgroundRepeat: 'no-repeat',
                      backgroundImage:
                        'url(/assets/landing-page/text-color-underline.svg)',
                      pb: {
                        xs: '2.7rem',
                        md: '3.5rem',
                        lg: '5rem',
                      },
                      px: {
                        xs: '1.5rem',
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
                    with AI
                  </Box>
                </Box>
              </>
            )}
          </Typography>
          {textAlign === 'left' && (
            <Typography variant={'body1'} color={'#fff'} maxWidth={'sm'}>
              EzMail is the AI-powered email drafting tool that pre-fills
              responses as if they were written by you, enabling you to reply to
              emails 10X faster.
            </Typography>
          )}
          <Stack
            sx={{
              justifyContent: textAlign === 'center' ? 'center' : 'flex-start',
              alignItems: textAlign === 'center' ? 'center' : 'flex-start',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              gap: 2,
            }}
          >
            <EmailTextField
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
                height: 48,
                width: {
                  sm: 162,
                  xs: '100%',
                },
                bgcolor: 'white',
                fontWeight: 700,
                color: 'primary.main',
                '&:hover': {
                  bgcolor: '#ECF4FF',
                },
                '&.Mui-disabled': {
                  bgcolor: '#ECF4FF',
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
            width={{
              lg: 800,
              md: 600,
              sm: 400,
              xs: '100%',
            }}
            height={{
              lg: 800,
              md: 600,
              sm: 400,
              xs: '100vw',
            }}
            sx={{
              overflow: 'hidden',
            }}
          >
            {/*// TODO*/}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '10px',
                height: '100%',
                zIndex: 1,
              }}
            />
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
export default LandingPageBanner;
