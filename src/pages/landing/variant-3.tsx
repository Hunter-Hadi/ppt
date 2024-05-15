import { useRouter } from 'next/router';
import React from 'react';

import { makeStaticProps } from '@/i18n/utils/staticHelper';

const LandingVariantC = () => {
  const router = useRouter();
  console.log(`LandingVariantC router`, router);
  return <h1>LandingVariantC</h1>;
};

export default LandingVariantC;

const getStaticProps = makeStaticProps();
export { getStaticProps };
