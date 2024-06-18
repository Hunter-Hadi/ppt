import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import MarketingPages from '@/page_components/IndustriesPages/MarketingPages';

export default MarketingPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
