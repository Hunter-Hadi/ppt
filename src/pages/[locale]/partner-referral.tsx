import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import PartnerReferralPages from '@/page_components/PartnerReferralPages';
export default PartnerReferralPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
