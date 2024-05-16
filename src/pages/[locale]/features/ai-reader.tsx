import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import AIReaderPages from '@/page_components/FeaturesLandingPages/AIReaderPages';

export default AIReaderPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
