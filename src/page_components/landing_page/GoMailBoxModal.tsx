import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Alert, Button, Stack, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

import AppPaperCardLayout from '@/app_layout/AppPaperCardLayout';
import CopyTypography from '@/components/CopyTypography';
import CustomModal from '@/components/CustomModal';
import ProLink from '@/components/ProLink';
import { GaContent, gaEvent, generateGaEvent } from '@/utils/gtag';

/**
 * key 全小写
 * value: 搜索的邮箱url.
 */

const emailRule = {
  gmail: 'https://mail.google.com/mail/u/0/#search/ezmail',
  yahoo: 'https://mail.yahoo.com/d/search/keyword=ezmail',
  outlook: 'https://outlook.live.com/mail/0/',
  hotmail: 'https://outlook.live.com/mail/0/',
  qq: 'https://mail.qq.com/',
  mail163: 'https://mail.163.com/',
  protonmail: 'https://mail.protonmail.com/u/0/all-mail#keyword=ezmail',
  icloud: 'https://www.icloud.com/mail/',
};

const GoMailBoxModal: FC<{
  email: string;
  show: boolean;
  onClose?: () => void;
}> = (props) => {
  const { email } = props;
  const [emailUrl, setEmailUrl] = useState('');
  useEffect(() => {
    switch (true) {
      case /^[\w-\+\.]+@gmail\.com$/i.test(email):
        setEmailUrl(emailRule.gmail);
        break;
      case /^[\w-\.]+@outlook\.com$/i.test(email):
      case /^[\w-\.]+@hotmail\.com$/i.test(email):
        setEmailUrl(emailRule.outlook);
        break;
      case /^[\w-\.]+@yahoo\.com$/i.test(email):
        setEmailUrl(emailRule.yahoo);
        break;
      case /^[\w-\.]+@qq\.com$/i.test(email):
        setEmailUrl(emailRule.qq);
        break;
      case /^[\w-\.]+@163\.com$/i.test(email):
        setEmailUrl(emailRule.mail163);
        break;
      case /^[\w-\.]+@(protonmail\.com)|(proton\.me)$/i.test(email):
        setEmailUrl(emailRule.protonmail);
        break;
      case /^[\w-\.]+@icloud\.com$/i.test(email):
        setEmailUrl(emailRule.icloud);
        break;
      default:
        break;
    }
  }, [email]);
  return (
    <CustomModal
      width={600}
      height={'unset'}
      sx={{
        overflow: 'hidden',
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
          height: 'unset',
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        <Stack
          spacing={{
            xs: 2,
          }}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Typography variant={'h1'} component={'p'}>
            Reply to the waitlist invitation email to secure your spot
          </Typography>
          <Alert severity='info'>
            <Typography
              mb={2}
              variant={'body2'}
            >{`Your waitlist invitation has been sent to ${email}.`}</Typography>
            <Typography variant={'body2'}>
              {'Search '}
              <CopyTypography text={'EzMail'}>
                <Typography
                  variant={'body2'}
                  fontWeight={'bold'}
                  component={'span'}
                  color='text.primary'
                >
                  {'EzMail'}
                </Typography>
              </CopyTypography>
              {' in your mailbox in case it went to promotion/spam.'}
            </Typography>
          </Alert>

          {emailUrl && (
            <ProLink
              sx={{ width: '100%' }}
              target={'_blank'}
              href={emailUrl}
              onClick={() => {
                gaEvent(
                  generateGaEvent('click', 'gotomailbox', {
                    link: emailUrl,
                    email: email,
                  }),
                );
              }}
            >
              <Button
                fullWidth
                size='large'
                variant='contained'
                disableElevation
                sx={{ width: '100%', mt: 2 }}
                endIcon={<OpenInNewIcon sx={{ fontSize: '16px!important' }} />}
              >
                <GaContent
                  gaEvent={generateGaEvent('click', 'gotomailbox', {
                    link: emailUrl,
                    email: email,
                  })}
                >
                  <Typography>Search my mailbox</Typography>
                </GaContent>
              </Button>
            </ProLink>
          )}
        </Stack>
      </AppPaperCardLayout>
    </CustomModal>
  );
};

export default GoMailBoxModal;
