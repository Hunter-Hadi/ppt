import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import AISearchPages from '@/page_components/FeaturesLandingPages/AISearchPages';

export default AISearchPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
