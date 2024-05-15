import { useRouter } from 'next/router';
import React from 'react';

import { makeStaticProps } from '@/i18n/utils/staticHelper';

const LandingVariantA = () => {
  const router = useRouter();
  console.log(`LandingVariantA router`, router);
  return <h1>LandingVariantA</h1>;
};

export default LandingVariantA;

const getStaticProps = makeStaticProps();
export { getStaticProps };
