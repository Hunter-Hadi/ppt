import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import AISummaryPages from '@/page_components/FeaturesLandingPages/AISummaryPages';

export default AISummaryPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
