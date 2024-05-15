import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import TranslatePages from '@/page_components/FeaturesLandingPages/TranslatePages';

export default TranslatePages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
