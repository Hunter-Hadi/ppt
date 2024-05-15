import { useRouter } from 'next/router';
import React from 'react';

import { makeStaticProps } from '@/i18n/utils/staticHelper';

const LandingVariantB = () => {
  const router = useRouter();
  console.log(`LandingVariantB router`, router);
  return <h1>LandingVariantB</h1>;
};

export default LandingVariantB;

const getStaticProps = makeStaticProps();
export { getStaticProps };
