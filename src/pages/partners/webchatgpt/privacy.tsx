import { Box, Typography } from '@mui/material';
import React from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ProLink from '@/components/ProLink';
import {
  WEBCHATGPT_EMAIL,
  WEBCHATGPT_SEO_CONFIG,
} from '@/features/webchatgpt/constant';
import { WWW_PROJECT_LINK } from '@/global_constants';

const PrivacyPage = ({ seo }) => {
  // const { customTheme } = useCustomTheme();

  return (
    <AppContainer sx={{ wordBreak: 'break-word', py: 4 }}>
      <AppDefaultSeoLayout {...seo} />
      <Box>
        <Typography variant='h1' component={'h1'} gutterBottom sx={{ mb: 2 }}>
          Privacy Policy
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mb: 2 }}>
          Last Updated: May 18, 2023
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mb: 2 }}>
          {`Welcome to the Privacy Policy for WebChatGPT (hereinafter referred to as "WebChatGPT", "we", "us", or "our"). We understand the importance of your privacy, and we are committed to protecting your personal information. This Privacy Policy outlines the types of information we collect, how we use it, and the measures we take to protect your data.`}
        </Typography>
        <Typography variant='body2' gutterBottom>
          {`By using WebChatGPT, you acknowledge and agree to the terms and conditions of this Privacy Policy. If you do not agree with any part of this Privacy Policy, please do not use or install WebChatGPT.`}
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant='h2' component={'h2'} gutterBottom sx={{ mb: 2 }}>
          Information We Do Not Collect
        </Typography>
        <Typography variant='h3' gutterBottom sx={{ mb: 2 }}>
          Personal Information
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mb: 2 }}>
          We take your privacy seriously and do not collect any personal
          information. WebChatGPT operates without requiring any personal data
          from you, and we do not store such information.
        </Typography>
      </Box>
      <Box sx={{ mt: 6 }}>
        <Typography variant='h2' component={'h2'} gutterBottom sx={{ mb: 2 }}>
          Information Security
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mb: 2 }}>
          We take appropriate measures to protect the limited information we
          collect from unauthorized access, disclosure, alteration, or
          destruction. We follow industry-standard practices to ensure the
          security of the data we manage.
        </Typography>
        <Typography variant='h3' gutterBottom sx={{ mb: 2 }}>
          Changes to the Privacy Policy
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mb: 2 }}>
          {`We may update our Privacy Policy from time to time. Any changes to this Privacy Policy will be posted on this page, and the "Last Updated" date at the top will be revised accordingly. Your continued use of WebChatGPT after any changes to the Privacy Policy constitutes your acceptance of the updated policy.`}
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant='h2' component={'h2'} gutterBottom sx={{ mb: 2 }}>
          Contact Us
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mb: 2 }}>
          If you have any questions or concerns about our Privacy Policy, please
          feel free to contact us at{' '}
          <ProLink href={`mailto:${WEBCHATGPT_EMAIL}`}>
            {WEBCHATGPT_EMAIL}
          </ProLink>
          {'.'}
        </Typography>
      </Box>
    </AppContainer>
  );
};

export default PrivacyPage;

export function getStaticProps() {
  return {
    props: {
      seo: {
        ...WEBCHATGPT_SEO_CONFIG,
        title: 'Privacy Policy | WebChatGPT',
        canonical: `${WWW_PROJECT_LINK}/partners/webchatgpt/privacy/`,
      },
    },
  };
}
