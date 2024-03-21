import { Box } from '@mui/material';
import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import UserComment from '@/features/landing/components/UserComment';
import AffiliateCallToActions from '@/page_components/AffiliatePages/components/AffiliateCallToActions';
import AffiliateFAQ from '@/page_components/AffiliatePages/components/AffiliateFAQ';
import AffiliateHeroSection from '@/page_components/AffiliatePages/components/AffiliateHeroSection';
import AffiliateHowItWork from '@/page_components/AffiliatePages/components/AffiliateHowItWork';

const AffiliatePages = () => {
  return (
    <Box>
      <AppDefaultSeoLayout
        title='Affiliate Program | MaxAI.me'
        description='Get paid with MaxAI affiliate program. Join our affiliate program and earn 25% commission for sharing MaxAI!'
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
