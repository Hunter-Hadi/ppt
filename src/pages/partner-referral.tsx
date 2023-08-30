import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import AppLoadingLayout from '@/app_layout/AppLoadingLayout';

const PartnerReferral = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace({
      pathname: '/',
    });
  }, []);

  return (
    <AppLoadingLayout
      loading
      sx={{
        height: '50vh',
      }}
    />
  );
};
export default PartnerReferral;
