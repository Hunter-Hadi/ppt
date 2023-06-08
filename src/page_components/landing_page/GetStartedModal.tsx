import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import AppPaperCardLayout from '@/app_layout/AppPaperCardLayout';
import CustomModal from '@/components/CustomModal';
import EmailTextField from '@/components/EmailTextField';
import { useGetStarted } from '@/features/user';
import GoMailBoxModal from '@/page_components/landing_page/GoMailBoxModal';

const GetStartedModal: FC<{
  show: boolean;
  onClose?: () => void;
}> = (props) => {
  const [email, setEmail] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [validate, setValidate] = useState(0);
  const { sendEmail, loading } = useGetStarted(email);
  useEffect(() => {
    if (props.show === false) {
      setEmail('');
    }
  }, [props.show]);
  return (
    <CustomModal
      width={600}
      height={'unset'}
      sx={{
        maxWidth: {
          xs: '90%',
          sm: 600,
        },
      }}
      show={props.show}
      onClose={() => {
        if (props.onClose) props.onClose();
      }}
    >
      <AppPaperCardLayout
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        <Stack
          mt={{
            xs: 0,
            sm: 4,
          }}
          spacing={{
            xs: 2,
            sm: 3,
            md: 4,
          }}
        >
          <EmailTextField
            fullWidth
            validate={validate}
            whiteMode={false}
            defaultValue={email}
            onChange={(value) => {
              setEmail(value);
            }}
            onEnter={async () => {
              const emailRegex =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (emailRegex.test(email)) {
                const result = await sendEmail();
                result && setShowModal(true);
              }
            }}
          />
          <LoadingButton
            loading={loading}
            variant={'contained'}
            onClick={async () => {
              setValidate(validate + 1);
              const emailRegex =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (emailRegex.test(email)) {
                const result = await sendEmail();
                result && setShowModal(true);
              }
            }}
            sx={{
              lineHeight: 32,
              height: 48,
              width: {
                sm: 162,
                xs: '100%',
              },
            }}
          >
            <Typography variant={'body1'}>Get started</Typography>
          </LoadingButton>
        </Stack>
      </AppPaperCardLayout>
      <GoMailBoxModal
        email={email}
        show={showModal}
        onClose={() => {
          setShowModal(false);
          if (props.onClose) props.onClose();
        }}
      />
    </CustomModal>
  );
};

export default GetStartedModal;
