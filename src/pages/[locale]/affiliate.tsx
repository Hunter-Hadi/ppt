import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import AffiliatePages from '@/page_components/AffiliatePages';

export default AffiliatePages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
