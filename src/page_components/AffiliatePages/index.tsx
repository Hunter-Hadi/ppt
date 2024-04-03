import { Box } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import UserComment from '@/features/landing/components/UserComment';
import AffiliateCallToActions from '@/page_components/AffiliatePages/components/AffiliateCallToActions';
import AffiliateFAQ from '@/page_components/AffiliatePages/components/AffiliateFAQ';
import AffiliateHeroSection from '@/page_components/AffiliatePages/components/AffiliateHeroSection';
import AffiliateHowItWork from '@/page_components/AffiliatePages/components/AffiliateHowItWork';

const AffiliatePages = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <AppDefaultSeoLayout
        title={t('seo:affiliate__title')}
        description={t('seo:affiliate__description')}
      />
      <AffiliateHeroSection />
      <AffiliateHowItWork />

      {/* user comment */}
      <UserComment />
      <AffiliateCallToActions />
      <AffiliateFAQ />
    </Box>
  );
};

export default AffiliatePages;
