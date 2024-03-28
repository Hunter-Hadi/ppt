import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import {
  APP_EXTERNAL_LINKS,
  EXTENSION_INSTALL_TRACKER_LINK,
  EXTENSION_SHARE_TRACKER_LINK,
  SIMPLY_TRENDS_APP_EMAIL,
} from '@/global_constants';

import CopyTypography from './CopyTypography';
import ProLink from './ProLink';

const TwitterFollowButton = () => {
  const { t } = useTranslation();
  return (
    <ProLink
      href={APP_EXTERNAL_LINKS.TWITTER_FOLLOW_UP_LINK}
      target='_blank'
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        bgcolor: '#1d9bf0',
        padding: '4px 12px',
        borderRadius: '99px',
        fontWeight: 500,
        fontSize: 14,
        gap: 0.5,
        justifyContent: 'center',
        // minWidth: 200,
      }}
    >
      <TwitterIcon sx={{ fontSize: 18 }} />
      {t('common:follow')} @MaxAI_HQ
    </ProLink>
  );
};

const ContactUsPanel = () => {
  const { t } = useTranslation();
  return (
    <Stack bgcolor='#E2E8F0' spacing={2} p={2} borderRadius={1}>
      <Typography variant='body2' component={'div'}>
        💬 {t('pages:contact_us__item1')}{' '}
        <ProLink
          href={`mailto:${SIMPLY_TRENDS_APP_EMAIL}?subject=I have a question about MaxAI.me Chrome extension`}
          sx={{ color: 'inherit' }}
          target={'_blank'}
          underline='always'
        >
          hello@maxai.me
        </ProLink>{' '}
        <CopyTypography
          text={SIMPLY_TRENDS_APP_EMAIL}
          sx={{
            p: 0,
            minWidth: 20,
            display: 'inline-block',
            color: 'rgba(0, 0, 0, 0.38)',
          }}
        />{' '}
        .
      </Typography>
      <Stack direction={'row'} gap={1} flexWrap='wrap'>
        <Typography variant='body2' component={'div'}>
          👉 {t('pages:contact_us__item2')}{' '}
        </Typography>
        <TwitterFollowButton />
      </Stack>
      <Typography variant='body2' component={'div'}>
        🙏 {t('pages:contact_us__item3')}{' '}
        <ProLink
          href={`${EXTENSION_INSTALL_TRACKER_LINK}?ref=support-us`}
          sx={{ color: 'inherit' }}
          target={'_blank'}
          underline='always'
        >
          {t('pages:contact_us__item3__store')}{' '}
          <OpenInNewIcon
            sx={{
              position: 'relative',
              top: '4px',
              fontSize: 20,
              color: '#00000061',
            }}
          />
        </ProLink>{' '}
        .
      </Typography>
      <Stack direction={'row'} gap={0.5}>
        <Typography variant='body2' component={'div'}>
          🎁 {t('pages:contact_us__item4')}{' '}
          <ProLink
            href={`${EXTENSION_INSTALL_TRACKER_LINK}?ref=share`}
            sx={{ color: 'inherit' }}
            target={'_blank'}
            underline='always'
          >
            MaxAI.me
          </ProLink>
          {` `}
          <CopyTypography
            text={`${EXTENSION_SHARE_TRACKER_LINK}?ref=share`}
            sx={{ p: 0, minWidth: 20, color: 'rgba(0, 0, 0, 0.38)' }}
          />
          {` `}.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ContactUsPanel;
