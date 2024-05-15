import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import AIVisionPages from '@/page_components/FeaturesLandingPages/AIVisionPages';

export default AIVisionPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
