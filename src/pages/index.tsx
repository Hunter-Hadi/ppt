import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { landingABTestRedirectHelper } from '@/features/ab_tester/utils/landingABTestRedirectHelper';
import LandingPages from '@/page_components/LandingPages';
export default LandingPages;

// const getStaticProps = makeStaticProps();
// export { getStaticProps };

const getServerSideProps = async (context) => {
  const locale = context.query?.locale ?? 'en';

  const landingRedirectHelperResult = landingABTestRedirectHelper(context);
  if (landingRedirectHelperResult) {
    return landingRedirectHelperResult;
  }

  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export { getServerSideProps };
