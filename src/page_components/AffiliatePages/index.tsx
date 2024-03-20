import { Box } from '@mui/material';
import React from 'react';

import UserComment from '@/features/landing/components/UserComment';
import AffiliateCallToActions from '@/page_components/AffiliatePages/components/AffiliateCallToActions';
import AffiliateFAQ from '@/page_components/AffiliatePages/components/AffiliateFAQ';
import AffiliateHeroSection from '@/page_components/AffiliatePages/components/AffiliateHeroSection';
import AffiliateHowItWork from '@/page_components/AffiliatePages/components/AffiliateHowItWork';

const AffiliatePages = () => {
  return (
    <Box>
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
