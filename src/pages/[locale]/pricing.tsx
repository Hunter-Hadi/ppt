import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import PricingPages from '@/page_components/PricingPages';

export default PricingPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
