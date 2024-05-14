import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import AIRewriterPages from '@/page_components/FeaturesLandingPages/aiRewriterPages';

export default AIRewriterPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
