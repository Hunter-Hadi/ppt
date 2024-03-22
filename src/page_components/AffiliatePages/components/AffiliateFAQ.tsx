import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import ContactUsEmailLink from '@/components/ContactUsEmailLink';
import AFFILIATE_FAQ from '@/page_components/AffiliatePages/constant/affiliateFAQ';
import FAQList from '@/page_components/FAQList';

const AffiliateFAQ = () => {
  const { t } = useTranslation();
  return (
    <Box py={9}>
      <Box maxWidth={1312} mx='auto' px={2} textAlign={'center'}>
        <Typography
          variant='custom'
          component='h2'
          fontSize={{
            xs: 36,
            sm: 48,
          }}
          mb={4}
        >
          {t('affiliate:faq__title')}
        </Typography>
        <Typography
          variant='custom'
          fontSize={18}
          lineHeight={1.5}
          color='text.secondary'
        >
          {t('affiliate:faq__sub_title')}{' '}
          <ContactUsEmailLink
            sx={{
              color: 'inherit',
              textDecoration: 'underline',
            }}
          />
        </Typography>
        <Box mt={7} textAlign='left'>
          <FAQList faqList={AFFILIATE_FAQ} />
        </Box>
      </Box>
    </Box>
  );
};

export default AffiliateFAQ;
